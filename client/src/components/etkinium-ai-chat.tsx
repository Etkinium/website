import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { X, Send, Sparkles, MessageCircle, Trash2, Plus, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImage from "@assets/logo-final.png";

interface Message {
  id: number;
  conversationId: number;
  role: string;
  content: string;
  createdAt: string;
}

interface Conversation {
  id: number;
  title: string;
  createdAt: string;
  messages?: Message[];
}

interface EtkiniumAIChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EtkiniumAIChat({ isOpen, onClose }: EtkiniumAIChatProps) {
  const [input, setInput] = useState("");
  const [currentConversationId, setCurrentConversationId] = useState<number | null>(null);
  const [localMessages, setLocalMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const { data: conversations = [] } = useQuery<Conversation[]>({
    queryKey: ["/api/conversations"],
    enabled: isOpen,
  });

  const { data: currentConversation } = useQuery<Conversation>({
    queryKey: ["/api/conversations", currentConversationId],
    enabled: !!currentConversationId && isOpen,
  });

  useEffect(() => {
    if (currentConversation?.messages) {
      setLocalMessages(currentConversation.messages);
    }
  }, [currentConversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [localMessages, streamingContent]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const createConversationMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/conversations", { title: "Yeni Sohbet" });
      return await res.json();
    },
    onSuccess: (data: Conversation) => {
      setCurrentConversationId(data.id);
      setLocalMessages([]);
      queryClient.invalidateQueries({ queryKey: ["/api/conversations"] });
    },
  });

  const deleteConversationMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/conversations/${id}`);
    },
    onSuccess: () => {
      if (conversations.length > 1) {
        const remaining = conversations.filter(c => c.id !== currentConversationId);
        if (remaining.length > 0) {
          setCurrentConversationId(remaining[0].id);
        }
      } else {
        setCurrentConversationId(null);
        setLocalMessages([]);
      }
      queryClient.invalidateQueries({ queryKey: ["/api/conversations"] });
    },
  });

  const sendMessage = async () => {
    if (!input.trim() || isStreaming) return;

    let conversationId = currentConversationId;

    if (!conversationId) {
      const res = await apiRequest("POST", "/api/conversations", { title: input.slice(0, 50) });
      const newConversation = await res.json();
      conversationId = newConversation.id;
      setCurrentConversationId(conversationId);
      queryClient.invalidateQueries({ queryKey: ["/api/conversations"] });
    }

    const userMessage: Message = {
      id: Date.now(),
      conversationId: conversationId!,
      role: "user",
      content: input,
      createdAt: new Date().toISOString(),
    };

    setLocalMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsStreaming(true);
    setStreamingContent("");

    try {
      const response = await fetch(`/api/conversations/${conversationId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: input }),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error("No reader available");

      let fullContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value);
        const lines = text.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.content) {
                fullContent += data.content;
                setStreamingContent(fullContent);
              }
              if (data.done) {
                const assistantMessage: Message = {
                  id: Date.now() + 1,
                  conversationId: conversationId!,
                  role: "assistant",
                  content: fullContent,
                  createdAt: new Date().toISOString(),
                };
                setLocalMessages(prev => [...prev, assistantMessage]);
                setStreamingContent("");
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsStreaming(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleClose = () => {
    setLocalMessages([]);
    setCurrentConversationId(null);
    setInput("");
    onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.85)" }}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div 
        className="relative w-[90%] max-w-md bg-black rounded-2xl border border-accent-amber/40 overflow-hidden flex flex-col"
        style={{ 
          height: "auto",
          maxHeight: "500px",
          boxShadow: "0 0 60px rgba(255,214,0,0.15)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-lg bg-accent-amber/10 flex items-center justify-center border border-accent-amber/30">
                <img src={logoImage} alt="ETKİNİUM AI" className="w-5 h-5 object-contain" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-black" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                ETKİNİUM AI
                <span className="text-[8px] bg-accent-amber/20 text-accent-amber px-1.5 py-0.5 rounded-full font-medium">
                  BETA
                </span>
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => createConversationMutation.mutate()}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-accent-amber/20 flex items-center justify-center text-white/50 hover:text-accent-amber transition-all"
              title="Yeni Sohbet"
              data-testid="button-new-chat"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-lg bg-red-500/20 hover:bg-red-500/30 flex items-center justify-center text-red-400 hover:text-red-300 transition-all"
              title="Kapat"
              data-testid="button-close-ai"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Conversations tabs */}
        {conversations.length > 0 && (
          <div className="flex gap-1.5 px-3 py-2 border-b border-white/5 overflow-x-auto bg-black" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {conversations.slice(0, 4).map((conv) => (
              <button
                key={conv.id}
                onClick={() => setCurrentConversationId(conv.id)}
                className={`group flex items-center gap-1 px-2 py-1 rounded text-[10px] whitespace-nowrap transition-all ${
                  currentConversationId === conv.id
                    ? "bg-accent-amber/15 text-accent-amber"
                    : "bg-white/5 text-white/40 hover:bg-white/10"
                }`}
              >
                <MessageCircle className="w-2.5 h-2.5" />
                <span className="max-w-[60px] truncate">{conv.title}</span>
                {currentConversationId === conv.id && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteConversationMutation.mutate(conv.id);
                    }}
                    className="ml-0.5 text-white/30 hover:text-red-400"
                  >
                    <Trash2 className="w-2.5 h-2.5" />
                  </button>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Messages area */}
        <div 
          className="flex-1 overflow-y-auto p-3 space-y-3 bg-black"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', minHeight: '200px', maxHeight: '300px' }}
        >
          <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
          
          {localMessages.length === 0 && !streamingContent && (
            <div className="flex flex-col items-center justify-center h-full text-center py-4">
              <Sparkles className="w-8 h-8 text-accent-amber/50 mb-3" />
              <p className="text-xs text-white/40 mb-4">
                Etkinlikler, restoranlar ve biletler hakkında sorularınızı yanıtlayabilirim.
              </p>
              <div className="grid grid-cols-2 gap-2 w-full">
                {[
                  "Yaklaşan etkinlikler neler?",
                  "En iyi restoranları öner",
                  "Bilet nasıl alırım?",
                  "VIP paketler hakkında bilgi"
                ].map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(suggestion)}
                    className="text-left text-[10px] px-2 py-2 rounded-lg bg-white/5 text-white/40 hover:bg-accent-amber/10 hover:text-accent-amber transition-all"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {localMessages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.role === "assistant" && (
                <div className="w-6 h-6 rounded bg-accent-amber/15 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-3 h-3 text-accent-amber" />
                </div>
              )}
              <div
                className={`max-w-[80%] px-3 py-2 text-xs ${
                  message.role === "user"
                    ? "bg-accent-amber text-black rounded-xl rounded-br-sm"
                    : "bg-white/10 text-white/90 rounded-xl rounded-bl-sm"
                }`}
              >
                <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
              </div>
              {message.role === "user" && (
                <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-3 h-3 text-white/60" />
                </div>
              )}
            </div>
          ))}

          {streamingContent && (
            <div className="flex gap-2 justify-start">
              <div className="w-6 h-6 rounded bg-accent-amber/15 flex items-center justify-center flex-shrink-0">
                <Bot className="w-3 h-3 text-accent-amber animate-pulse" />
              </div>
              <div className="max-w-[80%] px-3 py-2 rounded-xl rounded-bl-sm bg-white/10 text-white/90 text-xs">
                <p className="whitespace-pre-wrap leading-relaxed">{streamingContent}</p>
                <span className="inline-block w-1.5 h-3 bg-accent-amber/60 animate-pulse ml-0.5" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="px-3 py-3 border-t border-white/10 bg-black">
          <div className="flex gap-2 items-center">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Mesajınızı yazın..."
              disabled={isStreaming}
              className="flex-1 h-10 px-3 bg-white/5 border border-accent-amber/30 text-white placeholder:text-white/30 rounded-lg text-sm focus:outline-none focus:border-accent-amber/60"
              data-testid="input-ai-message"
            />
            <Button
              onClick={sendMessage}
              disabled={!input.trim() || isStreaming}
              className="h-10 w-10 bg-accent-amber hover:bg-yellow-400 text-black rounded-lg p-0 flex-shrink-0 disabled:opacity-40"
              data-testid="button-send-ai"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-[9px] text-white/20 text-center mt-2">
            ETKİNİUM AI beta aşamasındadır. Yanıtlar her zaman doğru olmayabilir.
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}

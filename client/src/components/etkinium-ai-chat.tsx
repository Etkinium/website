import { useState, useRef, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { X, Send, Sparkles, MessageCircle, Trash2, Plus, Bot, User, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
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
    if (isOpen && textareaRef.current) {
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
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

  return (
    <>
      <div 
        className="fixed inset-0 z-[99] bg-black/40 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none md:pointer-events-none"
        onClick={handleClose}
      />
      
      <div 
        className={`fixed z-[100] transition-all duration-300 ease-out
          ${isExpanded 
            ? "inset-4 md:inset-8" 
            : "bottom-4 right-4 left-4 md:left-auto md:w-[420px] h-[85vh] md:h-[600px] max-h-[700px]"
          }
        `}
        style={{ 
          boxShadow: "0 25px 80px rgba(0,0,0,0.5), 0 0 60px rgba(255,214,0,0.1)",
        }}
      >
        <div 
          className="relative w-full h-full bg-gradient-to-b from-gray-900 via-black to-gray-900 rounded-2xl md:rounded-3xl border border-accent-amber/20 overflow-hidden flex flex-col"
        >
          <div 
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at top right, rgba(255,214,0,0.15) 0%, transparent 50%)"
            }}
          />

          <div className="relative flex items-center justify-between p-3 md:p-4 border-b border-white/10 bg-black/40 backdrop-blur-sm">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-accent-amber/20 to-yellow-500/10 flex items-center justify-center border border-accent-amber/30">
                  <img src={logoImage} alt="ETKİNİUM AI" className="w-6 h-6 md:w-7 md:h-7 object-contain" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-black" />
              </div>
              <div>
                <h2 className="text-sm md:text-base font-bold text-white flex items-center gap-2">
                  ETKİNİUM AI
                  <span className="text-[8px] md:text-[9px] bg-gradient-to-r from-accent-amber/30 to-yellow-500/20 text-accent-amber px-1.5 py-0.5 rounded-full font-medium border border-accent-amber/20">
                    BETA
                  </span>
                </h2>
                <p className="text-[10px] md:text-[11px] text-white/40">Yapay zeka asistanınız</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => createConversationMutation.mutate()}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-accent-amber/20 flex items-center justify-center text-white/50 hover:text-accent-amber transition-all border border-white/5 hover:border-accent-amber/30"
                data-testid="button-new-chat"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="hidden md:flex w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 items-center justify-center text-white/50 hover:text-white transition-all border border-white/5"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 flex items-center justify-center text-white/50 hover:text-red-400 transition-all border border-white/5 hover:border-red-500/30"
                data-testid="button-close-ai"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {conversations.length > 0 && (
            <div className="relative flex gap-1.5 px-3 py-2 border-b border-white/5 overflow-x-auto [&::-webkit-scrollbar]:hidden bg-black/20">
              {conversations.slice(0, 5).map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setCurrentConversationId(conv.id)}
                  className={`group flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] md:text-[11px] whitespace-nowrap transition-all ${
                    currentConversationId === conv.id
                      ? "bg-accent-amber/15 text-accent-amber border border-accent-amber/25"
                      : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/60 border border-transparent"
                  }`}
                >
                  <MessageCircle className="w-3 h-3" />
                  <span className="max-w-[80px] truncate">{conv.title}</span>
                  {currentConversationId === conv.id && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteConversationMutation.mutate(conv.id);
                      }}
                      className="ml-0.5 text-white/30 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </button>
              ))}
            </div>
          )}

          <div className="relative flex-1 overflow-y-auto p-3 md:p-4 space-y-3">
            {localMessages.length === 0 && !streamingContent && (
              <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-accent-amber/10 to-yellow-500/5 flex items-center justify-center mb-4 border border-accent-amber/20">
                  <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-accent-amber/70" />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-white mb-1.5">ETKİNİUM AI</h3>
                <p className="text-xs md:text-sm text-white/40 max-w-xs mb-5">
                  Size nasıl yardımcı olabilirim?
                </p>
                <div className="grid grid-cols-2 gap-2 w-full max-w-xs">
                  {[
                    "Yaklaşan etkinlikler",
                    "Restoran önerileri",
                    "Bilet satın alma",
                    "VIP paketler"
                  ].map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => setInput(suggestion)}
                      className="text-left text-[10px] md:text-[11px] p-2.5 rounded-xl bg-white/5 border border-white/5 text-white/50 hover:bg-accent-amber/10 hover:border-accent-amber/20 hover:text-accent-amber transition-all"
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
                className={`flex gap-2.5 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent-amber/20 to-yellow-500/10 flex items-center justify-center flex-shrink-0 border border-accent-amber/20">
                    <Bot className="w-3.5 h-3.5 text-accent-amber" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] px-3 py-2 text-xs md:text-sm ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-accent-amber to-yellow-500 text-black rounded-2xl rounded-br-lg"
                      : "bg-white/8 text-white/85 rounded-2xl rounded-bl-lg border border-white/5"
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                </div>
                {message.role === "user" && (
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/5">
                    <User className="w-3.5 h-3.5 text-white/60" />
                  </div>
                )}
              </div>
            ))}

            {streamingContent && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent-amber/20 to-yellow-500/10 flex items-center justify-center flex-shrink-0 border border-accent-amber/20">
                  <Bot className="w-3.5 h-3.5 text-accent-amber animate-pulse" />
                </div>
                <div className="max-w-[85%] px-3 py-2 rounded-2xl rounded-bl-lg bg-white/8 text-white/85 text-xs md:text-sm border border-white/5">
                  <p className="whitespace-pre-wrap leading-relaxed">{streamingContent}</p>
                  <span className="inline-block w-1.5 h-4 bg-accent-amber/60 animate-pulse ml-0.5 rounded-sm" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="relative p-3 md:p-4 border-t border-white/10 bg-black/40 backdrop-blur-sm">
            <div className="flex gap-2 items-end">
              <div className="flex-1 relative">
                <Textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Mesajınızı yazın..."
                  disabled={isStreaming}
                  className="min-h-[42px] max-h-[100px] resize-none bg-white/5 border-white/10 text-white placeholder:text-white/25 rounded-xl text-xs md:text-sm pr-3 focus:border-accent-amber/30 focus:ring-accent-amber/20"
                  data-testid="input-ai-message"
                />
              </div>
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isStreaming}
                className="h-[42px] w-[42px] bg-gradient-to-r from-accent-amber to-yellow-500 hover:from-yellow-400 hover:to-amber-400 text-black rounded-xl p-0 flex-shrink-0 shadow-lg shadow-accent-amber/20 disabled:opacity-40 disabled:shadow-none"
                data-testid="button-send-ai"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-[9px] text-white/20 text-center mt-2">
              ETKİNİUM AI beta aşamasındadır
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

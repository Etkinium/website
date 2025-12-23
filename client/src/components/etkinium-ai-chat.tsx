import { useState, useRef, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { X, Send, Sparkles, MessageCircle, Trash2, Plus, Bot, User } from "lucide-react";
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

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div 
        className="relative w-full max-w-2xl h-[80vh] max-h-[700px] bg-black/95 backdrop-blur-xl rounded-3xl border border-accent-amber/30 overflow-hidden flex flex-col"
        style={{ boxShadow: "0 25px 80px rgba(255,214,0,0.15), 0 10px 40px rgba(0,0,0,0.6)" }}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src={logoImage} alt="Etkinium AI" className="w-10 h-10 object-contain" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black flex items-center justify-center">
                <Sparkles className="w-2 h-2 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Etkinium AI
                <span className="text-[10px] bg-accent-amber/20 text-accent-amber px-2 py-0.5 rounded-full font-medium">BETA</span>
              </h2>
              <p className="text-[11px] text-white/50">Size nasıl yardımcı olabilirim?</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => createConversationMutation.mutate()}
              className="text-white/60 hover:text-accent-amber hover:bg-white/5"
              data-testid="button-new-chat"
            >
              <Plus className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white/60 hover:text-white hover:bg-white/5"
              data-testid="button-close-ai"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {conversations.length > 0 && (
          <div className="flex gap-2 px-4 py-2 border-b border-white/5 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {conversations.slice(0, 5).map((conv) => (
              <button
                key={conv.id}
                onClick={() => setCurrentConversationId(conv.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all ${
                  currentConversationId === conv.id
                    ? "bg-accent-amber/20 text-accent-amber border border-accent-amber/30"
                    : "bg-white/5 text-white/50 hover:bg-white/10 border border-white/5"
                }`}
              >
                <MessageCircle className="w-3 h-3" />
                <span className="max-w-[100px] truncate">{conv.title}</span>
                {currentConversationId === conv.id && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteConversationMutation.mutate(conv.id);
                    }}
                    className="ml-1 text-white/40 hover:text-red-400"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </button>
            ))}
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {localMessages.length === 0 && !streamingContent && (
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <div className="w-20 h-20 rounded-2xl bg-accent-amber/10 flex items-center justify-center mb-4 border border-accent-amber/20">
                <img src={logoImage} alt="Etkinium AI" className="w-12 h-12 object-contain" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Merhaba! Ben Etkinium AI</h3>
              <p className="text-sm text-white/50 max-w-md mb-6">
                Etkinlikler, restoranlar, biletler ve daha fazlası hakkında sorularınızı yanıtlayabilirim. Size nasıl yardımcı olabilirim?
              </p>
              <div className="grid grid-cols-2 gap-2 w-full max-w-sm">
                {[
                  "Yaklaşan etkinlikler neler?",
                  "En iyi restoranları öner",
                  "Bilet nasıl alırım?",
                  "VIP paketler hakkında bilgi"
                ].map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(suggestion)}
                    className="text-left text-xs p-3 rounded-xl bg-white/5 border border-white/5 text-white/70 hover:bg-accent-amber/10 hover:border-accent-amber/20 hover:text-accent-amber transition-all"
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
              className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.role === "assistant" && (
                <div className="w-8 h-8 rounded-lg bg-accent-amber/20 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-accent-amber" />
                </div>
              )}
              <div
                className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  message.role === "user"
                    ? "bg-accent-amber text-black rounded-br-md"
                    : "bg-white/10 text-white/90 rounded-bl-md"
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
              {message.role === "user" && (
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-white/70" />
                </div>
              )}
            </div>
          ))}

          {streamingContent && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-lg bg-accent-amber/20 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-accent-amber animate-pulse" />
              </div>
              <div className="max-w-[80%] p-3 rounded-2xl rounded-bl-md bg-white/10 text-white/90 text-sm">
                <p className="whitespace-pre-wrap">{streamingContent}</p>
                <span className="inline-block w-2 h-4 bg-accent-amber/50 animate-pulse ml-1" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-white/10">
          <div className="flex gap-2 items-end">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Mesajınızı yazın..."
              disabled={isStreaming}
              className="flex-1 min-h-[44px] max-h-[120px] resize-none bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl text-sm"
              data-testid="input-ai-message"
            />
            <Button
              onClick={sendMessage}
              disabled={!input.trim() || isStreaming}
              className="h-11 w-11 bg-accent-amber hover:bg-yellow-400 text-black rounded-xl p-0 flex-shrink-0"
              data-testid="button-send-ai"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-[10px] text-white/30 text-center mt-2">
            Etkinium AI beta aşamasındadır. Yanıtlar her zaman doğru olmayabilir.
          </p>
        </div>
      </div>
    </div>
  );
}

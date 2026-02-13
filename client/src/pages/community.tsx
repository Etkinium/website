import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/header";
import MobileTabBar from "@/components/mobile-tab-bar";
import { Send, Search, ArrowLeft, Users, MessageCircle, Clock } from "lucide-react";
import { Link } from "wouter";

interface ChatThread {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

interface ChatMessage {
  id: number;
  text: string;
  sender: "me" | "other";
  time: string;
}

const mockThreads: ChatThread[] = [
  { id: 1, name: "ETKİNİUM Topluluk", avatar: "🌟", lastMessage: "Hoş geldiniz! Yeni etkinlikleri burada paylaşıyoruz.", time: "Şimdi", unread: 3, online: true },
  { id: 2, name: "Konser Severler", avatar: "🎵", lastMessage: "Bu hafta Harbiye'de kim var?", time: "2dk", unread: 1, online: true },
  { id: 3, name: "Restoran Önerileri", avatar: "🍽️", lastMessage: "Karaköy'de harika bir yer keşfettim!", time: "15dk", unread: 0, online: false },
  { id: 4, name: "Tiyatro & Sahne", avatar: "🎭", lastMessage: "Yeni sezon programı açıklandı", time: "1s", unread: 0, online: true },
  { id: 5, name: "Etkinlik Paylaşımları", avatar: "📸", lastMessage: "Dünkü festivalde çok eğlendik!", time: "3s", unread: 0, online: false },
];

const mockMessages: Record<number, ChatMessage[]> = {
  1: [
    { id: 1, text: "ETKİNİUM Topluluk'a hoş geldiniz! 🎉", sender: "other", time: "10:00" },
    { id: 2, text: "Burada yeni etkinlikler, kampanyalar ve özel fırsatları paylaşıyoruz.", sender: "other", time: "10:01" },
    { id: 3, text: "Merhaba herkese!", sender: "me", time: "10:05" },
    { id: 4, text: "Hoş geldin! Bu hafta büyük bir konser var, kaçırmayın. 🎶", sender: "other", time: "10:06" },
    { id: 5, text: "Premium üyelere özel %20 indirim kodu: ETKINIUM20", sender: "other", time: "10:10" },
  ],
  2: [
    { id: 1, text: "Bu hafta hangi konserlere gidiyorsunuz?", sender: "other", time: "14:00" },
    { id: 2, text: "Harbiye Açıkhava'da harika bir konser var!", sender: "other", time: "14:02" },
    { id: 3, text: "Ben de planıyorum!", sender: "me", time: "14:05" },
  ],
  3: [
    { id: 1, text: "Karaköy'de yeni bir restoran açılmış", sender: "other", time: "12:00" },
    { id: 2, text: "ETKİNİUM'dan ücretsiz rezervasyon yapabiliyorsunuz 👍", sender: "other", time: "12:01" },
  ],
  4: [
    { id: 1, text: "Yeni sezon tiyatro programı açıklandı!", sender: "other", time: "09:00" },
    { id: 2, text: "Hangi oyunları önerirsiniz?", sender: "me", time: "09:30" },
  ],
  5: [
    { id: 1, text: "Dünkü festival fotoğrafları 📸", sender: "other", time: "22:00" },
    { id: 2, text: "Harika bir atmosferdi!", sender: "other", time: "22:01" },
  ],
};

export default function Community() {
  const { user } = useAuth();
  const [selectedThread, setSelectedThread] = useState<number | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [localMessages, setLocalMessages] = useState<Record<number, ChatMessage[]>>(mockMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedThread, localMessages]);

  const filteredThreads = mockThreads.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSend = () => {
    if (!messageInput.trim() || selectedThread === null) return;
    const newMsg: ChatMessage = {
      id: Date.now(),
      text: messageInput,
      sender: "me",
      time: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
    };
    setLocalMessages((prev) => ({
      ...prev,
      [selectedThread]: [...(prev[selectedThread] || []), newMsg],
    }));
    setMessageInput("");
  };

  const thread = mockThreads.find((t) => t.id === selectedThread);
  const messages = selectedThread ? localMessages[selectedThread] || [] : [];

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white pb-16 md:pb-0">
        <Header />
        <div className="pt-20 sm:pt-24 flex flex-col items-center justify-center min-h-[60vh] px-4">
          <div className="w-20 h-20 rounded-2xl bg-accent-amber/10 flex items-center justify-center mb-6 border border-accent-amber/20">
            <MessageCircle className="w-10 h-10 text-accent-amber" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Topluluk</h2>
          <p className="text-white/50 text-sm text-center max-w-sm mb-6">
            ETKİNİUM topluluğuna katılmak için giriş yapmanız gerekiyor.
          </p>
          <Link href="/login" className="px-6 py-3 rounded-full bg-accent-amber hover:bg-yellow-400 text-black font-bold text-sm transition-all inline-block">
            Giriş Yap
          </Link>
        </div>
        <MobileTabBar />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-16 md:pb-0">
      <Header />

      <div className="pt-16 sm:pt-20">
        <div className="container mx-auto max-w-5xl">
          <div className="flex h-[calc(100vh-64px)] sm:h-[calc(100vh-80px)] border border-white/5 rounded-none sm:rounded-2xl overflow-hidden bg-black/80">
            <div className={`${selectedThread !== null ? "hidden sm:flex" : "flex"} flex-col w-full sm:w-80 md:w-96 border-r border-white/5 flex-shrink-0`}>
              <div className="p-4 border-b border-white/5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-accent-amber" />
                    <h2 className="text-lg font-bold text-white">Topluluk</h2>
                  </div>
                  <span className="text-[10px] bg-accent-amber/10 text-accent-amber px-2 py-0.5 rounded-full font-semibold">
                    {mockThreads.reduce((a, t) => a + t.unread, 0)} yeni
                  </span>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="text"
                    placeholder="Ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent-amber/30"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {filteredThreads.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedThread(t.id)}
                    className={`w-full flex items-center gap-3 p-4 hover:bg-white/[0.03] transition-colors text-left ${
                      selectedThread === t.id ? "bg-white/[0.05] border-l-2 border-accent-amber" : ""
                    }`}
                  >
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-2xl border border-white/10">
                        {t.avatar}
                      </div>
                      {t.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-black" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-semibold text-white text-sm truncate">{t.name}</span>
                        <span className="text-[10px] text-white/30 flex-shrink-0 ml-2">{t.time}</span>
                      </div>
                      <p className="text-xs text-white/40 truncate">{t.lastMessage}</p>
                    </div>
                    {t.unread > 0 && (
                      <div className="w-5 h-5 rounded-full bg-accent-amber flex items-center justify-center flex-shrink-0">
                        <span className="text-[10px] font-bold text-black">{t.unread}</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className={`${selectedThread === null ? "hidden sm:flex" : "flex"} flex-col flex-1`}>
              {thread ? (
                <>
                  <div className="flex items-center gap-3 p-4 border-b border-white/5">
                    <button
                      onClick={() => setSelectedThread(null)}
                      className="sm:hidden w-8 h-8 rounded-full bg-white/5 flex items-center justify-center"
                    >
                      <ArrowLeft className="w-4 h-4 text-white" />
                    </button>
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-xl border border-white/10">
                        {thread.avatar}
                      </div>
                      {thread.online && (
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-black" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-sm">{thread.name}</h3>
                      <p className="text-[10px] text-white/30 flex items-center gap-1">
                        {thread.online ? (
                          <><span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" /> Çevrimiçi</>
                        ) : (
                          <><Clock className="w-3 h-3" /> Son görülme yakın zamanda</>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {messages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                            msg.sender === "me"
                              ? "bg-accent-amber text-black rounded-br-md"
                              : "bg-white/[0.06] text-white border border-white/5 rounded-bl-md"
                          }`}
                        >
                          <p className="text-sm">{msg.text}</p>
                          <p className={`text-[10px] mt-1 ${msg.sender === "me" ? "text-black/40" : "text-white/30"}`}>
                            {msg.time}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  <div className="p-4 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Mesaj yaz..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent-amber/30"
                      />
                      <button
                        onClick={handleSend}
                        disabled={!messageInput.trim()}
                        className="w-10 h-10 rounded-full bg-accent-amber hover:bg-yellow-400 flex items-center justify-center text-black transition-all disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4 border border-white/10">
                    <MessageCircle className="w-8 h-8 text-white/20" />
                  </div>
                  <h3 className="font-semibold text-white/40 mb-1">Sohbet Seç</h3>
                  <p className="text-xs text-white/20">Bir topluluk seçerek sohbete başlayın</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
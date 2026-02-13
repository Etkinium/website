import { useState } from "react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import HorizontalAdBanner from "@/components/horizontal-ad-banner";
import AdApplicationButton from "@/components/ad-application-button";
import FilterDialog from "@/components/filter-dialog";
import DateDrawer from "@/components/date-drawer";
import MobileTabBar from "@/components/mobile-tab-bar";
import { Calendar, MapPin, Clock, Filter, Search, ChevronRight, Star, Heart, CalendarDays, ChevronDown, TrendingUp, Users, Ticket, Flame, Quote, Play, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";

const categories = [
  "Tümü",
  "Konser",
  "Tiyatro",
  "Stand-up",
  "Festival",
  "Konferans",
  "Workshop",
  "Spor",
];

const EventCard = ({ index, onBuyTicket }: { index: number; onBuyTicket: () => void }) => {
  return (
    <div 
      className="group relative bg-black/60 backdrop-blur-xl rounded-[16px] sm:rounded-[20px] overflow-hidden border border-white/10 hover:border-accent-amber/40 transition-all duration-500"
      style={{
        boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)"
      }}
      data-testid={`event-card-${index}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-accent-amber/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative h-28 sm:h-32 md:h-36 bg-gradient-to-br from-purple-900/40 to-gray-900/60">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-500/20 backdrop-blur-sm flex items-center justify-center border border-purple-400/20">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-purple-300" />
          </div>
        </div>
        <div className="absolute top-2 left-2">
          <span className="bg-accent-amber/90 backdrop-blur-sm text-black text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-full" data-testid={`event-category-${index}`}>
            —
          </span>
        </div>
        <button 
          className="absolute top-2 right-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-red-400 hover:bg-black/60 transition-all border border-white/10"
          data-testid={`event-favorite-${index}`}
        >
          <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
          <div className="flex items-center gap-1 text-accent-amber text-[10px]">
            <Star className="w-2.5 h-2.5 fill-accent-amber" />
            <span className="font-medium" data-testid={`event-rating-${index}`}>—</span>
          </div>
        </div>
      </div>
      
      <div className="relative p-3 sm:p-4 space-y-2">
        <h3 
          className="font-medium text-white/90 group-hover:text-white transition-colors line-clamp-2 text-xs sm:text-sm h-8 sm:h-10"
          data-testid={`event-title-${index}`}
        >
          Etkinlik Başlığı
        </h3>
        
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-white/50">
            <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-accent-amber/70 flex-shrink-0" />
            <span data-testid={`event-date-${index}`}>— — ——</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-white/50">
            <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-accent-amber/70 flex-shrink-0" />
            <span data-testid={`event-time-${index}`}>—:—</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-white/50">
            <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-accent-amber/70 flex-shrink-0" />
            <span className="line-clamp-1" data-testid={`event-location-${index}`}>Konum Bilgisi</span>
          </div>
        </div>
        
        <div className="pt-2 border-t border-white/5 flex items-center justify-between">
          <div>
            <p className="text-[9px] sm:text-[10px] text-white/40">Başlangıç</p>
            <p className="text-sm sm:text-base font-semibold text-accent-amber" data-testid={`event-price-${index}`}>— ₺</p>
          </div>
          <button 
            onClick={onBuyTicket}
            className="bg-black hover:bg-accent-amber text-white hover:text-black text-[10px] sm:text-[11px] font-medium px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full transition-all border border-white/10 hover:border-accent-amber flex items-center gap-0.5"
            data-testid={`event-buy-${index}`}
          >
            Bilet Al
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Etkinlikler() {
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDateDrawerOpen, setIsDateDrawerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleBuyTicket = () => {
    setLocation("/bilet-detay");
  };

  return (
    <div className="min-h-screen bg-black text-white pb-16 md:pb-0">
      <Header />
      
      <main className="pt-20 pb-16">
        <HorizontalAdBanner />
        <AdApplicationButton />

        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4 sm:mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-accent-amber" />
              <h1 className="text-base sm:text-lg md:text-xl font-semibold">Etkinlikler</h1>
              <button 
                onClick={() => setIsDateDrawerOpen(true)}
                className="ml-1 w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-black hover:bg-accent-amber flex items-center justify-center text-white/60 hover:text-black transition-all border border-white/10 hover:border-accent-amber"
                data-testid="open-date-drawer-events"
              >
                <CalendarDays className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative flex-1 md:flex-none">
                <Input
                  type="text"
                  placeholder="Etkinlik ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-black/60 backdrop-blur-sm border-white/10 text-white placeholder:text-white/40 pr-8 w-full md:w-48 text-xs h-8 rounded-full"
                  data-testid="input-event-search"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-white/40" />
              </div>
              <button 
                onClick={() => setIsFilterOpen(true)}
                className="h-8 px-3 bg-black hover:bg-accent-amber text-white hover:text-black text-[11px] font-medium rounded-full transition-all border border-white/10 hover:border-accent-amber flex items-center gap-1.5 flex-shrink-0"
                data-testid="button-event-filter"
              >
                <Filter className="w-3 h-3" />
                <span className="hidden sm:inline">Filtrele</span>
              </button>
            </div>
          </div>

          <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-3 mb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-4 px-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-medium whitespace-nowrap transition-all border ${
                  selectedCategory === category
                    ? "bg-accent-amber text-black border-accent-amber"
                    : "bg-black text-white/70 border-white/10 hover:border-accent-amber/50"
                }`}
                data-testid={`filter-${category.toLowerCase()}`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Hero Spotlight */}
          <div 
            className="mb-8 relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-900/60 via-black/80 to-accent-amber/20 border border-white/10"
            style={{ boxShadow: "0 8px 40px rgba(139,92,246,0.15)" }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(139,92,246,0.15),transparent_50%)]" />
            <div className="relative p-6 sm:p-8 flex flex-col lg:flex-row gap-6 items-center">
              <div className="flex-shrink-0 w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-purple-500/20 backdrop-blur-sm flex items-center justify-center border border-purple-400/30 relative group cursor-pointer">
                <div className="absolute inset-0 bg-purple-500/10 rounded-2xl animate-pulse" />
                <Play className="w-12 h-12 text-purple-300 group-hover:scale-110 transition-transform" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-white text-[8px] font-bold">CANLI</span>
                </div>
              </div>
              <div className="flex-1 text-center lg:text-left">
                <div className="flex items-center gap-2 justify-center lg:justify-start mb-2">
                  <Flame className="w-4 h-4 text-accent-amber animate-pulse" />
                  <span className="text-accent-amber text-xs font-bold uppercase tracking-wider">Haftanın Vitrini</span>
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">Premium Etkinlik Başlığı</h2>
                <p className="text-white/60 text-sm mb-4 max-w-lg">Bu hafta kaçırılmaması gereken en özel etkinlik. Sınırlı sayıda bilet ile unutulmaz bir deneyim sizi bekliyor.</p>
                <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start mb-4">
                  <div className="flex items-center gap-1 text-white/70 text-xs">
                    <Calendar className="w-3 h-3 text-accent-amber" />
                    <span>25 Ocak 2026</span>
                  </div>
                  <div className="flex items-center gap-1 text-white/70 text-xs">
                    <MapPin className="w-3 h-3 text-accent-amber" />
                    <span>İstanbul</span>
                  </div>
                  <div className="flex items-center gap-1 text-accent-amber text-xs">
                    <Star className="w-3 h-3 fill-accent-amber" />
                    <span className="font-bold">4.9</span>
                  </div>
                </div>
                <button 
                  onClick={handleBuyTicket}
                  className="px-6 py-2.5 rounded-full font-semibold text-sm bg-gradient-to-r from-accent-amber to-yellow-500 hover:from-white hover:to-white text-black transition-all hover:scale-105 shadow-lg shadow-accent-amber/30"
                >
                  Hemen Bilet Al
                </button>
              </div>
              <div className="hidden xl:flex flex-col gap-3 text-right">
                <div className="bg-black/40 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                  <p className="text-accent-amber text-lg font-bold">2.500+</p>
                  <p className="text-white/50 text-[10px]">Bilet Satıldı</p>
                </div>
                <div className="bg-black/40 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                  <p className="text-green-400 text-lg font-bold">%87</p>
                  <p className="text-white/50 text-[10px]">Doluluk</p>
                </div>
              </div>
            </div>
          </div>

          {/* Live Stats Bar */}
          <div className="mb-6 flex flex-wrap items-center justify-center gap-4 sm:gap-8 py-4 px-6 rounded-xl bg-black/40 backdrop-blur-sm border border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-white/70 text-xs"><span className="text-white font-bold">1.247</span> aktif kullanıcı</span>
            </div>
            <div className="flex items-center gap-2">
              <Ticket className="w-4 h-4 text-accent-amber" />
              <span className="text-white/70 text-xs"><span className="text-white font-bold">89</span> bilet son 1 saatte satıldı</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-white/70 text-xs"><span className="text-green-400 font-bold">+23%</span> bu hafta</span>
            </div>
          </div>

          {/* Trending Events Carousel */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-5 h-5 text-orange-500" />
              <h3 className="text-lg font-bold text-white">Trend <span className="text-accent-amber">Etkinlikler</span></h3>
              <span className="ml-auto text-white/50 text-xs cursor-pointer hover:text-accent-amber transition-colors">Tümünü Gör →</span>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-4 px-4">
              {[...Array(6)].map((_, index) => (
                <div 
                  key={index}
                  onClick={handleBuyTicket}
                  className="flex-shrink-0 w-64 p-4 rounded-xl bg-gradient-to-br from-purple-900/30 to-black/60 backdrop-blur-sm border border-white/10 hover:border-accent-amber/40 cursor-pointer transition-all hover:scale-[1.02] group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-16 h-16 rounded-lg bg-purple-500/20 flex items-center justify-center border border-purple-400/20 flex-shrink-0">
                      <Calendar className="w-7 h-7 text-purple-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 mb-1">
                        <TrendingUp className="w-3 h-3 text-orange-500" />
                        <span className="text-orange-500 text-[9px] font-bold">#{index + 1} TREND</span>
                      </div>
                      <h4 className="text-white font-medium text-sm line-clamp-1 group-hover:text-accent-amber transition-colors">Trend Etkinlik {index + 1}</h4>
                      <p className="text-white/50 text-[10px] mt-1">İstanbul • 28 Ocak</p>
                      <p className="text-accent-amber font-bold text-sm mt-2">— ₺</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Grid Section Title */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent-amber" />
              <h3 className="text-lg font-bold text-white">Tüm <span className="text-accent-amber">Etkinlikler</span></h3>
            </div>
            <span className="text-white/40 text-xs">12 etkinlik</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
            {[...Array(10)].map((_, index) => (
              <EventCard key={index} index={index} onBuyTicket={handleBuyTicket} />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <button 
              className="bg-black hover:bg-accent-amber text-white hover:text-black px-6 py-2.5 rounded-full font-medium text-xs transition-all border border-white/10 hover:border-accent-amber flex items-center gap-2 hover:scale-105"
              data-testid="button-load-more"
            >
              <ChevronDown className="w-4 h-4" />
              Daha Fazla Göster
            </button>
          </div>

          {/* Testimonials Section */}
          <div className="mt-12 mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Quote className="w-5 h-5 text-accent-amber" />
              <h3 className="text-lg font-bold text-white">Kullanıcı <span className="text-accent-amber">Yorumları</span></h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "Ayşe K.", text: "Harika bir deneyimdi! Bilet alma süreci çok hızlı ve güvenli.", rating: 5 },
                { name: "Mehmet T.", text: "Konsere gitmek hiç bu kadar kolay olmamıştı. Teşekkürler ETKİNİUM!", rating: 5 },
                { name: "Zeynep A.", text: "Müşteri hizmetleri çok ilgili. Kesinlikle tavsiye ederim.", rating: 4 },
              ].map((review, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 hover:border-accent-amber/20 transition-all"
                >
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-accent-amber text-accent-amber" />
                    ))}
                  </div>
                  <p className="text-white/70 text-sm mb-3 italic">"{review.text}"</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-accent-amber flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{review.name.charAt(0)}</span>
                    </div>
                    <span className="text-white/60 text-xs">{review.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Banner */}
          <div 
            className="mt-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-accent-amber/20 via-black/60 to-purple-900/20 border border-accent-amber/20 text-center"
            style={{ boxShadow: "0 8px 40px rgba(245,158,11,0.1)" }}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Özel Fırsatları Kaçırmayın!</h3>
            <p className="text-white/60 text-sm mb-4">Bültene abone olun, indirimlerden ve yeni etkinliklerden ilk siz haberdar olun.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="E-posta adresiniz"
                className="flex-1 px-4 py-2.5 rounded-full bg-black/60 border border-white/10 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-accent-amber/50"
              />
              <button className="px-6 py-2.5 rounded-full font-semibold text-sm bg-gradient-to-r from-accent-amber to-yellow-500 text-black hover:from-white hover:to-white transition-all">
                Abone Ol
              </button>
            </div>
          </div>
        </div>
      </main>

      <FilterDialog isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} type="event" />
      <DateDrawer 
        isOpen={isDateDrawerOpen} 
        onClose={() => setIsDateDrawerOpen(false)}
        onSelectDate={setSelectedDate}
      />

      <MobileTabBar />

      <Footer />
    </div>
  );
}

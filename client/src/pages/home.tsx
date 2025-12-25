import { useState, useRef } from "react";
import { Link } from "wouter";
import Header from "@/components/header";
import HeroCarousel from "@/components/hero-carousel";
import OvalAdBanner from "@/components/oval-ad-banner";
import DateDrawer from "@/components/date-drawer";
import MobileTabBar from "@/components/mobile-tab-bar";
import Footer from "@/components/footer";
import { MapPin, Clock, Star, Heart, ChevronRight, ChevronLeft, CalendarDays, Sparkles } from "lucide-react";

const FeaturedEventCard = ({ index }: { index: number }) => (
  <div 
    className="group relative overflow-hidden flex-shrink-0 w-[200px] sm:w-[220px] rounded-2xl transition-all duration-500 hover:scale-[1.02]"
    style={{
      background: "linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)",
      boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(245,158,11,0.1), inset 0 1px 0 rgba(255,255,255,0.03)"
    }}
    data-testid={`featured-event-${index}`}
  >
    <div 
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{
        background: "linear-gradient(180deg, rgba(245,158,11,0.08) 0%, transparent 50%)",
        boxShadow: "inset 0 0 40px rgba(245,158,11,0.05)"
      }}
    />
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
    
    <div className="relative h-28 sm:h-32 bg-gradient-to-br from-neutral-800/50 to-neutral-900/80">
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(245,158,11,0.05) 100%)",
            border: "1px solid rgba(245,158,11,0.3)",
            boxShadow: "0 4px 20px rgba(245,158,11,0.15)"
          }}
        >
          <span className="text-amber-400 text-2xl font-bold">E</span>
        </div>
      </div>
      <div className="absolute top-3 left-3">
        <span 
          className="text-[9px] font-bold px-2.5 py-1 rounded-full"
          style={{
            background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
            color: "black",
            boxShadow: "0 2px 10px rgba(245,158,11,0.4)"
          }}
        >
          VIP
        </span>
      </div>
      <button className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-neutral-400 hover:text-red-400 hover:bg-black/70 transition-all border border-neutral-700/50 group-hover:border-neutral-600">
        <Heart className="w-3.5 h-3.5" />
      </button>
    </div>
    
    <div className="relative p-4 space-y-3">
      <h3 className="font-semibold text-white group-hover:text-amber-400 transition-colors line-clamp-1 text-sm tracking-tight">
        Etkinlik Başlığı
      </h3>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-[10px] text-amber-500/80">
          <CalendarDays className="w-3 h-3" />
          <span>— — ——</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-neutral-400">
          <MapPin className="w-3 h-3 text-amber-500/70" />
          <span className="line-clamp-1">Konum</span>
        </div>
      </div>
      <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
        <span className="text-amber-400 font-bold text-base">— ₺</span>
        <Link href="/bilet-al">
          <button 
            className="text-[10px] font-bold px-4 py-2 rounded-full transition-all"
            style={{
              background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
              color: "black",
              boxShadow: "0 2px 12px rgba(245,158,11,0.3)"
            }}
          >
            Satın Al
          </button>
        </Link>
      </div>
    </div>
  </div>
);

const FeaturedRestaurantCard = ({ index }: { index: number }) => (
  <div 
    className="group relative overflow-hidden flex-shrink-0 w-[200px] sm:w-[220px] rounded-2xl transition-all duration-500 hover:scale-[1.02]"
    style={{
      background: "linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)",
      boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(245,158,11,0.1), inset 0 1px 0 rgba(255,255,255,0.03)"
    }}
    data-testid={`featured-restaurant-${index}`}
  >
    <div 
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{
        background: "linear-gradient(180deg, rgba(245,158,11,0.08) 0%, transparent 50%)",
        boxShadow: "inset 0 0 40px rgba(245,158,11,0.05)"
      }}
    />
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
    
    <div className="relative h-28 sm:h-32 bg-gradient-to-br from-neutral-800/50 to-neutral-900/80">
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(245,158,11,0.05) 100%)",
            border: "1px solid rgba(245,158,11,0.3)",
            boxShadow: "0 4px 20px rgba(245,158,11,0.15)"
          }}
        >
          <span className="text-amber-400 text-2xl font-bold">R</span>
        </div>
      </div>
      <div className="absolute top-3 left-3 flex gap-1.5">
        <span 
          className="text-[9px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1"
          style={{
            background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
            color: "black",
            boxShadow: "0 2px 10px rgba(245,158,11,0.4)"
          }}
        >
          <Sparkles className="w-2.5 h-2.5" />
          Seçkin
        </span>
      </div>
      <button className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-neutral-400 hover:text-red-400 hover:bg-black/70 transition-all border border-neutral-700/50 group-hover:border-neutral-600">
        <Heart className="w-3.5 h-3.5" />
      </button>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3">
        <div className="flex items-center gap-1.5 text-amber-400 text-xs">
          <Star className="w-3 h-3 fill-amber-400" />
          <span className="font-bold">—</span>
        </div>
      </div>
    </div>
    
    <div className="relative p-4 space-y-3">
      <h3 className="font-semibold text-white group-hover:text-amber-400 transition-colors line-clamp-1 text-sm tracking-tight">
        Restoran Adı
      </h3>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-[10px] text-neutral-400">
          <MapPin className="w-3 h-3 text-amber-500/70" />
          <span className="line-clamp-1">Konum</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-neutral-400">
          <Clock className="w-3 h-3 text-amber-500/70" />
          <span>—:— - —:—</span>
        </div>
      </div>
      <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
        <span className="text-amber-400 font-bold text-base">—— ₺</span>
        <Link href="/restoranlar">
          <button 
            className="text-[10px] font-bold px-4 py-2 rounded-full transition-all"
            style={{
              background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
              color: "black",
              boxShadow: "0 2px 12px rgba(245,158,11,0.3)"
            }}
          >
            Rezerve Et
          </button>
        </Link>
      </div>
    </div>
  </div>
);


export default function Home() {
  const eventsRef = useRef<HTMLDivElement>(null);
  const restaurantsRef = useRef<HTMLDivElement>(null);
  const [isDateDrawerOpen, setIsDateDrawerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const scrollEvents = (direction: "left" | "right") => {
    if (eventsRef.current) {
      const scrollAmount = 200;
      eventsRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const scrollRestaurants = (direction: "left" | "right") => {
    if (restaurantsRef.current) {
      const scrollAmount = 200;
      restaurantsRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pb-16 md:pb-0">
      <Header />
      
      <HeroCarousel />
      
      <OvalAdBanner />

      <section className="py-6 sm:py-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-1 h-6 rounded-full"
                    style={{ background: "linear-gradient(180deg, #F59E0B 0%, #D97706 100%)" }}
                  />
                  <h2 className="text-base sm:text-xl font-bold text-white tracking-tight">
                    ETKİNİUM <span className="text-amber-400">VIP</span> Etkinlikleri
                  </h2>
                </div>
                <p className="text-xs text-neutral-500 ml-3 mt-1 hidden sm:block">Özenle seçilmiş premium deneyimler</p>
              </div>
              <button 
                onClick={() => setIsDateDrawerOpen(true)}
                className="w-8 h-8 rounded-xl bg-neutral-900 hover:bg-amber-500 flex items-center justify-center text-amber-400 hover:text-black transition-all border border-neutral-800 hover:border-amber-500"
                data-testid="open-date-drawer"
              >
                <CalendarDays className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => scrollEvents("left")}
                className="w-8 h-8 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all"
                data-testid="events-scroll-left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => scrollEvents("right")}
                className="w-8 h-8 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all"
                data-testid="events-scroll-right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <Link href="/etkinlikler">
                <button className="hidden sm:flex items-center gap-1 text-neutral-400 hover:text-amber-400 text-xs font-medium transition-all ml-2 px-3 py-2 rounded-xl hover:bg-neutral-900">
                  Tümünü Gör
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </Link>
            </div>
          </div>
          <div 
            ref={eventsRef}
            className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {[...Array(10)].map((_, i) => (
              <FeaturedEventCard key={i} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-6 sm:py-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-5">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <div 
                  className="w-1 h-6 rounded-full"
                  style={{ background: "linear-gradient(180deg, #F59E0B 0%, #D97706 100%)" }}
                />
                <h2 className="text-base sm:text-xl font-bold text-white tracking-tight">
                  Gastronomi Dünyasının <span className="text-amber-400">Seçkinleri</span>
                </h2>
              </div>
              <p className="text-xs text-neutral-500 ml-3 mt-1 hidden sm:block">Unutulmaz lezzet deneyimleri için en iyi restoranlar</p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => scrollRestaurants("left")}
                className="w-8 h-8 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all"
                data-testid="restaurants-scroll-left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => scrollRestaurants("right")}
                className="w-8 h-8 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all"
                data-testid="restaurants-scroll-right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <Link href="/restoranlar">
                <button className="hidden sm:flex items-center gap-1 text-neutral-400 hover:text-amber-400 text-xs font-medium transition-all ml-2 px-3 py-2 rounded-xl hover:bg-neutral-900">
                  Tümünü Gör
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </Link>
            </div>
          </div>
          <div 
            ref={restaurantsRef}
            className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {[...Array(10)].map((_, i) => (
              <FeaturedRestaurantCard key={i} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-4 sm:py-6">
        <div className="container mx-auto px-3">
          <div 
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(180deg, rgba(20,20,20,0.95) 0%, rgba(10,10,10,0.98) 100%)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)"
            }}
          >
            <div className="p-4 sm:p-6">
              <div className="text-center mb-4">
                <h3 className="text-sm sm:text-base font-semibold text-white mb-2">Basında Biz</h3>
                <p className="text-white/40 text-[10px] max-w-md mx-auto">
                  ETKİNİUM hakkında medyada çıkan haberler ve röportajlar
                </p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {["Hürriyet", "Sabah", "Milliyet", "NTV"].map((media, index) => (
                  <div 
                    key={index}
                    className="bg-white/5 rounded-xl p-3 text-center border border-white/5 hover:border-accent-amber/30 transition-all cursor-pointer"
                  >
                    <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-white/10 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-white/60">{media[0]}</span>
                    </div>
                    <p className="text-[10px] text-white/50 font-medium">{media}</p>
                    <p className="text-[8px] text-white/30 mt-0.5">Yakında</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

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

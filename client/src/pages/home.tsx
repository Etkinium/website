import { useState, useRef } from "react";
import { Link } from "wouter";
import Header from "@/components/header";
import HeroCarousel from "@/components/hero-carousel";
import OvalAdBanner from "@/components/oval-ad-banner";
import DateDrawer from "@/components/date-drawer";
import MobileTabBar from "@/components/mobile-tab-bar";
import Footer from "@/components/footer";
import { MapPin, Clock, Star, Heart, ChevronRight, ChevronLeft, CalendarDays } from "lucide-react";

const FeaturedEventCard = ({ index }: { index: number }) => (
  <div 
    className="group relative bg-black rounded-[20px] overflow-hidden border-2 border-accent-amber/20 hover:border-accent-amber/60 transition-all duration-500 flex-shrink-0 w-[160px] sm:w-[180px]"
    style={{
      boxShadow: "0 8px 32px rgba(0,0,0,0.6), 0 0 20px rgba(245,158,11,0.1)"
    }}
    data-testid={`featured-event-${index}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-accent-amber/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <div className="relative h-20 sm:h-24 bg-gradient-to-br from-gray-900 to-black">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-accent-amber/10 backdrop-blur-sm flex items-center justify-center border border-accent-amber/30">
          <span className="text-accent-amber text-lg font-bold">E</span>
        </div>
      </div>
      <div className="absolute top-1.5 left-1.5">
        <span className="bg-accent-amber text-black text-[8px] font-bold px-2 py-0.5 rounded-full">
          Yakında
        </span>
      </div>
      <button className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-red-400 hover:bg-black transition-all border border-accent-amber/20">
        <Heart className="w-2.5 h-2.5" />
      </button>
    </div>
    
    <div className="relative p-3 space-y-2 bg-black">
      <h3 className="font-bold text-white group-hover:text-accent-amber transition-colors line-clamp-1 text-xs sm:text-sm tracking-wide">
        Etkinlik Başlığı
      </h3>
      <div className="space-y-1">
        <div className="flex items-center gap-1.5 text-[9px] text-accent-amber/70">
          <span>— — ——</span>
        </div>
        <div className="flex items-center gap-1.5 text-[9px] text-white/50">
          <MapPin className="w-2.5 h-2.5 text-accent-amber" />
          <span className="line-clamp-1">Konum</span>
        </div>
      </div>
      <div className="pt-2 border-t border-accent-amber/10 flex items-center justify-between">
        <span className="text-accent-amber font-bold text-sm">— ₺</span>
        <Link href="/bilet-al">
          <button className="bg-accent-amber hover:bg-white text-black text-[8px] font-bold px-3 py-1.5 rounded-full transition-all">
            Satın Al
          </button>
        </Link>
      </div>
    </div>
  </div>
);

const FeaturedRestaurantCard = ({ index }: { index: number }) => (
  <div 
    className="group relative bg-black rounded-[20px] overflow-hidden border-2 border-accent-amber/20 hover:border-accent-amber/60 transition-all duration-500 flex-shrink-0 w-[160px] sm:w-[180px]"
    style={{
      boxShadow: "0 8px 32px rgba(0,0,0,0.6), 0 0 20px rgba(245,158,11,0.1)"
    }}
    data-testid={`featured-restaurant-${index}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-accent-amber/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <div className="relative h-20 sm:h-24 bg-gradient-to-br from-gray-900 to-black">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-accent-amber/10 backdrop-blur-sm flex items-center justify-center border border-accent-amber/30">
          <span className="text-accent-amber text-lg font-bold">R</span>
        </div>
      </div>
      <div className="absolute top-1.5 left-1.5 flex gap-1">
        <span className="bg-accent-amber text-black text-[8px] font-bold px-2 py-0.5 rounded-full">
          Popüler
        </span>
      </div>
      <button className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-red-400 hover:bg-black transition-all border border-accent-amber/20">
        <Heart className="w-2.5 h-2.5" />
      </button>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-1.5">
        <div className="flex items-center gap-1 text-accent-amber text-[9px]">
          <Star className="w-2.5 h-2.5 fill-accent-amber" />
          <span className="font-bold">—</span>
        </div>
      </div>
    </div>
    
    <div className="relative p-3 space-y-2 bg-black">
      <h3 className="font-bold text-white group-hover:text-accent-amber transition-colors line-clamp-1 text-xs sm:text-sm tracking-wide">
        Restoran Adı
      </h3>
      <div className="space-y-1">
        <div className="flex items-center gap-1.5 text-[9px] text-white/50">
          <MapPin className="w-2.5 h-2.5 text-accent-amber" />
          <span className="line-clamp-1">Konum</span>
        </div>
        <div className="flex items-center gap-1.5 text-[9px] text-white/50">
          <Clock className="w-2.5 h-2.5 text-accent-amber" />
          <span>—:— - —:—</span>
        </div>
      </div>
      <div className="pt-2 border-t border-accent-amber/10 flex items-center justify-between">
        <span className="text-accent-amber font-bold text-sm">—— ₺</span>
        <Link href="/restoranlar">
          <button className="bg-accent-amber hover:bg-white text-black text-[8px] font-bold px-3 py-1.5 rounded-full transition-all">
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

      <section className="py-4 sm:py-6">
        <div className="container mx-auto px-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-white tracking-wide uppercase">Öne Çıkan Etkinlikler</h2>
              <button 
                onClick={() => setIsDateDrawerOpen(true)}
                className="w-6 h-6 rounded-full bg-black hover:bg-accent-amber flex items-center justify-center text-accent-amber hover:text-black transition-all border border-accent-amber/30 hover:border-accent-amber"
                data-testid="open-date-drawer"
              >
                <CalendarDays className="w-3 h-3" />
              </button>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => scrollEvents("left")}
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-black border border-white/10 flex items-center justify-center text-white/70 hover:bg-accent-amber hover:text-black hover:border-accent-amber transition-all"
                data-testid="events-scroll-left"
              >
                <ChevronLeft className="w-3 h-3" />
              </button>
              <button 
                onClick={() => scrollEvents("right")}
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-black border border-white/10 flex items-center justify-center text-white/70 hover:bg-accent-amber hover:text-black hover:border-accent-amber transition-all"
                data-testid="events-scroll-right"
              >
                <ChevronRight className="w-3 h-3" />
              </button>
              <Link href="/etkinlikler">
                <button className="hidden sm:flex items-center gap-0.5 text-white/50 hover:text-accent-amber text-[10px] font-medium transition-all ml-1">
                  Tümü
                  <ChevronRight className="w-2.5 h-2.5" />
                </button>
              </Link>
            </div>
          </div>
          <div 
            ref={eventsRef}
            className="flex gap-2.5 overflow-x-auto pb-2 -mx-3 px-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {[...Array(10)].map((_, i) => (
              <FeaturedEventCard key={i} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-4 sm:py-6">
        <div className="container mx-auto px-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-white tracking-wide uppercase">Popüler Restoranlar</h2>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => scrollRestaurants("left")}
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-black border border-white/10 flex items-center justify-center text-white/70 hover:bg-accent-amber hover:text-black hover:border-accent-amber transition-all"
                data-testid="restaurants-scroll-left"
              >
                <ChevronLeft className="w-3 h-3" />
              </button>
              <button 
                onClick={() => scrollRestaurants("right")}
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-black border border-white/10 flex items-center justify-center text-white/70 hover:bg-accent-amber hover:text-black hover:border-accent-amber transition-all"
                data-testid="restaurants-scroll-right"
              >
                <ChevronRight className="w-3 h-3" />
              </button>
              <Link href="/restoranlar">
                <button className="hidden sm:flex items-center gap-0.5 text-white/50 hover:text-accent-amber text-[10px] font-medium transition-all ml-1">
                  Tümü
                  <ChevronRight className="w-2.5 h-2.5" />
                </button>
              </Link>
            </div>
          </div>
          <div 
            ref={restaurantsRef}
            className="flex gap-2.5 overflow-x-auto pb-2 -mx-3 px-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
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

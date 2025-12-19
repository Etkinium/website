import { useState, useRef } from "react";
import { Link } from "wouter";
import Header from "@/components/header";
import HeroCarousel from "@/components/hero-carousel";
import OvalAdBanner from "@/components/oval-ad-banner";
import AdApplicationButton from "@/components/ad-application-button";
import EmailSubscription from "@/components/email-subscription";
import DateDrawer from "@/components/date-drawer";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Calendar, UtensilsCrossed, MapPin, Clock, Star, Heart, ChevronRight, ChevronLeft, CalendarDays } from "lucide-react";
import rezervemLogo from "@assets/{09392C43-F854-4BFE-B0DA-97F11129A06F}_1765451772211.png";
import tamamliyoLogo from "@assets/{A79D2DB2-9549-46FF-9111-672F0B5566FC}_1765452914094.png";
import faturaportLogo from "@assets/download_1765541159072.png";
import etkineumLogo from "@assets/logo-final.png";

const FeaturedEventCard = ({ index }: { index: number }) => (
  <div 
    className="group relative bg-black/60 backdrop-blur-xl rounded-[20px] overflow-hidden border border-white/10 hover:border-accent-amber/40 transition-all duration-500 flex-shrink-0 w-[240px] sm:w-[260px]"
    style={{
      boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)"
    }}
    data-testid={`featured-event-${index}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-accent-amber/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <div className="relative h-28 sm:h-32 bg-gradient-to-br from-purple-900/40 to-gray-900/60">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 rounded-2xl bg-purple-500/20 backdrop-blur-sm flex items-center justify-center border border-purple-400/20">
          <Calendar className="w-6 h-6 text-purple-300" />
        </div>
      </div>
      <div className="absolute top-3 left-3">
        <span className="bg-accent-amber/90 backdrop-blur-sm text-black text-[10px] font-semibold px-2.5 py-1 rounded-full">
          Yakında
        </span>
      </div>
      <button className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-red-400 hover:bg-black/60 transition-all border border-white/10">
        <Heart className="w-3.5 h-3.5" />
      </button>
    </div>
    
    <div className="relative p-4 space-y-2.5">
      <h3 className="font-semibold text-white/90 group-hover:text-white transition-colors line-clamp-1 text-sm">
        Etkinlik Başlığı
      </h3>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-[11px] text-white/50">
          <Calendar className="w-3 h-3 text-accent-amber/70" />
          <span>— — ——</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-white/50">
          <MapPin className="w-3 h-3 text-accent-amber/70" />
          <span className="line-clamp-1">Konum Bilgisi</span>
        </div>
      </div>
      <div className="pt-2.5 border-t border-white/5 flex items-center justify-between">
        <span className="text-accent-amber font-semibold text-base">— ₺</span>
        <Link href="/bilet-al">
          <button className="bg-white/10 hover:bg-accent-amber text-white hover:text-black text-[11px] font-medium px-3.5 py-1.5 rounded-full transition-all backdrop-blur-sm border border-white/10 hover:border-accent-amber">
            Bilet Al
          </button>
        </Link>
      </div>
    </div>
  </div>
);

const FeaturedRestaurantCard = ({ index }: { index: number }) => (
  <div 
    className="group relative bg-black/60 backdrop-blur-xl rounded-[20px] overflow-hidden border border-white/10 hover:border-accent-amber/40 transition-all duration-500 flex-shrink-0 w-[240px] sm:w-[260px]"
    style={{
      boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)"
    }}
    data-testid={`featured-restaurant-${index}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <div className="relative h-28 sm:h-32 bg-gradient-to-br from-amber-900/40 to-gray-900/60">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 backdrop-blur-sm flex items-center justify-center border border-amber-400/20">
          <UtensilsCrossed className="w-6 h-6 text-amber-300" />
        </div>
      </div>
      <div className="absolute top-3 left-3 flex gap-1.5">
        <span className="bg-accent-amber/90 backdrop-blur-sm text-black text-[10px] font-semibold px-2.5 py-1 rounded-full">
          Popüler
        </span>
        <span className="bg-green-500/90 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
          Açık
        </span>
      </div>
      <button className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-red-400 hover:bg-black/60 transition-all border border-white/10">
        <Heart className="w-3.5 h-3.5" />
      </button>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
        <div className="flex items-center gap-1 text-accent-amber text-[11px]">
          <Star className="w-3 h-3 fill-accent-amber" />
          <span className="font-medium">—</span>
        </div>
      </div>
    </div>
    
    <div className="relative p-4 space-y-2.5">
      <h3 className="font-semibold text-white/90 group-hover:text-white transition-colors line-clamp-1 text-sm">
        Restoran Adı
      </h3>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-[11px] text-white/50">
          <MapPin className="w-3 h-3 text-accent-amber/70" />
          <span className="line-clamp-1">Konum Bilgisi</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-white/50">
          <Clock className="w-3 h-3 text-accent-amber/70" />
          <span>—:— - —:—</span>
        </div>
      </div>
      <div className="pt-2.5 border-t border-white/5 flex items-center justify-between">
        <span className="text-accent-amber font-semibold text-base">—— ₺</span>
        <Link href="/restoranlar">
          <button className="bg-white/10 hover:bg-accent-amber text-white hover:text-black text-[11px] font-medium px-3.5 py-1.5 rounded-full transition-all backdrop-blur-sm border border-white/10 hover:border-accent-amber">
            Rezervasyon
          </button>
        </Link>
      </div>
    </div>
  </div>
);

const adPartners = [
  { logo: rezervemLogo, name: "Rezervem" },
  { logo: tamamliyoLogo, name: "Tamamliyo" },
  { logo: faturaportLogo, name: "Faturaport" },
  { logo: etkineumLogo, name: "ETKİNİUM" },
];

export default function Home() {
  const eventsRef = useRef<HTMLDivElement>(null);
  const restaurantsRef = useRef<HTMLDivElement>(null);
  const [isDateDrawerOpen, setIsDateDrawerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const scrollEvents = (direction: "left" | "right") => {
    if (eventsRef.current) {
      const scrollAmount = 280;
      eventsRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const scrollRestaurants = (direction: "left" | "right") => {
    if (restaurantsRef.current) {
      const scrollAmount = 280;
      restaurantsRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <HeroCarousel />
      
      <OvalAdBanner />
      
      <AdApplicationButton />

      <section className="py-6 sm:py-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-accent-amber" />
              <h2 className="text-base sm:text-lg font-semibold text-white/90">Öne Çıkan Etkinlikler</h2>
              <button 
                onClick={() => setIsDateDrawerOpen(true)}
                className="ml-2 w-7 h-7 rounded-lg bg-white/5 hover:bg-accent-amber/20 flex items-center justify-center text-white/60 hover:text-accent-amber transition-all border border-white/10 hover:border-accent-amber/30"
                data-testid="open-date-drawer"
              >
                <CalendarDays className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => scrollEvents("left")}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:bg-accent-amber hover:text-black hover:border-accent-amber transition-all"
                data-testid="events-scroll-left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => scrollEvents("right")}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:bg-accent-amber hover:text-black hover:border-accent-amber transition-all"
                data-testid="events-scroll-right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <Link href="/etkinlikler">
                <button className="hidden sm:flex items-center gap-1 text-white/50 hover:text-accent-amber text-xs font-medium transition-all ml-2">
                  Tümü
                  <ChevronRight className="w-3 h-3" />
                </button>
              </Link>
            </div>
          </div>
          <div 
            ref={eventsRef}
            className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 -mx-4 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {[...Array(8)].map((_, i) => (
              <FeaturedEventCard key={i} index={i} />
            ))}
          </div>
          <div className="mt-4 flex justify-center sm:hidden">
            <Link href="/etkinlikler">
              <button className="text-white/50 hover:text-accent-amber text-xs font-medium flex items-center gap-1 transition-all">
                Tümünü Gör <ChevronRight className="w-3 h-3" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-6 sm:py-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="w-4 h-4 sm:w-5 sm:h-5 text-accent-amber" />
              <h2 className="text-base sm:text-lg font-semibold text-white/90">Popüler Restoranlar</h2>
            </div>
            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => scrollRestaurants("left")}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:bg-accent-amber hover:text-black hover:border-accent-amber transition-all"
                data-testid="restaurants-scroll-left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => scrollRestaurants("right")}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:bg-accent-amber hover:text-black hover:border-accent-amber transition-all"
                data-testid="restaurants-scroll-right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <Link href="/restoranlar">
                <button className="hidden sm:flex items-center gap-1 text-white/50 hover:text-accent-amber text-xs font-medium transition-all ml-2">
                  Tümü
                  <ChevronRight className="w-3 h-3" />
                </button>
              </Link>
            </div>
          </div>
          <div 
            ref={restaurantsRef}
            className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 -mx-4 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {[...Array(8)].map((_, i) => (
              <FeaturedRestaurantCard key={i} index={i} />
            ))}
          </div>
          <div className="mt-4 flex justify-center sm:hidden">
            <Link href="/restoranlar">
              <button className="text-white/50 hover:text-accent-amber text-xs font-medium flex items-center gap-1 transition-all">
                Tümünü Gör <ChevronRight className="w-3 h-3" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div 
            className="relative rounded-[24px] overflow-hidden border border-accent-amber/20"
            style={{
              background: "linear-gradient(135deg, rgba(255,214,0,0.08) 0%, rgba(0,0,0,0.9) 50%, rgba(255,214,0,0.05) 100%)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)"
            }}
          >
            <div className="absolute top-3 right-4">
              <span className="text-[9px] font-medium bg-black/60 text-accent-amber/70 px-2 py-0.5 rounded-md border border-accent-amber/20 tracking-wide uppercase backdrop-blur-sm">
                Reklam Alanı
              </span>
            </div>
            
            <div className="p-6 sm:p-10 md:p-12">
              <div className="text-center mb-8">
                <p className="text-white/40 text-sm mb-2">Premium Reklam Alanı</p>
                <h3 className="text-xl sm:text-2xl font-semibold text-white/80 mb-4">Markanızı Burada Tanıtın</h3>
                <p className="text-white/40 text-sm max-w-md mx-auto">
                  Bu alan markanız için ayrılmıştır. Milyonlarca kullanıcıya ulaşın.
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 opacity-30">
                {adPartners.map((partner, index) => (
                  <img 
                    key={index}
                    src={partner.logo} 
                    alt={partner.name}
                    className="h-8 sm:h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all"
                  />
                ))}
              </div>
              
              <div className="mt-8 flex justify-center">
                <Link href="/contact">
                  <button className="bg-accent-amber/10 hover:bg-accent-amber text-accent-amber hover:text-black text-sm font-medium px-6 py-2.5 rounded-full transition-all border border-accent-amber/30 hover:border-accent-amber backdrop-blur-sm">
                    Reklam Vermek İçin İletişime Geçin
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <EmailSubscription />

      <DateDrawer 
        isOpen={isDateDrawerOpen} 
        onClose={() => setIsDateDrawerOpen(false)}
        onSelectDate={setSelectedDate}
      />

      <Footer />
    </div>
  );
}

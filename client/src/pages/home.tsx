import { useState, useRef } from "react";
import { Link } from "wouter";
import Header from "@/components/header";
import HeroCarousel from "@/components/hero-carousel";
import OvalAdBanner from "@/components/oval-ad-banner";
import AdApplicationButton from "@/components/ad-application-button";
import EmailSubscription from "@/components/email-subscription";
import DateDrawer from "@/components/date-drawer";
import Footer from "@/components/footer";
import { Calendar, UtensilsCrossed, MapPin, Clock, Star, Heart, ChevronRight, ChevronLeft, CalendarDays } from "lucide-react";
import rezervemLogo from "@assets/{09392C43-F854-4BFE-B0DA-97F11129A06F}_1765451772211.png";
import tamamliyoLogo from "@assets/{A79D2DB2-9549-46FF-9111-672F0B5566FC}_1765452914094.png";
import faturaportLogo from "@assets/download_1765541159072.png";
import etkineumLogo from "@assets/logo-final.png";

const cities = [
  { name: "İstanbul", icon: "🏙️" },
  { name: "Ankara", icon: "🏛️" },
  { name: "İzmir", icon: "🌊" },
  { name: "Antalya", icon: "☀️" },
  { name: "Bursa", icon: "🏔️" },
];

const FeaturedEventCard = ({ index }: { index: number }) => (
  <div 
    className="group relative bg-black/60 backdrop-blur-xl rounded-[20px] overflow-hidden border border-white/10 hover:border-accent-amber/40 transition-all duration-500 flex-shrink-0 w-[200px] sm:w-[220px]"
    style={{
      boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)"
    }}
    data-testid={`featured-event-${index}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-accent-amber/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <div className="relative h-24 sm:h-28 bg-gradient-to-br from-purple-900/40 to-gray-900/60">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-10 h-10 rounded-xl bg-purple-500/20 backdrop-blur-sm flex items-center justify-center border border-purple-400/20">
          <Calendar className="w-5 h-5 text-purple-300" />
        </div>
      </div>
      <div className="absolute top-2 left-2">
        <span className="bg-accent-amber/90 backdrop-blur-sm text-black text-[9px] font-semibold px-2 py-0.5 rounded-full">
          Yakında
        </span>
      </div>
      <button className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-red-400 hover:bg-black/60 transition-all border border-white/10">
        <Heart className="w-3 h-3" />
      </button>
    </div>
    
    <div className="relative p-3 space-y-2">
      <h3 className="font-medium text-white/90 group-hover:text-white transition-colors line-clamp-1 text-xs sm:text-sm">
        Etkinlik Başlığı
      </h3>
      <div className="space-y-1">
        <div className="flex items-center gap-1.5 text-[10px] text-white/50">
          <Calendar className="w-2.5 h-2.5 text-accent-amber/70" />
          <span>— — ——</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-white/50">
          <MapPin className="w-2.5 h-2.5 text-accent-amber/70" />
          <span className="line-clamp-1">Konum</span>
        </div>
      </div>
      <div className="pt-2 border-t border-white/5 flex items-center justify-between">
        <span className="text-accent-amber font-semibold text-sm">— ₺</span>
        <Link href="/bilet-al">
          <button className="bg-black hover:bg-accent-amber text-white hover:text-black text-[10px] font-medium px-2.5 py-1 rounded-full transition-all border border-white/10 hover:border-accent-amber">
            Bilet Al
          </button>
        </Link>
      </div>
    </div>
  </div>
);

const FeaturedRestaurantCard = ({ index }: { index: number }) => (
  <div 
    className="group relative bg-black/60 backdrop-blur-xl rounded-[20px] overflow-hidden border border-white/10 hover:border-accent-amber/40 transition-all duration-500 flex-shrink-0 w-[200px] sm:w-[220px]"
    style={{
      boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)"
    }}
    data-testid={`featured-restaurant-${index}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <div className="relative h-24 sm:h-28 bg-gradient-to-br from-amber-900/40 to-gray-900/60">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-10 h-10 rounded-xl bg-amber-500/20 backdrop-blur-sm flex items-center justify-center border border-amber-400/20">
          <UtensilsCrossed className="w-5 h-5 text-amber-300" />
        </div>
      </div>
      <div className="absolute top-2 left-2 flex gap-1">
        <span className="bg-accent-amber/90 backdrop-blur-sm text-black text-[9px] font-semibold px-2 py-0.5 rounded-full">
          Popüler
        </span>
      </div>
      <button className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-red-400 hover:bg-black/60 transition-all border border-white/10">
        <Heart className="w-3 h-3" />
      </button>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
        <div className="flex items-center gap-1 text-accent-amber text-[10px]">
          <Star className="w-2.5 h-2.5 fill-accent-amber" />
          <span className="font-medium">—</span>
        </div>
      </div>
    </div>
    
    <div className="relative p-3 space-y-2">
      <h3 className="font-medium text-white/90 group-hover:text-white transition-colors line-clamp-1 text-xs sm:text-sm">
        Restoran Adı
      </h3>
      <div className="space-y-1">
        <div className="flex items-center gap-1.5 text-[10px] text-white/50">
          <MapPin className="w-2.5 h-2.5 text-accent-amber/70" />
          <span className="line-clamp-1">Konum</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-white/50">
          <Clock className="w-2.5 h-2.5 text-accent-amber/70" />
          <span>—:— - —:—</span>
        </div>
      </div>
      <div className="pt-2 border-t border-white/5 flex items-center justify-between">
        <span className="text-accent-amber font-semibold text-sm">—— ₺</span>
        <Link href="/restoranlar">
          <button className="bg-black hover:bg-accent-amber text-white hover:text-black text-[10px] font-medium px-2.5 py-1 rounded-full transition-all border border-white/10 hover:border-accent-amber">
            Rezerve Et
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
      const scrollAmount = 240;
      eventsRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const scrollRestaurants = (direction: "left" | "right") => {
    if (restaurantsRef.current) {
      const scrollAmount = 240;
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

      <section className="py-6 sm:py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-accent-amber" />
              <h2 className="text-sm sm:text-base font-semibold text-white/90">Öne Çıkan Etkinlikler</h2>
              <button 
                onClick={() => setIsDateDrawerOpen(true)}
                className="ml-1 w-6 h-6 rounded-lg bg-black hover:bg-accent-amber flex items-center justify-center text-white/60 hover:text-black transition-all border border-white/10 hover:border-accent-amber"
                data-testid="open-date-drawer"
              >
                <CalendarDays className="w-3 h-3" />
              </button>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => scrollEvents("left")}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black border border-white/10 flex items-center justify-center text-white/70 hover:bg-accent-amber hover:text-black hover:border-accent-amber transition-all"
                data-testid="events-scroll-left"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => scrollEvents("right")}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black border border-white/10 flex items-center justify-center text-white/70 hover:bg-accent-amber hover:text-black hover:border-accent-amber transition-all"
                data-testid="events-scroll-right"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <Link href="/etkinlikler">
                <button className="hidden sm:flex items-center gap-0.5 text-white/50 hover:text-accent-amber text-[11px] font-medium transition-all ml-1">
                  Tümü
                  <ChevronRight className="w-3 h-3" />
                </button>
              </Link>
            </div>
          </div>
          <div 
            ref={eventsRef}
            className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {[...Array(10)].map((_, i) => (
              <FeaturedEventCard key={i} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-6 sm:py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="w-4 h-4 text-accent-amber" />
              <h2 className="text-sm sm:text-base font-semibold text-white/90">Popüler Restoranlar</h2>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => scrollRestaurants("left")}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black border border-white/10 flex items-center justify-center text-white/70 hover:bg-accent-amber hover:text-black hover:border-accent-amber transition-all"
                data-testid="restaurants-scroll-left"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => scrollRestaurants("right")}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black border border-white/10 flex items-center justify-center text-white/70 hover:bg-accent-amber hover:text-black hover:border-accent-amber transition-all"
                data-testid="restaurants-scroll-right"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <Link href="/restoranlar">
                <button className="hidden sm:flex items-center gap-0.5 text-white/50 hover:text-accent-amber text-[11px] font-medium transition-all ml-1">
                  Tümü
                  <ChevronRight className="w-3 h-3" />
                </button>
              </Link>
            </div>
          </div>
          <div 
            ref={restaurantsRef}
            className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {[...Array(10)].map((_, i) => (
              <FeaturedRestaurantCard key={i} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-6 sm:py-8">
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
            
            <div className="p-6 sm:p-8 md:p-10">
              <div className="text-center mb-6">
                <p className="text-white/40 text-xs mb-2">Premium Reklam Alanı</p>
                <h3 className="text-lg sm:text-xl font-semibold text-white/80 mb-3">Markanızı Burada Tanıtın</h3>
                <p className="text-white/40 text-xs max-w-sm mx-auto">
                  Bu alan markanız için ayrılmıştır. Milyonlarca kullanıcıya ulaşın.
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 opacity-30">
                {adPartners.map((partner, index) => (
                  <img 
                    key={index}
                    src={partner.logo} 
                    alt={partner.name}
                    className="h-6 sm:h-8 w-auto object-contain grayscale hover:grayscale-0 transition-all"
                  />
                ))}
              </div>
              
              <div className="mt-6 flex justify-center">
                <Link href="/contact">
                  <button className="bg-black hover:bg-accent-amber text-white hover:text-black text-xs font-medium px-5 py-2 rounded-full transition-all border border-white/10 hover:border-accent-amber">
                    Reklam Vermek İçin İletişime Geçin
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 sm:py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-5">
            <h2 className="text-sm sm:text-base font-semibold text-white/90 mb-2">Popüler Şehirler</h2>
            <p className="text-[11px] text-white/40">Türkiye'nin en popüler şehirlerinde etkinlik ve restoranları keşfedin</p>
          </div>
          <div className="grid grid-cols-5 gap-2 sm:gap-4">
            {cities.map((city, index) => (
              <Link key={city.name} href={`/etkinlikler?city=${city.name}`}>
                <div 
                  className="group relative bg-black/60 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10 hover:border-accent-amber/40 transition-all text-center cursor-pointer"
                  style={{
                    boxShadow: "0 4px 16px rgba(0,0,0,0.3)"
                  }}
                  data-testid={`city-${city.name.toLowerCase()}`}
                >
                  <div className="text-xl sm:text-2xl mb-1 sm:mb-2">{city.icon}</div>
                  <p className="text-[10px] sm:text-xs font-medium text-white/70 group-hover:text-accent-amber transition-colors">{city.name}</p>
                </div>
              </Link>
            ))}
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

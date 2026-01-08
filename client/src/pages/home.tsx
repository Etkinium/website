import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import Header from "@/components/header";
import DateDrawer from "@/components/date-drawer";
import MobileTabBar from "@/components/mobile-tab-bar";
import Footer from "@/components/footer";
import { MapPin, Clock, Star, Heart, ChevronRight, ChevronLeft, CalendarDays, Sparkles, Mail, ArrowRight, Ticket, Utensils } from "lucide-react";
import etkineumLogo from "@assets/logo-final.png";
import rezervemLogo from "@assets/{09392C43-F854-4BFE-B0DA-97F11129A06F}_1765451772211.png";
import tamamliyoLogo from "@assets/{A79D2DB2-9549-46FF-9111-672F0B5566FC}_1765452914094.png";
import faturaportLogo from "@assets/download_1765541159072.png";

const FeaturedEventCard = ({ index }: { index: number }) => (
  <div 
    className="group relative bg-black/60 backdrop-blur-xl rounded-[16px] sm:rounded-[20px] overflow-hidden border border-white/10 hover:border-accent-amber/40 transition-all duration-500 flex-shrink-0 w-[180px] sm:w-[200px]"
    style={{
      boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)"
    }}
    data-testid={`featured-event-${index}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-accent-amber/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <div className="relative h-24 sm:h-28 bg-gradient-to-br from-purple-900/40 to-gray-900/60">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-500/20 backdrop-blur-sm flex items-center justify-center border border-purple-400/20">
          <CalendarDays className="w-5 h-5 sm:w-6 sm:h-6 text-purple-300" />
        </div>
      </div>
      <div className="absolute top-2 left-2">
        <span className="bg-accent-amber/90 backdrop-blur-sm text-black text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-full">
          Yakında
        </span>
      </div>
      <button className="absolute top-2 right-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-red-400 hover:bg-black/60 transition-all border border-white/10">
        <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
      </button>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
        <div className="flex items-center gap-1 text-accent-amber text-[10px]">
          <Star className="w-2.5 h-2.5 fill-accent-amber" />
          <span className="font-medium">—</span>
        </div>
      </div>
    </div>
    
    <div className="relative p-3 sm:p-4 space-y-2">
      <h3 className="font-medium text-white/90 group-hover:text-white transition-colors line-clamp-1 text-xs sm:text-sm">
        Etkinlik Başlığı
      </h3>
      <div className="space-y-1">
        <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-white/50">
          <CalendarDays className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-accent-amber/70 flex-shrink-0" />
          <span>— — ——</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-white/50">
          <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-accent-amber/70 flex-shrink-0" />
          <span className="line-clamp-1">Konum</span>
        </div>
      </div>
      <div className="pt-2 border-t border-white/5 flex items-center justify-between">
        <div>
          <p className="text-[9px] text-white/40">Başlangıç</p>
          <p className="text-sm font-semibold text-accent-amber">— ₺</p>
        </div>
        <Link href="/bilet-detay">
          <button className="bg-black hover:bg-accent-amber text-white hover:text-black text-[10px] sm:text-[11px] font-medium px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full transition-all border border-white/10 hover:border-accent-amber flex items-center gap-0.5">
            Bilet Al
            <ChevronRight className="w-3 h-3" />
          </button>
        </Link>
      </div>
    </div>
  </div>
);

const billboardAds = [
  {
    id: 1,
    logo: tamamliyoLogo,
    brand: "Tamamliyo",
    slogan: "SİGORTAYI DİJİTALE KOLAYCA ENTEGRE EDİN!"
  },
  {
    id: 2,
    logo: faturaportLogo,
    brand: "Faturaport",
    slogan: "E-FATURA'NIN MOBİLİ!"
  },
  {
    id: 3,
    logo: rezervemLogo,
    brand: "Rezervem",
    slogan: "MİSAFİRPERVERLİĞİN GELECEĞİ!"
  }
];

const BillboardAdSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % billboardAds.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      className="relative h-[130px] sm:h-[150px] rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(125deg, hsl(0,0%,98%) 0%, hsl(45,30%,92%) 25%, hsl(38,60%,75%) 50%, hsl(35,50%,45%) 70%, hsl(30,30%,15%) 90%, hsl(0,0%,6%) 100%)",
        boxShadow: "0 15px 60px rgba(0,0,0,0.35), inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -2px 8px rgba(0,0,0,0.2)"
      }}
      data-testid="billboard-ad-slider"
    >
      {/* Matte Finish Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 30%, transparent 50%, rgba(0,0,0,0.1) 80%, rgba(0,0,0,0.2) 100%)",
          mixBlendMode: "soft-light"
        }}
      />
      
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {billboardAds.map((ad, index) => {
          const isActive = index === currentIndex;
          const isPrev = index === (currentIndex - 1 + billboardAds.length) % billboardAds.length;
          
          return (
            <div
              key={ad.id}
              className="absolute inset-0 flex items-center justify-between px-8 sm:px-16 transition-all duration-1000 ease-out"
              style={{
                transform: isActive 
                  ? "translateX(0)" 
                  : isPrev 
                    ? "translateX(-100%)" 
                    : "translateX(100%)",
                opacity: isActive ? 1 : 0
              }}
            >
              {/* Logo Container */}
              <div 
                className="flex items-center justify-center rounded-xl px-4 py-3"
                style={{
                  background: "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(8px)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
                }}
              >
                <img 
                  src={ad.logo} 
                  alt={ad.brand}
                  className="h-12 sm:h-16 md:h-20 w-auto object-contain max-w-[180px] sm:max-w-[240px]"
                />
              </div>
              
              {/* Slogan */}
              <div className="flex-1 flex items-center justify-end pl-6 sm:pl-10">
                <p 
                  className="text-white text-base sm:text-xl md:text-2xl lg:text-3xl font-black tracking-tight leading-tight text-right"
                  style={{ 
                    textShadow: "0 2px 15px rgba(0,0,0,0.4)",
                    letterSpacing: "-0.01em"
                  }}
                >
                  {ad.slogan}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {billboardAds.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-500 rounded-full ${
              index === currentIndex 
                ? "w-8 h-2 bg-white" 
                : "w-2 h-2 bg-white/50 hover:bg-white/70"
            }`}
            style={{ boxShadow: index === currentIndex ? "0 0 12px rgba(255,255,255,0.6)" : "none" }}
            data-testid={`billboard-indicator-${index}`}
          />
        ))}
      </div>
      
      {/* Top Edge Shine */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
    </div>
  );
};

const FeaturedRestaurantCard = ({ index }: { index: number }) => (
  <div 
    className="group relative bg-black/60 backdrop-blur-xl rounded-[16px] sm:rounded-[20px] overflow-hidden border border-white/10 hover:border-accent-amber/40 transition-all duration-500 flex-shrink-0 w-[180px] sm:w-[200px]"
    style={{
      boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)"
    }}
    data-testid={`featured-restaurant-${index}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-accent-amber/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <div className="relative h-24 sm:h-28 bg-gradient-to-br from-orange-900/40 to-gray-900/60">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-orange-500/20 backdrop-blur-sm flex items-center justify-center border border-orange-400/20">
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-orange-300" />
        </div>
      </div>
      <div className="absolute top-2 left-2">
        <span className="bg-accent-amber/90 backdrop-blur-sm text-black text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-full">
          Popüler
        </span>
      </div>
      <button className="absolute top-2 right-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-red-400 hover:bg-black/60 transition-all border border-white/10">
        <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
      </button>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
        <div className="flex items-center gap-1 text-accent-amber text-[10px]">
          <Star className="w-2.5 h-2.5 fill-accent-amber" />
          <span className="font-medium">—</span>
        </div>
      </div>
    </div>
    
    <div className="relative p-3 sm:p-4 space-y-2">
      <h3 className="font-medium text-white/90 group-hover:text-white transition-colors line-clamp-1 text-xs sm:text-sm">
        Restoran Adı
      </h3>
      <div className="space-y-1">
        <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-white/50">
          <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-accent-amber/70 flex-shrink-0" />
          <span className="line-clamp-1">Konum</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-white/50">
          <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-accent-amber/70 flex-shrink-0" />
          <span>—:— - —:—</span>
        </div>
      </div>
      <div className="pt-2 border-t border-white/5 flex items-center justify-between">
        <div>
          <p className="text-[9px] text-white/40">Ortalama</p>
          <p className="text-sm font-semibold text-accent-amber">—— ₺</p>
        </div>
        <Link href="/restoran-detay">
          <button className="bg-black hover:bg-accent-amber text-white hover:text-black text-[10px] sm:text-[11px] font-medium px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full transition-all border border-white/10 hover:border-accent-amber flex items-center gap-0.5">
            Rezerve Et
            <ChevronRight className="w-3 h-3" />
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
      
      {/* Cinematic Hero Section */}
      <section className="relative min-h-[85vh] md:min-h-[90vh] overflow-hidden mt-16">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-950 to-black">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: "2s" }} />
          </div>
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E\")"
            }}
          />
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left - Hero Text */}
            <div className="text-center md:text-left space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
                Tek Platform,<br />
                <span className="bg-gradient-to-r from-accent-amber via-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Sonsuz Sanat.
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/60 max-w-lg mx-auto md:mx-0">
                Konserlerden tiyatrolara, lüks restoranlardan özel etkinliklere — hayalinizdeki anlar bir tık uzağınızda.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="/etkinlikler">
                  <button 
                    className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 bg-gradient-to-r from-accent-amber to-yellow-500 hover:from-white hover:to-white text-black"
                    style={{ boxShadow: "0 8px 30px rgba(245,158,11,0.4)" }}
                    data-testid="hero-cta-events"
                  >
                    <Ticket className="w-5 h-5" />
                    Etkinlikleri Keşfet
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/restoranlar">
                  <button 
                    className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-white/40"
                    data-testid="hero-cta-restaurants"
                  >
                    <Utensils className="w-5 h-5" />
                    Restoranları Gör
                  </button>
                </Link>
              </div>

            </div>

            {/* Right - Premium Visual */}
            <div className="relative hidden md:block">
              <div className="relative w-full max-w-md mx-auto">
                {/* Main Visual Container */}
                <div 
                  className="relative w-[420px] h-[520px] rounded-[40px] overflow-hidden"
                  style={{
                    background: "radial-gradient(circle at 30% 20%, rgba(245,158,11,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(234,88,12,0.25) 0%, transparent 45%), linear-gradient(160deg, rgba(15,15,15,0.98) 0%, rgba(30,20,10,0.9) 50%, rgba(10,10,10,0.98) 100%)",
                    boxShadow: "0 50px 100px -30px rgba(0,0,0,0.7), 0 0 80px rgba(245,158,11,0.15), inset 0 1px 0 rgba(255,255,255,0.08)"
                  }}
                >
                  {/* Ambient Glow */}
                  <div 
                    className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full"
                    style={{
                      background: "radial-gradient(circle, rgba(245,158,11,0.35) 0%, transparent 70%)",
                      filter: "blur(60px)"
                    }}
                  />
                  
                  {/* Glass Card */}
                  <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-80 rounded-3xl p-6 flex flex-col items-center justify-center"
                    style={{
                      background: "linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      boxShadow: "0 25px 60px -15px rgba(0,0,0,0.5)"
                    }}
                  >
                    {/* Logo */}
                    <div 
                      className="w-24 h-24 rounded-2xl flex items-center justify-center mb-6"
                      style={{
                        background: "linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(234,88,12,0.1) 100%)",
                        border: "1px solid rgba(245,158,11,0.3)",
                        boxShadow: "0 0 40px rgba(245,158,11,0.25)"
                      }}
                    >
                      <img src={etkineumLogo} alt="ETKİNİUM" className="w-16 h-16 object-contain" />
                    </div>
                    
                    {/* Brand Name */}
                    <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">ETKİNİUM</h3>
                    <p className="text-accent-amber text-sm font-medium mb-6 tracking-wider">EXCLUSIVE EXPERIENCES</p>
                    
                    {/* Feature Pills */}
                    <div className="flex flex-wrap gap-2 justify-center">
                      <span className="px-3 py-1.5 rounded-full text-xs font-medium text-white/80 bg-white/5 border border-white/10">Konserler</span>
                      <span className="px-3 py-1.5 rounded-full text-xs font-medium text-white/80 bg-white/5 border border-white/10">Restoranlar</span>
                      <span className="px-3 py-1.5 rounded-full text-xs font-medium text-white/80 bg-white/5 border border-white/10">Tiyatrolar</span>
                    </div>
                  </div>
                  
                  {/* Shimmer Effect */}
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 55%, transparent 60%)",
                      backgroundSize: "200% 100%",
                      animation: "shimmer 6s ease-in-out infinite"
                    }}
                  />
                  
                  {/* Corner Accents */}
                  <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-accent-amber/30 rounded-tr-xl" />
                  <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-accent-amber/30 rounded-bl-xl" />
                </div>
              </div>
              
              <style>{`
                @keyframes shimmer {
                  0% { background-position: 200% 0; }
                  100% { background-position: -200% 0; }
                }
              `}</style>
            </div>
          </div>
        </div>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </section>

      {/* Billboard Ad Slider */}
      <section className="py-6 sm:py-8">
        <div className="container mx-auto px-4">
          <BillboardAdSlider />
        </div>
      </section>

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
                    Öne Çıkan <span className="text-amber-400">Etkinlikler</span>
                  </h2>
                </div>
                <p className="text-xs text-neutral-500 ml-3 mt-1 hidden sm:block">Sizin için seçilmiş en iyi etkinlikler</p>
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
                  Öne Çıkan <span className="text-amber-400">Restoranlar</span>
                </h2>
              </div>
              <p className="text-xs text-neutral-500 ml-3 mt-1 hidden sm:block">En iyi lezzet deneyimleri için seçilmiş mekanlar</p>
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
              
              <div className="grid grid-cols-3 gap-3">
                {["Webrazzi", "Shiftdelete", "Courline"].map((media, index) => (
                  <div 
                    key={index}
                    className="bg-white/5 rounded-xl p-3 text-center border border-white/5 hover:bg-accent-amber hover:border-accent-amber transition-all duration-300 cursor-pointer group"
                  >
                    <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-white/10 group-hover:bg-black/20 flex items-center justify-center transition-all">
                      <span className="text-[10px] font-bold text-white/60 group-hover:text-black">{media[0]}</span>
                    </div>
                    <p className="text-[10px] text-white/50 font-medium group-hover:text-black transition-all">{media}</p>
                    <p className="text-[8px] text-white/30 mt-0.5 group-hover:text-black/60 transition-all">Yakında</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div 
            className="relative rounded-3xl overflow-hidden p-6 sm:p-10"
            style={{
              background: "linear-gradient(135deg, rgba(13,13,13,0.98) 0%, rgba(20,20,20,0.95) 100%)",
              border: "1px solid rgba(245,158,11,0.2)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 80px rgba(245,158,11,0.05)"
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
            
            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-3 mb-3">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
                      boxShadow: "0 4px 20px rgba(245,158,11,0.4)"
                    }}
                  >
                    <Mail className="w-5 h-5 text-black" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Fırsatları <span className="text-amber-400">Kaçırmayın</span>
                  </h3>
                </div>
                <p className="text-neutral-400 text-sm max-w-md">
                  En yeni etkinlikler, özel indirimler ve kampanyalardan ilk siz haberdar olun
                </p>
              </div>
              
              <div className="w-full sm:w-auto">
                <div className="flex gap-2">
                  <input 
                    type="email"
                    placeholder="E-posta adresiniz"
                    className="flex-1 sm:w-64 px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder:text-neutral-500 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
                    data-testid="input-newsletter-email"
                  />
                  <button 
                    className="px-5 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all hover:scale-105 bg-gradient-to-r from-accent-amber/90 to-yellow-500 hover:from-accent-amber hover:to-yellow-400 text-black shadow-lg shadow-accent-amber/20"
                    data-testid="button-newsletter-subscribe"
                  >
                    Abone Ol
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
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

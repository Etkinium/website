import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import Header from "@/components/header";
import HeroCarousel from "@/components/hero-carousel";
import OvalAdBanner from "@/components/oval-ad-banner";
import DateDrawer from "@/components/date-drawer";
import MobileTabBar from "@/components/mobile-tab-bar";
import Footer from "@/components/footer";
import { MapPin, Clock, Star, Heart, ChevronRight, ChevronLeft, CalendarDays, Sparkles, Mail, ArrowRight } from "lucide-react";

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

const adSlides = [
  {
    id: 1,
    title: "Unutulmaz Etkinlikler",
    subtitle: "Konserler, Festivaller, Tiyatrolar",
    description: "En popüler etkinliklerin biletlerini hemen alın",
    accent: "from-purple-500/30 via-violet-500/20 to-fuchsia-500/30",
    glowColor: "rgba(139,92,246,0.15)",
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&q=80",
    link: "/etkinlikler",
    buttonText: "Etkinlikleri Keşfet"
  },
  {
    id: 2,
    title: "Lezzet Durağı",
    subtitle: "En İyi Restoranlar, Özel Menüler",
    description: "Şehrin en seçkin restoranlarında masa ayırtın",
    accent: "from-orange-500/30 via-amber-500/20 to-yellow-500/30",
    glowColor: "rgba(249,115,22,0.15)",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    link: "/restoranlar",
    buttonText: "Restoranları Keşfet"
  },
  {
    id: 3,
    title: "Reklam Alanı",
    subtitle: "Markanızı Burada Tanıtın",
    description: "Premium reklam alanları için bizimle iletişime geçin",
    accent: "from-amber-500/30 via-orange-500/20 to-yellow-500/30",
    glowColor: "rgba(245,158,11,0.15)",
    image: null,
    link: null,
    buttonText: "İletişime Geçin"
  }
];

const PremiumAdSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % adSlides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      className="relative rounded-[28px] sm:rounded-[32px] overflow-hidden"
      style={{
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
        border: "1px solid rgba(255,255,255,0.15)",
        boxShadow: "0 25px 80px -12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.3)"
      }}
      data-testid="premium-ad-slider"
    >
      {/* Slides Container */}
      <div 
        className="flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {adSlides.map((slide, index) => (
          <div 
            key={slide.id}
            className="w-full flex-shrink-0 relative min-h-[280px] sm:min-h-[320px]"
          >
            {/* Background Image */}
            {slide.image && (
              <div className="absolute inset-0">
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
              </div>
            )}
            
            {/* Animated gradient background */}
            <div 
              className={`absolute inset-0 bg-gradient-to-br ${slide.accent} opacity-60`}
            />
            
            {/* Frosted glass layers */}
            <div 
              className="absolute inset-0"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.15) 100%)"
              }}
            />
            
            {/* Content */}
            <div className="relative p-8 sm:p-12 md:p-16 h-full flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Left Content */}
              <div className="flex-1 text-center md:text-left">
                <div 
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.15)"
                  }}
                >
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-white/80 text-xs font-medium tracking-wide">ETKİNİUM</span>
                </div>
                
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
                  {slide.title}
                </h2>
                <p className="text-lg sm:text-xl text-white/90 font-medium mb-3">
                  {slide.subtitle}
                </p>
                <p className="text-white/50 text-sm sm:text-base max-w-md mb-6">
                  {slide.description}
                </p>
                
                {slide.link ? (
                  <Link href={slide.link}>
                    <button
                      className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-r from-accent-amber to-yellow-500 hover:from-white hover:to-white text-black"
                      style={{
                        boxShadow: "0 8px 30px rgba(245,158,11,0.3), 0 0 40px rgba(245,158,11,0.1)"
                      }}
                    >
                      <Sparkles className="w-4 h-4" />
                      {slide.buttonText}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                ) : (
                  <a 
                    href="mailto:iletisim@etkinium.com?subject=Reklam%20Başvurusu"
                    className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-r from-accent-amber to-yellow-500 hover:from-white hover:to-white text-black"
                    style={{
                      boxShadow: "0 8px 30px rgba(245,158,11,0.3), 0 0 40px rgba(245,158,11,0.1)"
                    }}
                  >
                    <Sparkles className="w-4 h-4" />
                    {slide.buttonText}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                )}
              </div>
              
              {/* Right Visual Element - Only for ad slide (no image) */}
              {!slide.image && (
                <div className="flex-shrink-0 hidden md:flex flex-col items-center gap-4">
                  <div 
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl flex items-center justify-center bg-gradient-to-br from-accent-amber to-orange-500"
                    style={{
                      boxShadow: "0 20px 60px rgba(245,158,11,0.3), inset 0 1px 0 rgba(255,255,255,0.3)"
                    }}
                  >
                    <span className="text-black text-3xl sm:text-4xl font-black tracking-tight">E</span>
                  </div>
                  <div className="text-center">
                    <p className="text-white text-xl font-bold tracking-wide">ETKİNİUM</p>
                    <p className="text-accent-amber text-xs font-medium mt-1">Tek Platform, Sonsuz Deneyim</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Top edge highlight */}
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      
      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {adSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-500 rounded-full ${
              index === currentSlide 
                ? "w-10 h-2.5 bg-white" 
                : "w-2.5 h-2.5 bg-white/30 hover:bg-white/50"
            }`}
            data-testid={`ad-slide-indicator-${index}`}
          />
        ))}
      </div>
      
      {/* Bottom edge reflection */}
      <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
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

      {/* Premium Apple-Style Glassmorphism Ad Slider */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <PremiumAdSlider />
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

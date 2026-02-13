import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import Header from "@/components/header";
import DateDrawer from "@/components/date-drawer";
import MobileTabBar from "@/components/mobile-tab-bar";
import Footer from "@/components/footer";
import { MapPin, Clock, Star, Heart, ChevronRight, ChevronLeft, CalendarDays, Sparkles, ArrowRight, Ticket, Utensils, Gift, Trophy, Megaphone, Eye, ExternalLink } from "lucide-react";
import Stories from "@/components/stories";
import etkineumLogo from "@assets/logo-final.png";
import rezervemLogo from "@assets/{09392C43-F854-4BFE-B0DA-97F11129A06F}_1765451772211.png";
import tamamliyoLogo from "@assets/{A79D2DB2-9549-46FF-9111-672F0B5566FC}_1765452914094.png";
import faturaportLogo from "@assets/download_1765541159072.png";

const promoSlides = [
  {
    icon: Gift,
    badge: "Haftalık Çark",
    title: "Üye Ol, Haftalık Çark Çevir!",
    description: "Her hafta çarkı çevir, sürpriz ödüller kazan",
    cta: "Hemen Üye Ol",
    ctaLink: "/signup",
    gradient: "from-purple-900/30 via-black to-accent-amber/10",
    accentColor: "purple-400",
  },
  {
    icon: Trophy,
    badge: "Hoş Geldin Bonusu",
    title: "Üye Ol, 100 Etkinium Puan Kazan!",
    description: "Hemen kaydol, anında 100 puan hesabına yüklensin",
    cta: "Üye Ol & Kazan",
    ctaLink: "/signup",
    gradient: "from-accent-amber/20 via-black to-emerald-900/20",
    accentColor: "accent-amber",
  },
  {
    icon: Megaphone,
    badge: "Reklam Alanı",
    title: "Markanızı Burada Tanıtın!",
    description: "Premium reklam alanı ile hedef kitlenize ulaşın",
    cta: "İletişime Geçin",
    ctaLink: "mailto:iletisim@etkinium.com",
    gradient: "from-blue-900/20 via-black to-cyan-900/10",
    accentColor: "blue-400",
  },
];

const PromoSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promoSlides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const slide = promoSlides[currentSlide];
  const SlideIcon = slide.icon;

  return (
    <section className="py-4 sm:py-6">
      <div className="container mx-auto px-3">
        <div 
          className="relative rounded-2xl overflow-hidden cursor-pointer"
          style={{
            background: "linear-gradient(180deg, #0a0a0a 0%, #0d0d0d 50%, #080808 100%)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)"
          }}
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} transition-all duration-1000`} />
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.03) 0%, transparent 60%)" }}
          />
          
          <div className="relative p-6 sm:p-8 md:p-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/[0.07] backdrop-blur-sm flex items-center justify-center border border-white/10 flex-shrink-0">
              <SlideIcon className="w-8 h-8 sm:w-10 sm:h-10 text-accent-amber" />
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <span className="inline-block bg-accent-amber/20 text-accent-amber text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2 tracking-wide uppercase">
                {slide.badge}
              </span>
              <h3 
                className="text-lg sm:text-2xl md:text-3xl font-bold text-white tracking-tight mb-1.5"
                style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" }}
              >
                {slide.title}
              </h3>
              <p className="text-white/40 text-xs sm:text-sm max-w-lg">
                {slide.description}
              </p>
            </div>

            <div className="flex-shrink-0">
              {slide.ctaLink.startsWith("mailto") ? (
                <a 
                  href={slide.ctaLink}
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold bg-accent-amber hover:bg-yellow-400 text-black transition-all hover:scale-105 shadow-lg shadow-accent-amber/20"
                >
                  {slide.cta}
                  <ArrowRight className="w-4 h-4" />
                </a>
              ) : (
                <Link href={slide.ctaLink}>
                  <span className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold bg-accent-amber hover:bg-yellow-400 text-black transition-all hover:scale-105 shadow-lg shadow-accent-amber/20">
                    {slide.cta}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              )}
            </div>
          </div>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {promoSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === currentSlide 
                    ? "w-6 bg-accent-amber" 
                    : "w-1.5 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const VENUE_DATA = [
  { name: "Zorlu PSM", location: "Beşiktaş, İstanbul", capacity: "2.993", type: "Konser & Tiyatro", slug: "zorlu-psm" },
  { name: "Volkswagen Arena", location: "Maslak, İstanbul", capacity: "5.000", type: "Konser & Etkinlik", slug: "volkswagen-arena" },
  { name: "Küçükçiftlik Park", location: "Maçka, İstanbul", capacity: "12.000", type: "Açık Hava", slug: "kucukciftlik-park" },
  { name: "IF Performance Hall", location: "Beşiktaş, İstanbul", capacity: "1.200", type: "Konser", slug: "if-performance-hall" },
  { name: "Bostancı Gösteri Merkezi", location: "Kadıköy, İstanbul", capacity: "2.500", type: "Konser & Tiyatro", slug: "bostanci-gosteri" },
  { name: "Congresium", location: "Söğütözü, Ankara", capacity: "6.000", type: "Kongre & Konser", slug: "congresium" },
  { name: "Jolly Joker", location: "Beyoğlu, İstanbul", capacity: "1.500", type: "Konser", slug: "jolly-joker" },
  { name: "MEB Şura Salonu", location: "Çankaya, Ankara", capacity: "3.200", type: "Konser & Tiyatro", slug: "meb-sura-salonu" },
  { name: "Harbiye Açıkhava", location: "Harbiye, İstanbul", capacity: "4.234", type: "Açık Hava", slug: "harbiye-acikhava" },
  { name: "Ülker Sports Arena", location: "Kadıköy, İstanbul", capacity: "13.800", type: "Spor & Konser", slug: "ulker-sports-arena" },
  { name: "Beşiktaş Kültür Merkezi", location: "Beşiktaş, İstanbul", capacity: "800", type: "Tiyatro", slug: "besiktas-kultur" },
  { name: "Uniq Hall", location: "Maslak, İstanbul", capacity: "3.000", type: "Konser", slug: "uniq-hall" },
  { name: "Babylon", location: "Beyoğlu, İstanbul", capacity: "900", type: "Konser", slug: "babylon" },
  { name: "MODA Sahnesi", location: "Kadıköy, İstanbul", capacity: "650", type: "Konser & Tiyatro", slug: "moda-sahnesi" },
];

const VenueSection = () => {
  const [venuePage, setVenuePage] = useState(0);
  const itemsPerPage = 7;
  const totalPages = Math.ceil(VENUE_DATA.length / itemsPerPage);
  const currentVenues = VENUE_DATA.slice(venuePage * itemsPerPage, (venuePage + 1) * itemsPerPage);

  return (
    <section className="py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div 
              className="w-1 h-6 rounded-full"
              style={{ background: "linear-gradient(180deg, #F59E0B 0%, #D97706 100%)" }}
            />
            <h2 className="text-base sm:text-xl font-bold text-white tracking-tight">
              Öne Çıkan <span className="text-amber-400">Mekanlar</span>
            </h2>
            <p className="text-xs text-neutral-500 ml-2 hidden sm:block">Türkiye'nin en popüler etkinlik mekanları</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setVenuePage((p) => Math.max(0, p - 1))}
              disabled={venuePage === 0}
              className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={() => setVenuePage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={venuePage >= totalPages - 1}
              className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 sm:gap-4">
          {currentVenues.map((venue, index) => (
            <div 
              key={`${venuePage}-${index}`}
              className="group relative bg-black/60 backdrop-blur-xl rounded-[16px] sm:rounded-[20px] overflow-hidden border border-white/10 hover:border-accent-amber/40 transition-all duration-500"
              style={{
                boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)"
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent-amber/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative h-20 sm:h-24 bg-gradient-to-br from-neutral-900 to-neutral-950">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-accent-amber/10 backdrop-blur-sm flex items-center justify-center border border-accent-amber/20 group-hover:bg-accent-amber/20 transition-all">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-accent-amber" />
                  </div>
                </div>
                <div className="absolute top-2 left-2">
                  <span className="bg-accent-amber/90 backdrop-blur-sm text-black text-[8px] sm:text-[9px] font-semibold px-1.5 py-0.5 rounded-full">
                    {venue.type}
                  </span>
                </div>
              </div>

              <div className="relative p-3 sm:p-4 space-y-1.5">
                <h3 className="font-semibold text-white/90 group-hover:text-white transition-colors text-xs sm:text-sm line-clamp-1">
                  {venue.name}
                </h3>
                <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-white/50">
                  <MapPin className="w-2.5 h-2.5 text-accent-amber/70 flex-shrink-0" />
                  <span className="line-clamp-1">{venue.location}</span>
                </div>
                <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-[8px] sm:text-[9px] text-white/30">Kapasite</p>
                    <p className="text-xs font-semibold text-white/70">{venue.capacity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] sm:text-[9px] text-white/30">Puan</p>
                    <div className="flex items-center gap-0.5">
                      <Star className="w-2.5 h-2.5 fill-accent-amber text-accent-amber" />
                      <span className="text-xs font-semibold text-accent-amber">—</span>
                    </div>
                  </div>
                </div>
                <Link href={`/mekan/${venue.slug}`}>
                  <button className="w-full mt-2 py-1.5 rounded-lg bg-accent-amber/10 hover:bg-accent-amber text-accent-amber hover:text-black text-[10px] sm:text-xs font-semibold transition-all border border-accent-amber/20 hover:border-accent-amber flex items-center justify-center gap-1">
                    <Eye className="w-3 h-3" />
                    İncele
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 mt-4">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setVenuePage(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === venuePage ? "w-5 bg-accent-amber" : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

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
      className="relative h-[100px] sm:h-[130px] md:h-[150px] rounded-xl sm:rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(125deg, hsl(0,0%,98%) 0%, hsl(45,30%,92%) 25%, hsl(38,60%,75%) 50%, hsl(35,50%,45%) 70%, hsl(30,30%,15%) 90%, hsl(0,0%,6%) 100%)",
        boxShadow: "0 10px 40px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -2px 8px rgba(0,0,0,0.2)"
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
              className="absolute inset-0 flex items-center justify-between px-4 sm:px-8 md:px-16 transition-all duration-1000 ease-out"
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
                className="flex items-center justify-center rounded-lg sm:rounded-xl px-2 sm:px-4 py-2 sm:py-3 flex-shrink-0"
                style={{
                  background: "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(8px)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
                }}
              >
                <img 
                  src={ad.logo} 
                  alt={ad.brand}
                  className="h-8 sm:h-12 md:h-16 lg:h-20 w-auto object-contain max-w-[100px] sm:max-w-[160px] md:max-w-[200px] lg:max-w-[240px]"
                />
              </div>
              
              {/* Slogan */}
              <div className="flex-1 flex items-center justify-end pl-3 sm:pl-6 md:pl-10">
                <p 
                  className="text-white text-xs sm:text-base md:text-xl lg:text-2xl xl:text-3xl font-black tracking-tight leading-tight text-right"
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
      <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2 z-10">
        {billboardAds.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-500 rounded-full ${
              index === currentIndex 
                ? "w-6 sm:w-8 h-1.5 sm:h-2 bg-white" 
                : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/50 hover:bg-white/70"
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
      <section className="relative min-h-[70vh] sm:min-h-[80vh] md:min-h-[90vh] overflow-hidden mt-14 sm:mt-16">
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
              <div className="flex flex-col items-center md:items-start gap-4">
                <img 
                  src={etkineumLogo} 
                  alt="ETKİNİUM" 
                  className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 object-contain drop-shadow-[0_0_30px_rgba(245,158,11,0.3)]" 
                />
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
                  Türkiye'nin En Kapsamlı{" "}
                  <span className="bg-gradient-to-r from-accent-amber via-yellow-400 to-orange-500 bg-clip-text text-transparent">
                    Etkinlik Platformu!
                  </span>
                </h1>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start px-4 sm:px-0">
                <Link href="/etkinlikler">
                  <button 
                    className="group flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base transition-all duration-300 hover:scale-105 bg-gradient-to-r from-accent-amber to-yellow-500 hover:from-white hover:to-white text-black"
                    style={{ boxShadow: "0 8px 30px rgba(245,158,11,0.4)" }}
                    data-testid="hero-cta-events"
                  >
                    <Ticket className="w-4 h-4 sm:w-5 sm:h-5" />
                    Etkinlikleri Keşfet
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/restoranlar">
                  <button 
                    className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base transition-all duration-300 hover:scale-105 bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-white/40"
                    data-testid="hero-cta-restaurants"
                  >
                    <Utensils className="w-4 h-4 sm:w-5 sm:h-5" />
                    Restoranları Gör
                  </button>
                </Link>
              </div>

            </div>

            {/* Right - Premium Visual (Mobile) */}
            <div className="relative md:hidden flex justify-center mt-6">
              <div 
                className="relative w-48 h-56 rounded-2xl overflow-hidden"
                style={{
                  background: "radial-gradient(circle at 30% 20%, rgba(245,158,11,0.3) 0%, transparent 50%), linear-gradient(160deg, rgba(15,15,15,0.98) 0%, rgba(30,20,10,0.9) 50%, rgba(10,10,10,0.98) 100%)",
                  boxShadow: "0 20px 50px -15px rgba(0,0,0,0.6), 0 0 40px rgba(245,158,11,0.1)"
                }}
              >
                <div 
                  className="absolute top-1/4 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(245,158,11,0.3) 0%, transparent 70%)",
                    filter: "blur(30px)"
                  }}
                />
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-44 rounded-xl p-3 flex flex-col items-center justify-center"
                  style={{
                    background: "linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)",
                    backdropFilter: "blur(15px)",
                    border: "1px solid rgba(255,255,255,0.1)"
                  }}
                >
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-3"
                    style={{
                      background: "linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(234,88,12,0.1) 100%)",
                      border: "1px solid rgba(245,158,11,0.25)"
                    }}
                  >
                    <img src={etkineumLogo} alt="ETKİNİUM" className="w-10 h-10 object-contain" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">ETKİNİUM</h3>
                  <p className="text-accent-amber text-[10px] font-medium mb-3 tracking-wider">EXCLUSIVE</p>
                  <div className="flex gap-1 flex-wrap justify-center">
                    <span className="px-2 py-0.5 rounded-full text-[8px] font-medium text-white/70 bg-white/5 border border-white/10">Konser</span>
                    <span className="px-2 py-0.5 rounded-full text-[8px] font-medium text-white/70 bg-white/5 border border-white/10">Restoran</span>
                  </div>
                </div>
                <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-accent-amber/25 rounded-tr-lg" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-accent-amber/25 rounded-bl-lg" />
              </div>
            </div>

            {/* Right - Premium Visual (Desktop) */}
            <div className="relative hidden md:block">
              <div className="relative w-full max-w-md mx-auto">
                <div 
                  className="relative w-[420px] h-[520px] rounded-[40px] overflow-hidden"
                  style={{
                    background: "radial-gradient(circle at 30% 20%, rgba(245,158,11,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(234,88,12,0.25) 0%, transparent 45%), linear-gradient(160deg, rgba(15,15,15,0.98) 0%, rgba(30,20,10,0.9) 50%, rgba(10,10,10,0.98) 100%)",
                    boxShadow: "0 50px 100px -30px rgba(0,0,0,0.7), 0 0 80px rgba(245,158,11,0.15), inset 0 1px 0 rgba(255,255,255,0.08)"
                  }}
                >
                  <div 
                    className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full"
                    style={{
                      background: "radial-gradient(circle, rgba(245,158,11,0.35) 0%, transparent 70%)",
                      filter: "blur(60px)"
                    }}
                  />
                  <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-80 rounded-3xl p-6 flex flex-col items-center justify-center"
                    style={{
                      background: "linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      boxShadow: "0 25px 60px -15px rgba(0,0,0,0.5)"
                    }}
                  >
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
                    <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">ETKİNİUM</h3>
                    <p className="text-accent-amber text-sm font-medium mb-6 tracking-wider">EXCLUSIVE EXPERIENCES</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <span className="px-3 py-1.5 rounded-full text-xs font-medium text-white/80 bg-white/5 border border-white/10">Konserler</span>
                      <span className="px-3 py-1.5 rounded-full text-xs font-medium text-white/80 bg-white/5 border border-white/10">Restoranlar</span>
                      <span className="px-3 py-1.5 rounded-full text-xs font-medium text-white/80 bg-white/5 border border-white/10">Tiyatrolar</span>
                    </div>
                  </div>
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 55%, transparent 60%)",
                      backgroundSize: "200% 100%",
                      animation: "shimmer 6s ease-in-out infinite"
                    }}
                  />
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

      {/* Instagram-style Stories */}
      <section className="py-4 sm:py-6">
        <div className="container mx-auto px-4">
          <Stories />
        </div>
      </section>

      {/* Billboard Ad Slider */}
      <section className="py-4 sm:py-6 md:py-8">
        <div className="container mx-auto px-3 sm:px-4">
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

      {/* Infinite Scrolling Categories */}
      <section className="py-6 sm:py-10 overflow-hidden">
        <div className="container mx-auto px-4 mb-4">
          <div className="flex items-center gap-2">
            <div 
              className="w-1 h-6 rounded-full"
              style={{ background: "linear-gradient(180deg, #F59E0B 0%, #D97706 100%)" }}
            />
            <h2 className="text-base sm:text-xl font-bold text-white tracking-tight">
              Kategorileri <span className="text-amber-400">Keşfet</span>
            </h2>
          </div>
        </div>
        
        <div className="relative">
          {/* Fade Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
          
          {/* Marquee Wrapper */}
          <div className="overflow-hidden" data-testid="category-marquee">
            <div 
              className="flex w-max animate-marquee-scroll"
              style={{ gap: "1rem" }}
            >
              {/* First Set */}
              {["🎵 Konser", "🎭 Tiyatro", "🎪 Festival", "😂 Stand-up", "⚽ Spor", "🐠 Akvaryum", "🏛️ Müze", "🎢 Tema Park", "🖼️ Sergi", "🎤 Söyleşi", "🎬 Sinema", "💃 Dans", "🎸 Canlı Müzik", "🍷 Tadım", "🎨 Atölye", "🎠 Lunapark", "🏟️ Arena", "🎪 Sirk"].map((category, i) => (
                <div
                  key={`first-${i}`}
                  className="flex-shrink-0 px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-full border border-white/10 bg-white/5 hover:bg-accent-amber hover:border-accent-amber transition-all duration-300 cursor-pointer group"
                  data-testid={`category-${i}`}
                >
                  <span className="text-xs sm:text-sm font-semibold text-white/80 group-hover:text-black whitespace-nowrap">
                    {category}
                  </span>
                </div>
              ))}
              {/* Duplicate Set for seamless loop */}
              {["🎵 Konser", "🎭 Tiyatro", "🎪 Festival", "😂 Stand-up", "⚽ Spor", "🐠 Akvaryum", "🏛️ Müze", "🎢 Tema Park", "🖼️ Sergi", "🎤 Söyleşi", "🎬 Sinema", "💃 Dans", "🎸 Canlı Müzik", "🍷 Tadım", "🎨 Atölye", "🎠 Lunapark", "🏟️ Arena", "🎪 Sirk"].map((category, i) => (
                <div
                  key={`second-${i}`}
                  className="flex-shrink-0 px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-full border border-white/10 bg-white/5 hover:bg-accent-amber hover:border-accent-amber transition-all duration-300 cursor-pointer group"
                  aria-hidden="true"
                >
                  <span className="text-xs sm:text-sm font-semibold text-white/80 group-hover:text-black whitespace-nowrap">
                    {category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <style>{`
          @keyframes marquee-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee-scroll {
            animation: marquee-scroll 40s linear infinite;
            will-change: transform;
          }
          .animate-marquee-scroll:hover {
            animation-play-state: paused;
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-marquee-scroll {
              animation: none;
            }
          }
        `}</style>
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

      {/* Promotional Slider - 3 slides, auto-rotate 10s */}
      <PromoSlider />

      {/* Öne Çıkan Mekanlar - Paginated */}
      <VenueSection />

      {/* Live Platform Stats - Animated Counter */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div 
            className="relative rounded-2xl overflow-hidden p-6 sm:p-10"
            style={{
              background: "linear-gradient(135deg, #0a0a0a 0%, rgba(245,158,11,0.03) 50%, #0a0a0a 100%)",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.5)"
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-amber/20 to-transparent" />
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                Türkiye'nin <span className="text-accent-amber">En Kapsamlı</span> Etkinlik Platformu
              </h2>
              <p className="text-white/30 text-xs sm:text-sm mt-1">Konserden akvaryuma, tiyatrodan tema parka - her şey tek yerde</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {[
                { value: "50K+", label: "Aktif Kullanıcı", icon: "👥" },
                { value: "1.200+", label: "Etkinlik", icon: "🎫" },
                { value: "350+", label: "Mekan & Restoran", icon: "📍" },
                { value: "₺0", label: "Rezervasyon Ücreti", icon: "🆓" },
              ].map((stat, i) => (
                <div 
                  key={i} 
                  className="text-center p-4 sm:p-6 rounded-xl bg-white/[0.03] border border-white/5 hover:border-accent-amber/20 transition-all group"
                >
                  <div className="text-2xl sm:text-3xl mb-2">{stat.icon}</div>
                  <div className="text-xl sm:text-3xl font-bold text-accent-amber mb-1 group-hover:scale-110 transition-transform">{stat.value}</div>
                  <div className="text-[10px] sm:text-xs text-white/40">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Keşfet - Broad Category Showcase */}
      <section className="py-6 sm:py-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-6 rounded-full" style={{ background: "linear-gradient(180deg, #F59E0B 0%, #D97706 100%)" }} />
            <h2 className="text-base sm:text-xl font-bold text-white tracking-tight">
              Keşfet <span className="text-amber-400">& Deneyimle</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { emoji: "🐠", title: "Akvaryumlar", desc: "Deniz altı dünyası", color: "from-cyan-900/30 to-blue-900/20" },
              { emoji: "🏛️", title: "Müzeler", desc: "Tarih & sanat", color: "from-amber-900/30 to-orange-900/20" },
              { emoji: "🎢", title: "Tema Parklar", desc: "Adrenalin & eğlence", color: "from-red-900/30 to-pink-900/20" },
              { emoji: "🎭", title: "Tiyatro & Sahne", desc: "Canlı performans", color: "from-purple-900/30 to-violet-900/20" },
              { emoji: "🎵", title: "Konserler", desc: "Canlı müzik", color: "from-emerald-900/30 to-teal-900/20" },
              { emoji: "🍽️", title: "Restoranlar", desc: "Gurme deneyim", color: "from-yellow-900/30 to-amber-900/20" },
            ].map((cat, i) => (
              <div
                key={i}
                className={`group relative rounded-2xl overflow-hidden p-5 sm:p-6 bg-gradient-to-br ${cat.color} border border-white/5 hover:border-accent-amber/30 transition-all cursor-pointer hover:scale-[1.03] hover:shadow-lg hover:shadow-accent-amber/5`}
              >
                <div className="text-3xl sm:text-4xl mb-3 group-hover:scale-110 transition-transform">{cat.emoji}</div>
                <h3 className="font-semibold text-white text-sm sm:text-base mb-0.5">{cat.title}</h3>
                <p className="text-[10px] sm:text-xs text-white/40">{cat.desc}</p>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="w-4 h-4 text-accent-amber" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Yakında Gelenler - Upcoming Highlights */}
      <section className="py-6 sm:py-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-6 rounded-full" style={{ background: "linear-gradient(180deg, #F59E0B 0%, #D97706 100%)" }} />
            <h2 className="text-base sm:text-xl font-bold text-white tracking-tight">
              Yakında <span className="text-amber-400">Gelecekler</span>
            </h2>
            <span className="bg-red-500/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full animate-pulse ml-1">CANLI</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "İstanbul Akvaryum - Gece Turu", date: "20 Mart 2026", price: "₺320", badge: "Yeni", category: "🐠 Akvaryum" },
              { title: "Tarkan - Harbiye Açıkhava", date: "15 Nisan 2026", price: "₺1.500", badge: "Çok Satan", category: "🎵 Konser" },
              { title: "Miniaturk Gece Müzesi", date: "8 Mart 2026", price: "₺180", badge: "Sınırlı", category: "🏛️ Müze" },
              { title: "Vialand Tema Park - Sezon Açılış", date: "1 Nisan 2026", price: "₺450", badge: "Erken Kuş", category: "🎢 Tema Park" },
              { title: "Cem Yılmaz - Yeni Show", date: "25 Mart 2026", price: "₺950", badge: "Tükeniyor", category: "😂 Stand-up" },
              { title: "Nusret - Özel Gala Yemeği", date: "14 Mart 2026", price: "Ücretsiz Rez.", badge: "Premium", category: "🍽️ Restoran" },
            ].map((event, i) => (
              <Link key={i} href="/bilet-secenekleri">
                <div className="group relative bg-black/40 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/10 hover:border-accent-amber/30 transition-all cursor-pointer hover:bg-black/60">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs text-white/50 bg-white/5 px-2 py-0.5 rounded-full">{event.category}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      event.badge === "Tükeniyor" ? "bg-red-500/20 text-red-400" :
                      event.badge === "Çok Satan" ? "bg-accent-amber/20 text-accent-amber" :
                      event.badge === "Premium" ? "bg-purple-500/20 text-purple-400" :
                      "bg-white/10 text-white/60"
                    }`}>
                      {event.badge}
                    </span>
                  </div>
                  <h3 className="font-semibold text-white text-sm sm:text-base mb-2 group-hover:text-accent-amber transition-colors line-clamp-1">{event.title}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white/40 text-xs">
                      <CalendarDays className="w-3.5 h-3.5" />
                      <span>{event.date}</span>
                    </div>
                    <span className="text-accent-amber font-bold text-sm">{event.price}</span>
                  </div>
                </div>
              </Link>
            ))}
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

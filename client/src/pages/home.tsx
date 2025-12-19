import { useState, useRef } from "react";
import { Link } from "wouter";
import Header from "@/components/header";
import HeroCarousel from "@/components/hero-carousel";
import OvalAdBanner from "@/components/oval-ad-banner";
import AdApplicationButton from "@/components/ad-application-button";
import EmailSubscription from "@/components/email-subscription";
import DateDrawer from "@/components/date-drawer";
import MobileTabBar from "@/components/mobile-tab-bar";
import Footer from "@/components/footer";
import { Calendar, UtensilsCrossed, MapPin, Clock, Star, Heart, ChevronRight, ChevronLeft, CalendarDays, ShoppingBag, Ticket, Sparkles, Gift } from "lucide-react";
import rezervemLogo from "@assets/{09392C43-F854-4BFE-B0DA-97F11129A06F}_1765451772211.png";
import tamamliyoLogo from "@assets/{A79D2DB2-9549-46FF-9111-672F0B5566FC}_1765452914094.png";
import faturaportLogo from "@assets/download_1765541159072.png";
import etkineumLogo from "@assets/logo-final.png";

const productBoxes = [
  { id: 1, title: "VIP Bilet Paketi", subtitle: "Özel Ayrıcalıklar", icon: Ticket, color: "from-purple-500/20 to-purple-900/40" },
  { id: 2, title: "Hediye Kartı", subtitle: "Sevdiklerine Hediye", icon: Gift, color: "from-pink-500/20 to-pink-900/40" },
  { id: 3, title: "Premium Üyelik", subtitle: "Sınırsız Erişim", icon: Sparkles, color: "from-amber-500/20 to-amber-900/40" },
  { id: 4, title: "Grup Paketi", subtitle: "Toplu Alımlarda İndirim", icon: ShoppingBag, color: "from-blue-500/20 to-blue-900/40" },
];

const FeaturedEventCard = ({ index }: { index: number }) => (
  <div 
    className="group relative bg-black/60 backdrop-blur-xl rounded-[16px] overflow-hidden border border-white/10 hover:border-accent-amber/40 transition-all duration-500 flex-shrink-0 w-[160px] sm:w-[180px]"
    style={{
      boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)"
    }}
    data-testid={`featured-event-${index}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-accent-amber/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <div className="relative h-20 sm:h-24 bg-gradient-to-br from-purple-900/40 to-gray-900/60">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 rounded-lg bg-purple-500/20 backdrop-blur-sm flex items-center justify-center border border-purple-400/20">
          <Calendar className="w-4 h-4 text-purple-300" />
        </div>
      </div>
      <div className="absolute top-1.5 left-1.5">
        <span className="bg-accent-amber/90 backdrop-blur-sm text-black text-[8px] font-semibold px-1.5 py-0.5 rounded-full">
          Yakında
        </span>
      </div>
      <button className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-red-400 hover:bg-black/60 transition-all border border-white/10">
        <Heart className="w-2.5 h-2.5" />
      </button>
    </div>
    
    <div className="relative p-2.5 space-y-1.5">
      <h3 className="font-medium text-white/90 group-hover:text-white transition-colors line-clamp-1 text-[11px] sm:text-xs">
        Etkinlik Başlığı
      </h3>
      <div className="space-y-0.5">
        <div className="flex items-center gap-1 text-[9px] text-white/50">
          <Calendar className="w-2 h-2 text-accent-amber/70" />
          <span>— — ——</span>
        </div>
        <div className="flex items-center gap-1 text-[9px] text-white/50">
          <MapPin className="w-2 h-2 text-accent-amber/70" />
          <span className="line-clamp-1">Konum</span>
        </div>
      </div>
      <div className="pt-1.5 border-t border-white/5 flex items-center justify-between">
        <span className="text-accent-amber font-semibold text-xs">— ₺</span>
        <Link href="/bilet-al">
          <button className="bg-black hover:bg-accent-amber text-white hover:text-black text-[9px] font-medium px-2 py-0.5 rounded-full transition-all border border-white/10 hover:border-accent-amber">
            Al
          </button>
        </Link>
      </div>
    </div>
  </div>
);

const FeaturedRestaurantCard = ({ index }: { index: number }) => (
  <div 
    className="group relative bg-black/60 backdrop-blur-xl rounded-[16px] overflow-hidden border border-white/10 hover:border-accent-amber/40 transition-all duration-500 flex-shrink-0 w-[160px] sm:w-[180px]"
    style={{
      boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)"
    }}
    data-testid={`featured-restaurant-${index}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <div className="relative h-20 sm:h-24 bg-gradient-to-br from-amber-900/40 to-gray-900/60">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 rounded-lg bg-amber-500/20 backdrop-blur-sm flex items-center justify-center border border-amber-400/20">
          <UtensilsCrossed className="w-4 h-4 text-amber-300" />
        </div>
      </div>
      <div className="absolute top-1.5 left-1.5 flex gap-1">
        <span className="bg-accent-amber/90 backdrop-blur-sm text-black text-[8px] font-semibold px-1.5 py-0.5 rounded-full">
          Popüler
        </span>
      </div>
      <button className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-red-400 hover:bg-black/60 transition-all border border-white/10">
        <Heart className="w-2.5 h-2.5" />
      </button>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-1.5">
        <div className="flex items-center gap-1 text-accent-amber text-[9px]">
          <Star className="w-2 h-2 fill-accent-amber" />
          <span className="font-medium">—</span>
        </div>
      </div>
    </div>
    
    <div className="relative p-2.5 space-y-1.5">
      <h3 className="font-medium text-white/90 group-hover:text-white transition-colors line-clamp-1 text-[11px] sm:text-xs">
        Restoran Adı
      </h3>
      <div className="space-y-0.5">
        <div className="flex items-center gap-1 text-[9px] text-white/50">
          <MapPin className="w-2 h-2 text-accent-amber/70" />
          <span className="line-clamp-1">Konum</span>
        </div>
        <div className="flex items-center gap-1 text-[9px] text-white/50">
          <Clock className="w-2 h-2 text-accent-amber/70" />
          <span>—:— - —:—</span>
        </div>
      </div>
      <div className="pt-1.5 border-t border-white/5 flex items-center justify-between">
        <span className="text-accent-amber font-semibold text-xs">—— ₺</span>
        <Link href="/restoranlar">
          <button className="bg-black hover:bg-accent-amber text-white hover:text-black text-[9px] font-medium px-2 py-0.5 rounded-full transition-all border border-white/10 hover:border-accent-amber">
            Rezerve
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
      
      <AdApplicationButton />

      <section className="py-4 sm:py-6">
        <div className="container mx-auto px-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-accent-amber" />
              <h2 className="text-xs sm:text-sm font-semibold text-white/90">Öne Çıkan Etkinlikler</h2>
              <button 
                onClick={() => setIsDateDrawerOpen(true)}
                className="ml-0.5 w-5 h-5 rounded-md bg-black hover:bg-accent-amber flex items-center justify-center text-white/60 hover:text-black transition-all border border-white/10 hover:border-accent-amber"
                data-testid="open-date-drawer"
              >
                <CalendarDays className="w-2.5 h-2.5" />
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
            <div className="flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5 text-accent-amber" />
              <h2 className="text-xs sm:text-sm font-semibold text-white/90">Özel Ürünler</h2>
            </div>
            <Link href="/etkinlikler">
              <button className="flex items-center gap-0.5 text-white/50 hover:text-accent-amber text-[10px] font-medium transition-all">
                Tümünü Gör
                <ChevronRight className="w-2.5 h-2.5" />
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {productBoxes.map((product) => {
              const Icon = product.icon;
              return (
                <div 
                  key={product.id}
                  className={`group relative bg-gradient-to-br ${product.color} backdrop-blur-xl rounded-xl p-3 sm:p-4 border border-white/10 hover:border-accent-amber/40 transition-all cursor-pointer`}
                  style={{
                    boxShadow: "0 4px 16px rgba(0,0,0,0.3)"
                  }}
                  data-testid={`product-box-${product.id}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-8 h-8 rounded-lg bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/10">
                      <Icon className="w-4 h-4 text-accent-amber" />
                    </div>
                  </div>
                  <h3 className="text-[11px] sm:text-xs font-semibold text-white mb-0.5">{product.title}</h3>
                  <p className="text-[9px] sm:text-[10px] text-white/50 mb-2">{product.subtitle}</p>
                  <button className="w-full bg-black hover:bg-accent-amber text-white hover:text-black text-[9px] sm:text-[10px] font-medium py-1.5 rounded-lg transition-all border border-white/10 hover:border-accent-amber">
                    Satın Al
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-4 sm:py-6">
        <div className="container mx-auto px-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <UtensilsCrossed className="w-3.5 h-3.5 text-accent-amber" />
              <h2 className="text-xs sm:text-sm font-semibold text-white/90">Popüler Restoranlar</h2>
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
            <div className="absolute top-2 right-3">
              <span className="text-[8px] font-medium text-white/30 px-1.5 py-0.5 rounded tracking-wide uppercase">
                Reklam Alanı
              </span>
            </div>
            
            <div className="p-4 sm:p-6">
              <div className="text-center mb-4">
                <p className="text-white/30 text-[10px] mb-1.5 uppercase tracking-wider">Premium Partner Alanı</p>
                <h3 className="text-sm sm:text-base font-medium text-white/60 mb-2">Markanızı Burada Tanıtın</h3>
                <p className="text-white/30 text-[10px] max-w-xs mx-auto">
                  Bu alan markanız için ayrılmıştır
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 opacity-20">
                {adPartners.map((partner, index) => (
                  <img 
                    key={index}
                    src={partner.logo} 
                    alt={partner.name}
                    className="h-5 sm:h-6 w-auto object-contain grayscale"
                  />
                ))}
              </div>
              
              <div className="mt-4 flex justify-center">
                <Link href="/contact">
                  <button className="bg-white/5 hover:bg-accent-amber text-white/50 hover:text-black text-[10px] font-medium px-4 py-1.5 rounded-full transition-all border border-white/10 hover:border-accent-amber">
                    İletişime Geçin
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

      <MobileTabBar />

      <Footer />
    </div>
  );
}

import { useState, useRef } from "react";
import { Link } from "wouter";
import Header from "@/components/header";
import HeroCarousel from "@/components/hero-carousel";
import DateStrip from "@/components/date-strip";
import OvalAdBanner from "@/components/oval-ad-banner";
import Top10List from "@/components/top10-list";
import EmailSubscription from "@/components/email-subscription";
import Footer from "@/components/footer";
import GlassButton from "@/components/glass-button";
import { Calendar, UtensilsCrossed, MapPin, Clock, Star, Heart, ChevronRight, ChevronLeft, Ticket } from "lucide-react";

const FeaturedEventCard = ({ index }: { index: number }) => (
  <div 
    className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_40px_rgba(247,198,0,0.1)] transition-all duration-300 flex-shrink-0 w-[280px] sm:w-[320px]"
    data-testid={`featured-event-${index}`}
  >
    <div className="relative h-36 sm:h-44 bg-gradient-to-br from-purple-900/40 to-[#0B0B0B]">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center">
          <Calendar className="w-8 h-8 text-purple-400" />
        </div>
      </div>
      <div className="absolute top-3 left-3">
        <span className="bg-[#F7C600] text-black text-[10px] font-bold px-3 py-1 rounded-full">Yakında</span>
      </div>
      <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:text-red-500 hover:border-red-500/30 transition-all duration-300">
        <Heart className="w-4 h-4" />
      </button>
    </div>
    <div className="p-5 space-y-3">
      <h3 className="font-bold text-white text-base sm:text-lg group-hover:text-[#F7C600] transition-colors line-clamp-1">
        Etkinlik Başlığı
      </h3>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Calendar className="w-4 h-4 text-[#F7C600]" />
          <span>— — ——</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <MapPin className="w-4 h-4 text-[#F7C600]" />
          <span className="line-clamp-1">Konum Bilgisi</span>
        </div>
      </div>
      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
        <span className="text-[#F7C600] font-bold text-xl">— ₺</span>
        <Link href="/bilet-al">
          <GlassButton variant="primary" size="sm">
            <Ticket className="w-4 h-4" />
            Bilet Al
          </GlassButton>
        </Link>
      </div>
    </div>
  </div>
);

const FeaturedRestaurantCard = ({ index }: { index: number }) => (
  <div 
    className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_40px_rgba(247,198,0,0.1)] transition-all duration-300 flex-shrink-0 w-[280px] sm:w-[320px]"
    data-testid={`featured-restaurant-${index}`}
  >
    <div className="relative h-36 sm:h-44 bg-gradient-to-br from-amber-900/40 to-[#0B0B0B]">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center">
          <UtensilsCrossed className="w-8 h-8 text-amber-400" />
        </div>
      </div>
      <div className="absolute top-3 left-3 flex gap-2">
        <span className="bg-[#F7C600] text-black text-[10px] font-bold px-3 py-1 rounded-full">Popüler</span>
        <span className="bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-full">Açık</span>
      </div>
      <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:text-red-500 hover:border-red-500/30 transition-all duration-300">
        <Heart className="w-4 h-4" />
      </button>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0B0B0B] to-transparent p-4">
        <div className="flex items-center gap-1.5 text-[#F7C600]">
          <Star className="w-4 h-4 fill-[#F7C600]" />
          <span className="font-bold">—</span>
        </div>
      </div>
    </div>
    <div className="p-5 space-y-3">
      <h3 className="font-bold text-white text-base sm:text-lg group-hover:text-[#F7C600] transition-colors line-clamp-1">
        Restoran Adı
      </h3>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <MapPin className="w-4 h-4 text-[#F7C600]" />
          <span className="line-clamp-1">Konum Bilgisi</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Clock className="w-4 h-4 text-[#F7C600]" />
          <span>—:— - —:—</span>
        </div>
      </div>
      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
        <span className="text-[#F7C600] font-bold text-xl">—— ₺</span>
        <Link href="/restoranlar">
          <GlassButton variant="primary" size="sm">
            Rezervasyon
          </GlassButton>
        </Link>
      </div>
    </div>
  </div>
);

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const eventsRef = useRef<HTMLDivElement>(null);
  const restaurantsRef = useRef<HTMLDivElement>(null);

  const scrollEvents = (direction: "left" | "right") => {
    if (eventsRef.current) {
      const scrollAmount = 340;
      eventsRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const scrollRestaurants = (direction: "left" | "right") => {
    if (restaurantsRef.current) {
      const scrollAmount = 340;
      restaurantsRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Header />
      
      <HeroCarousel 
        onCategorySelect={setSelectedCategory}
        selectedCategory={selectedCategory}
      />

      <DateStrip 
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
      />
      
      <OvalAdBanner />

      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 backdrop-blur-xl border border-purple-500/30 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-purple-400" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Öne Çıkan Etkinlikler</h2>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => scrollEvents("left")}
                className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95 transition-all duration-300"
                data-testid="events-scroll-left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scrollEvents("right")}
                className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95 transition-all duration-300"
                data-testid="events-scroll-right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <Link href="/etkinlikler">
                <GlassButton variant="outline" size="sm" className="hidden sm:flex">
                  Tümünü Gör
                  <ChevronRight className="w-4 h-4" />
                </GlassButton>
              </Link>
            </div>
          </div>
          <div 
            ref={eventsRef}
            className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {[...Array(8)].map((_, i) => (
              <FeaturedEventCard key={i} index={i} />
            ))}
          </div>
          <div className="mt-4 flex justify-center sm:hidden">
            <Link href="/etkinlikler">
              <GlassButton variant="outline" size="sm">
                Tümünü Gör
              </GlassButton>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 backdrop-blur-xl border border-amber-500/30 flex items-center justify-center">
                <UtensilsCrossed className="w-5 h-5 text-amber-400" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Popüler Restoranlar</h2>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => scrollRestaurants("left")}
                className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95 transition-all duration-300"
                data-testid="restaurants-scroll-left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scrollRestaurants("right")}
                className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95 transition-all duration-300"
                data-testid="restaurants-scroll-right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <Link href="/restoranlar">
                <GlassButton variant="outline" size="sm" className="hidden sm:flex">
                  Tümünü Gör
                  <ChevronRight className="w-4 h-4" />
                </GlassButton>
              </Link>
            </div>
          </div>
          <div 
            ref={restaurantsRef}
            className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {[...Array(8)].map((_, i) => (
              <FeaturedRestaurantCard key={i} index={i} />
            ))}
          </div>
          <div className="mt-4 flex justify-center sm:hidden">
            <Link href="/restoranlar">
              <GlassButton variant="outline" size="sm">
                Tümünü Gör
              </GlassButton>
            </Link>
          </div>
        </div>
      </section>

      <Top10List />
      
      <EmailSubscription />

      <Footer />
    </div>
  );
}

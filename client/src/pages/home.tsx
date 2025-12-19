import { useState, useRef } from "react";
import { Link } from "wouter";
import Header from "@/components/header";
import HeroCarousel from "@/components/hero-carousel";
import DateStrip, { DateButton } from "@/components/date-strip";
import OvalAdBanner from "@/components/oval-ad-banner";
import EventCard from "@/components/event-card";
import Top10List from "@/components/top10-list";
import EmailSubscription from "@/components/email-subscription";
import Footer from "@/components/footer";
import GlassButton from "@/components/glass-button";
import { Calendar, UtensilsCrossed, MapPin, Clock, Star, Heart, ChevronRight, ChevronLeft } from "lucide-react";

const FeaturedRestaurantCard = ({ index }: { index: number }) => (
  <div 
    className="group flex-shrink-0 w-[220px] sm:w-[240px] bg-[#0B0B0B] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:bg-white/5 hover:border-white/20 hover:shadow-[0_8px_40px_rgba(247,198,0,0.12)] hover:scale-[1.03] transition-all duration-300 snap-start"
    data-testid={`featured-restaurant-${index}`}
  >
    <div className="relative aspect-[4/3] bg-gradient-to-br from-amber-900/30 via-gray-900 to-[#0B0B0B]">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center">
          <UtensilsCrossed className="w-7 h-7 text-amber-400" />
        </div>
      </div>
      <div className="absolute top-3 left-3 flex gap-1.5">
        <span className="bg-[#F7C600] text-black text-[10px] font-bold px-2.5 py-1 rounded-full">Popüler</span>
        <span className="bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">Açık</span>
      </div>
      <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:text-red-500 hover:border-red-500/30 hover:scale-110 active:scale-95 transition-all duration-300">
        <Heart className="w-4 h-4" />
      </button>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0B0B0B] to-transparent p-3">
        <div className="flex items-center gap-1.5 text-[#F7C600]">
          <Star className="w-4 h-4 fill-[#F7C600]" />
          <span className="font-bold text-sm">—</span>
        </div>
      </div>
    </div>
    <div className="p-4 space-y-2">
      <h3 className="font-semibold text-white text-sm line-clamp-1 group-hover:text-[#F7C600] transition-colors">
        Restoran Adı
      </h3>
      <div className="flex items-center gap-1.5 text-xs text-gray-500">
        <MapPin className="w-3 h-3" />
        <span className="truncate">Konum Bilgisi</span>
      </div>
      <div className="flex items-center gap-1.5 text-xs text-gray-500">
        <Clock className="w-3 h-3" />
        <span>—:— - —:—</span>
      </div>
      <div className="pt-3">
        <Link href="/restoranlar" className="block">
          <GlassButton variant="primary" size="sm" className="w-full text-xs">
            Rezervasyon
          </GlassButton>
        </Link>
      </div>
    </div>
  </div>
);

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const eventsRef = useRef<HTMLDivElement>(null);
  const restaurantsRef = useRef<HTMLDivElement>(null);

  const scrollEvents = (direction: "left" | "right") => {
    if (eventsRef.current) {
      const scrollAmount = 260;
      eventsRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const scrollRestaurants = (direction: "left" | "right") => {
    if (restaurantsRef.current) {
      const scrollAmount = 260;
      restaurantsRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const eventBadges: Array<"indirim" | "tukeniyor" | null> = [
    "indirim", null, "tukeniyor", null, "indirim", null, null, "tukeniyor"
  ];

  const eventCategories = [
    ["TECHNO", "HOUSE"],
    ["ROCK"],
    ["POP", "DANS"],
    ["JAZZ"],
    ["HIP-HOP"],
    ["KLASIK"],
    ["ELEKTRONIK"],
    ["ALTERNATIF"],
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Header />
      
      <HeroCarousel 
        onCategorySelect={setSelectedCategory}
        selectedCategory={selectedCategory}
      />

      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <DateButton 
            selectedDate={selectedDate}
            onClick={() => setIsDatePickerOpen(true)}
          />
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-sm text-gray-400 hover:text-white flex items-center gap-1"
            >
              <span>Filtre: <span className="text-[#F7C600]">{selectedCategory}</span></span>
              <span className="ml-1">×</span>
            </button>
          )}
        </div>
      </div>

      <DateStrip 
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
        isOpen={isDatePickerOpen}
        onOpenChange={setIsDatePickerOpen}
      />
      
      <OvalAdBanner />

      <section className="py-6 sm:py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 backdrop-blur-xl border border-purple-500/30 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-purple-400" />
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold">Öne Çıkan Etkinlikler</h2>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => scrollEvents("left")}
                className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95 transition-all duration-300"
                data-testid="events-scroll-left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => scrollEvents("right")}
                className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95 transition-all duration-300"
                data-testid="events-scroll-right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <Link href="/etkinlikler">
                <GlassButton variant="outline" size="sm" className="hidden sm:flex text-xs">
                  Tümünü Gör
                  <ChevronRight className="w-3 h-3" />
                </GlassButton>
              </Link>
            </div>
          </div>
          <div 
            ref={eventsRef}
            className="flex gap-3 overflow-x-auto pb-3 -mx-4 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory"
          >
            {[...Array(8)].map((_, i) => (
              <EventCard 
                key={i} 
                index={i} 
                badge={eventBadges[i]}
                categories={eventCategories[i]}
              />
            ))}
          </div>
          <div className="mt-4 flex justify-center sm:hidden">
            <Link href="/etkinlikler">
              <GlassButton variant="outline" size="sm" className="text-xs">
                Tümünü Gör
              </GlassButton>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-6 sm:py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 backdrop-blur-xl border border-amber-500/30 flex items-center justify-center">
                <UtensilsCrossed className="w-4 h-4 text-amber-400" />
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold">Popüler Restoranlar</h2>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => scrollRestaurants("left")}
                className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95 transition-all duration-300"
                data-testid="restaurants-scroll-left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => scrollRestaurants("right")}
                className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95 transition-all duration-300"
                data-testid="restaurants-scroll-right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <Link href="/restoranlar">
                <GlassButton variant="outline" size="sm" className="hidden sm:flex text-xs">
                  Tümünü Gör
                  <ChevronRight className="w-3 h-3" />
                </GlassButton>
              </Link>
            </div>
          </div>
          <div 
            ref={restaurantsRef}
            className="flex gap-3 overflow-x-auto pb-3 -mx-4 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory"
          >
            {[...Array(8)].map((_, i) => (
              <FeaturedRestaurantCard key={i} index={i} />
            ))}
          </div>
          <div className="mt-4 flex justify-center sm:hidden">
            <Link href="/restoranlar">
              <GlassButton variant="outline" size="sm" className="text-xs">
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

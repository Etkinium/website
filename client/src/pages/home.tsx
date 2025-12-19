import { useState, useRef } from "react";
import { Link } from "wouter";
import Header from "@/components/header";
import HeroCarousel from "@/components/hero-carousel";
import DateDrawer from "@/components/date-drawer";
import OvalAdBanner from "@/components/oval-ad-banner";
import EventCard from "@/components/event-card";
import Top10List from "@/components/top10-list";
import SponsorSlider from "@/components/sponsor-slider";
import EmailSubscription from "@/components/email-subscription";
import Footer from "@/components/footer";
import PremiumButton from "@/components/premium-button";
import { Calendar, UtensilsCrossed, MapPin, Clock, Star, Heart, ChevronRight, ChevronLeft } from "lucide-react";

const FeaturedRestaurantCard = ({ index }: { index: number }) => (
  <div 
    className="group flex-shrink-0 w-[180px] md:w-[200px] bg-[#0B0B0B] backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hover:bg-white/5 hover:border-white/15 hover:shadow-[0_4px_24px_rgba(247,198,0,0.08)] hover:scale-[1.02] transition-all duration-200 snap-start"
    data-testid={`featured-restaurant-${index}`}
  >
    <div className="relative aspect-[4/3] bg-gradient-to-br from-amber-900/30 via-gray-900 to-[#0B0B0B]">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center">
          <UtensilsCrossed className="w-5 h-5 md:w-6 md:h-6 text-amber-400" />
        </div>
      </div>
      <div className="absolute top-2 left-2 flex gap-1">
        <span className="bg-[#F7C600] text-black text-[8px] font-bold px-1.5 py-0.5 rounded">Popüler</span>
        <span className="bg-emerald-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded">Açık</span>
      </div>
      <button className="absolute top-2 right-2 w-6 h-6 rounded-lg bg-black/50 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:text-red-500 hover:border-red-500/30 active:scale-95 transition-all duration-200">
        <Heart className="w-3 h-3" />
      </button>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0B0B0B] to-transparent p-2">
        <div className="flex items-center gap-1 text-[#F7C600]">
          <Star className="w-3 h-3 fill-[#F7C600]" />
          <span className="font-bold text-xs">—</span>
        </div>
      </div>
    </div>
    <div className="p-3 space-y-1.5">
      <h3 className="font-semibold text-white text-xs md:text-sm line-clamp-1 group-hover:text-[#F7C600] transition-colors">
        Restoran Adı
      </h3>
      <div className="flex items-center gap-1 text-[10px] text-gray-500">
        <MapPin className="w-2.5 h-2.5" />
        <span className="truncate">Konum Bilgisi</span>
      </div>
      <div className="flex items-center gap-1 text-[10px] text-gray-500">
        <Clock className="w-2.5 h-2.5" />
        <span>—:— - —:—</span>
      </div>
      <div className="pt-2">
        <Link href="/restoranlar" className="block">
          <PremiumButton variant="primary" size="sm" className="w-full text-[10px] md:text-xs">
            Rezervasyon
          </PremiumButton>
        </Link>
      </div>
    </div>
  </div>
);

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDateDrawerOpen, setIsDateDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const eventsRef = useRef<HTMLDivElement>(null);
  const restaurantsRef = useRef<HTMLDivElement>(null);

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

      <div className="py-3">
        <DateDrawer 
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
          isOpen={isDateDrawerOpen}
          onToggle={() => setIsDateDrawerOpen(!isDateDrawerOpen)}
        />
        
        {selectedCategory && (
          <div className="container mx-auto px-4 mt-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>Filtre: <span className="text-[#F7C600]">{selectedCategory}</span></span>
              <span className="ml-1">×</span>
            </button>
          </div>
        )}
      </div>
      
      <OvalAdBanner />

      <section className="py-5 md:py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-purple-500/20 backdrop-blur-xl border border-purple-500/30 flex items-center justify-center">
                <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-purple-400" />
              </div>
              <h2 className="text-base md:text-lg font-semibold">Öne Çıkan Etkinlikler</h2>
            </div>
            <div className="flex items-center gap-1.5">
              <PremiumButton variant="icon" size="sm" onClick={() => scrollEvents("left")} data-testid="events-scroll-left">
                <ChevronLeft className="w-3.5 h-3.5" />
              </PremiumButton>
              <PremiumButton variant="icon" size="sm" onClick={() => scrollEvents("right")} data-testid="events-scroll-right">
                <ChevronRight className="w-3.5 h-3.5" />
              </PremiumButton>
              <Link href="/etkinlikler">
                <PremiumButton variant="default" size="sm" className="hidden sm:flex text-[10px] md:text-xs gap-1">
                  Tümünü Gör
                  <ChevronRight className="w-3 h-3" />
                </PremiumButton>
              </Link>
            </div>
          </div>
          <div 
            ref={eventsRef}
            className="flex gap-2.5 overflow-x-auto pb-2 -mx-4 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory"
            style={{ maskImage: "linear-gradient(to right, transparent, black 2%, black 98%, transparent)" }}
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
          <div className="mt-3 flex justify-center sm:hidden">
            <Link href="/etkinlikler">
              <PremiumButton variant="default" size="sm" className="text-xs">
                Tümünü Gör
              </PremiumButton>
            </Link>
          </div>
        </div>
      </section>

      <SponsorSlider />

      <section className="py-5 md:py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-amber-500/20 backdrop-blur-xl border border-amber-500/30 flex items-center justify-center">
                <UtensilsCrossed className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-400" />
              </div>
              <h2 className="text-base md:text-lg font-semibold">Popüler Restoranlar</h2>
            </div>
            <div className="flex items-center gap-1.5">
              <PremiumButton variant="icon" size="sm" onClick={() => scrollRestaurants("left")} data-testid="restaurants-scroll-left">
                <ChevronLeft className="w-3.5 h-3.5" />
              </PremiumButton>
              <PremiumButton variant="icon" size="sm" onClick={() => scrollRestaurants("right")} data-testid="restaurants-scroll-right">
                <ChevronRight className="w-3.5 h-3.5" />
              </PremiumButton>
              <Link href="/restoranlar">
                <PremiumButton variant="default" size="sm" className="hidden sm:flex text-[10px] md:text-xs gap-1">
                  Tümünü Gör
                  <ChevronRight className="w-3 h-3" />
                </PremiumButton>
              </Link>
            </div>
          </div>
          <div 
            ref={restaurantsRef}
            className="flex gap-2.5 overflow-x-auto pb-2 -mx-4 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory"
            style={{ maskImage: "linear-gradient(to right, transparent, black 2%, black 98%, transparent)" }}
          >
            {[...Array(8)].map((_, i) => (
              <FeaturedRestaurantCard key={i} index={i} />
            ))}
          </div>
          <div className="mt-3 flex justify-center sm:hidden">
            <Link href="/restoranlar">
              <PremiumButton variant="default" size="sm" className="text-xs">
                Tümünü Gör
              </PremiumButton>
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

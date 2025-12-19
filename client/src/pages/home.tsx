import { useState, useRef } from "react";
import { Link } from "wouter";
import Header from "@/components/header";
import HeroCarousel from "@/components/hero-carousel";
import DateDrawer from "@/components/date-drawer";
import OvalAdBanner from "@/components/oval-ad-banner";
import EventCard from "@/components/event-card";
import Top10List from "@/components/top10-list";
import GlassSlider from "@/components/glass-slider";
import EmailSubscription from "@/components/email-subscription";
import Footer from "@/components/footer";
import PremiumButton from "@/components/premium-button";
import { Calendar, UtensilsCrossed, MapPin, Clock, Star, Heart, ChevronRight, ChevronLeft } from "lucide-react";

const FeaturedRestaurantCard = ({ index }: { index: number }) => (
  <div 
    className="group flex-shrink-0 w-[130px] md:w-[150px] bg-[#0A0A0A] border border-white/15 rounded-xl overflow-hidden hover:border-[#F7C600]/40 hover:shadow-[0_4px_20px_rgba(247,198,0,0.1)] transition-all duration-200 snap-start"
    data-testid={`featured-restaurant-${index}`}
  >
    <div className="relative aspect-[4/3] bg-gradient-to-br from-amber-900/40 via-gray-900 to-[#0A0A0A]">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center">
          <UtensilsCrossed className="w-4 h-4 md:w-5 md:h-5 text-amber-400" />
        </div>
      </div>
      <div className="absolute top-1.5 left-1.5 flex gap-0.5">
        <span className="bg-[#F7C600] text-black text-[7px] font-bold px-1 py-0.5 rounded">Popüler</span>
        <span className="bg-emerald-500 text-white text-[7px] font-bold px-1 py-0.5 rounded">Açık</span>
      </div>
      <button className="absolute top-1.5 right-1.5 w-5 h-5 rounded bg-black/60 border border-white/10 flex items-center justify-center text-white hover:text-red-500 active:scale-95 transition-all">
        <Heart className="w-2.5 h-2.5" />
      </button>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0A0A0A] to-transparent p-1.5">
        <div className="flex items-center gap-0.5 text-[#F7C600]">
          <Star className="w-2.5 h-2.5 fill-[#F7C600]" />
          <span className="font-bold text-[9px]">—</span>
        </div>
      </div>
    </div>
    <div className="p-2 space-y-1">
      <h3 className="font-semibold text-white text-[9px] md:text-[10px] line-clamp-1 group-hover:text-[#F7C600] transition-colors">
        Restoran
      </h3>
      <div className="flex items-center gap-0.5 text-[7px] md:text-[8px] text-gray-500">
        <MapPin className="w-2 h-2" />
        <span className="truncate">Konum</span>
      </div>
      <div className="flex items-center gap-0.5 text-[7px] md:text-[8px] text-gray-500">
        <Clock className="w-2 h-2" />
        <span>—:— - —:—</span>
      </div>
      <div className="pt-1">
        <Link href="/restoranlar" className="block">
          <PremiumButton variant="primary" size="sm" className="w-full text-[8px] md:text-[9px] py-1">
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
      eventsRef.current.scrollBy({ left: direction === "left" ? -160 : 160, behavior: "smooth" });
    }
  };

  const scrollRestaurants = (direction: "left" | "right") => {
    if (restaurantsRef.current) {
      restaurantsRef.current.scrollBy({ left: direction === "left" ? -160 : 160, behavior: "smooth" });
    }
  };

  const eventBadges: Array<"indirim" | "tukeniyor" | null> = [
    "indirim", null, "tukeniyor", null, "indirim", null, null, "tukeniyor", null, null
  ];

  const eventCategories = [
    ["TECHNO"], ["ROCK"], ["POP"], ["JAZZ"], ["HIP-HOP"], ["KLASIK"], ["ELEKTRONIK"], ["ALTERNATIF"], ["DANS"], ["FOLK"]
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Header />
      
      <HeroCarousel 
        onCategorySelect={setSelectedCategory}
        selectedCategory={selectedCategory}
      />

      <div className="py-2">
        <DateDrawer 
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
          isOpen={isDateDrawerOpen}
          onToggle={() => setIsDateDrawerOpen(!isDateDrawerOpen)}
        />
        
        {selectedCategory && (
          <div className="container mx-auto px-4 mt-2">
            <button onClick={() => setSelectedCategory(null)} className="text-[10px] text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
              <span>Filtre: <span className="text-[#F7C600]">{selectedCategory}</span></span>
              <span className="ml-1">×</span>
            </button>
          </div>
        )}
      </div>
      
      <OvalAdBanner />

      <section className="py-4 md:py-5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-purple-500/30 border border-purple-500/40 flex items-center justify-center">
                <Calendar className="w-3 h-3 text-purple-400" />
              </div>
              <h2 className="text-sm md:text-base font-semibold">Öne Çıkan Etkinlikler</h2>
            </div>
            <div className="flex items-center gap-1">
              <PremiumButton variant="icon" size="sm" onClick={() => scrollEvents("left")} data-testid="events-scroll-left">
                <ChevronLeft className="w-3 h-3" />
              </PremiumButton>
              <PremiumButton variant="icon" size="sm" onClick={() => scrollEvents("right")} data-testid="events-scroll-right">
                <ChevronRight className="w-3 h-3" />
              </PremiumButton>
              <Link href="/etkinlikler">
                <PremiumButton variant="default" size="sm" className="hidden sm:flex text-[9px] gap-0.5">
                  Tümü
                  <ChevronRight className="w-2.5 h-2.5" />
                </PremiumButton>
              </Link>
            </div>
          </div>
          <div 
            ref={eventsRef}
            className="flex gap-2 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory"
          >
            {[...Array(10)].map((_, i) => (
              <EventCard key={i} index={i} badge={eventBadges[i]} categories={eventCategories[i]} />
            ))}
          </div>
          <div className="mt-2 flex justify-center sm:hidden">
            <Link href="/etkinlikler">
              <PremiumButton variant="default" size="sm" className="text-[9px]">Tümünü Gör</PremiumButton>
            </Link>
          </div>
        </div>
      </section>

      <GlassSlider />

      <section className="py-4 md:py-5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-amber-500/30 border border-amber-500/40 flex items-center justify-center">
                <UtensilsCrossed className="w-3 h-3 text-amber-400" />
              </div>
              <h2 className="text-sm md:text-base font-semibold">Popüler Restoranlar</h2>
            </div>
            <div className="flex items-center gap-1">
              <PremiumButton variant="icon" size="sm" onClick={() => scrollRestaurants("left")} data-testid="restaurants-scroll-left">
                <ChevronLeft className="w-3 h-3" />
              </PremiumButton>
              <PremiumButton variant="icon" size="sm" onClick={() => scrollRestaurants("right")} data-testid="restaurants-scroll-right">
                <ChevronRight className="w-3 h-3" />
              </PremiumButton>
              <Link href="/restoranlar">
                <PremiumButton variant="default" size="sm" className="hidden sm:flex text-[9px] gap-0.5">
                  Tümü
                  <ChevronRight className="w-2.5 h-2.5" />
                </PremiumButton>
              </Link>
            </div>
          </div>
          <div 
            ref={restaurantsRef}
            className="flex gap-2 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory"
          >
            {[...Array(10)].map((_, i) => (
              <FeaturedRestaurantCard key={i} index={i} />
            ))}
          </div>
          <div className="mt-2 flex justify-center sm:hidden">
            <Link href="/restoranlar">
              <PremiumButton variant="default" size="sm" className="text-[9px]">Tümünü Gör</PremiumButton>
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

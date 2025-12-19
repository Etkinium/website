import { useState } from "react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import HorizontalAdBanner from "@/components/horizontal-ad-banner";
import AdApplicationButton from "@/components/ad-application-button";
import FilterDialog from "@/components/filter-dialog";
import DateDrawer from "@/components/date-drawer";
import { Calendar, MapPin, Clock, Filter, Search, ChevronRight, Star, Heart, CalendarDays, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";

const categories = [
  "Tümü",
  "Konser",
  "Tiyatro",
  "Stand-up",
  "Festival",
  "Konferans",
  "Workshop",
  "Spor",
];

const EventCard = ({ index, onBuyTicket }: { index: number; onBuyTicket: () => void }) => {
  return (
    <div 
      className="group relative bg-black/60 backdrop-blur-xl rounded-[16px] sm:rounded-[20px] overflow-hidden border border-white/10 hover:border-accent-amber/40 transition-all duration-500"
      style={{
        boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)"
      }}
      data-testid={`event-card-${index}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-accent-amber/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative h-28 sm:h-32 md:h-36 bg-gradient-to-br from-purple-900/40 to-gray-900/60">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-500/20 backdrop-blur-sm flex items-center justify-center border border-purple-400/20">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-purple-300" />
          </div>
        </div>
        <div className="absolute top-2 left-2">
          <span className="bg-accent-amber/90 backdrop-blur-sm text-black text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-full" data-testid={`event-category-${index}`}>
            —
          </span>
        </div>
        <button 
          className="absolute top-2 right-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-red-400 hover:bg-black/60 transition-all border border-white/10"
          data-testid={`event-favorite-${index}`}
        >
          <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
          <div className="flex items-center gap-1 text-accent-amber text-[10px]">
            <Star className="w-2.5 h-2.5 fill-accent-amber" />
            <span className="font-medium" data-testid={`event-rating-${index}`}>—</span>
          </div>
        </div>
      </div>
      
      <div className="relative p-3 sm:p-4 space-y-2">
        <h3 
          className="font-medium text-white/90 group-hover:text-white transition-colors line-clamp-2 text-xs sm:text-sm h-8 sm:h-10"
          data-testid={`event-title-${index}`}
        >
          Etkinlik Başlığı
        </h3>
        
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-white/50">
            <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-accent-amber/70 flex-shrink-0" />
            <span data-testid={`event-date-${index}`}>— — ——</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-white/50">
            <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-accent-amber/70 flex-shrink-0" />
            <span data-testid={`event-time-${index}`}>—:—</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-white/50">
            <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-accent-amber/70 flex-shrink-0" />
            <span className="line-clamp-1" data-testid={`event-location-${index}`}>Konum Bilgisi</span>
          </div>
        </div>
        
        <div className="pt-2 border-t border-white/5 flex items-center justify-between">
          <div>
            <p className="text-[9px] sm:text-[10px] text-white/40">Başlangıç</p>
            <p className="text-sm sm:text-base font-semibold text-accent-amber" data-testid={`event-price-${index}`}>— ₺</p>
          </div>
          <button 
            onClick={onBuyTicket}
            className="bg-black hover:bg-accent-amber text-white hover:text-black text-[10px] sm:text-[11px] font-medium px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full transition-all border border-white/10 hover:border-accent-amber flex items-center gap-0.5"
            data-testid={`event-buy-${index}`}
          >
            Bilet Al
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Etkinlikler() {
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDateDrawerOpen, setIsDateDrawerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleBuyTicket = () => {
    setLocation("/bilet-al");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="pt-20 pb-16">
        <HorizontalAdBanner />
        <AdApplicationButton />

        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4 sm:mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-accent-amber" />
              <h1 className="text-base sm:text-lg md:text-xl font-semibold">Etkinlikler</h1>
              <button 
                onClick={() => setIsDateDrawerOpen(true)}
                className="ml-1 w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-black hover:bg-accent-amber flex items-center justify-center text-white/60 hover:text-black transition-all border border-white/10 hover:border-accent-amber"
                data-testid="open-date-drawer-events"
              >
                <CalendarDays className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative flex-1 md:flex-none">
                <Input
                  type="text"
                  placeholder="Etkinlik ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-black/60 backdrop-blur-sm border-white/10 text-white placeholder:text-white/40 pr-8 w-full md:w-48 text-xs h-8 rounded-full"
                  data-testid="input-event-search"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-white/40" />
              </div>
              <button 
                onClick={() => setIsFilterOpen(true)}
                className="h-8 px-3 bg-black hover:bg-accent-amber text-white hover:text-black text-[11px] font-medium rounded-full transition-all border border-white/10 hover:border-accent-amber flex items-center gap-1.5 flex-shrink-0"
                data-testid="button-event-filter"
              >
                <Filter className="w-3 h-3" />
                <span className="hidden sm:inline">Filtrele</span>
              </button>
            </div>
          </div>

          <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-3 mb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-4 px-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-medium whitespace-nowrap transition-all border ${
                  selectedCategory === category
                    ? "bg-accent-amber text-black border-accent-amber"
                    : "bg-black text-white/70 border-white/10 hover:border-accent-amber/50"
                }`}
                data-testid={`filter-${category.toLowerCase()}`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {[...Array(10)].map((_, index) => (
              <EventCard key={index} index={index} onBuyTicket={handleBuyTicket} />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <button 
              className="bg-black hover:bg-accent-amber text-white hover:text-black px-5 py-2 rounded-full font-medium text-xs transition-all border border-white/10 hover:border-accent-amber flex items-center gap-2"
              data-testid="button-load-more"
            >
              <ChevronDown className="w-4 h-4" />
              Daha Fazla Göster
            </button>
          </div>
        </div>
      </main>

      <FilterDialog isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} type="event" />
      <DateDrawer 
        isOpen={isDateDrawerOpen} 
        onClose={() => setIsDateDrawerOpen(false)}
        onSelectDate={setSelectedDate}
      />

      <Footer />
    </div>
  );
}

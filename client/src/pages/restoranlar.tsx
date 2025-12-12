import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import HorizontalAdBanner from "@/components/horizontal-ad-banner";
import AdApplicationButton from "@/components/ad-application-button";
import FilterDialog from "@/components/filter-dialog";
import ReservationDialog from "@/components/reservation-dialog";
import { UtensilsCrossed, MapPin, Clock, Users, Filter, Search, ChevronRight, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const cuisineTypes = [
  "Tümü",
  "Türk Mutfağı",
  "İtalyan",
  "Uzak Doğu",
  "Fine Dining",
  "Cafe & Brunch",
  "Steakhouse",
  "Deniz Ürünleri",
];

const RestaurantCard = ({ index, onReserve }: { index: number; onReserve: () => void }) => {
  return (
    <div 
      className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-accent-amber/50 transition-all duration-300 group cursor-pointer hover:shadow-xl hover:shadow-accent-amber/10"
      data-testid={`restaurant-card-${index}`}
    >
      <div className="relative h-40 sm:h-48 md:h-56 bg-gradient-to-br from-gray-800 to-gray-700 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-600/50 flex items-center justify-center">
            <UtensilsCrossed className="w-6 h-6 sm:w-8 sm:h-8 text-gray-500" />
          </div>
        </div>
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex gap-1.5 sm:gap-2">
          <span className="bg-accent-amber text-black text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full" data-testid={`restaurant-cuisine-${index}`}>
            —
          </span>
          <span className="bg-green-500 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full" data-testid={`restaurant-status-${index}`}>
            Açık
          </span>
        </div>
        <button 
          className="absolute top-2 sm:top-3 right-2 sm:right-3 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-black/50 flex items-center justify-center text-white hover:text-red-500 transition-colors"
          data-testid={`restaurant-favorite-${index}`}
        >
          <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1 text-accent-amber text-xs sm:text-sm">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-accent-amber" />
              <span className="font-medium" data-testid={`restaurant-rating-${index}`}>—</span>
            </div>
            <span className="text-gray-400 text-[10px] sm:text-sm" data-testid={`restaurant-reviews-${index}`}>(— değerlendirme)</span>
          </div>
        </div>
      </div>
      
      <div className="p-3 sm:p-4 md:p-5 space-y-2 sm:space-y-3">
        <h3 
          className="text-base sm:text-lg md:text-xl font-bold text-white group-hover:text-accent-amber transition-colors line-clamp-1"
          data-testid={`restaurant-name-${index}`}
        >
          Restoran Adı
        </h3>
        
        <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent-amber flex-shrink-0" />
            <span className="line-clamp-1" data-testid={`restaurant-location-${index}`}>Konum Bilgisi</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent-amber flex-shrink-0" />
            <span data-testid={`restaurant-hours-${index}`}>—:— - —:—</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent-amber flex-shrink-0" />
            <span data-testid={`restaurant-capacity-${index}`}>— kişilik</span>
          </div>
        </div>
        
        <div className="pt-2 sm:pt-3 border-t border-gray-700 flex items-center justify-between">
          <div>
            <p className="text-[10px] sm:text-xs text-gray-500">Ortalama Fiyat</p>
            <p className="text-lg sm:text-xl font-bold text-accent-amber" data-testid={`restaurant-price-${index}`}>—— ₺</p>
          </div>
          <Button 
            size="sm"
            onClick={onReserve}
            className="bg-accent-amber text-black hover:bg-yellow-400 font-semibold rounded-full px-2.5 sm:px-4 text-xs sm:text-sm"
            data-testid={`restaurant-reserve-${index}`}
          >
            Rezervasyon
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-0.5 sm:ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function Restoranlar() {
  const [selectedCuisine, setSelectedCuisine] = useState("Tümü");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <Header />
      
      <main className="pt-20 pb-16">
        <HorizontalAdBanner />
        <AdApplicationButton />

        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold flex items-center gap-2 sm:gap-3">
                <UtensilsCrossed className="w-6 h-6 sm:w-8 sm:h-8 text-accent-amber" />
                Restoranlar
              </h1>
              <p className="text-gray-400 mt-1 text-sm sm:text-base">En seçkin restoranlardan kolayca rezervasyon yapın</p>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative flex-1 md:flex-none">
                <Input
                  type="text"
                  placeholder="Restoran ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500 pr-10 w-full md:w-64 text-sm"
                  data-testid="input-restaurant-search"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              <Button 
                onClick={() => setIsFilterOpen(true)}
                className="bg-accent-amber text-black hover:bg-yellow-400 font-semibold flex-shrink-0"
                data-testid="button-restaurant-filter"
              >
                <Filter className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Filtrele</span>
              </Button>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-4 mb-4 sm:mb-6 scrollbar-hide -mx-4 px-4">
            {cuisineTypes.map((cuisine) => (
              <button
                key={cuisine}
                onClick={() => setSelectedCuisine(cuisine)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCuisine === cuisine
                    ? "bg-accent-amber text-black"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
                data-testid={`cuisine-${cuisine.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {cuisine}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {[...Array(8)].map((_, index) => (
              <RestaurantCard key={index} index={index} onReserve={() => setIsReservationOpen(true)} />
            ))}
          </div>

          <div className="mt-8 sm:mt-12 flex justify-center">
            <Button 
              variant="outline"
              className="border-accent-amber text-accent-amber hover:bg-accent-amber hover:text-black px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base"
              data-testid="button-load-more-restaurants"
            >
              <UtensilsCrossed className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Daha Fazla Göster
            </Button>
          </div>
        </div>
      </main>

      <FilterDialog isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} type="restaurant" />
      <ReservationDialog isOpen={isReservationOpen} onClose={() => setIsReservationOpen(false)} />

      <Footer />
    </div>
  );
}

import Header from "@/components/header";
import Footer from "@/components/footer";
import HorizontalAdBanner from "@/components/horizontal-ad-banner";
import AdApplicationButton from "@/components/ad-application-button";
import { Calendar, MapPin, Clock, Users, Filter, Search, ChevronRight, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

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

const EventCard = ({ index }: { index: number }) => {
  return (
    <div 
      className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-accent-amber/50 transition-all duration-300 group cursor-pointer hover:shadow-xl hover:shadow-accent-amber/10"
      data-testid={`event-card-${index}`}
    >
      <div className="relative h-48 md:h-56 bg-gradient-to-br from-gray-800 to-gray-700 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-gray-600/50 flex items-center justify-center">
            <Calendar className="w-8 h-8 text-gray-500" />
          </div>
        </div>
        <div className="absolute top-3 left-3">
          <span className="bg-accent-amber text-black text-xs font-bold px-3 py-1 rounded-full" data-testid={`event-category-${index}`}>
            —
          </span>
        </div>
        <button 
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 flex items-center justify-center text-white hover:text-red-500 transition-colors"
          data-testid={`event-favorite-${index}`}
        >
          <Heart className="w-5 h-5" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center gap-2 text-accent-amber text-sm">
            <Star className="w-4 h-4 fill-accent-amber" />
            <span className="font-medium" data-testid={`event-rating-${index}`}>—</span>
          </div>
        </div>
      </div>
      
      <div className="p-4 md:p-5 space-y-3">
        <h3 
          className="text-lg md:text-xl font-bold text-white group-hover:text-accent-amber transition-colors line-clamp-2 h-14"
          data-testid={`event-title-${index}`}
        >
          Etkinlik Başlığı
        </h3>
        
        <div className="space-y-2 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-accent-amber flex-shrink-0" />
            <span data-testid={`event-date-${index}`}>— — ——</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-accent-amber flex-shrink-0" />
            <span data-testid={`event-time-${index}`}>—:—</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-accent-amber flex-shrink-0" />
            <span className="line-clamp-1" data-testid={`event-location-${index}`}>Konum Bilgisi</span>
          </div>
        </div>
        
        <div className="pt-3 border-t border-gray-700 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Başlangıç Fiyatı</p>
            <p className="text-xl font-bold text-accent-amber" data-testid={`event-price-${index}`}>— ₺</p>
          </div>
          <Button 
            size="sm"
            className="bg-accent-amber text-black hover:bg-yellow-400 font-semibold rounded-full px-4"
            data-testid={`event-buy-${index}`}
          >
            Bilet Al
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function Etkinlikler() {
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <Header />
      
      <main className="pt-20 pb-16">
        <HorizontalAdBanner />
        <AdApplicationButton />

        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
                <Calendar className="w-8 h-8 text-accent-amber" />
                Etkinlikler
              </h1>
              <p className="text-gray-400 mt-1">Türkiye'nin en özel etkinliklerini keşfedin</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Etkinlik ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500 pr-10 w-64"
                  data-testid="input-event-search"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              <Button 
                variant="outline" 
                className="border-gray-600 text-white hover:bg-gray-800"
                data-testid="button-event-filter"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtrele
              </Button>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? "bg-accent-amber text-black"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
                data-testid={`filter-${category.toLowerCase()}`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <EventCard key={index} index={index} />
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Button 
              variant="outline"
              className="border-accent-amber text-accent-amber hover:bg-accent-amber hover:text-black px-8 py-3 rounded-full font-semibold"
              data-testid="button-load-more"
            >
              <Users className="w-5 h-5 mr-2" />
              Daha Fazla Göster
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

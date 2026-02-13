import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import HorizontalAdBanner from "@/components/horizontal-ad-banner";
import AdApplicationButton from "@/components/ad-application-button";
import FilterDialog from "@/components/filter-dialog";
import ReservationDialog from "@/components/reservation-dialog";
import DateDrawer from "@/components/date-drawer";
import MobileTabBar from "@/components/mobile-tab-bar";
import { UtensilsCrossed, MapPin, Clock, Users, Filter, Search, ChevronRight, Star, Heart, CalendarDays, ChevronDown, TrendingUp, Flame, Quote, ChefHat, Sparkles, Award } from "lucide-react";
import { Link } from "wouter";
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
      className="group relative bg-black/60 backdrop-blur-xl rounded-[16px] sm:rounded-[20px] overflow-hidden border border-white/10 hover:border-accent-amber/40 transition-all duration-500"
      style={{
        boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)"
      }}
      data-testid={`restaurant-card-${index}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative h-28 sm:h-32 md:h-36 bg-gradient-to-br from-amber-900/40 to-gray-900/60">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-500/20 backdrop-blur-sm flex items-center justify-center border border-amber-400/20">
            <UtensilsCrossed className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300" />
          </div>
        </div>
        <div className="absolute top-2 left-2 flex gap-1">
          <span className="bg-accent-amber/90 backdrop-blur-sm text-black text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-full" data-testid={`restaurant-cuisine-${index}`}>
            —
          </span>
          <span className="bg-green-500/90 backdrop-blur-sm text-white text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-full" data-testid={`restaurant-status-${index}`}>
            Açık
          </span>
        </div>
        <button 
          className="absolute top-2 right-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-red-400 hover:bg-black/60 transition-all border border-white/10"
          data-testid={`restaurant-favorite-${index}`}
        >
          <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1 text-accent-amber text-[10px]">
              <Star className="w-2.5 h-2.5 fill-accent-amber" />
              <span className="font-medium" data-testid={`restaurant-rating-${index}`}>—</span>
            </div>
            <span className="text-white/40 text-[9px]" data-testid={`restaurant-reviews-${index}`}>(—)</span>
          </div>
        </div>
      </div>
      
      <div className="relative p-3 sm:p-4 space-y-2">
        <h3 
          className="font-medium text-white/90 group-hover:text-white transition-colors line-clamp-1 text-xs sm:text-sm"
          data-testid={`restaurant-name-${index}`}
        >
          Restoran Adı
        </h3>
        
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-white/50">
            <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-accent-amber/70 flex-shrink-0" />
            <span className="line-clamp-1" data-testid={`restaurant-location-${index}`}>Konum Bilgisi</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-white/50">
            <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-accent-amber/70 flex-shrink-0" />
            <span data-testid={`restaurant-hours-${index}`}>—:— - —:—</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-white/50">
            <Users className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-accent-amber/70 flex-shrink-0" />
            <span data-testid={`restaurant-capacity-${index}`}>— kişilik</span>
          </div>
        </div>
        
        <div className="pt-2 border-t border-white/5 flex items-center justify-between">
          <div>
            <p className="text-[9px] sm:text-[10px] text-white/40">Ortalama</p>
            <p className="text-sm sm:text-base font-semibold text-accent-amber" data-testid={`restaurant-price-${index}`}>—— ₺</p>
          </div>
          <button 
            onClick={onReserve}
            className="bg-black hover:bg-accent-amber text-white hover:text-black text-[10px] sm:text-[11px] font-medium px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full transition-all border border-white/10 hover:border-accent-amber flex items-center gap-0.5"
            data-testid={`restaurant-reserve-${index}`}
          >
            Rezerve Et
            <ChevronRight className="w-3 h-3" />
          </button>
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
  const [isDateDrawerOpen, setIsDateDrawerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="min-h-screen bg-black text-white pb-16 md:pb-0">
      <Header />
      
      <main className="pt-20 pb-16">
        <HorizontalAdBanner />
        <AdApplicationButton />

        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4 sm:mb-6">
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="w-4 h-4 sm:w-5 sm:h-5 text-accent-amber" />
              <h1 className="text-base sm:text-lg md:text-xl font-semibold">Restoranlar</h1>
              <button 
                onClick={() => setIsDateDrawerOpen(true)}
                className="ml-1 w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-black hover:bg-accent-amber flex items-center justify-center text-white/60 hover:text-black transition-all border border-white/10 hover:border-accent-amber"
                data-testid="open-date-drawer-restaurants"
              >
                <CalendarDays className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative flex-1 md:flex-none">
                <Input
                  type="text"
                  placeholder="Restoran ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-black/60 backdrop-blur-sm border-white/10 text-white placeholder:text-white/40 pr-8 w-full md:w-48 text-xs h-8 rounded-full"
                  data-testid="input-restaurant-search"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-white/40" />
              </div>
              <button 
                onClick={() => setIsFilterOpen(true)}
                className="h-8 px-3 bg-black hover:bg-accent-amber text-white hover:text-black text-[11px] font-medium rounded-full transition-all border border-white/10 hover:border-accent-amber flex items-center gap-1.5 flex-shrink-0"
                data-testid="button-restaurant-filter"
              >
                <Filter className="w-3 h-3" />
                <span className="hidden sm:inline">Filtrele</span>
              </button>
            </div>
          </div>

          <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-3 mb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-4 px-4">
            {cuisineTypes.map((cuisine) => (
              <button
                key={cuisine}
                onClick={() => setSelectedCuisine(cuisine)}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-medium whitespace-nowrap transition-all border ${
                  selectedCuisine === cuisine
                    ? "bg-accent-amber text-black border-accent-amber"
                    : "bg-black text-white/70 border-white/10 hover:border-accent-amber/50"
                }`}
                data-testid={`cuisine-${cuisine.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {cuisine}
              </button>
            ))}
          </div>

          {/* Hero Spotlight */}
          <div 
            className="mb-8 relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-900/60 via-black/80 to-accent-amber/20 border border-white/10"
            style={{ boxShadow: "0 8px 40px rgba(249,115,22,0.15)" }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(249,115,22,0.15),transparent_50%)]" />
            <div className="relative p-6 sm:p-8 flex flex-col lg:flex-row gap-6 items-center">
              <div className="flex-shrink-0 w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-orange-500/20 backdrop-blur-sm flex items-center justify-center border border-orange-400/30 relative group cursor-pointer">
                <div className="absolute inset-0 bg-orange-500/10 rounded-2xl animate-pulse" />
                <ChefHat className="w-12 h-12 text-orange-300 group-hover:scale-110 transition-transform" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent-amber rounded-full flex items-center justify-center">
                  <Award className="w-4 h-4 text-black" />
                </div>
              </div>
              <div className="flex-1 text-center lg:text-left">
                <div className="flex items-center gap-2 justify-center lg:justify-start mb-2">
                  <Flame className="w-4 h-4 text-accent-amber animate-pulse" />
                  <span className="text-accent-amber text-xs font-bold uppercase tracking-wider">Editör Seçimi</span>
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">Premium Fine Dining</h2>
                <p className="text-white/60 text-sm mb-4 max-w-lg">İstanbul'un en prestijli restoranlarından biri. Michelin yıldızlı şefler tarafından hazırlanan özel menüler.</p>
                <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start mb-4">
                  <div className="flex items-center gap-1 text-white/70 text-xs">
                    <MapPin className="w-3 h-3 text-accent-amber" />
                    <span>Beşiktaş, İstanbul</span>
                  </div>
                  <div className="flex items-center gap-1 text-white/70 text-xs">
                    <Clock className="w-3 h-3 text-accent-amber" />
                    <span>12:00 - 00:00</span>
                  </div>
                  <div className="flex items-center gap-1 text-accent-amber text-xs">
                    <Star className="w-3 h-3 fill-accent-amber" />
                    <span className="font-bold">4.9</span>
                  </div>
                </div>
                <Link href="/restoran-detay">
                  <button className="px-6 py-2.5 rounded-full font-semibold text-sm bg-gradient-to-r from-accent-amber to-yellow-500 hover:from-white hover:to-white text-black transition-all hover:scale-105 shadow-lg shadow-accent-amber/30">
                    Hemen Rezervasyon Yap
                  </button>
                </Link>
              </div>
              <div className="hidden xl:flex flex-col gap-3 text-right">
                <div className="bg-black/40 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                  <p className="text-accent-amber text-lg font-bold">1.200+</p>
                  <p className="text-white/50 text-[10px]">Mutlu Misafir</p>
                </div>
                <div className="bg-black/40 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                  <p className="text-green-400 text-lg font-bold">%94</p>
                  <p className="text-white/50 text-[10px]">Memnuniyet</p>
                </div>
              </div>
            </div>
          </div>

          {/* Live Stats Bar */}
          <div className="mb-6 flex flex-wrap items-center justify-center gap-4 sm:gap-8 py-4 px-6 rounded-xl bg-black/40 backdrop-blur-sm border border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-white/70 text-xs"><span className="text-white font-bold">856</span> aktif kullanıcı</span>
            </div>
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="w-4 h-4 text-accent-amber" />
              <span className="text-white/70 text-xs"><span className="text-white font-bold">42</span> rezervasyon bu saat</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-white/70 text-xs"><span className="text-green-400 font-bold">+18%</span> bu hafta</span>
            </div>
          </div>

          {/* Trending Restaurants Carousel */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-5 h-5 text-orange-500" />
              <h3 className="text-lg font-bold text-white">Trend <span className="text-accent-amber">Restoranlar</span></h3>
              <span className="ml-auto text-white/50 text-xs cursor-pointer hover:text-accent-amber transition-colors">Tümünü Gör →</span>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-4 px-4">
              {[...Array(6)].map((_, index) => (
                <Link key={index} href="/restoran-detay">
                  <div 
                    className="flex-shrink-0 w-64 p-4 rounded-xl bg-gradient-to-br from-orange-900/30 to-black/60 backdrop-blur-sm border border-white/10 hover:border-accent-amber/40 cursor-pointer transition-all hover:scale-[1.02] group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-16 h-16 rounded-lg bg-orange-500/20 flex items-center justify-center border border-orange-400/20 flex-shrink-0">
                        <UtensilsCrossed className="w-7 h-7 text-orange-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1 mb-1">
                          <TrendingUp className="w-3 h-3 text-orange-500" />
                          <span className="text-orange-500 text-[9px] font-bold">#{index + 1} TREND</span>
                        </div>
                        <h4 className="text-white font-medium text-sm line-clamp-1 group-hover:text-accent-amber transition-colors">Trend Restoran {index + 1}</h4>
                        <p className="text-white/50 text-[10px] mt-1">Kadıköy • Fine Dining</p>
                        <div className="flex items-center gap-1 mt-2">
                          <Star className="w-3 h-3 fill-accent-amber text-accent-amber" />
                          <span className="text-accent-amber font-bold text-sm">4.{8 - index % 3}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Main Grid Section Title */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent-amber" />
              <h3 className="text-lg font-bold text-white">Tüm <span className="text-accent-amber">Restoranlar</span></h3>
            </div>
            <span className="text-white/40 text-xs">10 restoran</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
            {[...Array(10)].map((_, index) => (
              <RestaurantCard key={index} index={index} onReserve={() => setIsReservationOpen(true)} />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <button 
              className="bg-black hover:bg-accent-amber text-white hover:text-black px-6 py-2.5 rounded-full font-medium text-xs transition-all border border-white/10 hover:border-accent-amber flex items-center gap-2 hover:scale-105"
              data-testid="button-load-more-restaurants"
            >
              <ChevronDown className="w-4 h-4" />
              Daha Fazla Göster
            </button>
          </div>

          {/* Testimonials Section */}
          <div className="mt-12 mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Quote className="w-5 h-5 text-accent-amber" />
              <h3 className="text-lg font-bold text-white">Misafir <span className="text-accent-amber">Yorumları</span></h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "Can B.", text: "Yemekler muhteşemdi! Şef'in önerisi ile gittiğimiz menü beklentilerimizi aştı.", rating: 5 },
                { name: "Selin K.", text: "Rezervasyon süreci çok kolaydı. Restoran tam zamanında hazırdı.", rating: 5 },
                { name: "Burak A.", text: "Atmosfer ve servis mükemmel. Özel günler için kesinlikle öneriyorum.", rating: 5 },
              ].map((review, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 hover:border-accent-amber/20 transition-all"
                >
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-accent-amber text-accent-amber" />
                    ))}
                  </div>
                  <p className="text-white/70 text-sm mb-3 italic">"{review.text}"</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-accent-amber flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{review.name.charAt(0)}</span>
                    </div>
                    <span className="text-white/60 text-xs">{review.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      <FilterDialog isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} type="restaurant" />
      <ReservationDialog isOpen={isReservationOpen} onClose={() => setIsReservationOpen(false)} />
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

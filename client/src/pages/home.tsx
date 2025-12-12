import { useState, useRef } from "react";
import { Link } from "wouter";
import Header from "@/components/header";
import HeroCarousel from "@/components/hero-carousel";
import OvalAdBanner from "@/components/oval-ad-banner";
import AdApplicationButton from "@/components/ad-application-button";
import EmailSubscription from "@/components/email-subscription";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Calendar, UtensilsCrossed, MapPin, Clock, Star, Heart, ChevronRight, ChevronLeft } from "lucide-react";

const FeaturedEventCard = ({ index }: { index: number }) => (
  <div 
    className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-accent-amber/50 transition-all duration-300 group cursor-pointer hover:shadow-xl hover:shadow-accent-amber/10 flex-shrink-0 w-[260px] sm:w-[300px]"
    data-testid={`featured-event-${index}`}
  >
    <div className="relative h-32 sm:h-40 bg-gradient-to-br from-purple-900/30 to-gray-800">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-purple-500/20 flex items-center justify-center">
          <Calendar className="w-7 h-7 text-purple-400" />
        </div>
      </div>
      <div className="absolute top-2 left-2">
        <span className="bg-accent-amber text-black text-[10px] font-bold px-2 py-0.5 rounded-full">Yakında</span>
      </div>
      <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white hover:text-red-500 transition-colors">
        <Heart className="w-4 h-4" />
      </button>
    </div>
    <div className="p-4 space-y-2">
      <h3 className="font-bold text-white group-hover:text-accent-amber transition-colors line-clamp-1 text-sm sm:text-base">
        Etkinlik Başlığı
      </h3>
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <Calendar className="w-3.5 h-3.5 text-accent-amber" />
        <span>— — ——</span>
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <MapPin className="w-3.5 h-3.5 text-accent-amber" />
        <span className="line-clamp-1">Konum Bilgisi</span>
      </div>
      <div className="pt-3 border-t border-gray-700 flex items-center justify-between">
        <span className="text-accent-amber font-bold text-lg">— ₺</span>
        <Link href="/bilet-al">
          <Button size="sm" className="bg-accent-amber text-black hover:bg-yellow-400 font-semibold rounded-full px-4 text-xs h-8">
            Bilet Al
          </Button>
        </Link>
      </div>
    </div>
  </div>
);

const FeaturedRestaurantCard = ({ index }: { index: number }) => (
  <div 
    className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-accent-amber/50 transition-all duration-300 group cursor-pointer hover:shadow-xl hover:shadow-accent-amber/10 flex-shrink-0 w-[260px] sm:w-[300px]"
    data-testid={`featured-restaurant-${index}`}
  >
    <div className="relative h-32 sm:h-40 bg-gradient-to-br from-amber-900/30 to-gray-800">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-amber-500/20 flex items-center justify-center">
          <UtensilsCrossed className="w-7 h-7 text-amber-400" />
        </div>
      </div>
      <div className="absolute top-2 left-2 flex gap-1.5">
        <span className="bg-accent-amber text-black text-[10px] font-bold px-2 py-0.5 rounded-full">Popüler</span>
        <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Açık</span>
      </div>
      <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white hover:text-red-500 transition-colors">
        <Heart className="w-4 h-4" />
      </button>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
        <div className="flex items-center gap-1 text-accent-amber text-xs">
          <Star className="w-3.5 h-3.5 fill-accent-amber" />
          <span className="font-medium">—</span>
        </div>
      </div>
    </div>
    <div className="p-4 space-y-2">
      <h3 className="font-bold text-white group-hover:text-accent-amber transition-colors line-clamp-1 text-sm sm:text-base">
        Restoran Adı
      </h3>
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <MapPin className="w-3.5 h-3.5 text-accent-amber" />
        <span className="line-clamp-1">Konum Bilgisi</span>
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <Clock className="w-3.5 h-3.5 text-accent-amber" />
        <span>—:— - —:—</span>
      </div>
      <div className="pt-3 border-t border-gray-700 flex items-center justify-between">
        <span className="text-accent-amber font-bold text-lg">—— ₺</span>
        <Link href="/restoranlar">
          <Button size="sm" className="bg-accent-amber text-black hover:bg-yellow-400 font-semibold rounded-full px-4 text-xs h-8">
            Rezervasyon
          </Button>
        </Link>
      </div>
    </div>
  </div>
);

export default function Home() {
  const eventsRef = useRef<HTMLDivElement>(null);
  const restaurantsRef = useRef<HTMLDivElement>(null);

  const scrollEvents = (direction: "left" | "right") => {
    if (eventsRef.current) {
      const scrollAmount = 320;
      eventsRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const scrollRestaurants = (direction: "left" | "right") => {
    if (restaurantsRef.current) {
      const scrollAmount = 320;
      restaurantsRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <Header />
      
      <HeroCarousel />
      
      <OvalAdBanner />
      
      <AdApplicationButton />

      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-accent-amber" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Öne Çıkan Etkinlikler</h2>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => scrollEvents("left")}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black border border-gray-700 flex items-center justify-center text-white hover:bg-accent-amber hover:text-black hover:border-accent-amber transition-all"
                data-testid="events-scroll-left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scrollEvents("right")}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black border border-gray-700 flex items-center justify-center text-white hover:bg-accent-amber hover:text-black hover:border-accent-amber transition-all"
                data-testid="events-scroll-right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <Link href="/etkinlikler">
                <Button variant="ghost" className="text-accent-amber hover:text-yellow-400 text-sm sm:text-base hidden sm:flex">
                  Tümünü Gör
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
          <div 
            ref={eventsRef}
            className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {[...Array(8)].map((_, i) => (
              <FeaturedEventCard key={i} index={i} />
            ))}
          </div>
          <div className="mt-4 flex justify-center sm:hidden">
            <Link href="/etkinlikler">
              <Button variant="outline" size="sm" className="border-accent-amber text-accent-amber hover:bg-accent-amber hover:text-black">
                Tümünü Gör
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 bg-gradient-to-b from-transparent via-gray-900/30 to-transparent">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <UtensilsCrossed className="w-6 h-6 sm:w-7 sm:h-7 text-accent-amber" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Popüler Restoranlar</h2>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => scrollRestaurants("left")}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black border border-gray-700 flex items-center justify-center text-white hover:bg-accent-amber hover:text-black hover:border-accent-amber transition-all"
                data-testid="restaurants-scroll-left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scrollRestaurants("right")}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black border border-gray-700 flex items-center justify-center text-white hover:bg-accent-amber hover:text-black hover:border-accent-amber transition-all"
                data-testid="restaurants-scroll-right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <Link href="/restoranlar">
                <Button variant="ghost" className="text-accent-amber hover:text-yellow-400 text-sm sm:text-base hidden sm:flex">
                  Tümünü Gör
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
          <div 
            ref={restaurantsRef}
            className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {[...Array(8)].map((_, i) => (
              <FeaturedRestaurantCard key={i} index={i} />
            ))}
          </div>
          <div className="mt-4 flex justify-center sm:hidden">
            <Link href="/restoranlar">
              <Button variant="outline" size="sm" className="border-accent-amber text-accent-amber hover:bg-accent-amber hover:text-black">
                Tümünü Gör
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <EmailSubscription />

      <Footer />
    </div>
  );
}

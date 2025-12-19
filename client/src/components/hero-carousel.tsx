import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Music, Theater, Wrench, PartyPopper, Users, Mic2, Wine, Coffee, Disc3, UtensilsCrossed, Clock } from "lucide-react";
import { Link } from "wouter";
import GlassButton from "./glass-button";
import eventImage from "@assets/stock_images/luxury_concert_hall__dfa50100.jpg";
import joinImage from "@assets/stock_images/crowd_people_enjoyin_e049ed7f.jpg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const slides = [
  {
    id: 1,
    backgroundImage: eventImage,
    title: "Özel Etkinlikler",
    description: "Hayalinizdeki konserler ve etkinlikler burada",
  },
  {
    id: 2,
    backgroundImage: joinImage,
    title: "Aramıza Katıl",
    description: "İndirimlerden faydalan, avantajları yakala!",
  }
];

const categories = [
  { name: "Konser", icon: Music },
  { name: "Tiyatro", icon: Theater },
  { name: "Workshop", icon: Wrench },
  { name: "Festival", icon: PartyPopper },
  { name: "Konferans", icon: Users },
  { name: "Stand-up", icon: Mic2 },
  { name: "Happy Hour", icon: Wine },
  { name: "Café & Brunch", icon: Coffee },
  { name: "Club & DJ", icon: Disc3 },
  { name: "Restoran", icon: UtensilsCrossed },
];

interface HeroCarouselProps {
  onCategorySelect?: (category: string | null) => void;
  selectedCategory?: string | null;
}

export default function HeroCarousel({ onCategorySelect, selectedCategory }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dialogCategory, setDialogCategory] = useState<typeof categories[0] | null>(null);
  const [isCategoryPaused, setIsCategoryPaused] = useState(false);
  const totalSlides = slides.length;
  const scrollRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleCategoryClick = (category: typeof categories[0]) => {
    if (onCategorySelect) {
      if (selectedCategory === category.name) {
        onCategorySelect(null);
      } else {
        onCategorySelect(category.name);
      }
    } else {
      setDialogCategory(category);
    }
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || isCategoryPaused) return;

    let scrollPosition = scrollContainer.scrollLeft;
    const scrollSpeed = 0.5;

    const scroll = () => {
      scrollPosition += scrollSpeed;
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      scrollContainer.scrollLeft = scrollPosition;
    };

    const interval = setInterval(scroll, 20);
    return () => clearInterval(interval);
  }, [isCategoryPaused]);

  return (
    <>
      <section className="relative h-[50vh] md:h-[55vh] overflow-hidden mt-16">
        <div className="relative w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
              style={{
                backgroundImage: `linear-gradient(rgba(5,5,5,0.4), rgba(11,11,11,0.85)), url('${slide.backgroundImage}')`,
                backgroundSize: "cover",
                backgroundPosition: "center 30%"
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4 md:space-y-5 px-4 max-w-4xl">
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight text-white drop-shadow-2xl">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl lg:text-2xl text-[#F7C600] font-semibold drop-shadow-lg">
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="absolute bottom-16 md:bottom-20 left-1/2 transform -translate-x-1/2 z-10 px-4 w-full flex justify-center">
          <Link href="/signup">
            <GlassButton
              variant="outline"
              size="md"
              data-testid="button-hero-signup"
            >
              Üye Ol
            </GlassButton>
          </Link>
        </div>
        
        <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? "bg-[#F7C600] shadow-[0_0_10px_rgba(247,198,0,0.5)]" 
                  : "bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-3 md:left-5 top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 md:right-5 top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent pt-10 pb-2">
          <div 
            ref={scrollRef}
            className="overflow-hidden whitespace-nowrap"
            style={{ maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}
            onMouseEnter={() => setIsCategoryPaused(true)}
            onMouseLeave={() => setIsCategoryPaused(false)}
          >
            <div className="inline-flex gap-2 md:gap-3 px-4 animate-none">
              {[...categories, ...categories].map((category, index) => {
                const IconComponent = category.icon;
                const isActive = selectedCategory === category.name;
                return (
                  <button
                    key={index}
                    onClick={() => handleCategoryClick(category)}
                    className={`
                      inline-flex items-center gap-1.5 md:gap-2 px-4 md:px-5 py-2 md:py-2.5 
                      rounded-full text-xs md:text-sm font-semibold 
                      backdrop-blur-xl border
                      transition-all duration-300 ease-out
                      hover:scale-105 active:scale-95
                      whitespace-nowrap cursor-pointer
                      ${isActive 
                        ? "bg-[#F7C600]/20 border-[#F7C600] text-[#F7C600] shadow-[0_0_20px_rgba(247,198,0,0.3)]"
                        : "bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20"
                      }
                    `}
                    data-testid={`category-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <IconComponent className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Dialog open={!!dialogCategory} onOpenChange={() => setDialogCategory(null)}>
        <DialogContent className="bg-[#0B0B0B]/95 backdrop-blur-2xl border border-white/10 max-w-md mx-auto shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl md:text-3xl font-bold text-white flex items-center justify-center gap-3">
              {dialogCategory && (
                <>
                  <div className="p-2.5 rounded-2xl bg-[#F7C600]/20 border border-[#F7C600]/30">
                    <dialogCategory.icon className="w-6 h-6 md:w-8 md:h-8 text-[#F7C600]" />
                  </div>
                  <span className="text-[#F7C600]">{dialogCategory.name}</span>
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-6 md:py-8 text-center space-y-6">
            <div className="flex items-center justify-center gap-2 text-[#F7C600]">
              <Clock className="w-5 h-5 animate-spin" style={{ animationDuration: "3s" }} />
              <span className="text-sm font-medium uppercase tracking-widest">Çok Yakında</span>
              <Clock className="w-5 h-5 animate-spin" style={{ animationDuration: "3s" }} />
            </div>
            
            <div className="space-y-3">
              <p className="text-xl md:text-2xl font-bold text-white">
                Heyecan Verici Deneyimler
              </p>
              <p className="text-lg md:text-xl text-[#F7C600] font-semibold">
                Kapınızda!
              </p>
            </div>
            
            <p className="text-gray-400 text-sm md:text-base max-w-xs mx-auto leading-relaxed">
              <span className="text-white font-medium">{dialogCategory?.name}</span> etkinlikleri için geri sayım başladı. 
              Üye olun, ilk siz haberdar olun!
            </p>
            
            <div className="pt-4">
              <Link href="/signup">
                <GlassButton
                  variant="primary"
                  size="lg"
                  onClick={() => setDialogCategory(null)}
                >
                  Hemen Üye Ol
                </GlassButton>
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

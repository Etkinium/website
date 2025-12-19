import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Music, Theater, Wrench, PartyPopper, Users, Mic2, Wine, Coffee, Disc3, UtensilsCrossed, Clock } from "lucide-react";
import { Link } from "wouter";
import PremiumButton from "./premium-button";
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
      <section className="relative h-[45vh] md:h-[50vh] overflow-hidden mt-14">
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
                <div className="text-center space-y-3 md:space-y-4 px-4 max-w-3xl">
                  <h1 className="text-2xl md:text-4xl lg:text-5xl font-black leading-tight text-white drop-shadow-2xl">
                    {slide.title}
                  </h1>
                  <p className="text-base md:text-lg lg:text-xl text-[#F7C600] font-semibold drop-shadow-lg">
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="absolute bottom-14 md:bottom-16 left-1/2 transform -translate-x-1/2 z-10 px-4">
          <Link href="/signup">
            <PremiumButton variant="primary" size="md" data-testid="button-hero-signup">
              Üye Ol
            </PremiumButton>
          </Link>
        </div>
        
        <div className="absolute bottom-5 md:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-1.5">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? "bg-[#F7C600] w-5 shadow-[0_0_8px_rgba(247,198,0,0.5)]" 
                  : "bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        <PremiumButton
          variant="icon"
          size="sm"
          onClick={prevSlide}
          className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2"
        >
          <ChevronLeft className="w-4 h-4" />
        </PremiumButton>
        <PremiumButton
          variant="icon"
          size="sm"
          onClick={nextSlide}
          className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2"
        >
          <ChevronRight className="w-4 h-4" />
        </PremiumButton>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent pt-8 pb-1.5">
          <div 
            ref={scrollRef}
            className="overflow-hidden whitespace-nowrap"
            style={{ maskImage: "linear-gradient(to right, transparent, black 4%, black 96%, transparent)" }}
            onMouseEnter={() => setIsCategoryPaused(true)}
            onMouseLeave={() => setIsCategoryPaused(false)}
          >
            <div className="inline-flex gap-1.5 md:gap-2 px-4 animate-none">
              {[...categories, ...categories].map((category, index) => {
                const IconComponent = category.icon;
                const isActive = selectedCategory === category.name;
                return (
                  <button
                    key={index}
                    onClick={() => handleCategoryClick(category)}
                    className={`
                      inline-flex items-center gap-1 md:gap-1.5 px-2.5 md:px-3 py-1.5 md:py-2 
                      rounded-lg text-[10px] md:text-xs font-medium 
                      backdrop-blur-xl border
                      transition-all duration-200 ease-out
                      active:scale-95
                      whitespace-nowrap cursor-pointer
                      ${isActive 
                        ? "bg-[#F7C600]/15 border-[#F7C600]/40 text-[#F7C600] shadow-[0_0_12px_rgba(247,198,0,0.2)]"
                        : "bg-white/5 border-white/10 text-white hover:bg-white/8 hover:border-white/15"
                      }
                    `}
                    data-testid={`category-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <IconComponent className="w-3 h-3 md:w-3.5 md:h-3.5" />
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Dialog open={!!dialogCategory} onOpenChange={() => setDialogCategory(null)}>
        <DialogContent className="bg-[#0B0B0B]/95 backdrop-blur-2xl border border-white/10 max-w-sm mx-auto shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-xl md:text-2xl font-bold text-white flex items-center justify-center gap-2">
              {dialogCategory && (
                <>
                  <div className="p-2 rounded-lg bg-[#F7C600]/15 border border-[#F7C600]/30">
                    <dialogCategory.icon className="w-5 h-5 md:w-6 md:h-6 text-[#F7C600]" />
                  </div>
                  <span className="text-[#F7C600]">{dialogCategory.name}</span>
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-5 md:py-6 text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-[#F7C600]">
              <Clock className="w-4 h-4 animate-spin" style={{ animationDuration: "3s" }} />
              <span className="text-xs font-medium uppercase tracking-widest">Çok Yakında</span>
              <Clock className="w-4 h-4 animate-spin" style={{ animationDuration: "3s" }} />
            </div>
            
            <div className="space-y-2">
              <p className="text-lg md:text-xl font-bold text-white">
                Heyecan Verici Deneyimler
              </p>
              <p className="text-base md:text-lg text-[#F7C600] font-semibold">
                Kapınızda!
              </p>
            </div>
            
            <p className="text-gray-400 text-xs md:text-sm max-w-xs mx-auto leading-relaxed">
              <span className="text-white font-medium">{dialogCategory?.name}</span> etkinlikleri için geri sayım başladı. 
              Üye olun, ilk siz haberdar olun!
            </p>
            
            <div className="pt-3">
              <Link href="/signup">
                <PremiumButton
                  variant="primary"
                  size="md"
                  onClick={() => setDialogCategory(null)}
                >
                  Hemen Üye Ol
                </PremiumButton>
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

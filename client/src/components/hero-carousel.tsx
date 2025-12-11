import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import eventImage from "@assets/stock_images/luxury_concert_hall__dfa50100.jpg";
import joinImage from "@assets/stock_images/crowd_people_enjoyin_e049ed7f.jpg";

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
  "Konser",
  "Tiyatro", 
  "Workshop",
  "Festival",
  "Konferans",
  "Stand-up",
  "Happy Hour",
  "Café & Brunch",
  "Club & DJ",
  "Restoran",
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
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

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
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
  }, []);

  return (
    <section className="relative h-[50vh] md:h-[55vh] overflow-hidden mt-16">
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(25,20,20,0.85)), url('${slide.backgroundImage}')`,
              backgroundSize: "cover",
              backgroundPosition: "center 30%"
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-3 md:space-y-4 px-4 max-w-4xl">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight text-white">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl text-accent-amber font-semibold">
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-16 md:bottom-20 left-1/2 transform -translate-x-1/2 z-10 px-4 w-full flex justify-center">
        <Link href="/signup">
          <Button
            size="lg"
            className="text-white bg-black border border-gray-600 hover:bg-accent-amber hover:text-black font-bold px-5 md:px-8 py-2.5 md:py-3 rounded-full transition-all transform hover:scale-105 text-sm md:text-base"
            data-testid="button-hero-signup"
          >
            Üye Ol
          </Button>
        </Link>
      </div>
      
      <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-opacity ${
              index === currentSlide ? "bg-white opacity-100" : "bg-white opacity-50"
            }`}
          />
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 md:p-3 rounded-full transition-all"
      >
        <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 md:p-3 rounded-full transition-all"
      >
        <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
      </button>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent pt-8 pb-2">
        <div 
          ref={scrollRef}
          className="overflow-hidden whitespace-nowrap"
          style={{ maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}
        >
          <div className="inline-flex gap-2 md:gap-3 px-4 animate-none">
            {[...categories, ...categories].map((category, index) => (
              <button
                key={index}
                className="inline-flex items-center px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all hover:scale-105 whitespace-nowrap"
                style={{
                  background: "rgba(255,214,0,0.1)",
                  border: "1px solid rgba(255,214,0,0.3)",
                  color: "#ffd600",
                }}
                data-testid={`category-${category.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

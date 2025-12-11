import { useState, useEffect } from "react";
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

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slides.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[75vh] overflow-hidden mt-16">
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(25,20,20,0.8)), url('${slide.backgroundImage}')`,
              backgroundSize: "cover",
              backgroundPosition: "center 30%"
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-6 px-4 max-w-4xl animate-slide-in">
                <h1 className="text-5xl md:text-7xl font-black leading-tight text-white">
                  {slide.title}
                </h1>
                <p className="text-2xl md:text-3xl text-accent-amber font-semibold">
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Fixed Signup Button */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10 px-4 w-full flex justify-center">
        <Link href="/signup">
          <Button
            size="lg"
            className="text-white bg-black border border-gray-600 hover:bg-accent-amber hover:text-black font-bold px-6 md:px-8 py-3 md:py-4 rounded-full transition-all transform hover:scale-105 text-base md:text-lg"
            data-testid="button-hero-signup"
          >
            Üye Ol
          </Button>
        </Link>
      </div>
      
      {/* Carousel Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-opacity ${
              index === currentSlide ? "bg-white opacity-100" : "bg-white opacity-50"
            }`}
          />
        ))}
      </div>

      {/* Carousel Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </section>
  );
}

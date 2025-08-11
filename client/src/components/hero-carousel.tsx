import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    id: 1,
    backgroundImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    title: ["Müziğin", "Gücünü", "Keşfet"],
    titleColors: ["text-white", "text-spotify-green", "text-white"],
    description: "Türkiye'nin en büyük müzik ve etkinlik platformunda binlerce konsere erişim",
    buttonText: "Hemen Keşfet",
    buttonGradient: "from-spotify-green to-accent-purple"
  },
  {
    id: 2,
    backgroundImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    title: ["Premium", "Deneyim"],
    titleColors: ["text-accent-purple", "text-white"],
    description: "HD kalitede canlı yayınlar, özel içerikler ve sınırsız erişim",
    buttonText: "Premium'a Geç",
    buttonGradient: "from-accent-purple to-accent-blue"
  },
  {
    id: 3,
    backgroundImage: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    title: ["Biletini", "Al", "Eğlenceye Katıl"],
    titleColors: ["text-white", "text-accent-amber", "text-white"],
    description: "Güvenli ödeme, anında bilet teslimatı ve en iyi yerler",
    buttonText: "Bilet Al",
    buttonGradient: "from-accent-amber to-red-500"
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
    <section className="relative h-screen overflow-hidden mt-16">
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
              backgroundPosition: "center"
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-6 px-4 max-w-4xl animate-slide-in">
                <h1 className="text-5xl md:text-7xl font-black leading-tight">
                  {slide.title.map((word, wordIndex) => (
                    <span key={wordIndex} className={`${slide.titleColors[wordIndex]} mr-4`}>
                      {word}
                    </span>
                  ))}
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
                  {slide.description}
                </p>
                <Button 
                  className={`bg-gradient-to-r ${slide.buttonGradient} text-white px-8 py-4 text-lg font-semibold hover:scale-105 transition-transform shadow-2xl h-auto`}
                >
                  {slide.buttonText}
                </Button>
              </div>
            </div>
          </div>
        ))}
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

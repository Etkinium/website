import { useState, useEffect } from "react";
import Header from "@/components/header";
import HeroCarousel from "@/components/hero-carousel";
import EmailSubscription from "@/components/email-subscription";
import Footer from "@/components/footer";
import logoImage from "@assets/logo-final.png";

const horizontalSlides = [
  {
    id: 1,
    logo: logoImage,
    brandName: "ETKİNİUM",
    tagline: "Tek Platform, Sonsuz Sanat"
  },
  {
    id: 2,
    title: "Lansmana Özel",
    description: "%10 İndirim + 100 Puan Hediye!"
  },
  {
    id: 3,
    title: "Her İşlemde",
    description: "ETKİNİUM Puan Kazan"
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % horizontalSlides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <Header />
      
      <HeroCarousel />

      {/* HORIZONTAL SLIDER - Genişlemesine, Kompakt */}
      <section className="bg-gradient-to-b from-spotify-black via-gray-900 to-spotify-black py-8 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-900 via-black to-gray-900 border border-accent-amber/30 shadow-xl"
               style={{ height: "140px" }}>
            <div className="relative h-full">
              {horizontalSlides.map((slide, index) => {
                const position = index - currentSlide;
                const isActive = index === currentSlide;
                const isPrev = position === -1 || (currentSlide === 0 && index === horizontalSlides.length - 1);
                const isNext = position === 1 || (currentSlide === horizontalSlides.length - 1 && index === 0);
                
                return (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                      isActive ? "translate-x-0 opacity-100 z-10" :
                      isPrev ? "-translate-x-full opacity-0 z-0" :
                      isNext ? "translate-x-full opacity-0 z-0" :
                      "translate-x-full opacity-0 z-0"
                    }`}
                    data-testid={`horizontal-slide-${index}`}
                  >
                    {slide.logo ? (
                      <div className="flex items-center justify-center h-full gap-6 px-8">
                        <img 
                          src={slide.logo}
                          alt="ETKİNİUM Logo"
                          className="w-20 h-20 md:w-24 md:h-24 object-contain"
                        />
                        <div>
                          <h2 className="text-3xl md:text-4xl font-bold text-accent-amber mb-1">
                            {slide.brandName}
                          </h2>
                          <p className="text-lg md:text-xl text-white font-semibold">
                            {slide.tagline}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full px-8">
                        <div className="text-center">
                          <h3 className="text-2xl md:text-3xl font-bold text-accent-amber mb-2">
                            {slide.title}
                          </h3>
                          <p className="text-lg md:text-xl text-white font-semibold">
                            {slide.description}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* DOTS - Horizontal Slider */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
              {horizontalSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "w-8 h-3 bg-accent-amber"
                      : "w-3 h-3 bg-white/30 hover:bg-white/50"
                  }`}
                  data-testid={`horizontal-dot-${index}`}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* REKLAM VERMEK İÇİN - Bağımsız */}
          <div className="text-center mt-6">
            <p className="text-sm md:text-base text-gray-400">
              Reklam vermek için:{" "}
              <a 
                href="mailto:iletisim@etkinium.com"
                className="text-accent-amber hover:underline font-semibold"
              >
                iletisim@etkinium.com
              </a>
            </p>
          </div>
        </div>
      </section>
      
      <EmailSubscription />

      <Footer />
    </div>
  );
}

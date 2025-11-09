import { useState, useEffect } from "react";
import Header from "@/components/header";
import HeroCarousel from "@/components/hero-carousel";
import EmailSubscription from "@/components/email-subscription";
import Footer from "@/components/footer";
import AdvertisingButton from "@/components/advertising-button";
import logoImage from "@assets/logo-final.png";

const verticalSlides = [
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
      setCurrentSlide((prev) => (prev + 1) % verticalSlides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <Header />
      
      <HeroCarousel />

      {/* VERTICAL SLIDER - Yukarı-Aşağı, Yatay Uzun Dikey Kısa */}
      <section className="bg-gradient-to-b from-spotify-black via-gray-900 to-spotify-black py-6 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-orange-600/20 via-red-600/20 to-orange-600/20 border-2 border-accent-amber/40 shadow-2xl"
               style={{ height: "120px" }}>
            <div className="relative h-full">
              {verticalSlides.map((slide, index) => {
                const position = index - currentSlide;
                const isActive = index === currentSlide;
                const isPrev = position === -1 || (currentSlide === 0 && index === verticalSlides.length - 1);
                const isNext = position === 1 || (currentSlide === verticalSlides.length - 1 && index === 0);
                
                return (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                      isActive ? "translate-y-0 opacity-100 z-10" :
                      isPrev ? "translate-y-full opacity-0 z-0" :
                      isNext ? "-translate-y-full opacity-0 z-0" :
                      "-translate-y-full opacity-0 z-0"
                    }`}
                    data-testid={`vertical-slide-${index}`}
                  >
                    {slide.logo ? (
                      <div className="flex items-center justify-start h-full gap-3 px-6">
                        <div className="flex-shrink-0">
                          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-accent-amber/30">
                            <img 
                              src={slide.logo}
                              alt="ETKİNİUM Logo"
                              className="w-14 h-14 object-contain"
                            />
                          </div>
                        </div>
                        <div>
                          <h2 className="text-xl md:text-2xl font-bold text-accent-amber">
                            {slide.brandName}
                          </h2>
                          <p className="text-sm md:text-base text-white/90 font-medium">
                            {slide.tagline}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full px-6">
                        <div className="text-center">
                          <h3 className="text-lg md:text-xl font-bold text-accent-amber mb-1">
                            {slide.title}
                          </h3>
                          <p className="text-sm md:text-base text-white/90 font-medium">
                            {slide.description}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* DOTS - Vertical Slider */}
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 z-20">
              {verticalSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`rounded-full transition-all duration-300 shadow-lg ${
                    index === currentSlide
                      ? "h-6 w-2.5 bg-accent-amber ring-2 ring-accent-amber/50"
                      : "h-2.5 w-2.5 bg-white/40 hover:bg-white/70"
                  }`}
                  data-testid={`vertical-dot-${index}`}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* REKLAM VERMEK İÇİN BUTON */}
          <AdvertisingButton />
        </div>
      </section>
      
      <EmailSubscription />

      <Footer />
    </div>
  );
}

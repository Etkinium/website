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
    tagline: "TEK PLATFORM, SONSUZ SANAT"
  },
  {
    id: 2,
    title: "YENİ ÖZELLİKLER",
    description: "ÇOK YAKINDA SİZLERLE"
  },
  {
    id: 3,
    title: "REKLAM ALANLARIMIZ",
    description: "MARKANIZI MİLYONLARA ULAŞTIRIN"
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % verticalSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <Header />
      
      <HeroCarousel />

      {/* VERTICAL SLIDER - Billboard Style */}
      <section className="bg-spotify-black py-8 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-neutral-950 border border-neutral-800/50 shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
               style={{ height: "160px" }}>
            
            {/* Sol Altın Şerit - Billboard Accent */}
            <div className="absolute left-0 top-4 bottom-4 w-1.5 bg-gradient-to-b from-[#d4af37] via-[#f5d76e] to-[#8a6c1d] rounded-r-full" />
            
            {/* Subtle Vignette */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none" />
            
            <div className="relative h-full">
              {verticalSlides.map((slide, index) => {
                const isActive = index === currentSlide;
                
                return (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-all duration-700 ease-out ${
                      isActive ? "translate-y-0 opacity-100 z-10" : "translate-y-8 opacity-0 z-0"
                    }`}
                    data-testid={`vertical-slide-${index}`}
                  >
                    {slide.logo ? (
                      <div className="flex items-center justify-start h-full gap-6 px-10 md:px-14">
                        <div className="flex-shrink-0">
                          <img 
                            src={slide.logo}
                            alt="ETKİNİUM Logo"
                            className="w-20 h-20 md:w-24 md:h-24 object-contain"
                          />
                        </div>
                        <div>
                          <h2 className="text-4xl md:text-5xl font-black text-[#f5d76e] tracking-wide uppercase">
                            {slide.brandName}
                          </h2>
                          <p className="text-base md:text-lg text-white/90 font-semibold tracking-[0.15em] uppercase mt-1">
                            {slide.tagline}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full px-10">
                        <div className="text-center">
                          <h3 className="text-3xl md:text-4xl font-black text-[#f5d76e] tracking-wide uppercase">
                            {slide.title}
                          </h3>
                          <p className="text-base md:text-lg text-white/90 font-semibold tracking-[0.12em] uppercase mt-2">
                            {slide.description}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Navigation - Dash Bar Style */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
              {verticalSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentSlide
                      ? "w-12 h-2 bg-[#f5d76e]"
                      : "w-4 h-2 bg-neutral-600 hover:bg-neutral-400"
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

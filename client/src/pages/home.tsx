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
  const [prevSlide, setPrevSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = (newIndex: number) => {
    if (isAnimating || newIndex === currentSlide) return;
    setIsAnimating(true);
    setPrevSlide(currentSlide);
    setCurrentSlide(newIndex);
    setTimeout(() => setIsAnimating(false), 800);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextSlide = (currentSlide + 1) % verticalSlides.length;
      goToSlide(nextSlide);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, isAnimating]);

  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <Header />
      
      <HeroCarousel />

      {/* BILLBOARD SLIDER - Metro Style */}
      <section className="bg-spotify-black py-8 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-xl bg-neutral-950 border-4 border-neutral-800/80 shadow-[0_30px_80px_rgba(0,0,0,0.9)]"
               style={{ height: "200px" }}>
            
            {/* Sol Altın Şerit - Billboard Accent */}
            <div className="absolute left-0 top-6 bottom-6 w-1 bg-gradient-to-b from-[#d4af37] via-[#f5d76e] to-[#8a6c1d] rounded-r-full z-10" />
            
            {/* Sağ Altın Şerit - Billboard Accent */}
            <div className="absolute right-0 top-6 bottom-6 w-1 bg-gradient-to-b from-[#d4af37] via-[#f5d76e] to-[#8a6c1d] rounded-l-full z-10" />
            
            {/* Metro Style Slider */}
            <div className="relative h-full bg-neutral-950">
              {verticalSlides.map((slide, index) => {
                const isActive = index === currentSlide;
                const isPrev = index === prevSlide;
                
                const shouldShow = isActive || (isPrev && isAnimating);
                
                let transformStyle = 'translateY(100%)';
                let zIndex = 0;
                
                if (isActive) {
                  transformStyle = 'translateY(0)';
                  zIndex = 10;
                } else if (isPrev && isAnimating) {
                  transformStyle = 'translateY(-100%)';
                  zIndex = 5;
                }
                
                return (
                  <div
                    key={slide.id}
                    className="absolute inset-0 bg-neutral-950"
                    style={{ 
                      transform: transformStyle,
                      transition: shouldShow ? 'transform 700ms ease-in-out' : 'none',
                      zIndex,
                      willChange: 'transform'
                    }}
                    data-testid={`vertical-slide-${index}`}
                  >
                    {slide.logo ? (
                      <div className="flex flex-col items-center justify-center h-full gap-3 px-10">
                        <img 
                          src={slide.logo}
                          alt="ETKİNİUM Logo"
                          className="w-14 h-14 md:w-16 md:h-16 object-contain"
                        />
                        <div className="text-center">
                          <h2 className="text-2xl md:text-3xl font-black text-[#f5d76e] tracking-[0.18em] uppercase">
                            {slide.brandName}
                          </h2>
                          <p className="text-xs md:text-sm text-white/90 font-semibold tracking-[0.22em] uppercase mt-1">
                            {slide.tagline}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full px-10">
                        <h3 className="text-2xl md:text-3xl font-black text-[#f5d76e] tracking-[0.15em] uppercase text-center">
                          {slide.title}
                        </h3>
                        <p className="text-xs md:text-sm text-white/90 font-semibold tracking-[0.18em] uppercase mt-2 text-center">
                          {slide.description}
                        </p>
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
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentSlide
                      ? "w-10 h-1.5 bg-[#f5d76e]"
                      : "w-3 h-1.5 bg-neutral-600 hover:bg-neutral-400"
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

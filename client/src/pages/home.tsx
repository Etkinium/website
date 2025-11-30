import { useState, useEffect, useRef, useCallback } from "react";
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
    subtitle: "Dijital Biletleme Ekosistemi"
  },
  {
    id: 2,
    title: "YENİ ÖZELLİKLER",
    subtitle: "Çok Yakında Sizlerle"
  },
  {
    id: 3,
    title: "REKLAM ALANLARI",
    subtitle: "Markanızı Milyonlara Ulaştırın"
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const animatingRef = useRef(false);

  const goToSlide = useCallback((newIndex: number, isAutomatic: boolean = false) => {
    if (animatingRef.current && !isAutomatic) return;
    if (newIndex === currentSlide && !isAutomatic) return;
    
    animatingRef.current = true;
    setIsAnimating(true);
    setPrevSlide(currentSlide);
    setCurrentSlide(newIndex);
    
    setTimeout(() => {
      animatingRef.current = false;
      setIsAnimating(false);
    }, 700);
  }, [currentSlide]);

  const startTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setCurrentSlide(prev => {
        const nextSlide = (prev + 1) % verticalSlides.length;
        setPrevSlide(prev);
        setIsAnimating(true);
        animatingRef.current = true;
        setTimeout(() => {
          animatingRef.current = false;
          setIsAnimating(false);
        }, 700);
        return nextSlide;
      });
    }, 5000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [startTimer]);

  const handleDotClick = (index: number) => {
    if (index === currentSlide) return;
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    goToSlide(index, false);
    startTimer();
  };

  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <Header />
      
      <HeroCarousel />

      {/* PROFESSIONAL AD BANNER - TV Style */}
      <section className="bg-spotify-black py-8 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Outer Frame - Thick Dark Border */}
          <div className="rounded-2xl p-3 md:p-4 bg-[#1a1a2e] shadow-[0_0_60px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.05)]">
            {/* Inner Banner Container */}
            <div className="relative overflow-hidden rounded-xl"
                 style={{ height: "140px" }}>
              
              {/* Slides */}
              <div className="relative h-full">
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
                      className="absolute inset-0 bg-gradient-to-r from-orange-600 via-red-500 to-red-700"
                      style={{ 
                        transform: transformStyle,
                        transition: shouldShow ? 'transform 600ms ease-in-out' : 'none',
                        zIndex,
                        willChange: 'transform'
                      }}
                      data-testid={`vertical-slide-${index}`}
                    >
                      {/* CANLI Badge */}
                      <div className="absolute top-3 left-4 z-20">
                        <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider shadow-lg">
                          CANLI
                        </span>
                      </div>

                      {/* Content - Logo and Title Side by Side */}
                      <div className="flex items-center h-full px-6 md:px-10">
                        {slide.logo ? (
                          <div className="flex items-center gap-4 md:gap-6">
                            <img 
                              src={slide.logo}
                              alt="ETKİNİUM Logo"
                              className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]"
                            />
                            <div>
                              <h2 className="text-2xl md:text-4xl font-black text-white tracking-wide uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                                {slide.brandName}
                              </h2>
                              <p className="text-sm md:text-base text-white/90 font-medium mt-1">
                                {slide.subtitle}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-4 md:gap-6">
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                              <span className="text-3xl md:text-4xl">📢</span>
                            </div>
                            <div>
                              <h3 className="text-2xl md:text-4xl font-black text-white tracking-wide uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                                {slide.title}
                              </h3>
                              <p className="text-sm md:text-base text-white/90 font-medium mt-1">
                                {slide.subtitle}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Right Side Info */}
                        <div className="ml-auto text-right hidden md:block">
                          <div className="text-xs text-white/70 font-medium">Gündüz Kuşağı 09:00-18:00</div>
                          <div className="text-xl font-bold text-[#f5d76e] mt-1">₺5.000/hafta</div>
                          <div className="text-xs text-white/60 mt-1">Reklam • 8 saniye</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Navigation Dots */}
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                {verticalSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentSlide
                        ? "w-8 h-2 bg-white"
                        : "w-2 h-2 bg-white/40 hover:bg-white/60"
                    }`}
                    data-testid={`vertical-dot-${index}`}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </div>
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

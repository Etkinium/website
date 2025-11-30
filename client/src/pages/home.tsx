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
    title: "Yeni Özellikler",
    description: "Çok Yakında Sizlerle!"
  },
  {
    id: 3,
    title: "Reklamlarınız İçin İdeal Platform",
    description: "partner@etkinium.com ile iletişime geçebilirsiniz"
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

      {/* VERTICAL SLIDER - Premium Oval Tasarım */}
      <section className="bg-gradient-to-b from-spotify-black via-gray-900 to-spotify-black py-8 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-[60px] bg-gradient-to-r from-black via-gray-900/95 to-black border-[6px] border-accent-amber shadow-[0_0_50px_rgba(251,191,36,0.4),0_0_100px_rgba(251,191,36,0.2),inset_0_0_30px_rgba(251,191,36,0.1)] hover:shadow-[0_0_60px_rgba(251,191,36,0.6),0_0_120px_rgba(251,191,36,0.3),inset_0_0_40px_rgba(251,191,36,0.15)] transition-all duration-500"
               style={{ height: "140px" }}>
            
            {/* Işık Efekti Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent-amber/5 via-transparent to-accent-amber/5 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-accent-amber/10 via-transparent to-accent-amber/10 pointer-events-none" />
            
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
                      <div className="flex items-center justify-start h-full gap-5 px-8 md:px-12">
                        <div className="flex-shrink-0 relative">
                          {/* Logo Glow Effect */}
                          <div className="absolute -inset-3 bg-accent-amber/30 rounded-full blur-xl animate-pulse" />
                          <img 
                            src={slide.logo}
                            alt="ETKİNİUM Logo"
                            className="relative w-20 h-20 object-contain drop-shadow-[0_0_20px_rgba(251,191,36,0.8)] filter brightness-110"
                          />
                        </div>
                        <div>
                          <h2 className="text-3xl md:text-4xl font-bold text-accent-amber drop-shadow-[0_2px_15px_rgba(251,191,36,0.5)]">
                            {slide.brandName}
                          </h2>
                          <p className="text-lg md:text-xl text-white font-medium drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                            {slide.tagline}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full px-8">
                        <div className="text-center">
                          <h3 className="text-2xl md:text-3xl font-bold text-accent-amber mb-2 drop-shadow-[0_2px_15px_rgba(251,191,36,0.5)]">
                            {slide.title}
                          </h3>
                          <p className="text-lg md:text-xl text-white font-medium drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                            {slide.description}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* DOTS - Premium Style */}
            <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-2.5 z-20">
              {verticalSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "h-7 w-3 bg-accent-amber ring-2 ring-accent-amber/60 shadow-[0_0_15px_rgba(251,191,36,0.8)]"
                      : "h-3 w-3 bg-white/50 hover:bg-white/80 shadow-lg"
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

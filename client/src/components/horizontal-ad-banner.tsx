import { useState, useEffect } from "react";
import rezervemLogo from "@assets/{09392C43-F854-4BFE-B0DA-97F11129A06F}_1765451772211.png";
import tamamliyoLogo from "@assets/{A79D2DB2-9549-46FF-9111-672F0B5566FC}_1765452914094.png";
import faturaportLogo from "@assets/download_1765541159072.png";
import etkineumLogo from "@assets/logo-final.png";

const adSlides = [
  {
    id: 1,
    logo: rezervemLogo,
    text: "Misafirperverliğin Geleceği!",
    brand: "Rezervem",
    bgColor: "#ffffff",
    textColor: "#1a5c3a",
  },
  {
    id: 2,
    logo: tamamliyoLogo,
    text: "Sigortayı Dijitale Kolayca Entegre Edin!",
    brand: "Tamamliyo",
    bgColor: "#f5f7fa",
    textColor: "#1e3a5f",
  },
  {
    id: 3,
    logo: faturaportLogo,
    text: "e-fatura'nın Mobili!",
    brand: "Faturaport",
    bgColor: "#ffffff",
    textColor: "#1e3a8a",
  },
  {
    id: 4,
    logo: etkineumLogo,
    text: "Markanızı Öne Çıkarın!",
    brand: "ETKİNİUM",
    bgColor: "#000000",
    textColor: "#ffd600",
    isPromo: true,
  },
];

export default function HorizontalAdBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % adSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="w-full px-4 py-4">
      <div 
        className="relative mx-auto w-full max-w-6xl h-[80px] md:h-[100px] rounded-2xl overflow-hidden"
        style={{ 
          boxShadow: "0 8px 32px rgba(255,214,0,0.15), 0 4px 16px rgba(0,0,0,0.4)",
          border: "3px solid rgba(255,214,0,0.5)",
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        data-testid="horizontal-ad-banner"
      >
        {adSlides.map((slide, index) => (
          <div
            key={slide.id}
            className="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out px-6 md:px-12"
            style={{
              transform: `translateX(${
                index === currentIndex 
                  ? "0%" 
                  : index === (currentIndex - 1 + adSlides.length) % adSlides.length 
                    ? "-100%" 
                    : "100%"
              })`,
              opacity: index === currentIndex ? 1 : 0,
              backgroundColor: slide.bgColor,
            }}
            data-testid={`horizontal-ad-slide-${index}`}
          >
            {slide.isPromo ? (
              <div className="flex items-center justify-center gap-4 md:gap-8 w-full">
                <img 
                  src={slide.logo} 
                  alt="ETKİNİUM" 
                  className="h-12 md:h-16 w-auto object-contain"
                />
                <div className="flex flex-col items-start">
                  <span 
                    className="text-lg md:text-2xl font-bold"
                    style={{ color: slide.textColor }}
                  >
                    {slide.text}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-4 md:gap-8 w-full">
                <img 
                  src={slide.logo} 
                  alt={slide.brand} 
                  className="h-10 md:h-14 w-auto object-contain max-w-[120px] md:max-w-[180px]"
                />
                <div className="h-10 md:h-14 w-px bg-gray-300" />
                <div className="flex flex-col items-start">
                  <span 
                    className="text-base md:text-xl font-bold leading-tight"
                    style={{ color: slide.textColor }}
                  >
                    {slide.text}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {adSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300"
              style={{
                backgroundColor: index === currentIndex ? "#ffd600" : "rgba(128,128,128,0.5)",
                transform: index === currentIndex ? "scale(1.3)" : "scale(1)",
              }}
              data-testid={`horizontal-ad-dot-${index}`}
            />
          ))}
        </div>

        <div className="absolute top-2 right-3 md:right-4">
          <span className="text-[9px] md:text-[10px] font-medium bg-gradient-to-r from-gray-900 to-black text-accent-amber/80 px-2 py-0.5 rounded-md border border-accent-amber/30 tracking-wide uppercase">
            Reklam
          </span>
        </div>
      </div>
    </div>
  );
}

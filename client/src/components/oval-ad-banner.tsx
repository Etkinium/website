import { useState, useEffect } from "react";
import rezervemLogo from "@assets/{09392C43-F854-4BFE-B0DA-97F11129A06F}_1765451772211.png";
import tamamliyoLogo from "@assets/{A79D2DB2-9549-46FF-9111-672F0B5566FC}_1765452914094.png";
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
    logo: etkineumLogo,
    text: "Markanızı Öne Çıkarın!",
    brand: "ETKİNİUM",
    bgColor: "#000000",
    textColor: "#ffd600",
    isPromo: true,
  },
];

export default function OvalAdBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % adSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full px-3 md:px-4 py-4 md:py-6">
      <div 
        className="relative mx-auto w-full max-w-[900px] h-[56px] md:h-[65px] rounded-full overflow-hidden cursor-pointer group"
        style={{ 
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          border: "2px solid rgba(255,214,0,0.4)",
        }}
        data-testid="oval-ad-banner"
      >
        {adSlides.map((slide, index) => (
          <div
            key={slide.id}
            className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out px-3 md:px-6"
            style={{
              transform: `translateY(${
                index === currentIndex 
                  ? "0%" 
                  : index === (currentIndex - 1 + adSlides.length) % adSlides.length 
                    ? "-100%" 
                    : "100%"
              })`,
              opacity: index === currentIndex ? 1 : 0,
              backgroundColor: slide.bgColor,
            }}
            data-testid={`ad-slide-${index}`}
          >
            {slide.isPromo ? (
              <div className="flex items-center justify-center gap-2 md:gap-4 w-full">
                <img 
                  src={slide.logo} 
                  alt="ETKİNİUM" 
                  className="h-7 md:h-9 w-auto object-contain"
                />
                <div className="flex items-center gap-2">
                  <span 
                    className="text-sm md:text-base font-bold"
                    style={{ color: slide.textColor }}
                  >
                    {slide.text}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-3 md:gap-5 w-full">
                <img 
                  src={slide.logo} 
                  alt={slide.brand} 
                  className="h-6 md:h-8 w-auto object-contain max-w-[100px] md:max-w-[140px]"
                />
                <div className="h-5 md:h-6 w-px bg-gray-300" />
                <span 
                  className="text-xs md:text-sm font-semibold text-center leading-tight"
                  style={{ color: slide.textColor }}
                >
                  {slide.text}
                </span>
              </div>
            )}
          </div>
        ))}

        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1 z-10">
          {adSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: index === currentIndex ? "#ffd600" : "rgba(0,0,0,0.3)",
                transform: index === currentIndex ? "scale(1.2)" : "scale(1)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

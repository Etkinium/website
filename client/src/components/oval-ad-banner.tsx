import { useState, useEffect } from "react";
import rezervemLogo from "@assets/{09392C43-F854-4BFE-B0DA-97F11129A06F}_1765451772211.png";
import tamamliyoLogo from "@assets/{A79D2DB2-9549-46FF-9111-672F0B5566FC}_1765452914094.png";
import faturaportLogo from "@assets/download_1765541159072.png";
import etkineumLogo from "@assets/logo-final.png";
import GlassButton from "./glass-button";

const adSlides = [
  {
    id: 1,
    logo: rezervemLogo,
    text: "Misafirperverliğin Geleceği!",
    brand: "Rezervem",
  },
  {
    id: 2,
    logo: tamamliyoLogo,
    text: "Sigortayı Dijitale Kolayca Entegre Edin!",
    brand: "Tamamliyo",
  },
  {
    id: 3,
    logo: faturaportLogo,
    text: "e-fatura'nın Mobili!",
    brand: "Faturaport",
  },
  {
    id: 4,
    logo: etkineumLogo,
    text: "Markanızı Öne Çıkarın!",
    brand: "ETKİNİUM",
    isPromo: true,
  },
];

export default function OvalAdBanner() {
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
      <div className="max-w-4xl mx-auto space-y-3">
        <div 
          className="relative h-[60px] md:h-[70px] rounded-2xl overflow-hidden cursor-pointer backdrop-blur-xl border border-white/10 shadow-lg"
          style={{ 
            background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          data-testid="oval-ad-banner"
        >
          {adSlides.map((slide, index) => (
            <div
              key={slide.id}
              className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out px-4 md:px-8"
              style={{
                transform: `translateY(${
                  index === currentIndex 
                    ? "0%" 
                    : index === (currentIndex - 1 + adSlides.length) % adSlides.length 
                      ? "-100%" 
                      : "100%"
                })`,
                opacity: index === currentIndex ? 1 : 0,
              }}
              data-testid={`ad-slide-${index}`}
            >
              <div className="flex items-center justify-center gap-4 md:gap-6 w-full">
                <img 
                  src={slide.logo} 
                  alt={slide.brand} 
                  className={`h-7 md:h-9 w-auto object-contain ${slide.isPromo ? "" : "brightness-0 invert"}`}
                  style={{ maxWidth: slide.isPromo ? "auto" : "120px" }}
                />
                <div className="h-5 md:h-6 w-px bg-white/20" />
                <span className={`text-sm md:text-base font-semibold ${slide.isPromo ? "text-[#F7C600]" : "text-white"}`}>
                  {slide.text}
                </span>
              </div>
            </div>
          ))}

          <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-10">
            {adSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "bg-[#F7C600] shadow-[0_0_6px_rgba(247,198,0,0.5)]" 
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <GlassButton variant="outline" size="sm" data-testid="ad-cta-button">
            Reklam Vermek İçin Başvurun
          </GlassButton>
        </div>
      </div>
    </div>
  );
}

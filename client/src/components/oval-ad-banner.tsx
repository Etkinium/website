import { useState, useEffect } from "react";
import rezervemLogo from "@assets/{09392C43-F854-4BFE-B0DA-97F11129A06F}_1765451772211.png";
import tamamliyoLogo from "@assets/{A79D2DB2-9549-46FF-9111-672F0B5566FC}_1765452914094.png";
import faturaportLogo from "@assets/download_1765541159072.png";
import etkineumLogo from "@assets/logo-final.png";
import PremiumButton from "./premium-button";

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
    <div className="w-full px-4 py-3">
      <div className="max-w-4xl mx-auto space-y-2">
        <div 
          className="relative h-[50px] md:h-[56px] rounded-xl overflow-hidden cursor-pointer bg-white/5 backdrop-blur-xl border border-white/10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          data-testid="oval-ad-banner"
        >
          {adSlides.map((slide, index) => (
            <div
              key={slide.id}
              className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out px-4 md:px-6"
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
              <div className="flex items-center justify-center gap-3 md:gap-4 w-full">
                <img 
                  src={slide.logo} 
                  alt={slide.brand} 
                  className={`h-5 md:h-6 w-auto object-contain ${slide.isPromo ? "" : "brightness-0 invert opacity-90"}`}
                  style={{ maxWidth: "100px" }}
                />
                <div className="h-4 w-px bg-white/20" />
                <div className="flex items-center gap-2">
                  <span className="text-[10px] md:text-xs font-bold text-white/60 uppercase tracking-wide">
                    {slide.brand}
                  </span>
                  <span className={`text-xs md:text-sm font-semibold ${slide.isPromo ? "text-[#F7C600]" : "text-white"}`}>
                    {slide.text}
                  </span>
                </div>
              </div>
            </div>
          ))}

          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1 z-10">
            {adSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-1 h-1 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "bg-[#F7C600] w-3" 
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <PremiumButton variant="default" size="sm" data-testid="ad-cta-button">
            Reklam Vermek İçin Başvurun
          </PremiumButton>
        </div>
      </div>
    </div>
  );
}

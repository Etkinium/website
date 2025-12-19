import { useState, useEffect } from "react";
import rezervemLogo from "@assets/image_1766155425910.png";
import tamamliyoLogo from "@assets/image_1766155443496.png";
import faturaportLogo from "@assets/image_1766155455861.png";
import etkineumLogo from "@assets/logo-final.png";
import PremiumButton from "./premium-button";

const adSlides = [
  { id: 1, logo: rezervemLogo, brand: "Rezervem" },
  { id: 2, logo: tamamliyoLogo, brand: "Tamamliyo" },
  { id: 3, logo: faturaportLogo, brand: "Faturaport" },
  { id: 4, logo: etkineumLogo, brand: "ETKİNİUM", isPromo: true },
];

export default function OvalAdBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % adSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="w-full px-4 py-4">
      <div className="max-w-4xl mx-auto">
        <div 
          className="relative h-[60px] md:h-[70px] rounded-xl overflow-hidden cursor-pointer bg-[#0A0A0A] border border-white/10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          data-testid="oval-ad-banner"
        >
          {adSlides.map((slide, index) => (
            <div
              key={slide.id}
              className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out px-6"
              style={{
                transform: `translateY(${index === currentIndex ? "0%" : index === (currentIndex - 1 + adSlides.length) % adSlides.length ? "-100%" : "100%"})`,
                opacity: index === currentIndex ? 1 : 0,
              }}
              data-testid={`ad-slide-${index}`}
            >
              <img 
                src={slide.logo} 
                alt={slide.brand} 
                className="h-8 md:h-10 w-auto object-contain"
                style={{ maxWidth: "200px" }}
              />
            </div>
          ))}

          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-10">
            {adSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-[#F7C600] w-4" : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-3">
          <PremiumButton variant="default" size="sm" data-testid="ad-cta-button">
            Reklam Vermek İçin Başvurun
          </PremiumButton>
        </div>
      </div>
    </div>
  );
}

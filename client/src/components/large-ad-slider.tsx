import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PremiumButton from "./premium-button";

import rezervemLogo from "@assets/image_1766155425910.png";
import tamamliyoLogo from "@assets/image_1766155443496.png";
import faturaportLogo from "@assets/image_1766155455861.png";
import etkineumLogo from "@assets/logo-final.png";

const adSlides = [
  { id: 1, logo: rezervemLogo, brand: "Rezervem", tagline: "Misafirperverliğin Geleceği" },
  { id: 2, logo: tamamliyoLogo, brand: "Tamamliyo", tagline: "Sigorta Çözümleri" },
  { id: 3, logo: faturaportLogo, brand: "Faturaport", tagline: "e-Fatura'nın Mobili" },
  { id: 4, logo: etkineumLogo, brand: "ETKİNİUM", tagline: "Reklam Alanınız", isPromo: true },
];

export default function LargeAdSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi || isPaused) return;
    const interval = setInterval(() => emblaApi.scrollNext(), 3000);
    return () => clearInterval(interval);
  }, [emblaApi, isPaused]);

  return (
    <section className="py-4 md:py-6">
      <div className="container mx-auto px-4">
        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div 
            className="bg-[#0A0A0A] border border-white/15 rounded-2xl overflow-hidden"
            style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
          >
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {adSlides.map((slide) => (
                  <div key={slide.id} className="flex-[0_0_100%] min-w-0">
                    <div className="h-[100px] md:h-[140px] flex items-center justify-center gap-4 md:gap-6 px-6">
                      <img 
                        src={slide.logo} 
                        alt={slide.brand}
                        className="h-10 md:h-14 w-auto object-contain"
                        style={{ maxWidth: "180px" }}
                      />
                      <div className="hidden sm:block h-8 w-px bg-white/20" />
                      <div className="hidden sm:block text-center">
                        <span className="text-[#F7C600] font-bold text-sm md:text-base">{slide.brand}</span>
                        <p className="text-gray-400 text-xs md:text-sm">{slide.tagline}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {adSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    index === selectedIndex ? "bg-[#F7C600] w-5" : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          <PremiumButton
            variant="icon"
            size="sm"
            onClick={scrollPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10"
          >
            <ChevronLeft className="w-3 h-3" />
          </PremiumButton>
          <PremiumButton
            variant="icon"
            size="sm"
            onClick={scrollNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10"
          >
            <ChevronRight className="w-3 h-3" />
          </PremiumButton>
        </div>

        <div className="flex justify-center mt-3">
          <PremiumButton variant="default" size="sm" data-testid="ad-apply-button">
            Reklam Vermek İçin Başvurun
          </PremiumButton>
        </div>
      </div>
    </section>
  );
}

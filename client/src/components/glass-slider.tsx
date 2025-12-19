import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PremiumButton from "./premium-button";

import rezervemLogo from "@assets/image_1766155425910.png";
import tamamliyoLogo from "@assets/image_1766155443496.png";
import faturaportLogo from "@assets/image_1766155455861.png";
import etkineumLogo from "@assets/logo-final.png";

const partners = [
  { id: 1, logo: rezervemLogo, name: "Rezervem" },
  { id: 2, logo: tamamliyoLogo, name: "Tamamliyo" },
  { id: 3, logo: faturaportLogo, name: "Faturaport" },
  { id: 4, logo: etkineumLogo, name: "ETKİNİUM" },
];

export default function GlassSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    slidesToScroll: 1,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

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
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => emblaApi.scrollNext(), 3500);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="py-6 md:py-8">
      <div className="container mx-auto px-4">
        <div className="relative">
          <div 
            className="bg-gradient-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-2xl border border-white/15 rounded-2xl md:rounded-3xl p-4 md:p-6 overflow-hidden"
            style={{ 
              boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
          >
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {partners.map((partner, index) => (
                  <div
                    key={partner.id}
                    className="flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%] min-w-0 px-2 md:px-3"
                  >
                    <div 
                      className={`
                        h-20 md:h-24 rounded-xl flex items-center justify-center
                        transition-all duration-300 ease-out
                        ${selectedIndex === index 
                          ? "bg-white/10 border border-[#F7C600]/30 scale-105 shadow-[0_0_20px_rgba(247,198,0,0.15)]" 
                          : "bg-white/5 border border-white/10 hover:bg-white/8"
                        }
                      `}
                    >
                      <img 
                        src={partner.logo} 
                        alt={partner.name}
                        className="h-8 md:h-10 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                        style={{ maxWidth: "140px" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <PremiumButton
              variant="icon"
              size="sm"
              onClick={scrollPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </PremiumButton>
            <PremiumButton
              variant="icon"
              size="sm"
              onClick={scrollNext}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </PremiumButton>
          </div>

          <div className="flex justify-center gap-1.5 mt-3">
            {partners.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  index === selectedIndex ? "bg-[#F7C600] w-4" : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

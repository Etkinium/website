import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Building2 } from "lucide-react";
import PremiumButton from "./premium-button";

const sponsors = [
  { id: 1, name: "Partner 1" },
  { id: 2, name: "Partner 2" },
  { id: 3, name: "Partner 3" },
  { id: 4, name: "Partner 4" },
  { id: 5, name: "Partner 5" },
  { id: 6, name: "Partner 6" },
];

export default function SponsorSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="py-6 md:py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center">
              <Building2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#F7C600]" />
            </div>
            <h2 className="text-base md:text-lg font-semibold text-white">Sponsorlar</h2>
          </div>
          <div className="flex items-center gap-1.5">
            <PremiumButton
              variant="icon"
              size="sm"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </PremiumButton>
            <PremiumButton
              variant="icon"
              size="sm"
              onClick={scrollNext}
              disabled={!canScrollNext}
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </PremiumButton>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-4 md:p-6 h-[120px] md:h-[160px]">
          <div className="overflow-hidden h-full" ref={emblaRef}>
            <div className="flex gap-3 md:gap-4 h-full">
              {sponsors.map((sponsor) => (
                <div
                  key={sponsor.id}
                  className="flex-[0_0_30%] md:flex-[0_0_20%] lg:flex-[0_0_16%] min-w-0"
                >
                  <div className="h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-white/8 hover:border-white/15 transition-all duration-200">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-white/10 flex items-center justify-center">
                      <Building2 className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />
                    </div>
                    <span className="text-[10px] md:text-xs text-gray-400 font-medium">{sponsor.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useRef } from "react";
import { Calendar, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import PremiumButton from "./premium-button";
import { Link } from "wouter";

interface Top10Event {
  id: number;
  rank: number;
}

export default function Top10List() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const events: Top10Event[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    rank: i + 1,
  }));

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 220;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="py-5 md:py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-gradient-to-r from-[#F7C600] to-[#FFD93D] flex items-center justify-center">
              <span className="text-black font-black text-xs md:text-sm">10</span>
            </div>
            <h2 className="text-base md:text-lg font-semibold text-white">Top 10 Etkinlik</h2>
          </div>
          <div className="flex items-center gap-1.5">
            <PremiumButton variant="icon" size="sm" onClick={() => scroll("left")}>
              <ChevronLeft className="w-3.5 h-3.5" />
            </PremiumButton>
            <PremiumButton variant="icon" size="sm" onClick={() => scroll("right")}>
              <ChevronRight className="w-3.5 h-3.5" />
            </PremiumButton>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex gap-2.5 overflow-x-auto pb-2 -mx-4 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory"
          style={{ maskImage: "linear-gradient(to right, transparent, black 2%, black 98%, transparent)" }}
        >
          {events.map((event) => (
            <div
              key={event.id}
              className="group flex-shrink-0 w-[200px] md:w-[220px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-3 flex flex-col gap-2 hover:bg-white/8 hover:border-white/15 hover:shadow-lg hover:shadow-black/20 transition-all duration-200 snap-start"
              data-testid={`top10-item-${event.rank}`}
            >
              <div className="flex items-center gap-2.5">
                <div className={`
                  flex-shrink-0 w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center font-black text-sm md:text-base
                  ${event.rank <= 3 
                    ? "bg-gradient-to-br from-[#F7C600] to-[#FFD93D] text-black" 
                    : "bg-white/10 text-white border border-white/10"
                  }
                `}>
                  {event.rank}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-white text-xs md:text-sm truncate group-hover:text-[#F7C600] transition-colors">
                    Etkinlik Başlığı
                  </h3>
                  <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-0.5">
                    <Calendar className="w-2.5 h-2.5 text-[#F7C600]" />
                    <span>— — ——</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[10px] text-gray-400">
                <MapPin className="w-2.5 h-2.5 text-[#F7C600]" />
                <span className="truncate">Konum Bilgisi</span>
              </div>

              <div className="flex items-center justify-between pt-1.5 border-t border-white/10">
                <span className="text-[#F7C600] font-bold text-xs md:text-sm">— ₺</span>
                <Link href="/bilet-al">
                  <PremiumButton variant="primary" size="sm" className="text-[10px] px-2.5 py-1" data-testid={`top10-buy-${event.rank}`}>
                    Satın Al
                  </PremiumButton>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

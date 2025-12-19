import { useRef } from "react";
import { Calendar, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import GlassButton from "./glass-button";
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
      const scrollAmount = 280;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-[#F7C600] to-[#FFD93D] flex items-center justify-center">
              <span className="text-black font-black text-sm">10</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white">Top 10 Etkinlik</h2>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => scroll("left")}
              className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={() => scroll("right")}
              className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto pb-3 -mx-4 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory"
        >
          {events.map((event) => (
            <div
              key={event.id}
              className="group flex-shrink-0 w-[260px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col gap-3 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_25px_rgba(247,198,0,0.1)] hover:scale-[1.02] transition-all duration-300 snap-start"
              data-testid={`top10-item-${event.rank}`}
            >
              <div className="flex items-center gap-3">
                <div className={`
                  flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg
                  ${event.rank <= 3 
                    ? "bg-gradient-to-br from-[#F7C600] to-[#FFD93D] text-black" 
                    : "bg-white/10 text-white border border-white/10"
                  }
                `}>
                  {event.rank}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white text-sm truncate group-hover:text-[#F7C600] transition-colors">
                    Etkinlik Başlığı
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
                    <Calendar className="w-3 h-3 text-[#F7C600]" />
                    <span>— — ——</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <MapPin className="w-3 h-3 text-[#F7C600]" />
                <span className="truncate">Konum Bilgisi</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <span className="text-[#F7C600] font-bold">— ₺</span>
                <Link href="/bilet-al">
                  <GlassButton variant="primary" size="sm" className="text-xs px-3 py-1.5" data-testid={`top10-buy-${event.rank}`}>
                    Satın Al
                  </GlassButton>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

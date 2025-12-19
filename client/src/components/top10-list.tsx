import { Calendar, MapPin } from "lucide-react";
import PremiumButton from "./premium-button";
import { Link } from "wouter";

interface Top10Event {
  id: number;
  rank: number;
}

export default function Top10List() {
  const events: Top10Event[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    rank: i + 1,
  }));

  const row1 = events.slice(0, 4);
  const row2 = events.slice(4, 7);
  const row3 = events.slice(7, 10);

  const renderItem = (event: Top10Event) => (
    <div
      key={event.id}
      className="group flex-1 min-w-0 bg-[#0A0A0A] border border-white/15 rounded-lg p-2 flex items-center gap-2 hover:border-[#F7C600]/40 transition-all"
      data-testid={`top10-item-${event.rank}`}
    >
      <div className={`
        flex-shrink-0 w-6 h-6 rounded flex items-center justify-center font-black text-[10px]
        ${event.rank <= 3 
          ? "bg-[#F7C600] text-black" 
          : "bg-white/10 text-white border border-white/10"
        }
      `}>
        {event.rank}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-white text-[9px] md:text-[10px] truncate group-hover:text-[#F7C600] transition-colors">
          Etkinlik
        </h3>
        <div className="flex items-center gap-1 text-[7px] md:text-[8px] text-gray-400">
          <Calendar className="w-2 h-2 text-[#F7C600]" />
          <span>—</span>
          <MapPin className="w-2 h-2 text-[#F7C600] ml-1" />
          <span className="truncate">—</span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className="text-[#F7C600] font-bold text-[9px]">—₺</span>
        <Link href="/bilet-al">
          <PremiumButton variant="primary" size="sm" className="text-[7px] px-1.5 py-0.5" data-testid={`top10-buy-${event.rank}`}>
            Al
          </PremiumButton>
        </Link>
      </div>
    </div>
  );

  return (
    <section className="py-4 md:py-5">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded bg-[#F7C600] flex items-center justify-center">
            <span className="text-black font-black text-[10px]">10</span>
          </div>
          <h2 className="text-sm md:text-base font-semibold text-white">Top 10</h2>
        </div>

        <div className="space-y-1.5">
          <div className="flex gap-1.5">{row1.map(renderItem)}</div>
          <div className="flex gap-1.5">{row2.map(renderItem)}</div>
          <div className="flex gap-1.5">{row3.map(renderItem)}</div>
        </div>
      </div>
    </section>
  );
}

import { Calendar, MapPin, Users } from "lucide-react";
import GlassButton from "./glass-button";
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

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#F7C600] to-[#FFD93D] flex items-center justify-center">
            <span className="text-black font-black text-lg">10</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Top 10 Etkinlik</h2>
        </div>

        <div className="space-y-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-center gap-4 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_30px_rgba(247,198,0,0.1)] transition-all duration-300"
              data-testid={`top10-item-${event.rank}`}
            >
              <div className={`
                flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl
                ${event.rank <= 3 
                  ? "bg-gradient-to-br from-[#F7C600] to-[#FFD93D] text-black" 
                  : "bg-white/10 text-white border border-white/10"
                }
              `}>
                {event.rank}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-white text-lg truncate group-hover:text-[#F7C600] transition-colors">
                  Etkinlik Başlığı
                </h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-400 mt-1">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#F7C600]" />
                    <span>— — ——</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#F7C600]" />
                    <span>Konum Bilgisi</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#F7C600]" />
                    <span>— kişi ilgileniyor</span>
                  </span>
                </div>
              </div>

              <div className="flex-shrink-0 flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <span className="text-[#F7C600] font-bold text-xl">— ₺</span>
                  <p className="text-gray-500 text-xs">başlayan fiyatlarla</p>
                </div>
                <Link href="/bilet-al">
                  <GlassButton variant="primary" size="md" data-testid={`top10-buy-${event.rank}`}>
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

import { Heart, Calendar, MapPin } from "lucide-react";
import PremiumButton from "./premium-button";
import { Link } from "wouter";

interface EventCardProps {
  index: number;
  badge?: "indirim" | "tukeniyor" | null;
  categories?: string[];
}

export default function EventCard({ index, badge, categories = [] }: EventCardProps) {
  return (
    <div 
      className="group flex-shrink-0 w-[180px] md:w-[200px] bg-[#0B0B0B] backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hover:bg-white/5 hover:border-white/15 hover:shadow-[0_4px_24px_rgba(247,198,0,0.08)] hover:scale-[1.02] transition-all duration-200 snap-start"
      data-testid={`event-card-${index}`}
    >
      <div className="relative aspect-[3/4] bg-gradient-to-br from-purple-900/30 via-gray-900 to-[#0B0B0B]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center">
            <Calendar className="w-6 h-6 md:w-7 md:h-7 text-purple-400" />
          </div>
        </div>

        {badge && (
          <div className="absolute top-2 left-2">
            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md ${
              badge === "indirim" 
                ? "bg-red-500/90 text-white" 
                : "bg-orange-500/90 text-white"
            }`}>
              {badge === "indirim" ? "İndirim" : "Tükeniyor"}
            </span>
          </div>
        )}

        <button className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-black/50 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:text-red-500 hover:border-red-500/30 active:scale-95 transition-all duration-200">
          <Heart className="w-3.5 h-3.5" />
        </button>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/80 to-transparent p-3 pt-10">
          {categories.length > 0 && (
            <div className="flex gap-1 overflow-hidden">
              {categories.slice(0, 2).map((cat, i) => (
                <span 
                  key={i} 
                  className="text-[8px] font-semibold px-1.5 py-0.5 rounded bg-white/10 backdrop-blur-xl border border-white/10 text-white uppercase tracking-wide"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="p-3 space-y-1.5">
        <h3 className="font-semibold text-white text-xs md:text-sm line-clamp-2 group-hover:text-[#F7C600] transition-colors leading-tight">
          Etkinlik Başlığı
        </h3>

        <div className="flex items-center justify-between text-[10px] md:text-xs">
          <span className="text-[#F7C600] font-medium">Cum, 19 Ara</span>
          <span className="text-[#F7C600] font-bold">₺—</span>
        </div>

        <div className="flex items-center gap-1 text-[10px] text-gray-500">
          <MapPin className="w-2.5 h-2.5" />
          <span className="truncate">Mekan Adı</span>
        </div>

        <div className="pt-2">
          <Link href="/bilet-al" className="block">
            <PremiumButton variant="primary" size="sm" className="w-full text-[10px] md:text-xs">
              Bilet Al
            </PremiumButton>
          </Link>
        </div>
      </div>
    </div>
  );
}

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
      className="group flex-shrink-0 w-[140px] md:w-[160px] bg-[#0A0A0A] border border-white/15 rounded-xl overflow-hidden hover:border-[#F7C600]/40 hover:shadow-[0_4px_20px_rgba(247,198,0,0.1)] transition-all duration-200 snap-start"
      data-testid={`event-card-${index}`}
    >
      <div className="relative aspect-[3/4] bg-gradient-to-br from-purple-900/40 via-gray-900 to-[#0A0A0A]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 md:w-11 md:h-11 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center">
            <Calendar className="w-5 h-5 md:w-5 md:h-5 text-purple-400" />
          </div>
        </div>

        {badge && (
          <div className="absolute top-1.5 left-1.5">
            <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${
              badge === "indirim" ? "bg-red-500 text-white" : "bg-orange-500 text-white"
            }`}>
              {badge === "indirim" ? "İndirim" : "Tükeniyor"}
            </span>
          </div>
        )}

        <button className="absolute top-1.5 right-1.5 w-6 h-6 rounded-lg bg-black/60 border border-white/10 flex items-center justify-center text-white hover:text-red-500 hover:border-red-500/40 active:scale-95 transition-all">
          <Heart className="w-3 h-3" />
        </button>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent p-2 pt-6">
          {categories.length > 0 && (
            <div className="flex gap-0.5 overflow-hidden">
              {categories.slice(0, 2).map((cat, i) => (
                <span key={i} className="text-[7px] font-semibold px-1 py-0.5 rounded bg-white/10 border border-white/10 text-white uppercase">
                  {cat}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="p-2 space-y-1">
        <h3 className="font-semibold text-white text-[10px] md:text-xs line-clamp-2 group-hover:text-[#F7C600] transition-colors leading-tight">
          Etkinlik Başlığı
        </h3>

        <div className="flex items-center justify-between text-[9px] md:text-[10px]">
          <span className="text-[#F7C600] font-medium">Cum, 19 Ara</span>
          <span className="text-[#F7C600] font-bold">₺—</span>
        </div>

        <div className="flex items-center gap-0.5 text-[8px] md:text-[9px] text-gray-500">
          <MapPin className="w-2 h-2" />
          <span className="truncate">Mekan</span>
        </div>

        <div className="pt-1.5">
          <Link href="/bilet-al" className="block">
            <PremiumButton variant="primary" size="sm" className="w-full text-[9px] md:text-[10px] py-1">
              Bilet Al
            </PremiumButton>
          </Link>
        </div>
      </div>
    </div>
  );
}

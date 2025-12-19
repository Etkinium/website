import { Heart, Calendar, MapPin } from "lucide-react";
import GlassButton from "./glass-button";
import { Link } from "wouter";

interface EventCardProps {
  index: number;
  badge?: "indirim" | "tukeniyor" | null;
  categories?: string[];
}

export default function EventCard({ index, badge, categories = [] }: EventCardProps) {
  return (
    <div 
      className="group flex-shrink-0 w-[220px] sm:w-[240px] bg-[#0B0B0B] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:bg-white/5 hover:border-white/20 hover:shadow-[0_8px_40px_rgba(247,198,0,0.12)] hover:scale-[1.03] transition-all duration-300 snap-start"
      data-testid={`event-card-${index}`}
    >
      <div className="relative aspect-[3/4] bg-gradient-to-br from-purple-900/30 via-gray-900 to-[#0B0B0B]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center">
            <Calendar className="w-8 h-8 text-purple-400" />
          </div>
        </div>

        {badge && (
          <div className="absolute top-3 left-3">
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
              badge === "indirim" 
                ? "bg-red-500 text-white" 
                : "bg-orange-500 text-white"
            }`}>
              {badge === "indirim" ? "İndirim" : "Tükeniyor"}
            </span>
          </div>
        )}

        <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:text-red-500 hover:border-red-500/30 hover:scale-110 active:scale-95 transition-all duration-300">
          <Heart className="w-4 h-4" />
        </button>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/80 to-transparent p-4 pt-12">
          {categories.length > 0 && (
            <div className="flex gap-1.5 mb-2 overflow-hidden">
              {categories.slice(0, 2).map((cat, i) => (
                <span 
                  key={i} 
                  className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-white uppercase tracking-wide"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-white text-sm line-clamp-2 group-hover:text-[#F7C600] transition-colors leading-tight">
          Etkinlik Başlığı
        </h3>

        <div className="flex items-center justify-between text-xs">
          <span className="text-[#F7C600] font-semibold">Cum, 19 Ara</span>
          <span className="text-[#F7C600] font-bold">₺—</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <MapPin className="w-3 h-3" />
          <span className="truncate">Mekan Adı</span>
        </div>

        <div className="pt-3">
          <Link href="/bilet-al" className="block">
            <GlassButton variant="primary" size="sm" className="w-full text-xs">
              Bilet Al
            </GlassButton>
          </Link>
        </div>
      </div>
    </div>
  );
}

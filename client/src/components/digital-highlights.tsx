import { Ticket, Sparkles, Shield, Smartphone, Zap, Gift } from "lucide-react";
import PremiumButton from "./premium-button";
import { Link } from "wouter";

const highlights = [
  {
    icon: Ticket,
    title: "Anında Biletleme",
    description: "Etkinlik biletlerinizi saniyeler içinde alın",
    color: "purple",
  },
  {
    icon: Sparkles,
    title: "AI Destekli Öneriler",
    description: "Size özel etkinlik ve mekan önerileri",
    color: "amber",
  },
  {
    icon: Shield,
    title: "Güvenli Ödeme",
    description: "256-bit şifreleme ile korunan işlemler",
    color: "emerald",
  },
  {
    icon: Smartphone,
    title: "Mobil Erişim",
    description: "Her yerden, her zaman erişim",
    color: "blue",
  },
  {
    icon: Zap,
    title: "Hızlı Rezervasyon",
    description: "Restoranlar için tek tıkla rezervasyon",
    color: "orange",
  },
  {
    icon: Gift,
    title: "Özel Avantajlar",
    description: "Üyelere özel indirimler ve fırsatlar",
    color: "pink",
  },
];

const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
  purple: { bg: "bg-purple-500/20", border: "border-purple-500/40", text: "text-purple-400" },
  amber: { bg: "bg-amber-500/20", border: "border-amber-500/40", text: "text-amber-400" },
  emerald: { bg: "bg-emerald-500/20", border: "border-emerald-500/40", text: "text-emerald-400" },
  blue: { bg: "bg-blue-500/20", border: "border-blue-500/40", text: "text-blue-400" },
  orange: { bg: "bg-orange-500/20", border: "border-orange-500/40", text: "text-orange-400" },
  pink: { bg: "bg-pink-500/20", border: "border-pink-500/40", text: "text-pink-400" },
};

export default function DigitalHighlights() {
  return (
    <section className="py-6 md:py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-5">
          <h2 className="text-base md:text-lg font-bold text-white mb-1">Neden ETKİNİUM?</h2>
          <p className="text-xs md:text-sm text-gray-400">Dijital deneyimin geleceği</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
          {highlights.map((item, index) => {
            const colors = colorClasses[item.color];
            return (
              <div
                key={index}
                className="group bg-[#0A0A0A] border border-white/15 rounded-xl p-3 md:p-4 text-center hover:border-[#F7C600]/40 hover:shadow-[0_4px_20px_rgba(247,198,0,0.1)] transition-all duration-200"
                data-testid={`highlight-${index}`}
              >
                <div className={`w-10 h-10 md:w-12 md:h-12 mx-auto rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center mb-2 md:mb-3 group-hover:scale-110 transition-transform`}>
                  <item.icon className={`w-5 h-5 md:w-6 md:h-6 ${colors.text}`} />
                </div>
                <h3 className="font-semibold text-white text-[10px] md:text-xs mb-1 group-hover:text-[#F7C600] transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-[8px] md:text-[10px] leading-tight">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-4">
          <Link href="/signup">
            <PremiumButton variant="primary" size="sm" data-testid="highlights-cta">
              Hemen Başla
            </PremiumButton>
          </Link>
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/header";
import Footer from "@/components/footer";
import MobileTabBar from "@/components/mobile-tab-bar";
import { Crown, Check, Zap, Shield, RotateCcw, Star, Gift, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const premiumFeatures = [
  {
    icon: Shield,
    title: "3x İşlem Ücreti Muafiyeti",
    description: "Aylık 3 işleminizde ekstra ücret ödemezsiniz",
  },
  {
    icon: RotateCcw,
    title: "Aylık 2x Bilet İade Hakkı",
    description: "Her ay 2 biletinizi ücretsiz iade edebilirsiniz",
  },
  {
    icon: Gift,
    title: "Ekstra Çark Çevirme",
    description: "Haftalık 1 ekstra çark çevirme hakkı kazanın",
  },
  {
    icon: Star,
    title: "1.5x Puan Kazanımı",
    description: "Tüm alışverişlerinizde %50 daha fazla puan",
  },
  {
    icon: Crown,
    title: "Premium Statü Rozeti",
    description: "Profilinizde özel Premium rozeti gösterilir",
  },
  {
    icon: Zap,
    title: "Öncelikli Destek",
    description: "7/24 öncelikli müşteri desteği",
  },
];

export default function Premium() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubscribing, setIsSubscribing] = useState(false);

  const isPremiumEmail = user?.email === "berkay.gulcin@etkinium.com";

  const handleSubscribe = async () => {
    setIsSubscribing(true);
    setTimeout(() => {
      setIsSubscribing(false);
      toast({
        title: "Premium Aktif!",
        description: "ETKİNİUM Premium üyeliğiniz başarıyla aktifleştirildi.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white pb-16 md:pb-0">
      <Header />

      <div className="pt-20 sm:pt-24">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 bg-accent-amber/10 border border-accent-amber/20 px-4 py-1.5 rounded-full mb-4">
              <Crown className="w-4 h-4 text-accent-amber" />
              <span className="text-accent-amber text-xs font-semibold tracking-wide uppercase">Premium Üyelik</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
              ETKİNİUM <span className="bg-gradient-to-r from-accent-amber to-yellow-300 bg-clip-text text-transparent">Premium</span>
            </h1>
            <p className="text-white/50 text-sm sm:text-base max-w-lg mx-auto">
              Ayrıcalıklı deneyimin kapılarını aç. Daha fazla tasarruf, daha fazla hak, daha fazla puan.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div
              className="relative rounded-3xl overflow-hidden p-px"
              style={{
                background: "linear-gradient(135deg, rgba(245,158,11,0.4), rgba(234,88,12,0.2), rgba(245,158,11,0.1))",
              }}
            >
              <div className="bg-black/95 rounded-3xl p-6 sm:p-10">
                <div className="grid sm:grid-cols-2 gap-6 mb-8">
                  {premiumFeatures.map((feature, i) => {
                    const Icon = feature.icon;
                    return (
                      <div key={i} className="flex items-start gap-4 group">
                        <div className="w-10 h-10 rounded-xl bg-accent-amber/10 flex items-center justify-center flex-shrink-0 border border-accent-amber/20 group-hover:bg-accent-amber/20 transition-colors">
                          <Icon className="w-5 h-5 text-accent-amber" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white text-sm mb-0.5">{feature.title}</h3>
                          <p className="text-white/40 text-xs">{feature.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-white/10 pt-8">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl sm:text-5xl font-black text-white">₺59</span>
                        <span className="text-lg text-white/60">,99</span>
                        <span className="text-white/40 text-sm ml-1">/ ay</span>
                      </div>
                      <p className="text-white/30 text-xs mt-1">İstediğin zaman iptal edebilirsin</p>
                    </div>

                    {isPremiumEmail ? (
                      <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                        <Check className="w-5 h-5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold text-sm">Premium Aktif</span>
                      </div>
                    ) : (
                      <button
                        onClick={handleSubscribe}
                        disabled={isSubscribing}
                        className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-accent-amber to-yellow-500 hover:from-yellow-400 hover:to-accent-amber text-black font-bold text-sm transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-accent-amber/25"
                      >
                        {isSubscribing ? (
                          <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        ) : (
                          <>
                            <Crown className="w-4 h-4" />
                            Premium'a Geç
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 max-w-md mx-auto">
              {[
                { value: "₺0", label: "İşlem Ücreti (3x)" },
                { value: "2x", label: "Ücretsiz İade" },
                { value: "1.5x", label: "Puan Çarpanı" },
              ].map((stat, i) => (
                <div key={i} className="text-center p-4 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-xl sm:text-2xl font-bold text-accent-amber mb-1">{stat.value}</div>
                  <div className="text-[10px] text-white/40">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <MobileTabBar />
    </div>
  );
}
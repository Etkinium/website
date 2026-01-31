import { useState } from "react";
import { Link, useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import MobileTabBar from "@/components/mobile-tab-bar";
import { ArrowLeft, Shield, Umbrella, Star, Check, CreditCard, Lock, AlertCircle, Sparkles } from "lucide-react";

interface ProtectionOption {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: typeof Shield;
  color: string;
  benefits: string[];
}

const protectionOptions: ProtectionOption[] = [
  {
    id: "cancel",
    name: "İptal Koruması",
    description: "Etkinliğe katılamayacağınız durumlarda bilet bedelinizin %100'ünü geri alın",
    price: 29.99,
    icon: Shield,
    color: "from-blue-500 to-blue-600",
    benefits: [
      "Hastalık durumunda tam iade",
      "Acil durumlarda tam iade",
      "Hava koşulları nedeniyle iptal koruması",
      "7/24 müşteri desteği"
    ]
  },
  {
    id: "insurance",
    name: "Bilet Sigortası",
    description: "Biletiniz kaybolur veya çalınırsa yeni bilet garantisi",
    price: 19.99,
    icon: Umbrella,
    color: "from-green-500 to-green-600",
    benefits: [
      "Kayıp bilet yenileme",
      "Çalıntı durumunda yeni bilet",
      "Hasarlı bilet değişimi",
      "Dijital yedekleme hizmeti"
    ]
  },
  {
    id: "points",
    name: "1.5x Puan Kazanımı",
    description: "Bu satın alımda %50 daha fazla Etkinium puanı kazanın",
    price: 9.99,
    icon: Star,
    color: "from-accent-amber to-yellow-500",
    benefits: [
      "Standart: 100 puan → 150 puan",
      "VIP: 200 puan → 300 puan",
      "Premium: 300 puan → 450 puan",
      "Anında hesabınıza eklenir"
    ]
  }
];

export default function BiletSecenekleri() {
  const [, setLocation] = useLocation();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleOption = (optionId: string) => {
    setSelectedOptions(prev => 
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const totalExtraCost = protectionOptions
    .filter(opt => selectedOptions.includes(opt.id))
    .reduce((sum, opt) => sum + opt.price, 0);

  const handleContinue = () => {
    setLocation("/odeme");
  };

  return (
    <div className="min-h-screen bg-black text-white pb-16 md:pb-0">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link href="/bilet-detay">
            <button className="flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Bilet Seçimine Dön</span>
            </button>
          </Link>

          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-6 h-6 text-accent-amber" />
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Deneyiminizi <span className="text-accent-amber">Özelleştirin</span>
              </h1>
            </div>
            <p className="text-white/60 text-sm max-w-lg mx-auto">
              Biletinizi güvence altına alın ve daha fazla puan kazanın. 
              Seçenekler isteğe bağlıdır, doğrudan ödemeye de geçebilirsiniz.
            </p>
          </div>

          <div className="grid gap-4 mb-8">
            {protectionOptions.map((option) => {
              const IconComponent = option.icon;
              const isSelected = selectedOptions.includes(option.id);
              
              return (
                <div 
                  key={option.id}
                  onClick={() => toggleOption(option.id)}
                  className={`relative p-5 rounded-xl cursor-pointer transition-all hover:scale-[1.01] ${
                    isSelected 
                      ? "ring-2 ring-accent-amber bg-accent-amber/10" 
                      : "bg-black/60 hover:bg-black/80"
                  }`}
                  style={{
                    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                    border: isSelected ? "1px solid rgba(245,158,11,0.5)" : "1px solid rgba(255,255,255,0.1)"
                  }}
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Icon and Checkbox */}
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${option.color} flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div 
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          isSelected 
                            ? "bg-accent-amber border-accent-amber" 
                            : "border-white/30 bg-transparent"
                        }`}
                      >
                        {isSelected && <Check className="w-4 h-4 text-black" />}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <h3 className="text-lg font-bold text-white">{option.name}</h3>
                        <span className="text-accent-amber font-bold text-lg">+{option.price.toFixed(2)} ₺</span>
                      </div>
                      <p className="text-white/60 text-sm mb-3">{option.description}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {option.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-white/70">
                            <Check className="w-3 h-3 text-green-400 flex-shrink-0" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary and CTA */}
          <div 
            className="p-6 rounded-xl sticky bottom-20 md:bottom-4"
            style={{
              background: "linear-gradient(145deg, rgba(30,30,30,0.95) 0%, rgba(0,0,0,0.98) 100%)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 -8px 32px rgba(0,0,0,0.5)"
            }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-white/60 text-sm">Seçilen Ek Hizmetler</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-accent-amber">
                    {totalExtraCost > 0 ? `+${totalExtraCost.toFixed(2)} ₺` : "0 ₺"}
                  </span>
                  {selectedOptions.length > 0 && (
                    <span className="text-white/50 text-sm">({selectedOptions.length} seçenek)</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button
                  onClick={handleContinue}
                  className="flex-1 sm:flex-none px-8 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02] bg-gradient-to-r from-accent-amber to-yellow-500 hover:from-yellow-400 hover:to-accent-amber text-black shadow-lg shadow-accent-amber/20"
                >
                  <CreditCard className="w-4 h-4" />
                  {selectedOptions.length > 0 ? "Seçeneklerle Devam Et" : "Ödemeye Geç"}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 mt-3 text-white/40 text-xs">
              <Lock className="w-3 h-3" />
              <span>256-bit SSL şifreleme ile güvenli ödeme</span>
            </div>
          </div>

          {/* Info Notice */}
          <div className="mt-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-blue-300 font-medium text-sm mb-1">Bilgi</p>
                <p className="text-blue-200/70 text-xs">
                  Seçtiğiniz koruma seçenekleri bilet fiyatına eklenir ve ödeme sayfasında 
                  toplam tutarı göreceksiniz. İptal koruması ve sigorta hizmetleri, etkinlik 
                  tarihinden 24 saat öncesine kadar geçerlidir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileTabBar />
    </div>
  );
}

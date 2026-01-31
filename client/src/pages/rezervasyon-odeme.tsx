import { useState } from "react";
import { Link } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import MobileTabBar from "@/components/mobile-tab-bar";
import { CreditCard, Lock, Check, Calendar, MapPin, Clock, Utensils, ArrowLeft, Users } from "lucide-react";

export default function RezervasyonOdeme() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
    }, 2000);
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-black text-white pb-16 md:pb-0">
        <Header />
        <main className="pt-20 pb-16 flex items-center justify-center min-h-[80vh]">
          <div className="text-center px-4">
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">Rezervasyon Onaylandı!</h1>
            <p className="text-white/70 mb-6 max-w-md mx-auto">
              Rezervasyonunuz başarıyla oluşturuldu. E-posta adresinize rezervasyon detayları gönderildi.
            </p>
            <div 
              className="p-4 rounded-xl bg-black/60 backdrop-blur-xl border border-white/10 mb-6 max-w-sm mx-auto"
              style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                  <Utensils className="w-5 h-5 text-orange-300" />
                </div>
                <div className="text-left">
                  <p className="text-white font-medium text-sm">Premium Restoran İstanbul</p>
                  <p className="text-white/50 text-xs">2 Kişilik Rezervasyon</p>
                </div>
              </div>
              <div className="text-left space-y-1">
                <div className="flex items-center gap-2 text-white/50 text-xs">
                  <Calendar className="w-3 h-3" />
                  <span>25 Ocak 2026 - 20:00</span>
                </div>
                <div className="flex items-center gap-2 text-white/50 text-xs">
                  <MapPin className="w-3 h-3" />
                  <span>Beşiktaş, İstanbul</span>
                </div>
              </div>
            </div>
            <p className="text-white/50 text-sm mb-4">
              Rezervasyonunuz ücretsiz olarak oluşturuldu!
            </p>
            <Link href="/">
              <button className="px-6 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-accent-amber/90 to-yellow-500 hover:from-accent-amber hover:to-yellow-400 text-black shadow-lg shadow-accent-amber/20 transition-all hover:scale-[1.02]">
                Ana Sayfaya Dön
              </button>
            </Link>
          </div>
        </main>
        <Footer />
        <MobileTabBar />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-16 md:pb-0">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link href="/restoran-detay">
            <button className="flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Geri Dön</span>
            </button>
          </Link>

          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <CreditCard className="w-7 h-7 text-accent-amber" />
            Rezervasyon Ödemesi
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3 space-y-6">
              <div 
                className="p-4 sm:p-6 rounded-xl bg-black/60 backdrop-blur-xl border border-white/10"
                style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}
              >
                <h2 className="text-lg font-semibold text-white mb-4">Kart Bilgileri</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-white/50 text-xs mb-1 block">Kart Üzerindeki İsim</label>
                    <input 
                      type="text" 
                      placeholder="Ad Soyad"
                      className="w-full p-3 rounded-lg bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-accent-amber/40 placeholder:text-white/30"
                      data-testid="input-card-name"
                    />
                  </div>
                  <div>
                    <label className="text-white/50 text-xs mb-1 block">Kart Numarası</label>
                    <input 
                      type="text" 
                      placeholder="0000 0000 0000 0000"
                      className="w-full p-3 rounded-lg bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-accent-amber/40 placeholder:text-white/30"
                      data-testid="input-card-number"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/50 text-xs mb-1 block">Son Kullanma Tarihi</label>
                      <input 
                        type="text" 
                        placeholder="AA/YY"
                        className="w-full p-3 rounded-lg bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-accent-amber/40 placeholder:text-white/30"
                        data-testid="input-card-expiry"
                      />
                    </div>
                    <div>
                      <label className="text-white/50 text-xs mb-1 block">CVV</label>
                      <input 
                        type="text" 
                        placeholder="000"
                        className="w-full p-3 rounded-lg bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-accent-amber/40 placeholder:text-white/30"
                        data-testid="input-card-cvv"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div 
                className="p-4 sm:p-6 rounded-xl bg-black/60 backdrop-blur-xl border border-white/10"
                style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}
              >
                <h2 className="text-lg font-semibold text-white mb-4">İletişim Bilgileri</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/50 text-xs mb-1 block">Ad</label>
                      <input 
                        type="text" 
                        placeholder="Adınız"
                        className="w-full p-3 rounded-lg bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-accent-amber/40 placeholder:text-white/30"
                        data-testid="input-first-name"
                      />
                    </div>
                    <div>
                      <label className="text-white/50 text-xs mb-1 block">Soyad</label>
                      <input 
                        type="text" 
                        placeholder="Soyadınız"
                        className="w-full p-3 rounded-lg bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-accent-amber/40 placeholder:text-white/30"
                        data-testid="input-last-name"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-white/50 text-xs mb-1 block">E-posta</label>
                    <input 
                      type="email" 
                      placeholder="ornek@email.com"
                      className="w-full p-3 rounded-lg bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-accent-amber/40 placeholder:text-white/30"
                      data-testid="input-email"
                    />
                  </div>
                  <div>
                    <label className="text-white/50 text-xs mb-1 block">Telefon</label>
                    <input 
                      type="tel" 
                      placeholder="+90 5XX XXX XX XX"
                      className="w-full p-3 rounded-lg bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-accent-amber/40 placeholder:text-white/30"
                      data-testid="input-phone"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div 
                className="sticky top-24 p-4 sm:p-6 rounded-xl bg-black/60 backdrop-blur-xl border border-white/10"
                style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}
              >
                <h2 className="text-lg font-semibold text-white mb-4">Rezervasyon Özeti</h2>
                
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                  <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
                    <Utensils className="w-6 h-6 text-orange-300" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">Premium Restoran İstanbul</p>
                    <p className="text-white/50 text-xs">Fine Dining</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-white/50">
                    <Calendar className="w-3 h-3" />
                    <span>25 Ocak 2026</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/50">
                    <Clock className="w-3 h-3" />
                    <span>20:00</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/50">
                    <Users className="w-3 h-3" />
                    <span>2 Kişi</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/50">
                    <MapPin className="w-3 h-3" />
                    <span>Beşiktaş, İstanbul</span>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 mb-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">İşlem Ücreti</span>
                    <span className="text-green-400 font-semibold">Ücretsiz</span>
                  </div>
                  <p className="text-white/40 text-xs">
                    * Rezervasyon ücretsizdir, restoranda sadece yemek bedelini ödersiniz.
                  </p>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-white/10">
                    <span className="text-white">Toplam</span>
                    <span className="text-green-400">Ücretsiz</span>
                  </div>
                </div>

                <button 
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02] bg-gradient-to-r from-accent-amber/90 to-yellow-500 hover:from-accent-amber hover:to-yellow-400 text-black shadow-lg shadow-accent-amber/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  data-testid="button-complete-payment"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      İşleniyor...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Rezervasyonu Onayla
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 mt-3 text-white/40 text-xs">
                  <Lock className="w-3 h-3" />
                  <span>256-bit SSL şifreleme ile güvenli ödeme</span>
                </div>
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

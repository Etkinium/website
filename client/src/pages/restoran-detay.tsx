import { Link } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import MobileTabBar from "@/components/mobile-tab-bar";
import { MapPin, Clock, Heart, Star, ChevronRight, Users, Utensils, Phone, CreditCard, Sparkles } from "lucide-react";

const SimilarRestaurantCard = ({ index }: { index: number }) => (
  <div 
    className="group relative bg-black/60 backdrop-blur-xl rounded-[16px] sm:rounded-[20px] overflow-hidden border border-white/10 hover:border-accent-amber/40 transition-all duration-500 flex-shrink-0 w-[180px] sm:w-[200px]"
    style={{
      boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)"
    }}
    data-testid={`similar-restaurant-${index}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-accent-amber/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <div className="relative h-24 sm:h-28 bg-gradient-to-br from-orange-900/40 to-gray-900/60">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-orange-500/20 backdrop-blur-sm flex items-center justify-center border border-orange-400/20">
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-orange-300" />
        </div>
      </div>
      <div className="absolute top-2 left-2">
        <span className="bg-accent-amber/90 backdrop-blur-sm text-black text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-full">
          Popüler
        </span>
      </div>
      <button className="absolute top-2 right-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-red-400 hover:bg-black/60 transition-all border border-white/10">
        <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
      </button>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
        <div className="flex items-center gap-1 text-accent-amber text-[10px]">
          <Star className="w-2.5 h-2.5 fill-accent-amber" />
          <span className="font-medium">4.7</span>
        </div>
      </div>
    </div>
    
    <div className="relative p-3 sm:p-4 space-y-2">
      <h3 className="font-medium text-white/90 group-hover:text-white transition-colors line-clamp-1 text-xs sm:text-sm">
        Benzer Restoran {index + 1}
      </h3>
      <div className="space-y-1">
        <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-white/50">
          <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-accent-amber/70 flex-shrink-0" />
          <span className="line-clamp-1">İstanbul</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-white/50">
          <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-accent-amber/70 flex-shrink-0" />
          <span>12:00 - 23:00</span>
        </div>
      </div>
      <div className="pt-2 border-t border-white/5 flex items-center justify-between">
        <div>
          <p className="text-[9px] text-white/40">Ortalama</p>
          <p className="text-sm font-semibold text-accent-amber">350 ₺</p>
        </div>
        <Link href="/restoran-detay">
          <button className="bg-black hover:bg-accent-amber text-white hover:text-black text-[10px] sm:text-[11px] font-medium px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full transition-all border border-white/10 hover:border-accent-amber flex items-center gap-0.5">
            Rezerve Et
            <ChevronRight className="w-3 h-3" />
          </button>
        </Link>
      </div>
    </div>
  </div>
);

export default function RestoranDetay() {
  return (
    <div className="min-h-screen bg-black text-white pb-16 md:pb-0">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2">
              <div 
                className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-orange-900/40 to-gray-900/60 h-48 sm:h-64 lg:h-80 mb-6"
                style={{
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)"
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-orange-500/20 backdrop-blur-sm flex items-center justify-center border border-orange-400/20">
                    <Utensils className="w-10 h-10 sm:w-12 sm:h-12 text-orange-300" />
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-accent-amber/90 backdrop-blur-sm text-black text-xs font-semibold px-3 py-1 rounded-full">
                    Fine Dining
                  </span>
                </div>
                <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-red-400 hover:bg-black/60 transition-all border border-white/10">
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2" data-testid="restaurant-title">
                    Premium Restoran İstanbul
                  </h1>
                  <div className="flex items-center gap-2 text-accent-amber">
                    <Star className="w-4 h-4 fill-accent-amber" />
                    <span className="font-medium">4.8</span>
                    <span className="text-white/50 text-sm">(256 değerlendirme)</span>
                  </div>
                </div>

                <div 
                  className="p-4 sm:p-6 rounded-xl bg-black/60 backdrop-blur-xl border border-white/10"
                  style={{
                    boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
                  }}
                >
                  <h2 className="text-lg font-semibold text-white mb-4">Restoran Bilgileri</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-orange-300" />
                      </div>
                      <div>
                        <p className="text-white/50 text-xs">Adres</p>
                        <p className="text-white font-medium">Beşiktaş, İstanbul</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-orange-300" />
                      </div>
                      <div>
                        <p className="text-white/50 text-xs">Çalışma Saatleri</p>
                        <p className="text-white font-medium">12:00 - 00:00</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                        <Phone className="w-5 h-5 text-orange-300" />
                      </div>
                      <div>
                        <p className="text-white/50 text-xs">Telefon</p>
                        <p className="text-white font-medium">+90 212 XXX XX XX</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                        <Users className="w-5 h-5 text-orange-300" />
                      </div>
                      <div>
                        <p className="text-white/50 text-xs">Kapasite</p>
                        <p className="text-white font-medium">120 Kişi</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div 
                  className="p-4 sm:p-6 rounded-xl bg-black/60 backdrop-blur-xl border border-white/10"
                  style={{
                    boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
                  }}
                >
                  <h2 className="text-lg font-semibold text-white mb-4">Restoran Hakkında</h2>
                  <p className="text-white/70 text-sm leading-relaxed">
                    İstanbul'un kalbinde, eşsiz Boğaz manzarası eşliğinde fine dining deneyimi sunan 
                    restoranımız, geleneksel Türk mutfağını modern yorumlarla buluşturuyor. 
                    Şeflerimizin özenle hazırladığı menümüz ve seçkin şarap koleksiyonumuzla 
                    unutulmaz bir akşam yemeği için sizi bekliyoruz.
                  </p>
                </div>

                <div 
                  className="p-4 sm:p-6 rounded-xl bg-black/60 backdrop-blur-xl border border-white/10"
                  style={{
                    boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
                  }}
                >
                  <h2 className="text-lg font-semibold text-white mb-4">Mutfak Özellikleri</h2>
                  <div className="flex flex-wrap gap-2">
                    {["Türk Mutfağı", "Fine Dining", "Vejetaryen Seçenekler", "Deniz Ürünleri", "Canlı Müzik", "Vale Parking"].map((feature) => (
                      <span 
                        key={feature}
                        className="px-3 py-1.5 rounded-full bg-accent-amber/10 border border-accent-amber/20 text-accent-amber text-xs font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div 
                className="sticky top-24 p-4 sm:p-6 rounded-xl bg-black/60 backdrop-blur-xl border border-white/10"
                style={{
                  boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
                }}
              >
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-accent-amber" />
                  Rezervasyon
                </h2>

                <div className="space-y-3 mb-6">
                  <div>
                    <label className="text-white/50 text-xs mb-1 block">Tarih</label>
                    <input 
                      type="date" 
                      className="w-full p-3 rounded-lg bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-accent-amber/40"
                      data-testid="input-reservation-date"
                    />
                  </div>
                  <div>
                    <label className="text-white/50 text-xs mb-1 block">Saat</label>
                    <select 
                      className="w-full p-3 rounded-lg bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-accent-amber/40"
                      data-testid="select-reservation-time"
                    >
                      <option value="">Saat Seçin</option>
                      <option value="12:00">12:00</option>
                      <option value="13:00">13:00</option>
                      <option value="14:00">14:00</option>
                      <option value="19:00">19:00</option>
                      <option value="20:00">20:00</option>
                      <option value="21:00">21:00</option>
                      <option value="22:00">22:00</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-white/50 text-xs mb-1 block">Kişi Sayısı</label>
                    <select 
                      className="w-full p-3 rounded-lg bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-accent-amber/40"
                      data-testid="select-guest-count"
                    >
                      <option value="2">2 Kişi</option>
                      <option value="3">3 Kişi</option>
                      <option value="4">4 Kişi</option>
                      <option value="5">5 Kişi</option>
                      <option value="6">6 Kişi</option>
                      <option value="8">8 Kişi</option>
                      <option value="10">10+ Kişi</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-white/50 text-xs mb-1 block">Özel İstekler (İsteğe Bağlı)</label>
                    <textarea 
                      placeholder="Özel günler, alerjiler, tercihler..."
                      className="w-full p-3 rounded-lg bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-accent-amber/40 h-20 resize-none placeholder:text-white/30"
                      data-testid="input-special-requests"
                    />
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/50 text-sm">İşlem Ücreti</span>
                    <span className="text-green-400 font-semibold">Ücretsiz</span>
                  </div>
                  <p className="text-white/40 text-xs mb-3">
                    * Rezervasyon tamamen ücretsizdir!
                  </p>
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span className="text-white">Toplam</span>
                    <span className="text-green-400">Ücretsiz</span>
                  </div>
                </div>

                <Link href="/rezervasyon-odeme">
                  <button 
                    className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02] bg-gradient-to-r from-accent-amber to-yellow-500 hover:bg-white hover:from-white hover:to-white text-black shadow-lg shadow-accent-amber/20"
                    data-testid="button-reserve"
                  >
                    <CreditCard className="w-4 h-4" />
                    Rezerve Et
                  </button>
                </Link>

                <p className="text-white/40 text-xs text-center mt-3">
                  256-bit SSL şifreleme ile güvenli ödeme
                </p>
              </div>
            </div>
          </div>

          <section className="mt-12 sm:mt-16">
            <div className="flex items-center gap-2 mb-6">
              <div 
                className="w-1 h-6 rounded-full"
                style={{ background: "linear-gradient(180deg, #F59E0B 0%, #D97706 100%)" }}
              />
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Benzer <span className="text-amber-400">Restoranlar</span>
              </h2>
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-4 px-4">
              {[0, 1, 2, 3].map((index) => (
                <SimilarRestaurantCard key={index} index={index} />
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <MobileTabBar />
    </div>
  );
}

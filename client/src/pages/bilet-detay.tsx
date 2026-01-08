import { Link } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import MobileTabBar from "@/components/mobile-tab-bar";
import { Calendar, MapPin, Clock, Heart, Star, ChevronRight, Users, Ticket, CreditCard } from "lucide-react";

const SimilarEventCard = ({ index }: { index: number }) => (
  <div 
    className="group relative bg-black/60 backdrop-blur-xl rounded-[16px] sm:rounded-[20px] overflow-hidden border border-white/10 hover:border-accent-amber/40 transition-all duration-500 flex-shrink-0 w-[180px] sm:w-[200px]"
    style={{
      boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)"
    }}
    data-testid={`similar-event-${index}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-accent-amber/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <div className="relative h-24 sm:h-28 bg-gradient-to-br from-purple-900/40 to-gray-900/60">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-500/20 backdrop-blur-sm flex items-center justify-center border border-purple-400/20">
          <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-purple-300" />
        </div>
      </div>
      <div className="absolute top-2 left-2">
        <span className="bg-accent-amber/90 backdrop-blur-sm text-black text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-full">
          Yakında
        </span>
      </div>
      <button className="absolute top-2 right-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-red-400 hover:bg-black/60 transition-all border border-white/10">
        <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
      </button>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
        <div className="flex items-center gap-1 text-accent-amber text-[10px]">
          <Star className="w-2.5 h-2.5 fill-accent-amber" />
          <span className="font-medium">4.8</span>
        </div>
      </div>
    </div>
    
    <div className="relative p-3 sm:p-4 space-y-2">
      <h3 className="font-medium text-white/90 group-hover:text-white transition-colors line-clamp-1 text-xs sm:text-sm">
        Benzer Etkinlik {index + 1}
      </h3>
      <div className="space-y-1">
        <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-white/50">
          <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-accent-amber/70 flex-shrink-0" />
          <span>15 Şubat 2026</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-white/50">
          <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-accent-amber/70 flex-shrink-0" />
          <span className="line-clamp-1">İstanbul</span>
        </div>
      </div>
      <div className="pt-2 border-t border-white/5 flex items-center justify-between">
        <div>
          <p className="text-[9px] text-white/40">Başlangıç</p>
          <p className="text-sm font-semibold text-accent-amber">250 ₺</p>
        </div>
        <Link href="/bilet-detay">
          <button className="bg-black hover:bg-accent-amber text-white hover:text-black text-[10px] sm:text-[11px] font-medium px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full transition-all border border-white/10 hover:border-accent-amber flex items-center gap-0.5">
            Bilet Al
            <ChevronRight className="w-3 h-3" />
          </button>
        </Link>
      </div>
    </div>
  </div>
);

export default function BiletDetay() {
  return (
    <div className="min-h-screen bg-black text-white pb-16 md:pb-0">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2">
              <div 
                className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900/40 to-gray-900/60 h-48 sm:h-64 lg:h-80 mb-6"
                style={{
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)"
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-purple-500/20 backdrop-blur-sm flex items-center justify-center border border-purple-400/20">
                    <Calendar className="w-10 h-10 sm:w-12 sm:h-12 text-purple-300" />
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-accent-amber/90 backdrop-blur-sm text-black text-xs font-semibold px-3 py-1 rounded-full">
                    Konser
                  </span>
                </div>
                <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-red-400 hover:bg-black/60 transition-all border border-white/10">
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2" data-testid="event-title">
                    Etkinlik Başlığı - Konser 2026
                  </h1>
                  <div className="flex items-center gap-2 text-accent-amber">
                    <Star className="w-4 h-4 fill-accent-amber" />
                    <span className="font-medium">4.9</span>
                    <span className="text-white/50 text-sm">(128 değerlendirme)</span>
                  </div>
                </div>

                <div 
                  className="p-4 sm:p-6 rounded-xl bg-black/60 backdrop-blur-xl border border-white/10"
                  style={{
                    boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
                  }}
                >
                  <h2 className="text-lg font-semibold text-white mb-4">Etkinlik Detayları</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-purple-300" />
                      </div>
                      <div>
                        <p className="text-white/50 text-xs">Tarih</p>
                        <p className="text-white font-medium">20 Ocak 2026</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-purple-300" />
                      </div>
                      <div>
                        <p className="text-white/50 text-xs">Saat</p>
                        <p className="text-white font-medium">21:00</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-purple-300" />
                      </div>
                      <div>
                        <p className="text-white/50 text-xs">Konum</p>
                        <p className="text-white font-medium">Volkswagen Arena, İstanbul</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                        <Users className="w-5 h-5 text-purple-300" />
                      </div>
                      <div>
                        <p className="text-white/50 text-xs">Kapasite</p>
                        <p className="text-white font-medium">5.000 Kişi</p>
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
                  <h2 className="text-lg font-semibold text-white mb-4">Etkinlik Hakkında</h2>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Bu muhteşem etkinlikte sizi bekleyen unutulmaz bir deneyime hazır olun. 
                    Türkiye'nin en sevilen sanatçılarından biri ile geçireceğiniz bu gece, 
                    hafızalarınızda yer edecek anılarla dolu olacak. Biletlerinizi şimdiden 
                    alarak yerinizi garantileyin.
                  </p>
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
                  <Ticket className="w-5 h-5 text-accent-amber" />
                  Bilet Seçimi
                </h2>

                <div className="space-y-3 mb-6">
                  <label className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/10 hover:border-accent-amber/40 cursor-pointer transition-all">
                    <div className="flex items-center gap-3">
                      <input type="radio" name="ticket" className="w-4 h-4 accent-accent-amber" defaultChecked />
                      <div>
                        <p className="text-white font-medium text-sm">Standart Bilet</p>
                        <p className="text-white/50 text-xs">Genel giriş</p>
                      </div>
                    </div>
                    <span className="text-accent-amber font-bold">— ₺</span>
                  </label>
                  <label className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/10 hover:border-accent-amber/40 cursor-pointer transition-all">
                    <div className="flex items-center gap-3">
                      <input type="radio" name="ticket" className="w-4 h-4 accent-accent-amber" />
                      <div>
                        <p className="text-white font-medium text-sm">VIP Bilet</p>
                        <p className="text-white/50 text-xs">Ön sıra + içecek</p>
                      </div>
                    </div>
                    <span className="text-accent-amber font-bold">— ₺</span>
                  </label>
                  <label className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/10 hover:border-accent-amber/40 cursor-pointer transition-all">
                    <div className="flex items-center gap-3">
                      <input type="radio" name="ticket" className="w-4 h-4 accent-accent-amber" />
                      <div>
                        <p className="text-white font-medium text-sm">Premium Bilet</p>
                        <p className="text-white/50 text-xs">Sahne önü + meet & greet</p>
                      </div>
                    </div>
                    <span className="text-accent-amber font-bold">— ₺</span>
                  </label>
                </div>

                <div className="space-y-3 mb-6">
                  <div>
                    <label className="text-white/50 text-xs mb-1 block">Bilet Adedi</label>
                    <select 
                      className="w-full p-3 rounded-lg bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-accent-amber/40"
                      data-testid="select-ticket-count"
                    >
                      <option value="1">1 Bilet</option>
                      <option value="2">2 Bilet</option>
                      <option value="3">3 Bilet</option>
                      <option value="4">4 Bilet</option>
                    </select>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/50 text-sm">Bilet Fiyatı</span>
                    <span className="text-white font-medium">— ₺</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/50 text-sm">Hizmet Bedeli</span>
                    <span className="text-white font-medium">— ₺</span>
                  </div>
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span className="text-white">Toplam</span>
                    <span className="text-accent-amber">— ₺</span>
                  </div>
                </div>

                <Link href="/odeme">
                  <button 
                    className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02] bg-gradient-to-r from-accent-amber to-yellow-500 hover:bg-white hover:from-white hover:to-white text-black shadow-lg shadow-accent-amber/20"
                    data-testid="button-buy-ticket"
                  >
                    <CreditCard className="w-4 h-4" />
                    Satın Al
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
                Benzer <span className="text-amber-400">Etkinlikler</span>
              </h2>
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-4 px-4">
              {[0, 1, 2, 3].map((index) => (
                <SimilarEventCard key={index} index={index} />
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

import { Link } from "wouter";
import Header from "@/components/header";
import HeroCarousel from "@/components/hero-carousel";
import OvalAdBanner from "@/components/oval-ad-banner";
import AdApplicationButton from "@/components/ad-application-button";
import EmailSubscription from "@/components/email-subscription";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Calendar, UtensilsCrossed, MapPin, Clock, Star, Heart, ChevronRight, Sparkles, Handshake, Mail, Building2 } from "lucide-react";

const FeaturedEventCard = ({ index }: { index: number }) => (
  <div 
    className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-accent-amber/50 transition-all duration-300 group cursor-pointer hover:shadow-xl hover:shadow-accent-amber/10 flex-shrink-0 w-[280px] sm:w-[320px]"
    data-testid={`featured-event-${index}`}
  >
    <div className="relative h-36 sm:h-44 bg-gradient-to-br from-gray-800 to-gray-700">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-gray-600/50 flex items-center justify-center">
          <Calendar className="w-6 h-6 text-gray-500" />
        </div>
      </div>
      <div className="absolute top-2 left-2">
        <span className="bg-accent-amber text-black text-[10px] font-bold px-2 py-0.5 rounded-full">—</span>
      </div>
      <button className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center text-white hover:text-red-500">
        <Heart className="w-4 h-4" />
      </button>
    </div>
    <div className="p-3 sm:p-4 space-y-2">
      <h3 className="font-bold text-white group-hover:text-accent-amber transition-colors line-clamp-1 text-sm sm:text-base">
        Etkinlik Başlığı
      </h3>
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <Calendar className="w-3 h-3 text-accent-amber" />
        <span>— — ——</span>
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <MapPin className="w-3 h-3 text-accent-amber" />
        <span className="line-clamp-1">Konum</span>
      </div>
      <div className="pt-2 border-t border-gray-700 flex items-center justify-between">
        <span className="text-accent-amber font-bold">— ₺</span>
        <Link href="/bilet-al">
          <Button size="sm" className="bg-accent-amber text-black hover:bg-yellow-400 font-semibold rounded-full px-3 text-xs h-7">
            Bilet Al
          </Button>
        </Link>
      </div>
    </div>
  </div>
);

const FeaturedRestaurantCard = ({ index }: { index: number }) => (
  <div 
    className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-accent-amber/50 transition-all duration-300 group cursor-pointer hover:shadow-xl hover:shadow-accent-amber/10 flex-shrink-0 w-[280px] sm:w-[320px]"
    data-testid={`featured-restaurant-${index}`}
  >
    <div className="relative h-36 sm:h-44 bg-gradient-to-br from-gray-800 to-gray-700">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-gray-600/50 flex items-center justify-center">
          <UtensilsCrossed className="w-6 h-6 text-gray-500" />
        </div>
      </div>
      <div className="absolute top-2 left-2 flex gap-1.5">
        <span className="bg-accent-amber text-black text-[10px] font-bold px-2 py-0.5 rounded-full">—</span>
        <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Açık</span>
      </div>
      <button className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center text-white hover:text-red-500">
        <Heart className="w-4 h-4" />
      </button>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
        <div className="flex items-center gap-1 text-accent-amber text-xs">
          <Star className="w-3 h-3 fill-accent-amber" />
          <span>—</span>
        </div>
      </div>
    </div>
    <div className="p-3 sm:p-4 space-y-2">
      <h3 className="font-bold text-white group-hover:text-accent-amber transition-colors line-clamp-1 text-sm sm:text-base">
        Restoran Adı
      </h3>
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <MapPin className="w-3 h-3 text-accent-amber" />
        <span className="line-clamp-1">Konum</span>
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <Clock className="w-3 h-3 text-accent-amber" />
        <span>—:— - —:—</span>
      </div>
      <div className="pt-2 border-t border-gray-700 flex items-center justify-between">
        <span className="text-accent-amber font-bold">—— ₺</span>
        <Link href="/restoranlar">
          <Button size="sm" className="bg-accent-amber text-black hover:bg-yellow-400 font-semibold rounded-full px-3 text-xs h-7">
            Rezervasyon
          </Button>
        </Link>
      </div>
    </div>
  </div>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <Header />
      
      <HeroCarousel />
      
      <OvalAdBanner />
      
      <AdApplicationButton />

      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-accent-amber" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Öne Çıkan Etkinlikler</h2>
            </div>
            <Link href="/etkinlikler">
              <Button variant="ghost" className="text-accent-amber hover:text-yellow-400 text-sm sm:text-base">
                Tümünü Gör
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            {[...Array(6)].map((_, i) => (
              <FeaturedEventCard key={i} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 bg-gradient-to-b from-transparent via-gray-900/50 to-transparent">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <UtensilsCrossed className="w-6 h-6 sm:w-7 sm:h-7 text-accent-amber" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Popüler Restoranlar</h2>
            </div>
            <Link href="/restoranlar">
              <Button variant="ghost" className="text-accent-amber hover:text-yellow-400 text-sm sm:text-base">
                Tümünü Gör
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            {[...Array(6)].map((_, i) => (
              <FeaturedRestaurantCard key={i} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <Link href="/etkinlikler">
              <div className="bg-gradient-to-br from-purple-900/50 to-gray-900 border border-purple-500/30 rounded-2xl p-6 sm:p-8 hover:border-purple-500/60 transition-all group cursor-pointer">
                <Calendar className="w-10 h-10 sm:w-12 sm:h-12 text-purple-400 mb-4" />
                <h3 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors">Etkinlikleri Keşfet</h3>
                <p className="text-gray-400 text-sm sm:text-base mb-4">
                  Konserler, tiyatrolar, festivaller ve daha fazlası. Türkiye'nin en özel etkinliklerine bilet alın.
                </p>
                <span className="text-purple-400 font-semibold flex items-center text-sm sm:text-base">
                  Etkinliklere Git <ChevronRight className="w-4 h-4 ml-1" />
                </span>
              </div>
            </Link>
            <Link href="/restoranlar">
              <div className="bg-gradient-to-br from-amber-900/50 to-gray-900 border border-amber-500/30 rounded-2xl p-6 sm:p-8 hover:border-amber-500/60 transition-all group cursor-pointer">
                <UtensilsCrossed className="w-10 h-10 sm:w-12 sm:h-12 text-amber-400 mb-4" />
                <h3 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-amber-400 transition-colors">Restoranları Keşfet</h3>
                <p className="text-gray-400 text-sm sm:text-base mb-4">
                  En seçkin restoranlardan kolayca rezervasyon yapın. Fine dining'den cafe'lere her türlü lezzet.
                </p>
                <span className="text-amber-400 font-semibold flex items-center text-sm sm:text-base">
                  Restoranlara Git <ChevronRight className="w-4 h-4 ml-1" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-accent-amber mx-auto mb-3" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">Neden ETKİNİUM?</h2>
            <p className="text-gray-400 text-sm sm:text-base">Türkiye'nin yeni nesil dijital biletleme ekosistemi</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-5 sm:p-6 text-center hover:border-accent-amber/50 transition-all">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-accent-amber/10 flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-accent-amber" />
              </div>
              <h3 className="font-bold text-base sm:text-lg mb-2">Geniş Etkinlik Ağı</h3>
              <p className="text-gray-400 text-xs sm:text-sm">Türkiye genelinde binlerce etkinliğe tek platformdan erişim</p>
            </div>
            <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-5 sm:p-6 text-center hover:border-accent-amber/50 transition-all">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-accent-amber/10 flex items-center justify-center mx-auto mb-4">
                <UtensilsCrossed className="w-6 h-6 sm:w-7 sm:h-7 text-accent-amber" />
              </div>
              <h3 className="font-bold text-base sm:text-lg mb-2">Premium Restoranlar</h3>
              <p className="text-gray-400 text-xs sm:text-sm">En seçkin restoranlardan anında rezervasyon imkanı</p>
            </div>
            <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-5 sm:p-6 text-center hover:border-accent-amber/50 transition-all">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-accent-amber/10 flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 sm:w-7 sm:h-7 text-accent-amber" />
              </div>
              <h3 className="font-bold text-base sm:text-lg mb-2">Güvenli İşlem</h3>
              <p className="text-gray-400 text-xs sm:text-sm">Blockchain ve dinamik QR ile güvenli biletleme sistemi</p>
            </div>
            <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-5 sm:p-6 text-center hover:border-accent-amber/50 transition-all">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-accent-amber/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-accent-amber" />
              </div>
              <h3 className="font-bold text-base sm:text-lg mb-2">AI Destekli</h3>
              <p className="text-gray-400 text-xs sm:text-sm">Yapay zeka ile kişiselleştirilmiş etkinlik önerileri</p>
            </div>
          </div>
        </div>
      </section>
      
      <EmailSubscription />

      <section className="py-8 sm:py-12 bg-gradient-to-b from-transparent to-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-accent-amber/30 rounded-2xl p-6 sm:p-8 md:p-12">
            <div className="text-center mb-8">
              <Handshake className="w-10 h-10 sm:w-12 sm:h-12 text-accent-amber mx-auto mb-4" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">İş Birliği Fırsatları</h2>
              <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
                ETKİNİUM ile iş ortaklığı kurarak markanızı milyonlara ulaştırın
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-gray-800/50 rounded-xl p-5 sm:p-6 border border-gray-700 hover:border-accent-amber/50 transition-all">
                <Building2 className="w-8 h-8 text-accent-amber mb-3" />
                <h3 className="font-bold text-base sm:text-lg mb-2">Kurumsal Ortaklık</h3>
                <p className="text-gray-400 text-xs sm:text-sm mb-4">
                  Etkinlik organizatörleri ve mekan sahipleri için özel çözümler
                </p>
                <Link href="/contact">
                  <Button size="sm" variant="outline" className="border-accent-amber text-accent-amber hover:bg-accent-amber hover:text-black text-xs sm:text-sm">
                    İletişime Geç
                  </Button>
                </Link>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-5 sm:p-6 border border-gray-700 hover:border-accent-amber/50 transition-all">
                <Star className="w-8 h-8 text-accent-amber mb-3" />
                <h3 className="font-bold text-base sm:text-lg mb-2">Reklam Ortaklığı</h3>
                <p className="text-gray-400 text-xs sm:text-sm mb-4">
                  Platformumuzda markanızı öne çıkarın ve hedef kitlenize ulaşın
                </p>
                <Link href="/contact">
                  <Button size="sm" variant="outline" className="border-accent-amber text-accent-amber hover:bg-accent-amber hover:text-black text-xs sm:text-sm">
                    Reklam Ver
                  </Button>
                </Link>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-5 sm:p-6 border border-gray-700 hover:border-accent-amber/50 transition-all sm:col-span-2 lg:col-span-1">
                <Mail className="w-8 h-8 text-accent-amber mb-3" />
                <h3 className="font-bold text-base sm:text-lg mb-2">Genel İletişim</h3>
                <p className="text-gray-400 text-xs sm:text-sm mb-4">
                  Her türlü soru ve öneriniz için bize ulaşın
                </p>
                <a href="mailto:iletisim@etkinium.com">
                  <Button size="sm" variant="outline" className="border-accent-amber text-accent-amber hover:bg-accent-amber hover:text-black text-xs sm:text-sm">
                    iletisim@etkinium.com
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

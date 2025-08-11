import Header from "@/components/header";
import HeroCarousel from "@/components/hero-carousel";
import EmailSubscription from "@/components/email-subscription";
import Footer from "@/components/footer";
import { Headphones, Ticket, CalendarDays } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <Header />
      
      <HeroCarousel />
      
      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Neden <span className="text-spotify-green">ETKİNİUM</span>?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Müzik severlerin ve etkinlik tutkunlarının buluşma noktası
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-2xl p-8 hover:bg-gray-750 transition-colors group">
              <div className="w-16 h-16 bg-gradient-to-br from-spotify-green to-green-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Headphones className="text-white w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">HD Kalite Müzik</h3>
              <p className="text-gray-400 leading-relaxed">
                Lossless kalitede müzik deneyimi, kristal berraklığında ses kalitesi
              </p>
            </div>
            
            <div className="bg-gray-800 rounded-2xl p-8 hover:bg-gray-750 transition-colors group">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-purple to-purple-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Ticket className="text-white w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Kolay Bilet Alma</h3>
              <p className="text-gray-400 leading-relaxed">
                3 adımda biletini al, güvenli ödeme, anında teslimat garantisi
              </p>
            </div>
            
            <div className="bg-gray-800 rounded-2xl p-8 hover:bg-gray-750 transition-colors group">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-blue to-blue-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CalendarDays className="text-white w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Özel Etkinlikler</h3>
              <p className="text-gray-400 leading-relaxed">
                Sadece ETKİNİUM üyelerine özel konserler ve etkinlikler
              </p>
            </div>
          </div>
        </div>
      </section>

      <EmailSubscription />

      {/* Popular Events Section - Coming Soon */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Popüler <span className="text-accent-purple">Etkinlikler</span>
            </h2>
            <p className="text-xl text-gray-400">Bu ay en çok ilgi gören müzik etkinlikleri</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="bg-gray-800 rounded-2xl overflow-hidden group hover:transform hover:scale-105 transition-all duration-300">
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                  <div className="text-center">
                    <CalendarDays className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">Etkinlik Yakında</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Etkinlik {index}</h3>
                  <p className="text-gray-400 text-sm mb-4">Tarih yakında duyurulacak</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 font-bold text-lg">Yakında</span>
                    <button className="bg-gray-600 text-gray-400 px-4 py-2 rounded-lg cursor-not-allowed">
                      Yakında
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

import Header from "@/components/header";
import Footer from "@/components/footer";
import { Sparkles, Globe, Award, Target } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 mt-16 bg-gradient-to-br from-spotify-black via-gray-900 to-spotify-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(251,191,36,0.05),transparent_50%)]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <Sparkles className="w-16 h-16 text-accent-amber mx-auto animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="text-white">ETKİNİUM</span>
              <span className="text-accent-amber ml-4">Hakkında</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Türkiye'nin en yenilikçi seyahat ve etkinlik platformu olma yolculuğunda, 
              <span className="text-accent-amber font-semibold"> premium deneyimleri </span>
              sizinle buluşturuyoruz
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section - Premium Design */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-spotify-black relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Vision Card */}
            <div className="mb-16 group">
              <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-6 md:p-10 lg:p-14 border border-accent-amber/20 hover:border-accent-amber/40 transition-all duration-500 hover:shadow-2xl hover:shadow-accent-amber/10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent-amber/5 rounded-full blur-3xl group-hover:bg-accent-amber/10 transition-all duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-accent-amber/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Globe className="w-8 h-8 text-accent-amber" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-accent-amber">Vizyonumuz</h2>
                  </div>
                  <p className="text-gray-200 text-xl md:text-2xl leading-relaxed font-light">
                    Türkiye'nin en güçlü seyahat ve etkinlik platformu olmak, 
                    <span className="text-accent-amber font-semibold"> küresel pazara açılarak </span>
                    milyonlarca kullanıcıya ulaşmak ve onların hayatlarına değer katan deneyimler sunmak.
                  </p>
                </div>
              </div>
            </div>

            {/* Mission Card */}
            <div className="group">
              <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-6 md:p-10 lg:p-14 border border-accent-amber/20 hover:border-accent-amber/40 transition-all duration-500 hover:shadow-2xl hover:shadow-accent-amber/10">
                <div className="absolute top-0 left-0 w-32 h-32 bg-accent-amber/5 rounded-full blur-3xl group-hover:bg-accent-amber/10 transition-all duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-accent-amber/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Target className="w-8 h-8 text-accent-amber" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-accent-amber">Misyonumuz</h2>
                  </div>
                  <p className="text-gray-200 text-xl md:text-2xl leading-relaxed font-light">
                    Konaklama, seyahat ve etkinlik biletlerini 
                    <span className="text-accent-amber font-semibold"> tek çatı altında </span>
                    toplayarak kullanıcıya en kolay ve güvenli deneyimi sunmak.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-spotify-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                <span className="text-white">Değerlerimiz</span>
              </h2>
              <p className="text-gray-400 text-lg">
                ETKİNİUM'u özel kılan prensipler
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Value 1 */}
              <div className="group relative">
                <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-8 h-full border border-gray-700 hover:border-accent-amber/50 transition-all duration-300 hover:-translate-y-2">
                  <div className="w-14 h-14 bg-accent-amber/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Award className="w-7 h-7 text-accent-amber" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">Premium Kalite</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Her detayda mükemmellik arayışı ile kullanıcılarımıza 
                    en üst düzey hizmet kalitesini sunuyoruz.
                  </p>
                </div>
              </div>

              {/* Value 2 */}
              <div className="group relative">
                <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-8 h-full border border-gray-700 hover:border-accent-amber/50 transition-all duration-300 hover:-translate-y-2">
                  <div className="w-14 h-14 bg-accent-amber/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-7 h-7 text-accent-amber" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">Yenilikçi Yaklaşım</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Teknoloji ve yaratıcılığı harmanlayarak sektörde 
                    fark yaratan çözümler üretiyoruz.
                  </p>
                </div>
              </div>

              {/* Value 3 */}
              <div className="group relative">
                <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-8 h-full border border-gray-700 hover:border-accent-amber/50 transition-all duration-300 hover:-translate-y-2">
                  <div className="w-14 h-14 bg-accent-amber/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Globe className="w-7 h-7 text-accent-amber" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">Güvenilir Platform</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Güvenlik ve şeffaflık ilkesiyle kullanıcılarımızın 
                    güvenini kazanıyor ve koruyoruz.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

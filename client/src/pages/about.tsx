import Header from "@/components/header";
import Footer from "@/components/footer";
import { Sparkles, Globe, Award, Target, Users } from "lucide-react";

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
              Türkiye'nin en yenilikçi <span className="text-accent-amber font-semibold">dijital biletleme platformu</span> olma yolculuğunda, 
              konser biletleri, tiyatro biletleri, spor etkinlikleri, festival organizasyonları ve premium konaklama hizmetlerini 
              <span className="text-accent-amber font-semibold"> tek platform </span>
              altında sizinle buluşturuyoruz
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
                    Türkiye'nin en güçlü <span className="text-accent-amber font-semibold">online bilet satış ve etkinlik platformu</span> olmak, 
                    CEO ve yönetim ekibimizin liderliğinde 
                    <span className="text-accent-amber font-semibold"> küresel pazara açılarak </span>
                    milyonlarca kullanıcıya ulaşmak ve onların hayatlarına değer katan premium etkinlik deneyimleri sunmak.
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
                    Konaklama rezervasyonları, uçak biletleri, konser biletleri, tiyatro biletleri, spor etkinlikleri ve festival biletlerini 
                    <span className="text-accent-amber font-semibold"> tek çatı altında </span>
                    toplayarak kullanıcılarımıza Türkiye'nin en kolay ve güvenli <span className="text-accent-amber font-semibold">dijital etkinlik deneyimini</span> sunmak.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-24 bg-gradient-to-b from-spotify-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-6">
                <Users className="w-16 h-16 text-accent-amber mx-auto" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                <span className="text-white">Yönetim & CEO</span>
              </h2>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
                ETKİNİUM'un başarısının arkasında, <span className="text-accent-amber font-semibold">deneyimli CEO ve yönetim ekibi</span> bulunmaktadır. 
                Sektördeki uzun yıllara dayanan tecrübemiz ve vizyoner liderliğimiz sayesinde, 
                Türkiye'nin en güvenilir <span className="text-accent-amber font-semibold">dijital biletleme ve etkinlik platformunu</span> inşa ediyoruz.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl p-8 md:p-12 border border-accent-amber/20">
              <h3 className="text-2xl md:text-3xl font-bold text-accent-amber mb-6">Liderlik Vizyonumuz</h3>
              <div className="grid md:grid-cols-2 gap-8 text-gray-200">
                <div>
                  <h4 className="text-xl font-semibold text-white mb-3">Deneyimli Kurucu Kadro</h4>
                  <p className="leading-relaxed">
                    CEO ve kurucu ekibimiz, etkinlik yönetimi, teknoloji ve dijital pazarlama alanlarında 
                    <span className="text-accent-amber font-semibold"> 15+ yıllık deneyime</span> sahiptir.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-3">Yenilikçi Yönetim Anlayışı</h4>
                  <p className="leading-relaxed">
                    Yönetim ekibimiz, kullanıcı odaklı yaklaşım ve sürekli inovasyon ilkeleriyle 
                    <span className="text-accent-amber font-semibold"> sektöre yön vermektedir</span>.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-3">Stratejik Büyüme</h4>
                  <p className="leading-relaxed">
                    CEO liderliğinde, konser biletleri, tiyatro biletleri, festival organizasyonları ve 
                    konaklama hizmetlerinde <span className="text-accent-amber font-semibold">sürdürülebilir büyüme</span> hedefliyoruz.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-3">Müşteri Odaklı Liderlik</h4>
                  <p className="leading-relaxed">
                    Yöneticilerimiz, her kararı <span className="text-accent-amber font-semibold">kullanıcı memnuniyeti</span> ve 
                    güvenli alışveriş deneyimi sağlamak üzerine şekillendirir.
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

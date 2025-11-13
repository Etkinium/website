import { useState, useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import AdvertisingButton from "@/components/advertising-button";
import { Plane, Bus, Ship, Train, Calendar, MapPin, Users } from "lucide-react";
import logoImage from "@assets/logo-final.png";

const verticalSlides = [
  {
    id: 1,
    logo: logoImage,
    brandName: "ETKİNİUM",
    tagline: "Tek Platform, Sonsuz Sanat"
  },
  {
    id: 2,
    title: "Yeni Özellikler",
    description: "Çok Yakında Sizlerle!"
  },
  {
    id: 3,
    title: "Reklamlarınız İçin İdeal Platform",
    description: "partner@etkinium.com ile iletişime geçebilirsiniz"
  }
];

const transportOptions = [
  {
    id: "ucak",
    icon: Plane,
    title: "Uçak Bileti",
    tabLabel: "Uçaklar",
    gradient: "from-blue-600 to-cyan-500",
    content: {
      title: "İç ve Dış Hat Uçak Biletleri",
      description: "Türkiye'nin dört bir yanına ve yurt dışına uygun fiyatlı uçak biletleri. Anında onay, dijital bilet.",
      features: [
        { icon: Calendar, text: "Esnek tarih seçenekleri" },
        { icon: MapPin, text: "Yurt içi ve yurt dışı uçuşlar" },
        { icon: Users, text: "Grup rezervasyonu imkanı" }
      ],
      comingSoon: "Uçak bileti satışlarımız çok yakında başlıyor!"
    }
  },
  {
    id: "otobus",
    icon: Bus,
    title: "Otobüs Bileti",
    tabLabel: "Otobüs",
    gradient: "from-green-600 to-emerald-500",
    content: {
      title: "Şehirlerarası Otobüs Seferleri",
      description: "Konforlu ve güvenli otobüs yolculuğu için en uygun biletler. Tüm büyük firmalarla çalışıyoruz.",
      features: [
        { icon: Calendar, text: "7/24 sefer bulma" },
        { icon: MapPin, text: "Tüm şehirlere ulaşım" },
        { icon: Users, text: "Koltuk seçimi" }
      ],
      comingSoon: "Otobüs bileti rezervasyonları yakında aktif olacak!"
    }
  },
  {
    id: "deniz",
    icon: Ship,
    title: "Deniz Yolları",
    tabLabel: "Deniz Yolları",
    gradient: "from-indigo-600 to-blue-500",
    content: {
      title: "Feribot ve Gemi Seferleri",
      description: "Adalara ve kıyı şehirlerine deniz yoluyla seyahat edin. Arabalı ve yolcu biletleri.",
      features: [
        { icon: Calendar, text: "Sefer programları" },
        { icon: MapPin, text: "Ada ve sahil rotaları" },
        { icon: Users, text: "Araç taşıma seçeneği" }
      ],
      comingSoon: "Deniz yolu biletleri çok yakında satışta!"
    }
  },
  {
    id: "tren",
    icon: Train,
    title: "Demir Yolları",
    tabLabel: "Demir Yolları",
    gradient: "from-purple-600 to-pink-500",
    content: {
      title: "Hızlı Tren",
      description: "TCDD hızlı tren seferlerinde konforlu yolculuk. Ekonomik ve çevre dostu ulaşım.",
      features: [
        { icon: Calendar, text: "Dakik hareket saatleri" },
        { icon: MapPin, text: "Merkezi istasyonlar" },
        { icon: Users, text: "Aile biletleri" }
      ],
      comingSoon: "Tren biletleri yakında ETKİNİUM'da!"
    }
  }
];

export default function Seyahat() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState("ucak");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % verticalSlides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const activeOption = transportOptions.find(opt => opt.id === activeTab);

  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <Header />

      <main className="pt-32 pb-20 px-4 md:px-8 lg:px-16">
        {/* HORIZONTAL SLIDER - Sağa-Sola */}
        <div className="relative overflow-hidden rounded-2xl mb-12 bg-gradient-to-r from-gray-900 via-black to-gray-900 border-4 border-accent-amber/60 shadow-[0_0_40px_rgba(251,191,36,0.4)] hover:shadow-[0_0_50px_rgba(251,191,36,0.6)] transition-shadow duration-300"
             style={{ height: "220px" }}>
          <div className="relative h-full">
            {verticalSlides.map((slide, index) => {
              const position = index - currentSlide;
              const isActive = index === currentSlide;
              const isPrev = position === -1 || (currentSlide === 0 && index === verticalSlides.length - 1);
              const isNext = position === 1 || (currentSlide === verticalSlides.length - 1 && index === 0);
              
              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                    isActive ? "translate-x-0 opacity-100 z-10" :
                    isPrev ? "-translate-x-full opacity-0 z-0" :
                    isNext ? "translate-x-full opacity-0 z-0" :
                    "translate-x-full opacity-0 z-0"
                  }`}
                  data-testid={`horizontal-slide-${index}`}
                >
                  {slide.logo ? (
                    <div className="flex flex-col md:flex-row items-center justify-center md:justify-start h-full gap-6 px-8 md:px-12">
                      <div className="flex-shrink-0">
                        <img 
                          src={slide.logo}
                          alt="ETKİNİUM Logo"
                          className="w-24 h-24 md:w-28 md:h-28 object-contain drop-shadow-[0_0_20px_rgba(251,191,36,0.6)]"
                        />
                      </div>
                      <div className="text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent-amber drop-shadow-[0_4px_15px_rgba(251,191,36,0.4)] mb-2">
                          {slide.brandName}
                        </h2>
                        <p className="text-lg md:text-xl lg:text-2xl text-white font-medium drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                          {slide.tagline}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full px-8">
                      <div className="text-center">
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-accent-amber mb-3 drop-shadow-[0_4px_15px_rgba(251,191,36,0.4)]">
                          {slide.title}
                        </h3>
                        <p className="text-lg md:text-xl lg:text-2xl text-white font-medium drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                          {slide.description}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* DOTS - Horizontal Slider */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
            {verticalSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`rounded-full transition-all duration-300 shadow-lg ${
                  index === currentSlide
                    ? "w-10 h-3 bg-accent-amber ring-2 ring-accent-amber/50"
                    : "w-3 h-3 bg-white/40 hover:bg-white/70"
                }`}
                data-testid={`horizontal-dot-${index}`}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* REKLAM VERMEK İÇİN BUTON */}
        <div className="mb-8">
          <AdvertisingButton />
        </div>

        {/* BAŞLIK */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-accent-amber">Seyahat</span> Seçenekleri
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-4">
            Türkiye'nin her yerine güvenli ve konforlu ulaşım. Dilediğiniz aracı seçin, biletinizi anında alın.
          </p>
          <div className="bg-gradient-to-r from-accent-amber/20 to-accent-amber/10 rounded-2xl p-4 border border-accent-amber/30 max-w-3xl mx-auto">
            <p className="text-lg font-semibold text-accent-amber">
              Seyahat servisleri çok yakında!
            </p>
          </div>
        </div>

        {/* APPLE TARZI TAB SİSTEMİ */}
        <div className="max-w-6xl mx-auto">
          {/* TAB BUTTONS */}
          <div className="flex justify-center mb-8 gap-3 flex-wrap">
            {transportOptions.map((option) => {
              const Icon = option.icon;
              const isActive = activeTab === option.id;
              
              return (
                <button
                  key={option.id}
                  onClick={() => setActiveTab(option.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    isActive 
                      ? "bg-accent-amber text-black shadow-lg shadow-accent-amber/50" 
                      : "bg-black text-white border border-gray-600 hover:bg-accent-amber hover:text-black"
                  }`}
                  data-testid={`tab-${option.id}`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{option.tabLabel}</span>
                </button>
              );
            })}
          </div>

          {/* TAB CONTENT */}
          {activeOption && (
            <div 
              className="bg-gradient-to-br from-gray-900/80 to-gray-900/40 rounded-3xl p-8 md:p-12 border border-gray-800 transition-all duration-500 ease-in-out"
              data-testid={`content-${activeOption.id}`}
            >
              {/* ICON & TITLE */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${activeOption.gradient} shadow-xl`}>
                  <activeOption.icon className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-1">{activeOption.content.title}</h2>
                  <div className="px-3 py-1 rounded-full bg-accent-amber text-spotify-black text-xs font-semibold inline-block">
                    Yakında
                  </div>
                </div>
              </div>

              {/* DESCRIPTION */}
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                {activeOption.content.description}
              </p>

              {/* FEATURES */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {activeOption.content.features.map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 bg-gray-800/50 rounded-xl p-4 border border-gray-700"
                  >
                    <feature.icon className="w-5 h-5 text-accent-amber" />
                    <span className="text-white">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* COMING SOON MESSAGE */}
              <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-6 border border-purple-700/30 text-center">
                <p className="text-purple-200 font-semibold text-lg">
                  {activeOption.content.comingSoon}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* BILGILENDIRME */}
        <div className="bg-gradient-to-br from-purple-900/30 to-gray-900/30 rounded-3xl p-8 md:p-12 border border-gray-800 text-center mt-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Seyahat Servisleri Çok Yakında!
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-3xl mx-auto">
            Uçak, otobüs, deniz ve demiryolu biletlerimiz yakında satışa sunulacak. 
            ETKİNİUM ile Türkiye'nin her yerine kolayca ulaşabileceksiniz. 
            Gelişmelerden haberdar olmak için bültenimize abone olun!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:iletisim@etkinium.com"
              className="px-8 py-3 bg-black text-white border border-gray-600 hover:bg-accent-amber hover:text-black font-semibold rounded-xl transition-all"
              data-testid="button-contact-email"
            >
              Bilgi Almak İstiyorum
            </a>
            <a
              href="/"
              className="px-8 py-3 bg-black text-white border border-gray-600 hover:bg-accent-amber hover:text-black font-semibold rounded-xl transition-all"
              data-testid="button-home"
            >
              Ana Sayfaya Dön
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

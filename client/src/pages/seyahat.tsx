import { useState, useEffect, useRef, useCallback } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import AdvertisingButton from "@/components/advertising-button";
import { Plane, Bus, Ship, Train, Calendar, MapPin, Users } from "lucide-react";
import logoImage from "@assets/logo-final.png";

const bannerSlides = [
  {
    id: 1,
    logo: logoImage,
    brandName: "ETKİNİUM",
    subtitle: "Seyahat Partneri"
  },
  {
    id: 2,
    title: "SEYAHAT",
    subtitle: "Uçak, Otobüs, Tren Biletleri"
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
  const [prevSlide, setPrevSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeTab, setActiveTab] = useState("ucak");
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const animatingRef = useRef(false);

  const goToSlide = useCallback((newIndex: number, isAutomatic: boolean = false) => {
    if (animatingRef.current && !isAutomatic) return;
    if (newIndex === currentSlide && !isAutomatic) return;
    
    animatingRef.current = true;
    setIsAnimating(true);
    setPrevSlide(currentSlide);
    setCurrentSlide(newIndex);
    
    setTimeout(() => {
      animatingRef.current = false;
      setIsAnimating(false);
    }, 600);
  }, [currentSlide]);

  const startTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setCurrentSlide(prev => {
        const nextSlide = (prev + 1) % bannerSlides.length;
        setPrevSlide(prev);
        setIsAnimating(true);
        animatingRef.current = true;
        setTimeout(() => {
          animatingRef.current = false;
          setIsAnimating(false);
        }, 600);
        return nextSlide;
      });
    }, 6000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [startTimer]);

  const handleDotClick = (index: number) => {
    if (index === currentSlide) return;
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    goToSlide(index, false);
    startTimer();
  };

  const activeOption = transportOptions.find(opt => opt.id === activeTab);

  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <Header />

      <main className="pt-32 pb-20 px-4 md:px-8 lg:px-16">
        {/* SPONSOR BANNER - Golden Frame Style */}
        <div className="rounded-2xl p-4 md:p-5 bg-[#FAD85A] shadow-[0_0_40px_rgba(250,216,90,0.3)] mb-12">
          {/* Inner Banner Container */}
          <div className="relative overflow-hidden rounded-xl"
               style={{ height: "160px" }}>
            
            {/* Left Badge - NİUM */}
            <div className="absolute left-0 top-0 bottom-0 w-10 md:w-12 bg-purple-700 flex items-center justify-center z-20">
              <span className="text-white font-black text-xs md:text-sm tracking-widest writing-mode-vertical rotate-180"
                    style={{ writingMode: 'vertical-rl' }}>
                NİUM
              </span>
            </div>

            {/* Right Badge - SPONS */}
            <div className="absolute right-0 top-0 bottom-0 w-10 md:w-12 bg-[#FAD85A] flex items-center justify-center z-20">
              <span className="text-black font-black text-xs md:text-sm tracking-widest"
                    style={{ writingMode: 'vertical-rl' }}>
                SPONS
              </span>
            </div>

            {/* Slides */}
            <div className="relative h-full">
              {bannerSlides.map((slide, index) => {
                const isActive = index === currentSlide;
                const isPrev = index === prevSlide;
                const shouldShow = isActive || (isPrev && isAnimating);
                
                let transformStyle = 'translateX(100%)';
                let zIndex = 0;
                
                if (isActive) {
                  transformStyle = 'translateX(0)';
                  zIndex = 10;
                } else if (isPrev && isAnimating) {
                  transformStyle = 'translateX(-100%)';
                  zIndex = 5;
                }
                
                return (
                  <div
                    key={slide.id}
                    className="absolute inset-0 bg-gradient-to-r from-purple-900 via-red-800 to-red-900"
                    style={{ 
                      transform: transformStyle,
                      transition: shouldShow ? 'transform 600ms ease-in-out' : 'none',
                      zIndex,
                      willChange: 'transform'
                    }}
                    data-testid={`banner-slide-${index}`}
                  >
                    {/* Content - Logo and Title Side by Side */}
                    <div className="flex items-center h-full px-16 md:px-20">
                      {slide.logo ? (
                        <div className="flex items-center gap-4 md:gap-6">
                          <img 
                            src={slide.logo}
                            alt="ETKİNİUM Logo"
                            className="w-14 h-14 md:w-18 md:h-18 object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]"
                          />
                          <div>
                            <h2 className="text-2xl md:text-3xl font-black text-white tracking-wide uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                              {slide.brandName}
                            </h2>
                            <p className="text-sm md:text-base text-orange-300 font-medium mt-1">
                              {slide.subtitle}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-4 md:gap-6">
                          <div className="w-14 h-14 md:w-18 md:h-18 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                            <Plane className="w-8 h-8 md:w-10 md:h-10 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl md:text-3xl font-black text-white tracking-wide uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                              {slide.title}
                            </h3>
                            <p className="text-sm md:text-base text-orange-300 font-medium mt-1">
                              {slide.subtitle}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
              {bannerSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentSlide
                      ? "w-8 h-2 bg-[#FAD85A]"
                      : "w-2 h-2 bg-white/40 hover:bg-white/60"
                  }`}
                  data-testid={`banner-dot-${index}`}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
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

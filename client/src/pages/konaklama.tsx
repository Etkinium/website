import { useState, useEffect, useRef, useCallback } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import AdvertisingButton from "@/components/advertising-button";
import { Hotel, Building2, Home, Palmtree, Calendar, MapPin, Users } from "lucide-react";
import logoImage from "@assets/logo-final.png";

const bannerSlides = [
  {
    id: 1,
    logo: logoImage,
    brandName: "ETKİNİUM",
    subtitle: "Konaklama Partneri"
  },
  {
    id: 2,
    title: "KONAKLAMA",
    subtitle: "Premium Otel Seçenekleri"
  }
];

const accommodationOptions = [
  {
    id: "otel",
    icon: Hotel,
    title: "Şehir Otelleri",
    tabLabel: "Şehir Otelleri",
    gradient: "from-blue-600 to-cyan-500",
    content: {
      title: "Şehir Merkezinde Konforlu Konaklama",
      description: "Türkiye'nin tüm şehirlerinde merkezi konumlarda yer alan otellerimizle iş ve tatil seyahatlerinizde konforu yaşayın.",
      features: [
        { icon: MapPin, text: "Merkezi lokasyon" },
        { icon: Calendar, text: "Esnek rezervasyon" },
        { icon: Users, text: "Kurumsal fırsatlar" }
      ],
      comingSoon: "Şehir oteli rezervasyonları çok yakında!"
    }
  },
  {
    id: "tatil",
    icon: Palmtree,
    title: "Tatil Köyleri",
    tabLabel: "Tatil Köyleri",
    gradient: "from-orange-500 to-red-500",
    content: {
      title: "Her Şey Dahil Tatil Deneyimi",
      description: "Akdeniz ve Ege kıyılarında yer alan lüks tatil köylerinde unutulmaz bir tatil deneyimi sizi bekliyor.",
      features: [
        { icon: Palmtree, text: "Her şey dahil konsept" },
        { icon: Users, text: "Aile dostu aktiviteler" },
        { icon: Calendar, text: "Erken rezervasyon fırsatları" }
      ],
      comingSoon: "Tatil köyü rezervasyonları çok yakında ETKİNİUM'da!"
    }
  },
  {
    id: "butik",
    icon: Building2,
    title: "Butik Oteller",
    tabLabel: "Butik Oteller",
    gradient: "from-purple-600 to-pink-500",
    content: {
      title: "Özel ve Benzersiz Konaklama",
      description: "Tarihi dokusu ve modern konforuyla birleşen butik otellerimizde kendinizi özel hissedin.",
      features: [
        { icon: Building2, text: "Kişiye özel hizmet" },
        { icon: MapPin, text: "Tarihi lokasyonlar" },
        { icon: Users, text: "Romantik atmosfer" }
      ],
      comingSoon: "Butik otel rezervasyonları yakında hizmette!"
    }
  },
  {
    id: "apart",
    icon: Home,
    title: "Apart Oteller",
    tabLabel: "Apart Oteller",
    gradient: "from-green-600 to-teal-500",
    content: {
      title: "Ev Konforunda Uzun Süreli Konaklama",
      description: "Mutfak ve oturma alanıyla donatılmış apart otellerimizde uzun dönem konaklamalarınızda evinizdeymişsiniz gibi hissedin.",
      features: [
        { icon: Home, text: "Tam donanımlı mutfak" },
        { icon: Calendar, text: "Uzun dönem indirimleri" },
        { icon: Users, text: "Aile büyüklüğü seçenekleri" }
      ],
      comingSoon: "Apart otel rezervasyonları çok yakında!"
    }
  }
];

const turkishCities = [
  { value: "istanbul", label: "İstanbul" },
  { value: "ankara", label: "Ankara" },
  { value: "izmir", label: "İzmir" },
  { value: "antalya", label: "Antalya" },
  { value: "bursa", label: "Bursa" },
  { value: "adana", label: "Adana" },
  { value: "gaziantep", label: "Gaziantep" },
  { value: "konya", label: "Konya" },
  { value: "mugla", label: "Muğla" },
  { value: "mersin", label: "Mersin" },
  { value: "kayseri", label: "Kayseri" },
  { value: "eskisehir", label: "Eskişehir" },
  { value: "diyarbakir", label: "Diyarbakır" },
  { value: "samsun", label: "Samsun" },
  { value: "denizli", label: "Denizli" },
  { value: "trabzon", label: "Trabzon" },
  { value: "aydin", label: "Aydın" },
  { value: "manisa", label: "Manisa" },
  { value: "nevsehir", label: "Nevşehir" },
  { value: "bolu", label: "Bolu" }
];

const districts: { [key: string]: { value: string; label: string }[] } = {
  istanbul: [
    { value: "besiktas", label: "Beşiktaş" },
    { value: "sisli", label: "Şişli" },
    { value: "kadikoy", label: "Kadıköy" },
    { value: "fatih", label: "Fatih" },
    { value: "beyoglu", label: "Beyoğlu" },
    { value: "uskudar", label: "Üsküdar" },
  ],
  ankara: [
    { value: "cankaya", label: "Çankaya" },
    { value: "kecioren", label: "Keçiören" },
    { value: "yenimahalle", label: "Yenimahalle" },
    { value: "mamak", label: "Mamak" },
  ],
  izmir: [
    { value: "konak", label: "Konak" },
    { value: "karsiyaka", label: "Karşıyaka" },
    { value: "bornova", label: "Bornova" },
    { value: "alsancak", label: "Alsancak" },
  ],
  antalya: [
    { value: "kemer", label: "Kemer" },
    { value: "belek", label: "Belek" },
    { value: "side", label: "Side" },
    { value: "alanya", label: "Alanya" },
    { value: "kas", label: "Kaş" },
  ],
  bursa: [
    { value: "osmangazi", label: "Osmangazi" },
    { value: "nilufer", label: "Nilüfer" },
    { value: "yildirim", label: "Yıldırım" },
  ],
  mugla: [
    { value: "bodrum", label: "Bodrum" },
    { value: "marmaris", label: "Marmaris" },
    { value: "fethiye", label: "Fethiye" },
    { value: "datca", label: "Datça" },
  ],
  nevsehir: [
    { value: "goreme", label: "Göreme" },
    { value: "urgup", label: "Ürgüp" },
    { value: "avanos", label: "Avanos" },
  ],
  adana: [
    { value: "seyhan", label: "Seyhan" },
    { value: "yuregir", label: "Yüreğir" },
    { value: "cukurova", label: "Çukurova" },
  ],
  gaziantep: [
    { value: "sahinbey", label: "Şahinbey" },
    { value: "sehitkamil", label: "Şehitkamil" },
  ],
  konya: [
    { value: "meram", label: "Meram" },
    { value: "selcuklu", label: "Selçuklu" },
    { value: "karatay", label: "Karatay" },
  ],
};

const hotels = [
  {
    id: "1",
    name: "Bosphorus Palace Hotel",
    city: "istanbul",
    district: "besiktas",
    rating: 4.8,
    reviews: 1247,
    description: "Boğaz manzaralı lüks konaklama",
    features: ["Ücretsiz Wi-Fi", "Açık Havuz", "Spa & Wellness", "Vale Park"],
    price: 4500,
    image: "🏰"
  },
  {
    id: "2",
    name: "Sunset Beach Resort",
    city: "antalya",
    district: "belek",
    rating: 4.9,
    reviews: 2103,
    description: "Her şey dahil ultra lüks tatil",
    features: ["Özel Plaj", "5 Restoran", "Aquapark", "Kids Club"],
    price: 3800,
    image: "🌅"
  },
  {
    id: "3",
    name: "Thermal Spa & Wellness",
    city: "bursa",
    district: "osmangazi",
    rating: 4.6,
    reviews: 892,
    description: "Termal su ve kaplıca merkezi",
    features: ["Termal Havuz", "Masaj", "Sauna", "Kahvaltı Dahil"],
    price: 2200,
    image: "♨️"
  },
  {
    id: "4",
    name: "Aegean Breeze Boutique",
    city: "mugla",
    district: "bodrum",
    rating: 4.7,
    reviews: 1456,
    description: "Denize sıfır butik otel",
    features: ["Özel Plaj", "Infinity Pool", "Bar", "Transfer"],
    price: 3200,
    image: "⛵"
  },
  {
    id: "5",
    name: "Capital Business Hotel",
    city: "ankara",
    district: "cankaya",
    rating: 4.5,
    reviews: 678,
    description: "Modern iş oteli - Merkezi konum",
    features: ["Toplantı Salonu", "Business Center", "Fitness", "Otopark"],
    price: 1800,
    image: "🏢"
  },
  {
    id: "6",
    name: "Cappadocia Cave Suites",
    city: "nevsehir",
    district: "goreme",
    rating: 5.0,
    reviews: 2567,
    description: "Mağara odalarda eşsiz deneyim",
    features: ["Balon Turu", "Teras Kahvaltı", "Concierge", "Spa"],
    price: 4200,
    image: "🎈"
  },
  {
    id: "7",
    name: "Mediterranean Pearl",
    city: "antalya",
    district: "kemer",
    rating: 4.8,
    reviews: 1834,
    description: "Aile dostu tatil konsepti",
    features: ["Animasyon", "Aquapark", "Mini Club", "6 Restoran"],
    price: 3500,
    image: "🏖️"
  },
  {
    id: "8",
    name: "Izmir Kordon Suites",
    city: "izmir",
    district: "konak",
    rating: 4.4,
    reviews: 543,
    description: "Kordon sahil şeridi premium daireler",
    features: ["Deniz Manzarası", "Mutfak", "Balkon", "Merkezi Konum"],
    price: 2600,
    image: "🌊"
  }
];

export default function Konaklama() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeTab, setActiveTab] = useState("otel");
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

  const activeOption = accommodationOptions.find(opt => opt.id === activeTab);

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
                            <Hotel className="w-8 h-8 md:w-10 md:h-10 text-white" />
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
            <span className="text-accent-amber">Konaklama</span> Seçenekleri
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-4">
            Türkiye'nin dört bir yanında konforlu ve güvenli konaklama. İhtiyacınıza göre seçin, hemen rezerve edin.
          </p>
          <div className="bg-gradient-to-r from-accent-amber/20 to-accent-amber/10 rounded-2xl p-4 border border-accent-amber/30 max-w-3xl mx-auto">
            <p className="text-lg font-semibold text-accent-amber">
              Konaklama servisleri çok yakında!
            </p>
          </div>
        </div>

        {/* APPLE TARZI TAB SİSTEMİ */}
        <div className="max-w-6xl mx-auto">
          {/* TAB BUTTONS */}
          <div className="flex justify-center mb-8 gap-3 flex-wrap">
            {accommodationOptions.map((option) => {
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
              <div className="bg-gradient-to-r from-accent-amber/20 to-transparent rounded-2xl p-6 border border-accent-amber/30 text-center">
                <p className="text-xl font-semibold text-accent-amber">
                  {activeOption.content.comingSoon}
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

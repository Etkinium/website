import { useState, useEffect } from "react";
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
    tagline: "Tek Platform, Sonsuz Sanat"
  },
  {
    id: 2,
    title: "Yeni Özellikler",
    description: "Çok Yakında Sizlerle!"
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
  const [activeTab, setActiveTab] = useState("otel");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const activeOption = accommodationOptions.find(opt => opt.id === activeTab);

  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <Header />

      <main className="pt-32 pb-20 px-4 md:px-8 lg:px-16">
        {/* HORIZONTAL BANNER SLIDER */}
        <div className="relative overflow-hidden rounded-xl mb-12 bg-gradient-to-r from-red-900/40 via-red-800/50 to-red-900/40 border-2 border-accent-amber/40 shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:shadow-[0_0_30px_rgba(251,191,36,0.4)] transition-shadow duration-300"
             style={{ height: "160px" }}>
          <div className="relative h-full">
            {bannerSlides.map((slide, index) => {
              const position = index - currentSlide;
              const isActive = index === currentSlide;
              const isPrev = position === -1 || (currentSlide === 0 && index === bannerSlides.length - 1);
              const isNext = position === 1 || (currentSlide === bannerSlides.length - 1 && index === 0);
              
              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-all duration-[1500ms] ease-in-out ${
                    isActive ? "translate-x-0 opacity-100 z-10" :
                    isPrev ? "-translate-x-full opacity-0 z-0" :
                    isNext ? "translate-x-full opacity-0 z-0" :
                    "translate-x-full opacity-0 z-0"
                  }`}
                  data-testid={`banner-slide-${index}`}
                >
                  {slide.logo ? (
                    <div className="flex items-center justify-start h-full gap-4 px-6 md:px-8">
                      <div className="flex-shrink-0">
                        <img 
                          src={slide.logo}
                          alt="ETKİNİUM Logo"
                          className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]"
                        />
                      </div>
                      <div>
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-accent-amber drop-shadow-[0_2px_10px_rgba(251,191,36,0.3)]">
                          {slide.brandName}
                        </h2>
                        <p className="text-sm md:text-base lg:text-lg text-white font-medium">
                          {slide.tagline}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full px-6">
                      <div className="text-center">
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-accent-amber mb-2 drop-shadow-[0_2px_10px_rgba(251,191,36,0.3)]">
                          {slide.title}
                        </h3>
                        <p className="text-sm md:text-base lg:text-lg text-white font-medium">
                          {slide.description}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* DOTS - Banner Navigation */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
            {bannerSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "w-8 h-2.5 bg-accent-amber"
                    : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80"
                }`}
                data-testid={`banner-dot-${index}`}
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

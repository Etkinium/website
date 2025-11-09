import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Wifi, Coffee, Waves, Utensils, Dumbbell, Car } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import logoImage from "@assets/logo-final.png";

const slides = [
  {
    label: "Reklam Alanı",
    title: "ETKİNİUM",
    description: "Türkiye'nin Yeni Nesil Dijital Biletleme Ekosistemi",
    contactEmail: "iletisim@etkinium.com",
    isAdvertising: true
  },
  {
    label: "Etkinium Partner",
    title: "Seçili otellerde lansmana özel %10 indirim",
    description: "Etkinium üzerinden rezervasyon yapan kullanıcılara özel fiyat avantajı."
  },
  {
    label: "Puan Sistemi",
    title: "Her rezervasyonda Etkinium Puan kazan",
    description: "Puanlarını sonraki konaklamalarda veya etkinliklerde kullan."
  },
  {
    label: "Güvenli Rezervasyon",
    title: "Tek panelden otel, etkinlik ve seyahat yönetimi",
    description: "İptal, değişiklik ve destek süreçlerinde şeffaf ve güvenilir yapı."
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
    points: 4500,
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
    points: 3800,
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
    points: 2200,
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
    points: 3200,
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
    points: 1800,
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
    points: 4200,
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
    points: 3500,
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
    points: 2600,
    image: "🌊"
  }
];

export default function Konaklama() {
  const [, setLocation] = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [usePoints, setUsePoints] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("all");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const formatTl = (value: number) => {
    return new Intl.NumberFormat("tr-TR").format(value) + " TL";
  };

  const formatPuan = (value: number) => {
    return new Intl.NumberFormat("tr-TR").format(value) + " Etkinium Puan";
  };

  const filteredHotels = hotels.filter(hotel => {
    if (selectedCity !== "all" && hotel.city !== selectedCity) return false;
    if (selectedDistrict !== "all" && hotel.district !== selectedDistrict) return false;
    return true;
  });

  const availableDistricts = selectedCity !== "all" ? districts[selectedCity] || [] : [];

  const getCityLabel = (cityValue: string) => {
    return turkishCities.find(c => c.value === cityValue)?.label || cityValue;
  };

  const getDistrictLabel = (districtValue: string) => {
    if (selectedCity === "all") return districtValue;
    return availableDistricts.find(d => d.value === districtValue)?.label || districtValue;
  };

  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <Header />

      <main className="pt-32 pb-20 px-4 md:px-8 lg:px-16">
        {/* SLIDER - KAYAN ANİMASYON */}
        <div className="relative overflow-hidden rounded-3xl mb-12 shadow-2xl h-64"
             style={{ background: "radial-gradient(circle at top left, #3b0764, #111827)" }}>
          <div className="relative h-full">
            {slides.map((slide, index) => {
              const position = index - currentSlide;
              const isActive = index === currentSlide;
              const isPrev = position === -1 || (currentSlide === 0 && index === slides.length - 1);
              const isNext = position === 1 || (currentSlide === slides.length - 1 && index === 0);
              
              return (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    slide.isAdvertising ? "" : "p-8 md:p-10"
                  } ${
                    isActive ? "translate-x-0 opacity-100 z-10" :
                    isPrev ? "-translate-x-full opacity-0 z-0" :
                    isNext ? "translate-x-full opacity-0 z-0" :
                    "translate-x-full opacity-0 z-0"
                  }`}
                  data-testid={`slide-${index}`}
                >
                  {slide.isAdvertising ? (
                    <div className="flex flex-col items-center justify-center h-full p-4">
                      <div className="inline-block px-4 py-1.5 rounded-full bg-accent-amber text-spotify-black text-xs font-semibold mb-6">
                        {slide.label}
                      </div>
                      <img 
                        src={logoImage}
                        alt="ETKİNİUM Logo"
                        className="w-32 h-32 md:w-40 md:h-40 object-contain mb-4"
                      />
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-accent-amber">
                        {slide.title}
                      </h2>
                      <p className="text-base md:text-lg text-gray-200 mb-6 text-center max-w-xl">
                        {slide.description}
                      </p>
                      <p className="text-sm md:text-base text-gray-300">
                        Reklam vermek için:{" "}
                        <a 
                          href={`mailto:${slide.contactEmail}`}
                          className="text-accent-amber hover:underline font-semibold"
                        >
                          {slide.contactEmail}
                        </a>
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="inline-block px-4 py-1.5 rounded-full bg-accent-amber text-spotify-black text-xs font-semibold mb-3">
                        {slide.label}
                      </div>
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-yellow-50">
                        {slide.title}
                      </h2>
                      <p className="text-sm md:text-base text-gray-200 max-w-2xl">
                        {slide.description}
                      </p>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* DOTS */}
          <div className="absolute right-6 bottom-6 flex gap-2 z-20">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "w-8 h-3 bg-accent-amber"
                    : "w-3 h-3 bg-white/30 hover:bg-white/50"
                }`}
                data-testid={`dot-${index}`}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* FİLTRELEME VE BAŞLIK */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
            <h3 className="text-2xl md:text-3xl font-bold text-white" data-testid="text-konaklama-title">
              <span className="text-accent-amber">Konaklama</span> Seçenekleri
            </h3>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">TL</span>
              <button
                onClick={() => setUsePoints(!usePoints)}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors shadow-md ${
                  usePoints ? "bg-accent-amber" : "bg-gray-700"
                }`}
                data-testid="button-toggle-points"
                aria-label="Puan ile öde"
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full transition-transform shadow-sm ${
                    usePoints
                      ? "translate-x-6 bg-spotify-black"
                      : "translate-x-1 bg-accent-amber"
                  }`}
                />
              </button>
              <span className="text-sm text-gray-400">Puan</span>
            </div>
          </div>

          {/* FİLTRELER */}
          <div className="flex flex-col sm:flex-row gap-4 bg-gray-900/30 p-4 rounded-2xl border border-gray-800">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">Şehir Seç</label>
              <Select value={selectedCity} onValueChange={(value) => {
                setSelectedCity(value);
                setSelectedDistrict("all");
              }}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white" data-testid="select-city">
                  <SelectValue placeholder="Tüm Şehirler" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="all" className="text-white hover:bg-gray-700">Tüm Şehirler</SelectItem>
                  {turkishCities.map(city => (
                    <SelectItem key={city.value} value={city.value} className="text-white hover:bg-gray-700">
                      {city.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">İlçe Seç</label>
              <Select 
                value={selectedDistrict} 
                onValueChange={setSelectedDistrict}
                disabled={selectedCity === "all" || availableDistricts.length === 0}
              >
                <SelectTrigger 
                  className="bg-gray-800 border-gray-700 text-white disabled:opacity-50" 
                  data-testid="select-district"
                >
                  <SelectValue placeholder="Tüm İlçeler" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="all" className="text-white hover:bg-gray-700">Tüm İlçeler</SelectItem>
                  {availableDistricts.map(district => (
                    <SelectItem key={district.value} value={district.value} className="text-white hover:bg-gray-700">
                      {district.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button
                onClick={() => {
                  setSelectedCity("all");
                  setSelectedDistrict("all");
                }}
                className="bg-black text-white border border-gray-600 hover:bg-accent-amber hover:text-black transition-all"
                data-testid="button-clear-filters"
              >
                Filtreleri Temizle
              </Button>
            </div>
          </div>
        </div>

        {/* OTEL LİSTESİ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel.id}
              onClick={() => setLocation(`/konaklama/${hotel.id}`)}
              className="group relative bg-gradient-to-br from-gray-900/90 to-gray-950/90 rounded-3xl border border-gray-800/50 overflow-hidden hover:border-accent-amber/50 transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:shadow-2xl hover:shadow-accent-amber/20"
              data-testid={`hotel-item-${hotel.id}`}
            >
              <div className="p-6">
                {/* BAŞLIK VE İCON */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-4xl">{hotel.image}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-accent-amber text-accent-amber" />
                        <span className="text-sm font-semibold text-white">{hotel.rating}</span>
                        <span className="text-xs text-gray-400">({hotel.reviews} değerlendirme)</span>
                      </div>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-1 group-hover:text-accent-amber transition-colors" data-testid={`hotel-name-${hotel.id}`}>
                      {hotel.name}
                    </h4>
                    <div className="flex items-center gap-1.5 text-sm text-gray-400 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{getCityLabel(hotel.city)}, {getDistrictLabel(hotel.district)}</span>
                    </div>
                    <p className="text-sm text-gray-300 mb-4">{hotel.description}</p>
                  </div>
                </div>

                {/* ÖZELLİKLER */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {hotel.features.slice(0, 4).map((feature, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 rounded-full bg-gray-800/50 text-gray-300 border border-gray-700"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* FİYAT */}
                <div className="pt-4 border-t border-gray-800">
                  {usePoints ? (
                    <div className="text-right">
                      <p className="text-xs text-gray-400 mb-1">Puan ile</p>
                      <p className="text-2xl font-bold text-accent-amber" data-testid={`price-points-${hotel.id}`}>
                        {formatPuan(hotel.points)}
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs text-gray-400">Gecelik başlangıç fiyatı</p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-accent-amber" data-testid={`price-tl-${hotel.id}`}>
                          {formatTl(hotel.price)}
                        </p>
                        <p className="text-xs text-gray-500">~{hotel.points} puan</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* HOVER INDICATOR */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent-amber/30 rounded-3xl transition-all pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

        {/* SONUÇ BULUNAMADI */}
        {filteredHotels.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-400">
              Seçili filtrelere uygun otel bulunamadı.
            </p>
            <Button
              onClick={() => {
                setSelectedCity("all");
                setSelectedDistrict("all");
              }}
              className="mt-4 bg-black text-white border border-gray-600 hover:bg-accent-amber hover:text-black transition-all"
            >
              Tüm Otelleri Göster
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

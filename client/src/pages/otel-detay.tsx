import { useRoute, useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Wifi, Coffee, Waves, Utensils, Dumbbell, Car, ArrowLeft, Check } from "lucide-react";

const hotels = [
  {
    id: "1",
    name: "Bosphorus Palace Hotel",
    city: "İstanbul",
    district: "Beşiktaş",
    rating: 4.8,
    reviews: 1247,
    description: "Boğaz manzaralı lüks konaklama",
    fullDescription: "Bosphorus Palace Hotel, İstanbul Boğazı'nın eşsiz manzarasıyla öne çıkan lüks bir konaklama deneyimi sunuyor. Beşiktaş'ın merkezinde yer alan otelimiz, modern mimarisi ve tarihi dokusunu ustaca harmanlayan tasarımıyla dikkat çekiyor.",
    features: ["Ücretsiz Wi-Fi", "Açık Havuz", "Spa & Wellness", "Vale Park"],
    price: 4500,
    points: 4500,
    image: "🏰",
    amenities: [
      { icon: Wifi, text: "Ücretsiz Yüksek Hızlı Wi-Fi" },
      { icon: Waves, text: "Açık Yüzme Havuzu" },
      { icon: Dumbbell, text: "Modern Fitness Center" },
      { icon: Car, text: "Vale Park Hizmeti" },
      { icon: Coffee, text: "24 Saat Oda Servisi" },
      { icon: Utensils, text: "Boğaz Manzaralı Restoran" }
    ],
    rooms: [
      { name: "Standart Oda", price: 4500, features: ["Boğaz Manzarası", "Klima", "Mini Bar", "40m²"] },
      { name: "Deluxe Suite", price: 6800, features: ["Panoramik Manzara", "Oturma Alanı", "Jakuzi", "60m²"] },
      { name: "Presidential Suite", price: 12000, features: ["360° Manzara", "2 Yatak Odası", "Özel Teras", "120m²"] }
    ]
  },
  {
    id: "2",
    name: "Sunset Beach Resort",
    city: "Antalya",
    district: "Belek",
    rating: 4.9,
    reviews: 2103,
    description: "Her şey dahil ultra lüks tatil",
    fullDescription: "Akdeniz'in masmavi sularıyla buluşan Sunset Beach Resort, her şey dahil konseptiyle ailenize unutulmaz bir tatil deneyimi sunuyor.",
    features: ["Özel Plaj", "5 Restoran", "Aquapark", "Kids Club"],
    price: 3800,
    points: 3800,
    image: "🌅",
    amenities: [
      { icon: Waves, text: "500m Özel Plaj" },
      { icon: Utensils, text: "5 A'la Carte Restoran" },
      { icon: Coffee, text: "24 Saat All Inclusive" },
      { icon: Dumbbell, text: "Su Sporları Merkezi" },
      { icon: Wifi, text: "Tüm Alanlarda Wi-Fi" },
      { icon: Car, text: "Ücretsiz Otopark" }
    ],
    rooms: [
      { name: "Standart Oda", price: 3800, features: ["Bahçe Manzarası", "Balkon", "All Inclusive", "30m²"] },
      { name: "Deniz Manzaralı", price: 4500, features: ["Akdeniz Manzarası", "Geniş Balkon", "All Inclusive", "35m²"] },
      { name: "Family Suite", price: 6200, features: ["2 Oda", "Deniz Manzarası", "Çocuk Köşesi", "55m²"] }
    ]
  },
  {
    id: "3",
    name: "Thermal Spa & Wellness",
    city: "Bursa",
    district: "Osmangazi",
    rating: 4.6,
    reviews: 892,
    description: "Termal su ve kaplıca merkezi",
    fullDescription: "Bursa'nın ünlü termal sularından faydalanan lüks wellness otelimiz, şifa ve dinlenme arayanlar için ideal bir kaçış noktası.",
    features: ["Termal Havuz", "Masaj", "Sauna", "Kahvaltı Dahil"],
    price: 2200,
    points: 2200,
    image: "♨️",
    amenities: [
      { icon: Waves, text: "Doğal Termal Havuz" },
      { icon: Coffee, text: "Açık Büfe Kahvaltı" },
      { icon: Dumbbell, text: "Spa & Masaj Merkezi" },
      { icon: Wifi, text: "Ücretsiz Wi-Fi" },
      { icon: Car, text: "Otopark" },
      { icon: Utensils, text: "Restoran" }
    ],
    rooms: [
      { name: "Standart Oda", price: 2200, features: ["Şehir Manzarası", "Termal Banyo", "Mini Bar", "28m²"] },
      { name: "Deluxe Oda", price: 3100, features: ["Bahçe Manzarası", "Jakuzi", "Balkon", "38m²"] },
      { name: "Spa Suite", price: 4800, features: ["Özel Jakuzi", "Masaj Odası", "Teras", "55m²"] }
    ]
  },
  {
    id: "4",
    name: "Aegean Breeze Boutique",
    city: "Muğla",
    district: "Bodrum",
    rating: 4.7,
    reviews: 1456,
    description: "Denize sıfır butik otel",
    fullDescription: "Ege'nin turkuaz sularına nazır butik otelimiz, sakin ve lüks bir tatil deneyimi için tasarlandı.",
    features: ["Özel Plaj", "Infinity Pool", "Bar", "Transfer"],
    price: 3200,
    points: 3200,
    image: "⛵",
    amenities: [
      { icon: Waves, text: "Özel Plaj Alanı" },
      { icon: Utensils, text: "Deniz Ürünleri Restoranı" },
      { icon: Coffee, text: "Beach Bar" },
      { icon: Dumbbell, text: "Su Sporları" },
      { icon: Wifi, text: "Yüksek Hızlı Wi-Fi" },
      { icon: Car, text: "Havalimanı Transferi" }
    ],
    rooms: [
      { name: "Standart Oda", price: 3200, features: ["Deniz Manzarası", "Balkon", "Klima", "32m²"] },
      { name: "Deluxe Oda", price: 4200, features: ["Panoramik Manzara", "Geniş Balkon", "Jakuzi", "42m²"] },
      { name: "Honeymoon Suite", price: 6500, features: ["Özel Havuz", "Deniz Manzarası", "Romantik Dekor", "65m²"] }
    ]
  },
  {
    id: "5",
    name: "Capital Business Hotel",
    city: "Ankara",
    district: "Çankaya",
    rating: 4.5,
    reviews: 678,
    description: "Modern iş oteli - Merkezi konum",
    fullDescription: "Ankara'nın iş merkezinde konumlanan modern otelimiz, iş seyahati için ideal konaklama imkanı sunuyor.",
    features: ["Toplantı Salonu", "Business Center", "Fitness", "Otopark"],
    price: 1800,
    points: 1800,
    image: "🏢",
    amenities: [
      { icon: Wifi, text: "Yüksek Hızlı Wi-Fi" },
      { icon: Coffee, text: "Business Lounge" },
      { icon: Dumbbell, text: "Fitness Center" },
      { icon: Car, text: "Vale Park" },
      { icon: Utensils, text: "Executive Restoran" },
      { icon: Waves, text: "Kapalı Havuz" }
    ],
    rooms: [
      { name: "Standart Oda", price: 1800, features: ["Şehir Manzarası", "Work Desk", "Mini Bar", "26m²"] },
      { name: "Business Suite", price: 2600, features: ["Toplantı Alanı", "Premium Yatak", "Çalışma Odası", "45m²"] },
      { name: "Executive Suite", price: 4200, features: ["Panoramik Manzara", "Office Setup", "Lounge", "70m²"] }
    ]
  },
  {
    id: "6",
    name: "Cappadocia Cave Suites",
    city: "Nevşehir",
    district: "Göreme",
    rating: 5.0,
    reviews: 2567,
    description: "Mağara odalarda eşsiz deneyim",
    fullDescription: "Kapadokya'nın büyülü peribacaları arasında, mağara odalarda konaklama deneyimi. Balon turları ile unutulmaz anılar.",
    features: ["Balon Turu", "Teras Kahvaltı", "Concierge", "Spa"],
    price: 4200,
    points: 4200,
    image: "🎈",
    amenities: [
      { icon: Waves, text: "Panoramik Teras" },
      { icon: Coffee, text: "Peribacası Manzaralı Kahvaltı" },
      { icon: Dumbbell, text: "Hamam & Spa" },
      { icon: Wifi, text: "Ücretsiz Wi-Fi" },
      { icon: Car, text: "Tur Transfer Hizmeti" },
      { icon: Utensils, text: "Geleneksel Restoran" }
    ],
    rooms: [
      { name: "Cave Room", price: 4200, features: ["Mağara Oda", "Peribacası Manzarası", "Tarihi Dokum", "30m²"] },
      { name: "Deluxe Cave", price: 5800, features: ["Premium Mağara", "Jakuzi", "Özel Teras", "45m²"] },
      { name: "Presidential Cave", price: 9500, features: ["Lüks Mağara", "360° Manzara", "Private Balcony", "75m²"] }
    ]
  },
  {
    id: "7",
    name: "Mediterranean Pearl",
    city: "Antalya",
    district: "Kemer",
    rating: 4.8,
    reviews: 1834,
    description: "Aile dostu tatil konsepti",
    fullDescription: "Kemer'in muhteşem doğasında, ailenizle birlikte eğlence dolu bir tatil için her şey hazır.",
    features: ["Animasyon", "Aquapark", "Mini Club", "6 Restoran"],
    price: 3500,
    points: 3500,
    image: "🏖️",
    amenities: [
      { icon: Waves, text: "Aquapark & Kaydıraklar" },
      { icon: Utensils, text: "6 Tema Restoran" },
      { icon: Coffee, text: "All Inclusive Ultra" },
      { icon: Dumbbell, text: "Çocuk Aktiviteleri" },
      { icon: Wifi, text: "Tüm Tesiste Wi-Fi" },
      { icon: Car, text: "Ücretsiz Otopark" }
    ],
    rooms: [
      { name: "Family Room", price: 3500, features: ["Aile Odası", "2 Oda", "Balkon", "48m²"] },
      { name: "Sea View", price: 4300, features: ["Deniz Manzarası", "Geniş Balkon", "All Inclusive", "42m²"] },
      { name: "Presidential Family", price: 7200, features: ["2 Yatak Odası", "Living Room", "Premium", "95m²"] }
    ]
  },
  {
    id: "8",
    name: "Izmir Kordon Suites",
    city: "İzmir",
    district: "Konak",
    rating: 4.4,
    reviews: 543,
    description: "Kordon sahil şeridi premium daireler",
    fullDescription: "İzmir Kordon'da, deniz manzaralı apart daireler. Uzun süreli konaklama ve şehir keşfi için ideal.",
    features: ["Deniz Manzarası", "Mutfak", "Balkon", "Merkezi Konum"],
    price: 2600,
    points: 2600,
    image: "🌊",
    amenities: [
      { icon: Waves, text: "Kordon Sahil Manzarası" },
      { icon: Coffee, text: "Tam Donanımlı Mutfak" },
      { icon: Wifi, text: "Fiber İnternet" },
      { icon: Car, text: "Kapalı Otopark" },
      { icon: Dumbbell, text: "Fitness Salonu" },
      { icon: Utensils, text: "Market & Kafe" }
    ],
    rooms: [
      { name: "Studio Suite", price: 2600, features: ["Deniz Manzarası", "Mini Mutfak", "Balkon", "35m²"] },
      { name: "1+1 Daire", price: 3400, features: ["Ayrı Yatak Odası", "Mutfak", "Balkon", "55m²"] },
      { name: "2+1 Penthouse", price: 5800, features: ["Çatı Katı", "Geniş Teras", "Premium", "95m²"] }
    ]
  }
];

export default function OtelDetay() {
  const [, params] = useRoute("/konaklama/:id");
  const [, setLocation] = useLocation();
  
  const hotelId = params?.id;
  const hotel = hotels.find(h => h.id === hotelId);

  if (!hotel) {
    return (
      <div className="min-h-screen bg-spotify-black text-white">
        <Header />
        <main className="pt-32 pb-20 px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Otel bulunamadı</h1>
          <Button onClick={() => setLocation("/konaklama")} className="bg-accent-amber text-spotify-black">
            Konaklama Listesine Dön
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <Header />

      <main className="pt-32 pb-20">
        {/* GERİ BUTONU */}
        <div className="container mx-auto px-4 md:px-8 lg:px-16 mb-6">
          <Button
            onClick={() => setLocation("/konaklama")}
            variant="ghost"
            className="text-gray-400 hover:text-white gap-2"
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4" />
            Konaklama Listesine Dön
          </Button>
        </div>

        {/* HERO SECTION */}
        <div className="relative bg-gradient-to-br from-purple-900/40 to-gray-900/40 py-12 mb-12">
          <div className="container mx-auto px-4 md:px-8 lg:px-16">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">{hotel.image}</span>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 fill-accent-amber text-accent-amber" />
                  <span className="text-lg font-semibold">{hotel.rating}</span>
                  <span className="text-sm text-gray-400">({hotel.reviews} değerlendirme)</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2" data-testid="hotel-name">
                  {hotel.name}
                </h1>
                <div className="flex items-center gap-2 text-gray-300">
                  <MapPin className="w-5 h-5" />
                  <span className="text-lg">{hotel.city}, {hotel.district}</span>
                </div>
              </div>
            </div>
            <p className="text-lg text-gray-200 max-w-3xl">{hotel.fullDescription}</p>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          {/* ÖZELLİKLER */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-accent-amber">Otel Özellikleri</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hotel.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-gray-900/50 rounded-xl border border-gray-800">
                  <amenity.icon className="w-6 h-6 text-accent-amber" />
                  <span className="text-gray-200">{amenity.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ODA SEÇENEKLERİ */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-accent-amber">Oda Seçenekleri</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {hotel.rooms.map((room, idx) => (
                <div key={idx} className="bg-gradient-to-br from-gray-900/90 to-gray-950/90 rounded-2xl border border-gray-800 p-6 hover:border-accent-amber/50 transition-all">
                  <h3 className="text-xl font-bold mb-4">{room.name}</h3>
                  <div className="space-y-2 mb-6">
                    {room.features.map((feature, fidx) => (
                      <div key={fidx} className="flex items-center gap-2 text-sm text-gray-300">
                        <Check className="w-4 h-4 text-accent-amber" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-gray-800">
                    <p className="text-sm text-gray-400 mb-1">Gecelik fiyat</p>
                    <p className="text-3xl font-bold text-accent-amber">
                      {new Intl.NumberFormat("tr-TR").format(room.price)} TL
                    </p>
                    <p className="text-xs text-gray-500 mt-1">~{room.price} puan</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* REZERVASYON BUTTONU */}
          <div className="bg-gradient-to-r from-purple-900/40 to-gray-900/40 rounded-3xl p-8 text-center border border-gray-800">
            <h3 className="text-2xl font-bold mb-4">Rezervasyon Yapmak İster Misiniz?</h3>
            <p className="text-gray-300 mb-6">
              Otelimizde unutulmaz bir konaklama deneyimi için hemen rezervasyon yapın!
            </p>
            <Button 
              className="bg-accent-amber text-spotify-black hover:bg-accent-amber/90 text-lg px-8 py-6"
              data-testid="button-reserve"
            >
              Rezervasyon Yap (Yakında)
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              Rezervasyon sistemi yakında aktif olacak. Şu an için bilgi amaçlı gösterilmektedir.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

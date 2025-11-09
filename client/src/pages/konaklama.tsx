import { useState, useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

const slides = [
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

const hotels = [
  {
    name: "Merkez İş Oteli",
    meta: "İstanbul • İş seyahati odaklı • Ücretsiz Wi-Fi",
    price: 3000,
    points: 3000
  },
  {
    name: "Sahil Resort",
    meta: "Antalya • Denize sıfır • Havuz • Kahvaltı dahil",
    price: 2200,
    points: 2200
  },
  {
    name: "Şehir Butik Otel",
    meta: "Bursa • Merkez • Uygun fiyatlı konaklama",
    price: 1500,
    points: 1500
  }
];

export default function Konaklama() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [usePoints, setUsePoints] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const formatTl = (value: number) => {
    return new Intl.NumberFormat("tr-TR").format(value) + " TL";
  };

  const formatPuan = (value: number) => {
    return new Intl.NumberFormat("tr-TR").format(value) + " Etkinium Puan";
  };

  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <Header />

      <main className="pt-32 pb-20 px-4 md:px-20 lg:px-32">
        {/* SLIDER */}
        <div className="relative overflow-hidden rounded-3xl p-8 md:p-10 mb-10 shadow-2xl"
             style={{
               background: "radial-gradient(circle at top left, #3b0764, #111827)"
             }}>
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ${
                index === currentSlide
                  ? "opacity-100 translate-x-0 relative"
                  : "opacity-0 translate-x-5 absolute inset-8 md:inset-10"
              }`}
              data-testid={`slide-${index}`}
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-accent-amber text-spotify-black text-xs font-semibold mb-3">
                {slide.label}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-yellow-50">
                {slide.title}
              </h2>
              <p className="text-sm md:text-base text-gray-200 max-w-lg">
                {slide.description}
              </p>
            </div>
          ))}

          {/* DOTS */}
          <div className="absolute right-6 bottom-5 flex gap-1.5">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`rounded-full transition-all duration-200 ${
                  index === currentSlide
                    ? "w-5 h-2.5 bg-accent-amber"
                    : "w-2.5 h-2.5 bg-white/20"
                }`}
                data-testid={`dot-${index}`}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* LİSTE BAŞLIK + TOGGLE */}
        <div className="flex items-center justify-between gap-4 mb-5 flex-wrap">
          <h3 className="text-xl md:text-2xl font-semibold text-accent-amber" data-testid="text-konaklama-title">
            Konaklama Seçenekleri
          </h3>

          <div className="flex items-center gap-2.5">
            <span className="text-xs text-gray-400">TL</span>
            <button
              onClick={() => setUsePoints(!usePoints)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                usePoints ? "bg-accent-amber" : "bg-gray-800 border border-gray-600"
              }`}
              data-testid="button-toggle-points"
              aria-label="Puan ile öde"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full transition-transform ${
                  usePoints
                    ? "translate-x-6 bg-spotify-black"
                    : "translate-x-1 bg-accent-amber"
                }`}
              />
            </button>
            <span className="text-xs text-gray-400">Puan ile Öde</span>
          </div>
        </div>

        {/* KONAKLAMA LİSTESİ */}
        <div className="flex flex-col gap-3">
          {hotels.map((hotel, index) => (
            <div
              key={index}
              className="p-4 md:p-5 rounded-2xl bg-gray-950/50 border border-gray-800/50 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              data-testid={`hotel-item-${index}`}
            >
              <div className="flex flex-col gap-1">
                <div className="text-base md:text-lg font-semibold text-gray-50" data-testid={`hotel-name-${index}`}>
                  {hotel.name}
                </div>
                <div className="text-xs text-gray-400" data-testid={`hotel-meta-${index}`}>
                  {hotel.meta}
                </div>
              </div>

              <div className="text-left md:text-right min-w-[140px]">
                {usePoints ? (
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm text-gray-400" data-testid={`price-points-${index}`}>
                      {formatPuan(hotel.points)} ile bu konaklama tamamen puanla ödenebilir.
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col gap-0.5">
                    <span className="text-base md:text-lg font-semibold text-accent-amber" data-testid={`price-tl-${index}`}>
                      {formatTl(hotel.price)}
                    </span>
                    <span className="text-xs text-gray-400" data-testid={`price-points-info-${index}`}>
                      Yaklaşık {formatPuan(hotel.points)} değerinde puan karşılığı.
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

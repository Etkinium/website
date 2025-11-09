import { useState, useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Plane, Bus, Ship, Train } from "lucide-react";

const slides = [
  {
    label: "Seyahat Fırsatları",
    title: "Türkiye'nin her yerine uygun fiyatlarla seyahat edin",
    description: "Uçak, otobüs, deniz ve demiryolu biletlerini tek platformdan alın. ETKİNİUM Puan kazanın!"
  },
  {
    label: "Hızlı ve Güvenli",
    title: "Dijital bilet, anında onay",
    description: "Biletiniz QR kodlu olarak e-postanıza gelir, kuyruklarda beklemeye son!"
  },
  {
    label: "Puan Kazan",
    title: "Her seyahatte ETKİNİUM Puan",
    description: "Kazandığınız puanları sonraki seyahatlerinizde veya etkinliklerde kullanın."
  }
];

const transportOptions = [
  {
    id: "ucak",
    icon: Plane,
    title: "Uçak Bileti",
    description: "İç ve dış hat uçuşlar",
    badge: "Yakında",
    gradient: "from-blue-600 to-cyan-500"
  },
  {
    id: "otobus",
    icon: Bus,
    title: "Otobüs Bileti",
    description: "Şehirlerarası konforlu yolculuk",
    badge: "Yakında",
    gradient: "from-green-600 to-emerald-500"
  },
  {
    id: "deniz",
    icon: Ship,
    title: "Deniz Yolları",
    description: "Feribot ve gemi seferleri",
    badge: "Yakında",
    gradient: "from-indigo-600 to-blue-500"
  },
  {
    id: "tren",
    icon: Train,
    title: "Demir Yolları",
    description: "Hızlı tren ve banliyö hatları",
    badge: "Yakında",
    gradient: "from-purple-600 to-pink-500"
  }
];

export default function Seyahat() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <Header />

      <main className="pt-32 pb-20 px-4 md:px-8 lg:px-16">
        {/* SLIDER */}
        <div className="relative overflow-hidden rounded-3xl mb-12 shadow-2xl h-64"
             style={{ background: "radial-gradient(circle at top left, #1e3a8a, #111827)" }}>
          <div className="relative h-full">
            {slides.map((slide, index) => {
              const position = index - currentSlide;
              const isActive = index === currentSlide;
              const isPrev = position === -1 || (currentSlide === 0 && index === slides.length - 1);
              const isNext = position === 1 || (currentSlide === slides.length - 1 && index === 0);
              
              return (
                <div
                  key={index}
                  className={`absolute inset-0 p-8 md:p-10 transition-all duration-700 ease-in-out ${
                    isActive ? "translate-x-0 opacity-100 z-10" :
                    isPrev ? "-translate-x-full opacity-0 z-0" :
                    isNext ? "translate-x-full opacity-0 z-0" :
                    "translate-x-full opacity-0 z-0"
                  }`}
                  data-testid={`slide-${index}`}
                >
                  <div className="inline-block px-4 py-1.5 rounded-full bg-accent-amber text-spotify-black text-xs font-semibold mb-3">
                    {slide.label}
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-yellow-50">
                    {slide.title}
                  </h2>
                  <p className="text-sm md:text-base text-gray-200 max-w-2xl">
                    {slide.description}
                  </p>
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

        {/* BAŞLIK */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-accent-amber">Seyahat</span> Seçenekleri
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Türkiye'nin her yerine güvenli ve konforlu ulaşım. Dilediğiniz aracı seçin, biletinizi anında alın.
          </p>
        </div>

        {/* ULAŞIM SEÇENEKLERİ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {transportOptions.map((option) => (
            <div
              key={option.id}
              className="group relative bg-gray-900/50 rounded-3xl border border-gray-800 overflow-hidden hover:border-accent-amber/50 transition-all duration-300 cursor-pointer hover:scale-105"
              data-testid={`transport-${option.id}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
              
              <div className="relative p-8 flex flex-col items-center text-center">
                {/* ICON */}
                <div className={`mb-6 p-6 rounded-2xl bg-gradient-to-br ${option.gradient} shadow-xl`}>
                  <option.icon className="w-12 h-12 text-white" />
                </div>

                {/* BADGE */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-accent-amber text-spotify-black text-xs font-semibold">
                  {option.badge}
                </div>

                {/* TITLE */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent-amber transition-colors">
                  {option.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-sm text-gray-400">
                  {option.description}
                </p>
              </div>

              {/* HOVER BORDER */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent-amber/30 rounded-3xl transition-all pointer-events-none" />
            </div>
          ))}
        </div>

        {/* BILGILENDIRME */}
        <div className="bg-gradient-to-br from-purple-900/30 to-gray-900/30 rounded-3xl p-8 md:p-12 border border-gray-800 text-center">
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
              className="px-8 py-3 bg-accent-amber text-spotify-black font-semibold rounded-xl hover:bg-accent-amber/90 transition-all"
            >
              Bilgi Almak İstiyorum
            </a>
            <a
              href="/"
              className="px-8 py-3 bg-gray-800 text-white font-semibold rounded-xl hover:bg-gray-700 transition-all"
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

import { useState, useEffect } from "react";
import Header from "@/components/header";
import HeroCarousel from "@/components/hero-carousel";
import EmailSubscription from "@/components/email-subscription";
import Footer from "@/components/footer";
import logoImage from "@assets/logo-final.png";

const verticalSlides = [
  {
    id: 1,
    logo: logoImage,
    brandName: "ETKİNİUM",
    tagline: "Tek Platform, Sonsuz Sanat",
    contactInfo: "Reklam vermek için: iletisim@etkinium.com"
  },
  {
    id: 2,
    logo: logoImage,
    brandName: "ETKİNİUM",
    tagline: "Etkinlik, Seyahat, Konaklama",
    contactInfo: "Reklam vermek için: iletisim@etkinium.com"
  },
  {
    id: 3,
    logo: logoImage,
    brandName: "ETKİNİUM",
    tagline: "Yapay Zeka Destekli Biletleme",
    contactInfo: "Reklam vermek için: iletisim@etkinium.com"
  }
];

export default function Home() {
  const [currentVerticalSlide, setCurrentVerticalSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVerticalSlide((prev) => (prev + 1) % verticalSlides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <Header />
      
      <HeroCarousel />

      {/* VERTICAL SLIDER - Ana Sayfaya Özel Reklam Alanı */}
      <section className="py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-black border border-accent-amber/20 shadow-2xl"
               style={{ height: "400px" }}>
            <div className="relative h-full">
              {verticalSlides.map((slide, index) => {
                const position = index - currentVerticalSlide;
                const isActive = index === currentVerticalSlide;
                const isPrev = position === -1 || (currentVerticalSlide === 0 && index === verticalSlides.length - 1);
                const isNext = position === 1 || (currentVerticalSlide === verticalSlides.length - 1 && index === 0);
                
                return (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                      isActive ? "translate-y-0 opacity-100 z-10" :
                      isPrev ? "translate-y-full opacity-0 z-0" :
                      isNext ? "-translate-y-full opacity-0 z-0" :
                      "-translate-y-full opacity-0 z-0"
                    }`}
                    data-testid={`vertical-slide-${index}`}
                  >
                    <div className="flex flex-col items-center justify-center h-full p-8">
                      <img 
                        src={slide.logo}
                        alt="ETKİNİUM Logo"
                        className="w-32 h-32 md:w-40 md:h-40 object-contain mb-6"
                      />
                      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-accent-amber">
                        {slide.brandName}
                      </h2>
                      <p className="text-xl md:text-2xl text-white mb-8 text-center font-semibold">
                        {slide.tagline}
                      </p>
                      <p className="text-sm md:text-base text-gray-300">
                        {slide.contactInfo.split(": ")[0]}:{" "}
                        <a 
                          href={`mailto:${slide.contactInfo.split(": ")[1]}`}
                          className="text-accent-amber hover:underline font-semibold"
                        >
                          {slide.contactInfo.split(": ")[1]}
                        </a>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* DOTS - Vertical Slider */}
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex flex-col gap-3 z-20">
              {verticalSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentVerticalSlide(index)}
                  className={`rounded-full transition-all duration-300 ${
                    index === currentVerticalSlide
                      ? "h-8 w-3 bg-accent-amber"
                      : "h-3 w-3 bg-white/30 hover:bg-white/50"
                  }`}
                  data-testid={`vertical-dot-${index}`}
                  aria-label={`Vertical Slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <EmailSubscription />

      <Footer />
    </div>
  );
}

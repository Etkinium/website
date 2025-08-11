import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Music } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

const aboutSlides = [
  {
    id: 1,
    backgroundImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    title: "Vizyonumuz",
    description: "Sanat ve eğlence dünyasında yeni nesil deneyimler sunmak",
  },
  {
    id: 2,
    backgroundImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    title: "Misyonumuz",
    description: "İnsanları benzersiz sanat deneyimleriyle buluşturmak",
  },
  {
    id: 3,
    backgroundImage: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    title: "Değerlerimiz",
    description: "İnovasyon, kalite ve kullanıcı memnuniyeti odaklı hizmet",
  }
];

export default function About() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = aboutSlides.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden mt-16">
        <div className="relative w-full h-full">
          {aboutSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(25,20,20,0.8)), url('${slide.backgroundImage}')`,
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-6 px-4 max-w-4xl animate-slide-in">
                  <h1 className="text-5xl md:text-7xl font-black leading-tight text-white">
                    {slide.title}
                  </h1>
                  <p className="text-2xl md:text-3xl text-accent-amber font-semibold">
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Carousel Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {aboutSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-opacity ${
                index === currentSlide ? "bg-white opacity-100" : "bg-white opacity-50"
              }`}
            />
          ))}
        </div>

        {/* Carousel Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-spotify-green to-accent-purple rounded-lg flex items-center justify-center">
                <Music className="text-white w-6 h-6" />
              </div>
              <span className="text-4xl font-bold">ETKİNİUM</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              <span className="text-white">Sanatın ve Eğlencenin</span>
              <span className="text-accent-amber ml-4">Yeni Nesil Sahnesi</span>
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed mb-8">
              ETKİNİUM olarak, sanat ve eğlence dünyasında yenilikçi bir platform oluşturuyoruz. 
              Amacımız, kullanıcılarımıza en kaliteli ve unutulmaz deneyimler sunmaktır.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              Modern teknoloji ile geleneksel sanatları buluşturarak, herkes için erişilebilir 
              ve keyifli bir platform yaratıyoruz. Yakında sizlerle buluşacağımız bu yolculukta, 
              her anın değerli olacağını biliyoruz.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
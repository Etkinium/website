import { useState } from "react";
import { X, Trophy, Gift, Star, Zap, ChevronLeft, ChevronRight } from "lucide-react";

const storiesData = [
  {
    id: 1,
    title: "Puan Hizmeti",
    emoji: "🏆",
    ringColor: "from-amber-400 to-orange-500",
    slides: [
      {
        gradient: "from-amber-900/80 via-black to-orange-900/60",
        icon: Trophy,
        heading: "Etkinium Puan Sistemi",
        description: "Her bilet alımında, her rezervasyonda puan kazan! Puanlarını indirim, ücretsiz bilet ve özel avantajlara dönüştür.",
        highlight: "Her 1₺ = 1 Puan",
      },
      {
        gradient: "from-yellow-900/80 via-black to-amber-900/60",
        icon: Star,
        heading: "Puanlarını Kullan",
        description: "Biriktirdiğin puanlarla bilet al, restoran rezervasyonu yap veya özel etkinliklere katıl.",
        highlight: "500 Puan = ₺50 İndirim",
      },
    ],
  },
  {
    id: 2,
    title: "Haftalık Çark",
    emoji: "🎡",
    ringColor: "from-purple-400 to-pink-500",
    slides: [
      {
        gradient: "from-purple-900/80 via-black to-pink-900/60",
        icon: Gift,
        heading: "Haftalık Çark Çevir!",
        description: "Her hafta şansını dene! Ücretsiz biletler, ekstra puanlar, indirim kuponları ve sürpriz hediyeler seni bekliyor.",
        highlight: "Her Hafta 1 Ücretsiz Çevirme",
      },
      {
        gradient: "from-fuchsia-900/80 via-black to-purple-900/60",
        icon: Zap,
        heading: "Premium ile Sınırsız!",
        description: "Premium üyeler her hafta ekstra 1 çevirme hakkı kazanır. Daha fazla çevirme = daha fazla ödül!",
        highlight: "Premium: Haftalık 2 Çevirme",
      },
    ],
  },
  {
    id: 3,
    title: "Yenilikler",
    emoji: "✨",
    ringColor: "from-cyan-400 to-blue-500",
    slides: [
      {
        gradient: "from-cyan-900/80 via-black to-blue-900/60",
        icon: Star,
        heading: "Yeni Özellikler Geliyor!",
        description: "Topluluk mesajlaşma, canlı etkinlik bildirimleri, özel davetler ve çok daha fazlası yakında ETKİNİUM'da.",
        highlight: "2026'nın En İyi Platformu",
      },
    ],
  },
  {
    id: 4,
    title: "Premium",
    emoji: "👑",
    ringColor: "from-amber-300 to-yellow-600",
    slides: [
      {
        gradient: "from-amber-900/80 via-black to-yellow-900/60",
        icon: Trophy,
        heading: "ETKİNİUM Premium",
        description: "Aylık 59,99₺ ile işlem ücreti ödeme, bilet iade hakkı kazan, ekstra çark çevirme ve 1.5x puan avantajından yararlan!",
        highlight: "Ayda Sadece ₺59,99",
      },
    ],
  },
];

export default function Stories() {
  const [activeStory, setActiveStory] = useState<number | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const openStory = (id: number) => {
    setActiveStory(id);
    setSlideIndex(0);
  };

  const closeStory = () => {
    setActiveStory(null);
    setSlideIndex(0);
  };

  const currentStory = storiesData.find((s) => s.id === activeStory);
  const totalSlides = currentStory?.slides.length || 1;

  const nextSlide = () => {
    if (slideIndex < totalSlides - 1) {
      setSlideIndex((p) => p + 1);
    } else {
      const idx = storiesData.findIndex((s) => s.id === activeStory);
      if (idx < storiesData.length - 1) {
        setActiveStory(storiesData[idx + 1].id);
        setSlideIndex(0);
      } else {
        closeStory();
      }
    }
  };

  const prevSlide = () => {
    if (slideIndex > 0) {
      setSlideIndex((p) => p - 1);
    } else {
      const idx = storiesData.findIndex((s) => s.id === activeStory);
      if (idx > 0) {
        setActiveStory(storiesData[idx - 1].id);
        const prevStory = storiesData[idx - 1];
        setSlideIndex(prevStory.slides.length - 1);
      }
    }
  };

  return (
    <>
      <div className="flex items-center gap-4 sm:gap-5 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {storiesData.map((story) => (
          <button
            key={story.id}
            onClick={() => openStory(story.id)}
            className="flex flex-col items-center gap-1.5 flex-shrink-0 group"
          >
            <div className={`w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full p-[2.5px] bg-gradient-to-br ${story.ringColor} group-hover:scale-110 transition-transform`}>
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center border-2 border-black">
                <span className="text-2xl sm:text-3xl">{story.emoji}</span>
              </div>
            </div>
            <span className="text-[10px] sm:text-xs text-white/60 group-hover:text-white transition-colors font-medium max-w-[72px] text-center leading-tight">
              {story.title}
            </span>
          </button>
        ))}
      </div>

      {activeStory !== null && currentStory && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center" onClick={closeStory}>
          <div
            className="relative w-full max-w-sm h-[80vh] max-h-[700px] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-3 left-3 right-3 flex gap-1 z-20">
              {currentStory.slides.map((_, i) => (
                <div key={i} className="flex-1 h-[3px] rounded-full bg-white/20 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      i < slideIndex ? "w-full bg-white" : i === slideIndex ? "w-full bg-accent-amber" : "w-0 bg-white"
                    }`}
                  />
                </div>
              ))}
            </div>

            <button
              onClick={closeStory}
              className="absolute top-8 right-3 z-20 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-white/20 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {(() => {
              const slide = currentStory.slides[slideIndex];
              const SlideIcon = slide.icon;
              return (
                <div className={`w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br ${slide.gradient} flex flex-col items-center justify-center p-8 text-center`}>
                  <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6 border border-white/10">
                    <SlideIcon className="w-10 h-10 text-accent-amber" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">{slide.heading}</h2>
                  <p className="text-white/60 text-sm sm:text-base mb-6 max-w-xs leading-relaxed">{slide.description}</p>
                  <div className="px-5 py-2.5 rounded-full bg-accent-amber/20 border border-accent-amber/30">
                    <span className="text-accent-amber font-bold text-sm">{slide.highlight}</span>
                  </div>
                </div>
              );
            })()}

            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-32 flex items-center justify-center text-white/40 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-32 flex items-center justify-center text-white/40 hover:text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
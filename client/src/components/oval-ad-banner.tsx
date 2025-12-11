import { useState, useEffect } from "react";

const adSlides = [
  {
    id: 1,
    content: null,
  },
  {
    id: 2,
    content: null,
  },
  {
    id: 3,
    content: null,
  },
];

export default function OvalAdBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % adSlides.length);
        setIsAnimating(false);
      }, 500);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full px-4 py-6 md:py-8">
      <div 
        className="relative mx-auto w-full max-w-[1000px] h-[60px] md:h-[70px] rounded-full overflow-hidden cursor-pointer group"
        style={{ 
          background: "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,214,0,0.1)",
          border: "2px solid rgba(255,214,0,0.3)",
        }}
        data-testid="oval-ad-banner"
      >
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: "linear-gradient(135deg, rgba(255,214,0,0.05) 0%, transparent 50%, rgba(255,214,0,0.05) 100%)",
          }}
        />
        
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          {adSlides.map((slide, index) => (
            <div
              key={slide.id}
              className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out"
              style={{
                transform: `translateY(${
                  index === currentIndex 
                    ? "0%" 
                    : index === (currentIndex - 1 + adSlides.length) % adSlides.length 
                      ? "-100%" 
                      : "100%"
                })`,
                opacity: index === currentIndex ? 1 : 0,
              }}
              data-testid={`ad-slide-${index}`}
            >
              <div className="flex items-center justify-center gap-2 md:gap-4 px-4 md:px-8">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full animate-pulse"
                    style={{ backgroundColor: "#ffd600" }}
                  />
                  <span 
                    className="text-xs md:text-sm font-medium tracking-wider uppercase"
                    style={{ color: "rgba(255,214,0,0.7)" }}
                  >
                    Reklam
                  </span>
                </div>
                
                <div className="h-4 md:h-5 w-px bg-gray-700" />
                
                <div className="flex-1 flex items-center justify-center">
                  <div 
                    className="px-4 md:px-6 py-1.5 md:py-2 rounded-full border border-dashed"
                    style={{ 
                      borderColor: "rgba(255,214,0,0.4)",
                      background: "rgba(255,214,0,0.03)"
                    }}
                  >
                    <span 
                      className="text-sm md:text-base font-semibold tracking-wide"
                      style={{ color: "#ffd600" }}
                    >
                      Reklam Alanı
                    </span>
                  </div>
                </div>
                
                <div className="h-4 md:h-5 w-px bg-gray-700" />
                
                <div className="hidden sm:flex items-center gap-2">
                  <span 
                    className="text-xs font-medium"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    iletisim@etkinium.com
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 flex gap-1">
          {adSlides.map((_, index) => (
            <div
              key={index}
              className="w-1 h-1 rounded-full transition-all duration-300"
              style={{
                backgroundColor: index === currentIndex ? "#ffd600" : "rgba(255,255,255,0.2)",
                transform: index === currentIndex ? "scale(1.2)" : "scale(1)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

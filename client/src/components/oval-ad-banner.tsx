import { useState, useEffect } from "react";

const adSlides = [
  "Reklam Alanı - Örnek 1",
  "Reklam Alanı - Örnek 2",
  "Reklam Alanı - Örnek 3",
];

export default function OvalAdBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % adSlides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="relative max-w-[1000px] mx-auto my-8 py-3.5 px-8 rounded-full bg-black text-[#ffd600] text-lg font-semibold text-center overflow-hidden"
      style={{ 
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        height: "52px"
      }}
      data-testid="oval-ad-banner"
    >
      {adSlides.map((slide, index) => (
        <div
          key={index}
          className="absolute w-full left-1/2 transition-all duration-500 ease-out"
          style={{
            transform: `translateX(-50%) translateY(${
              index === currentIndex 
                ? "0" 
                : index === (currentIndex - 1 + adSlides.length) % adSlides.length 
                  ? "-100%" 
                  : "100%"
            })`,
            opacity: index === currentIndex ? 1 : 0,
          }}
          data-testid={`ad-slide-${index}`}
        >
          {slide}
        </div>
      ))}
    </div>
  );
}

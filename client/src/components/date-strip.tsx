import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DateStripProps {
  onDateSelect: (date: Date) => void;
  selectedDate: Date;
}

export default function DateStrip({ onDateSelect, selectedDate }: DateStripProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const dates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  const dayNames = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];
  const monthNames = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const isSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  const isToday = (date: Date) => {
    return date.toDateString() === new Date().toDateString();
  };

  return (
    <div className="relative py-4 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <button
            onClick={() => scroll("left")}
            className="flex-shrink-0 w-10 h-10 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg"
            data-testid="date-scroll-left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div 
            ref={scrollRef}
            className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex-1"
          >
            {dates.map((date, index) => (
              <button
                key={index}
                onClick={() => onDateSelect(date)}
                className={`
                  flex-shrink-0 flex flex-col items-center justify-center
                  w-16 h-20 rounded-2xl
                  backdrop-blur-xl border
                  transition-all duration-300 ease-out
                  hover:scale-105 active:scale-95
                  ${isSelected(date)
                    ? "bg-[#F7C600]/20 border-[#F7C600] shadow-[0_0_20px_rgba(247,198,0,0.3)]"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                  }
                `}
                data-testid={`date-pill-${index}`}
              >
                <span className={`text-xs font-medium ${isSelected(date) ? "text-[#F7C600]" : "text-gray-400"}`}>
                  {isToday(date) ? "Bugün" : dayNames[date.getDay()]}
                </span>
                <span className={`text-xl font-bold ${isSelected(date) ? "text-[#F7C600]" : "text-white"}`}>
                  {date.getDate()}
                </span>
                <span className={`text-xs ${isSelected(date) ? "text-[#F7C600]/80" : "text-gray-500"}`}>
                  {monthNames[date.getMonth()]}
                </span>
              </button>
            ))}
          </div>
          
          <button
            onClick={() => scroll("right")}
            className="flex-shrink-0 w-10 h-10 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg"
            data-testid="date-scroll-right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

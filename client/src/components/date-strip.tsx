import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

interface DateStripProps {
  onDateSelect: (date: Date) => void;
  selectedDate: Date;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DateStrip({ onDateSelect, selectedDate, isOpen, onOpenChange }: DateStripProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const dates = Array.from({ length: 21 }, (_, i) => {
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

  const handleDateClick = (date: Date) => {
    onDateSelect(date);
    onOpenChange(false);
  };

  const formatSelectedDate = () => {
    const day = selectedDate.getDate();
    const month = monthNames[selectedDate.getMonth()];
    const dayName = dayNames[selectedDate.getDay()];
    return `${dayName}, ${day} ${month}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0B0B0B]/95 backdrop-blur-2xl border border-white/10 max-w-2xl mx-auto p-0 overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Tarih Seçin</h3>
          <button
            onClick={() => onOpenChange(false)}
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="flex-shrink-0 w-9 h-9 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95 transition-all duration-300"
              data-testid="date-scroll-left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <div 
              ref={scrollRef}
              className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex-1 snap-x snap-mandatory"
            >
              {dates.map((date, index) => (
                <button
                  key={index}
                  onClick={() => handleDateClick(date)}
                  className={`
                    flex-shrink-0 flex flex-col items-center justify-center snap-start
                    w-14 h-16 rounded-xl
                    backdrop-blur-xl border
                    transition-all duration-300 ease-out
                    hover:scale-105 active:scale-95
                    ${isSelected(date)
                      ? "bg-[#F7C600]/20 border-[#F7C600] shadow-[0_0_15px_rgba(247,198,0,0.3)]"
                      : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                    }
                  `}
                  data-testid={`date-pill-${index}`}
                >
                  <span className={`text-[10px] font-medium ${isSelected(date) ? "text-[#F7C600]" : "text-gray-400"}`}>
                    {isToday(date) ? "Bugün" : dayNames[date.getDay()]}
                  </span>
                  <span className={`text-lg font-bold ${isSelected(date) ? "text-[#F7C600]" : "text-white"}`}>
                    {date.getDate()}
                  </span>
                  <span className={`text-[10px] ${isSelected(date) ? "text-[#F7C600]/80" : "text-gray-500"}`}>
                    {monthNames[date.getMonth()]}
                  </span>
                </button>
              ))}
            </div>
            
            <button
              onClick={() => scroll("right")}
              className="flex-shrink-0 w-9 h-9 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95 transition-all duration-300"
              data-testid="date-scroll-right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-4 border-t border-white/10 bg-white/5">
          <p className="text-center text-sm text-gray-400">
            Seçili tarih: <span className="text-[#F7C600] font-semibold">{formatSelectedDate()}</span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function DateButton({ selectedDate, onClick }: { selectedDate: Date; onClick: () => void }) {
  const monthNames = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];
  const dayNames = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];

  const isToday = selectedDate.toDateString() === new Date().toDateString();

  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10 hover:border-[#F7C600]/30 hover:scale-105 active:scale-95 transition-all duration-300"
      data-testid="date-button"
    >
      <svg className="w-4 h-4 text-[#F7C600]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <span className="text-sm font-medium">
        {isToday ? "Bugün" : `${dayNames[selectedDate.getDay()]}, ${selectedDate.getDate()} ${monthNames[selectedDate.getMonth()]}`}
      </span>
    </button>
  );
}

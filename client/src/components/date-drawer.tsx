import { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import PremiumButton from "./premium-button";

interface DateDrawerProps {
  onDateSelect: (date: Date) => void;
  selectedDate: Date;
  isOpen: boolean;
  onToggle: () => void;
}

export default function DateDrawer({ onDateSelect, selectedDate, isOpen, onToggle }: DateDrawerProps) {
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
      const scrollAmount = 180;
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
  };

  const formatSelectedDate = () => {
    const day = selectedDate.getDate();
    const month = monthNames[selectedDate.getMonth()];
    const dayName = dayNames[selectedDate.getDay()];
    return isToday(selectedDate) ? "Bugün" : `${dayName}, ${day} ${month}`;
  };

  useEffect(() => {
    if (isOpen && scrollRef.current) {
      const selectedIndex = dates.findIndex(d => d.toDateString() === selectedDate.toDateString());
      if (selectedIndex > 2) {
        scrollRef.current.scrollLeft = (selectedIndex - 2) * 56;
      }
    }
  }, [isOpen]);

  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center gap-2 mb-3">
        <PremiumButton
          variant={isOpen ? "active" : "default"}
          size="sm"
          onClick={onToggle}
          data-testid="date-toggle-button"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>{formatSelectedDate()}</span>
        </PremiumButton>
      </div>

      <div 
        className={`overflow-hidden transition-all duration-300 ease-out ${
          isOpen ? "max-h-32 opacity-100 mb-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3">
          <div className="flex items-center gap-2">
            <PremiumButton
              variant="icon"
              size="sm"
              onClick={() => scroll("left")}
              data-testid="date-scroll-left"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </PremiumButton>
            
            <div 
              ref={scrollRef}
              className="flex gap-1.5 overflow-x-auto flex-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory"
              style={{ maskImage: "linear-gradient(to right, transparent, black 3%, black 97%, transparent)" }}
            >
              {dates.map((date, index) => (
                <button
                  key={index}
                  onClick={() => handleDateClick(date)}
                  className={`
                    flex-shrink-0 flex flex-col items-center justify-center snap-start
                    w-12 h-16 md:w-14 md:h-18 rounded-lg
                    backdrop-blur-xl border
                    transition-all duration-200 ease-out
                    active:scale-95
                    ${isSelected(date)
                      ? "bg-[#F7C600]/15 border-[#F7C600]/40 shadow-[0_0_10px_rgba(247,198,0,0.2)]"
                      : "bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/15"
                    }
                  `}
                  data-testid={`date-pill-${index}`}
                >
                  <span className={`text-[9px] md:text-[10px] font-medium ${isSelected(date) ? "text-[#F7C600]" : "text-gray-400"}`}>
                    {isToday(date) ? "Bugün" : dayNames[date.getDay()]}
                  </span>
                  <span className={`text-base md:text-lg font-bold ${isSelected(date) ? "text-[#F7C600]" : "text-white"}`}>
                    {date.getDate()}
                  </span>
                  <span className={`text-[9px] md:text-[10px] ${isSelected(date) ? "text-[#F7C600]/80" : "text-gray-500"}`}>
                    {monthNames[date.getMonth()]}
                  </span>
                </button>
              ))}
            </div>
            
            <PremiumButton
              variant="icon"
              size="sm"
              onClick={() => scroll("right")}
              data-testid="date-scroll-right"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </PremiumButton>
          </div>
        </div>
      </div>
    </div>
  );
}

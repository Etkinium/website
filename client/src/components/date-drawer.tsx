import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface DateDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDate: (date: Date) => void;
}

const months = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
];

export default function DateDrawer({ isOpen, onClose, onSelectDate }: DateDrawerProps) {
  const today = new Date();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const dates = Array.from({ length: 60 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() + i);
    return date;
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 200;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    });
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    onSelectDate(date);
  };

  const getDayName = (date: Date) => {
    const days = ["Pz", "Pt", "Sa", "Ça", "Pe", "Cu", "Ct"];
    return days[date.getDay()];
  };

  useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-x-0 top-16 z-50 animate-in slide-in-from-top duration-200"
      data-testid="date-drawer"
    >
      <div 
        className="relative w-full bg-black/95 backdrop-blur-xl border-b border-accent-amber/20"
        style={{
          boxShadow: "0 4px 20px rgba(0,0,0,0.5)"
        }}
      >
        <div className="absolute top-2 right-3 z-10">
          <button 
            onClick={onClose}
            className="w-6 h-6 rounded-full bg-white/5 hover:bg-accent-amber flex items-center justify-center text-white/60 hover:text-black transition-all border border-white/10"
            data-testid="close-date-drawer"
          >
            <X className="w-3 h-3" />
          </button>
        </div>

        <div className="px-3 py-2">
          <div className="relative flex items-center">
            <button 
              onClick={() => scroll("left")}
              className="absolute left-0 z-10 w-7 h-7 rounded-full bg-black hover:bg-accent-amber flex items-center justify-center text-white hover:text-black transition-all border border-white/10 hover:border-accent-amber"
              style={{ boxShadow: "4px 0 12px rgba(0,0,0,0.8)" }}
              data-testid="scroll-dates-left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <div 
              ref={scrollRef}
              className="flex gap-1.5 overflow-x-auto py-1.5 px-10 cursor-grab active:cursor-grabbing select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleMouseUp}
            >
              {dates.map((date, index) => {
                const isToday = date.toDateString() === today.toDateString();
                const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
                
                return (
                  <button
                    key={index}
                    onClick={() => handleDateClick(date)}
                    className={`flex-shrink-0 flex flex-col items-center justify-center w-11 h-14 rounded-xl transition-all ${
                      isSelected
                        ? "bg-accent-amber text-black"
                        : isToday
                          ? "bg-accent-amber/20 text-accent-amber border border-accent-amber/50"
                          : "bg-white/5 text-white/70 hover:bg-white/10 border border-white/5"
                    }`}
                    data-testid={`date-${index}`}
                  >
                    <span className="text-[8px] font-medium uppercase opacity-70">
                      {getDayName(date)}
                    </span>
                    <span className="text-lg font-bold">
                      {date.getDate()}
                    </span>
                    <span className="text-[8px] font-medium opacity-70">
                      {months[date.getMonth()].slice(0, 3)}
                    </span>
                  </button>
                );
              })}
            </div>

            <button 
              onClick={() => scroll("right")}
              className="absolute right-0 z-10 w-7 h-7 rounded-full bg-black hover:bg-accent-amber flex items-center justify-center text-white hover:text-black transition-all border border-white/10 hover:border-accent-amber"
              style={{ boxShadow: "-4px 0 12px rgba(0,0,0,0.8)" }}
              data-testid="scroll-dates-right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      <div 
        className="fixed inset-0 -z-10" 
        onClick={onClose}
      />
    </div>
  );
}

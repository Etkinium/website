import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface DateDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDate: (date: Date) => void;
}

const months = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
];

const weekDays = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

export default function DateDrawer({ isOpen, onClose, onSelectDate }: DateDrawerProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateClick = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    setSelectedDate(date);
    onSelectDate(date);
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-24"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      <div 
        className="relative w-full max-w-md mx-4 bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-accent-amber/40 rounded-2xl shadow-2xl shadow-accent-amber/10 overflow-hidden animate-in slide-in-from-top-4 duration-300"
        onClick={(e) => e.stopPropagation()}
        data-testid="date-drawer"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h3 className="text-lg font-semibold text-white">Tarih Seçin</h3>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-800 hover:bg-accent-amber hover:text-black flex items-center justify-center text-gray-400 transition-all"
            data-testid="close-date-drawer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={handlePrevMonth}
              className="w-8 h-8 rounded-full bg-gray-800 hover:bg-accent-amber hover:text-black flex items-center justify-center text-white transition-all"
              data-testid="prev-month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-white font-semibold">
              {months[currentMonth]} {currentYear}
            </span>
            <button 
              onClick={handleNextMonth}
              className="w-8 h-8 rounded-full bg-gray-800 hover:bg-accent-amber hover:text-black flex items-center justify-center text-white transition-all"
              data-testid="next-month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day) => (
              <div key={day} className="text-center text-xs text-gray-500 font-medium py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {emptyDays.map((_, index) => (
              <div key={`empty-${index}`} className="aspect-square" />
            ))}
            {days.map((day) => {
              const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
              const isSelected = selectedDate && day === selectedDate.getDate() && currentMonth === selectedDate.getMonth() && currentYear === selectedDate.getFullYear();
              const isPast = new Date(currentYear, currentMonth, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
              
              return (
                <button
                  key={day}
                  onClick={() => !isPast && handleDateClick(day)}
                  disabled={isPast}
                  className={`aspect-square rounded-xl flex items-center justify-center text-sm font-medium transition-all ${
                    isSelected
                      ? "bg-accent-amber text-black"
                      : isToday
                        ? "bg-accent-amber/20 text-accent-amber border border-accent-amber/50"
                        : isPast
                          ? "text-gray-600 cursor-not-allowed"
                          : "text-white hover:bg-gray-800"
                  }`}
                  data-testid={`day-${day}`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-800 flex gap-3">
            <button
              onClick={() => { setSelectedDate(null); onClose(); }}
              className="flex-1 py-2.5 rounded-xl bg-gray-800 text-white text-sm font-medium hover:bg-gray-700 transition-all"
            >
              Temizle
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-accent-amber text-black text-sm font-semibold hover:bg-yellow-400 transition-all"
            >
              Uygula
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

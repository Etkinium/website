import { useState, useRef, useEffect } from "react";
import { Gift, RotateCcw, Star, Ticket, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const segments = [
  { id: 1, label: "300 Etkinium Puan", color: "#F59E0B", icon: Star, value: "points" },
  { id: 2, label: "Ücretsiz İade Hakkı", color: "#000000", icon: Ticket, value: "refund" },
  { id: 3, label: "Boş", color: "#1a1a1a", icon: Ban, value: "empty" },
  { id: 4, label: "Tekrar Çark Hakkı", color: "#F59E0B", icon: RotateCcw, value: "retry" },
];

interface SpinWheelProps {
  canSpin: boolean;
  onSpinComplete: (result: string) => void;
  lastSpinDate?: string | null;
}

export default function SpinWheel({ canSpin, onSpinComplete, lastSpinDate }: SpinWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const spinWheel = () => {
    if (isSpinning || !canSpin) return;

    setIsSpinning(true);
    setResult(null);

    const segmentAngle = 360 / segments.length;
    const randomSegment = Math.floor(Math.random() * segments.length);
    const extraSpins = 5 + Math.floor(Math.random() * 3);
    const finalRotation = extraSpins * 360 + (360 - randomSegment * segmentAngle - segmentAngle / 2);
    
    setRotation(prev => prev + finalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const winningSegment = segments[randomSegment];
      setResult(winningSegment.label);
      onSpinComplete(winningSegment.value);
      
      toast({
        title: "Çark Sonucu",
        description: winningSegment.value === "empty" 
          ? "Maalesef bu sefer boş çıktı. Haftaya tekrar deneyin!" 
          : `Tebrikler! ${winningSegment.label} kazandınız!`,
        variant: winningSegment.value === "empty" ? "destructive" : "default",
      });
    }, 5000);
  };

  const getNextSpinDate = () => {
    if (!lastSpinDate) return null;
    const lastSpin = new Date(lastSpinDate);
    const nextSpin = new Date(lastSpin);
    nextSpin.setDate(nextSpin.getDate() + 7);
    return nextSpin;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('tr-TR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-64 h-64 sm:w-80 sm:h-80">
        {/* Outer Ring */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: "linear-gradient(145deg, #F59E0B 0%, #D97706 50%, #92400E 100%)",
            boxShadow: "0 0 40px rgba(245,158,11,0.4), inset 0 0 20px rgba(0,0,0,0.3)"
          }}
        />
        
        {/* Wheel Container */}
        <div 
          ref={wheelRef}
          className="absolute inset-2 rounded-full overflow-hidden"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? "transform 5s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none",
            background: "#000",
            boxShadow: "inset 0 0 30px rgba(0,0,0,0.5)"
          }}
        >
          {segments.map((segment, index) => {
            const segmentAngle = 360 / segments.length;
            const startAngle = index * segmentAngle;
            
            return (
              <div
                key={segment.id}
                className="absolute w-full h-full"
                style={{
                  transform: `rotate(${startAngle}deg)`,
                  transformOrigin: "center",
                }}
              >
                <div
                  className="absolute top-0 left-1/2 w-1/2 h-1/2 origin-bottom-left flex items-center justify-center"
                  style={{
                    transform: `rotate(${segmentAngle / 2}deg) skewY(${90 - segmentAngle}deg)`,
                    background: segment.color,
                    borderRight: "1px solid rgba(255,255,255,0.1)",
                  }}
                />
                <div
                  className="absolute top-[20%] left-1/2 -translate-x-1/2 text-center"
                  style={{
                    transform: `rotate(${segmentAngle / 2}deg)`,
                  }}
                >
                  <segment.icon 
                    className={`w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 ${segment.color === "#F59E0B" ? "text-black" : "text-amber-400"}`} 
                  />
                  <span 
                    className={`text-[8px] sm:text-[10px] font-bold leading-tight block max-w-[50px] ${segment.color === "#F59E0B" ? "text-black" : "text-white"}`}
                  >
                    {segment.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Center Hub */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center z-10"
          style={{
            background: "linear-gradient(145deg, #1a1a1a 0%, #000 100%)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.5), 0 0 30px rgba(245,158,11,0.3)",
            border: "3px solid #F59E0B"
          }}
        >
          <Gift className="w-6 h-6 sm:w-8 sm:h-8 text-accent-amber" />
        </div>
        
        {/* Pointer */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-0 h-0 z-20"
          style={{
            borderLeft: "12px solid transparent",
            borderRight: "12px solid transparent",
            borderTop: "24px solid #F59E0B",
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
          }}
        />
      </div>

      {/* Result Display */}
      {result && (
        <div className="mt-6 p-4 rounded-xl bg-accent-amber/10 border border-accent-amber/30 text-center">
          <p className="text-accent-amber font-bold text-lg">{result}</p>
        </div>
      )}

      {/* Spin Button */}
      <Button
        onClick={spinWheel}
        disabled={isSpinning || !canSpin}
        className="mt-6 px-8 py-4 text-lg font-bold bg-gradient-to-r from-accent-amber to-yellow-500 hover:from-yellow-500 hover:to-accent-amber text-black rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          boxShadow: canSpin && !isSpinning ? "0 0 30px rgba(245,158,11,0.4)" : "none"
        }}
      >
        {isSpinning ? "Çevriliyor..." : canSpin ? "Çarkı Çevir" : "Haftaya Tekrar Gel"}
      </Button>

      {/* Next Spin Info */}
      {!canSpin && lastSpinDate && (
        <p className="mt-3 text-white/50 text-sm text-center">
          Sonraki çevirme: {formatDate(getNextSpinDate()!)}
        </p>
      )}
    </div>
  );
}

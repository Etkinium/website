import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface PremiumButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "active" | "primary" | "icon";
  size?: "sm" | "md";
}

const PremiumButton = forwardRef<HTMLButtonElement, PremiumButtonProps>(
  ({ className, variant = "default", size = "md", children, ...props }, ref) => {
    const baseStyles = `
      relative inline-flex items-center justify-center gap-1.5
      font-medium
      backdrop-blur-xl
      border
      transition-all duration-200 ease-out
      cursor-pointer select-none
      active:scale-95
      disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
    `;

    const variants = {
      default: `
        bg-white/5 text-white border-white/10
        hover:bg-white/8 hover:border-white/15 hover:shadow-lg hover:shadow-black/20
      `,
      active: `
        bg-[#F7C600]/10 text-[#F7C600] border-[#F7C600]/30
        shadow-[0_0_12px_rgba(247,198,0,0.15)]
        hover:bg-[#F7C600]/15 hover:border-[#F7C600]/40
      `,
      primary: `
        bg-gradient-to-r from-[#F7C600] to-[#FFD93D] text-black border-transparent
        hover:shadow-[0_0_20px_rgba(247,198,0,0.35)]
        hover:from-[#FFD93D] hover:to-[#F7C600]
      `,
      icon: `
        bg-white/5 text-white border-white/10
        hover:bg-white/10 hover:border-white/20 hover:shadow-md
        !p-0
      `,
    };

    const sizes = {
      sm: variant === "icon" 
        ? "w-8 h-8 md:w-9 md:h-9 rounded-lg" 
        : "px-2.5 py-1.5 text-xs rounded-lg md:px-3 md:py-2 md:text-xs",
      md: variant === "icon" 
        ? "w-9 h-9 md:w-10 md:h-10 rounded-xl" 
        : "px-3 py-2 text-xs rounded-xl md:px-4 md:py-2 md:text-sm",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

PremiumButton.displayName = "PremiumButton";

export default PremiumButton;

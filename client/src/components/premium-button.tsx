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
      transition-all duration-200 ease-out
      cursor-pointer select-none
      active:scale-95
      disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
    `;

    const variants = {
      default: `
        bg-[#0A0A0A] text-white border border-white/10
        hover:bg-[#F7C600] hover:text-black hover:border-[#F7C600]
      `,
      active: `
        bg-[#F7C600]/15 text-[#F7C600] border border-[#F7C600]/40
        hover:bg-[#F7C600] hover:text-black hover:border-[#F7C600]
      `,
      primary: `
        bg-[#F7C600] text-black border border-[#F7C600]
        hover:bg-[#FFD93D] hover:shadow-[0_0_16px_rgba(247,198,0,0.4)]
      `,
      icon: `
        bg-[#0A0A0A] text-white border border-white/10
        hover:bg-[#F7C600] hover:text-black hover:border-[#F7C600]
        !p-0
      `,
    };

    const sizes = {
      sm: variant === "icon" 
        ? "w-7 h-7 md:w-8 md:h-8 rounded-lg" 
        : "px-2.5 py-1.5 text-[10px] rounded-lg md:px-3 md:py-1.5 md:text-xs",
      md: variant === "icon" 
        ? "w-8 h-8 md:w-9 md:h-9 rounded-lg" 
        : "px-3 py-1.5 text-xs rounded-lg md:px-4 md:py-2 md:text-sm",
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

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "outline";
  size?: "sm" | "md" | "lg";
}

const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, variant = "default", size = "md", children, ...props }, ref) => {
    const baseStyles = `
      relative inline-flex items-center justify-center gap-2
      rounded-full font-semibold
      backdrop-blur-xl
      border border-white/10
      shadow-lg shadow-black/20
      transition-all duration-300 ease-out
      cursor-pointer select-none
      active:scale-[0.97] active:shadow-md
      hover:scale-[1.03]
      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
    `;

    const variants = {
      default: `
        bg-white/5 text-white
        hover:bg-white/10 hover:border-white/20
        hover:shadow-[0_0_20px_rgba(247,198,0,0.15)]
      `,
      primary: `
        bg-gradient-to-r from-[#F7C600] to-[#FFD93D] text-black
        border-[#F7C600]/50
        hover:shadow-[0_0_30px_rgba(247,198,0,0.4)]
        hover:from-[#FFD93D] hover:to-[#F7C600]
      `,
      outline: `
        bg-black/40 text-[#F7C600]
        border-[#F7C600]/40
        hover:bg-[#F7C600]/10 hover:border-[#F7C600]/60
        hover:shadow-[0_0_25px_rgba(247,198,0,0.2)]
      `,
    };

    const sizes = {
      sm: "px-4 py-1.5 text-xs",
      md: "px-6 py-2.5 text-sm",
      lg: "px-8 py-3.5 text-base",
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

GlassButton.displayName = "GlassButton";

export default GlassButton;

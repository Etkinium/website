import { Link, useLocation } from "wouter";
import { Home, Calendar, UtensilsCrossed, User } from "lucide-react";

const tabs = [
  { name: "Ana Sayfa", href: "/", icon: Home },
  { name: "Etkinlikler", href: "/etkinlikler", icon: Calendar },
  { name: "Restoranlar", href: "/restoranlar", icon: UtensilsCrossed },
  { name: "Hesabım", href: "/login", icon: User },
];

export default function MobileTabBar() {
  const [location] = useLocation();

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{
        background: "rgba(0,0,0,0.95)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(255,214,0,0.15)",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.5)"
      }}
      data-testid="mobile-tab-bar"
    >
      <div className="flex items-center justify-around h-16 px-2 safe-area-pb">
        {tabs.map((tab) => {
          const isActive = location === tab.href || 
            (tab.href !== "/" && location.startsWith(tab.href));
          const Icon = tab.icon;
          
          return (
            <Link key={tab.name} href={tab.href}>
              <button
                className={`flex flex-col items-center justify-center w-16 h-full gap-0.5 transition-all ${
                  isActive 
                    ? "text-accent-amber" 
                    : "text-white/50 hover:text-white/70"
                }`}
                data-testid={`tab-${tab.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className={`p-1.5 rounded-xl transition-all ${
                  isActive ? "bg-accent-amber/20" : ""
                }`}>
                  <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : "stroke-[1.5]"}`} />
                </div>
                <span className={`text-[10px] font-medium ${isActive ? "font-semibold" : ""}`}>
                  {tab.name}
                </span>
              </button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

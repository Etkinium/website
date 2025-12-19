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
        background: "rgba(0,0,0,0.98)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(255,214,0,0.1)",
      }}
      data-testid="mobile-tab-bar"
    >
      <div 
        className="flex items-center justify-around px-1"
        style={{ 
          height: "56px",
          paddingBottom: "env(safe-area-inset-bottom, 0px)"
        }}
      >
        {tabs.map((tab) => {
          const isActive = location === tab.href || 
            (tab.href !== "/" && location.startsWith(tab.href));
          const Icon = tab.icon;
          
          return (
            <Link key={tab.name} href={tab.href}>
              <button
                className={`flex flex-col items-center justify-center min-w-[60px] h-full gap-0.5 transition-colors ${
                  isActive 
                    ? "text-accent-amber" 
                    : "text-white/40"
                }`}
                data-testid={`tab-${tab.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "stroke-[2]" : "stroke-[1.5]"}`} />
                <span className="text-[9px] font-medium">
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

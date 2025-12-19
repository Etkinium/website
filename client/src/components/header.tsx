import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "wouter";
import logoImage from "@assets/logo-final.png";
import { User, LogOut, Search, Settings, Mail, Calendar, UtensilsCrossed, Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { User as UserProfile } from "@shared/schema";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: user } = useQuery<UserProfile | null>({
    queryKey: ["/api/user"],
    retry: false,
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/logout");
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      setLocation("/");
      toast({
        title: "Çıkış yapıldı",
        description: "Başarıyla çıkış yaptınız",
      });
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const getUserInitials = () => {
    if (!user) return "";
    return (user.firstName[0] + user.lastName[0]).toUpperCase();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery("");
  };

  const NavButton = ({ href, children, icon: Icon, testId }: { href: string; children: React.ReactNode; icon?: any; testId: string }) => (
    <Link href={href}>
      <button
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white text-sm font-medium hover:bg-white/10 hover:border-[#F7C600]/30 hover:shadow-[0_0_15px_rgba(247,198,0,0.1)] hover:scale-105 active:scale-95 transition-all duration-300"
        data-testid={testId}
      >
        {Icon && <Icon className="w-4 h-4 text-[#F7C600]" />}
        {children}
      </button>
    </Link>
  );

  const AuthButton = ({ href, children, primary, testId }: { href: string; children: React.ReactNode; primary?: boolean; testId: string }) => (
    <Link href={href}>
      <button
        className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 ${
          primary
            ? "bg-gradient-to-r from-[#F7C600] to-[#FFD93D] text-black hover:shadow-[0_0_20px_rgba(247,198,0,0.4)]"
            : "bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10 hover:border-[#F7C600]/30"
        }`}
        data-testid={testId}
      >
        {children}
      </button>
    </Link>
  );

  return (
    <header className="fixed top-0 w-full z-50 bg-[#050505]/90 backdrop-blur-xl border-b border-white/10">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center">
              <img 
                src={logoImage}
                alt="ETKİNİUM Logo"
                className="w-9 h-9 object-contain"
              />
            </div>
            <span className="text-xl font-bold text-white">ETKİNİUM</span>
          </Link>
          
          <div className="hidden lg:flex items-center flex-1 justify-center max-w-md">
            <form onSubmit={handleSearch} className="relative flex items-center w-full">
              <Input
                type="text"
                placeholder="Etkinlik, restoran ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 backdrop-blur-xl border border-white/10 text-white placeholder:text-gray-500 pr-10 rounded-full focus:border-[#F7C600]/50 focus:ring-[#F7C600]/20 transition-all"
                data-testid="input-search"
              />
              <button
                type="submit"
                className="absolute right-3 text-gray-400 hover:text-[#F7C600] transition-colors"
                data-testid="button-search"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>

          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            <NavButton href="/etkinlikler" icon={Calendar} testId="button-etkinlikler">
              Etkinlikler
            </NavButton>
            
            <NavButton href="/restoranlar" icon={UtensilsCrossed} testId="button-restoranlar">
              Restoranlar
            </NavButton>
            
            <NavButton href="/contact" testId="button-contact">
              İletişim
            </NavButton>
            
            {!user && (
              <>
                <AuthButton href="/signup" primary testId="button-signup">
                  Üye Ol
                </AuthButton>
                <AuthButton href="/login" testId="button-login">
                  Giriş Yap
                </AuthButton>
              </>
            )}
            
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button 
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10 hover:border-[#F7C600]/30 hover:scale-105 active:scale-95 transition-all duration-300"
                    data-testid="button-profile"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-r from-[#F7C600] to-[#FFD93D] text-black flex items-center justify-center font-bold text-xs">
                      {getUserInitials()}
                    </div>
                    <span className="hidden md:inline text-sm font-medium">Hesabım</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 bg-[#0B0B0B]/95 backdrop-blur-xl border border-white/10">
                  <DropdownMenuLabel className="text-white">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem className="text-white hover:bg-white/10 cursor-pointer" asChild>
                    <Link href="/profile" className="flex items-center gap-2">
                      <User className="w-4 h-4 text-[#F7C600]" />
                      Profilim
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:bg-white/10 cursor-pointer" asChild>
                    <Link href="/settings" className="flex items-center gap-2">
                      <Settings className="w-4 h-4 text-[#F7C600]" />
                      Ayarlar
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem className="text-gray-400 text-xs">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3 h-3" />
                      iletisim@etkinium.com
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem 
                    className="text-red-400 hover:bg-red-500/10 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Çıkış Yap
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          <button
            onClick={toggleMobileMenu}
            className="lg:hidden w-10 h-10 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all"
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-3 border-t border-white/10 pt-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Etkinlik, restoran ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-white/10 text-white placeholder:text-gray-500 pr-10 rounded-full"
                data-testid="input-search-mobile"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Search className="w-4 h-4" />
              </button>
            </form>

            <div className="flex flex-col gap-2">
              <Link href="/etkinlikler" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium">
                  <Calendar className="w-5 h-5 text-[#F7C600]" />
                  Etkinlikler
                </button>
              </Link>
              <Link href="/restoranlar" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium">
                  <UtensilsCrossed className="w-5 h-5 text-[#F7C600]" />
                  Restoranlar
                </button>
              </Link>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium">
                  <Mail className="w-5 h-5 text-[#F7C600]" />
                  İletişim
                </button>
              </Link>
            </div>

            {!user && (
              <div className="flex gap-2 pt-2">
                <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)} className="flex-1">
                  <button className="w-full py-3 rounded-full bg-gradient-to-r from-[#F7C600] to-[#FFD93D] text-black font-semibold">
                    Üye Ol
                  </button>
                </Link>
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex-1">
                  <button className="w-full py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium">
                    Giriş Yap
                  </button>
                </Link>
              </div>
            )}

            {user && (
              <div className="pt-2 space-y-2">
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#F7C600] to-[#FFD93D] text-black flex items-center justify-center font-bold">
                    {getUserInitials()}
                  </div>
                  <div>
                    <p className="text-white font-medium">{user.firstName} {user.lastName}</p>
                    <p className="text-gray-400 text-sm">{user.email}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)} className="flex-1">
                    <button className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-sm">
                      Profilim
                    </button>
                  </Link>
                  <button 
                    onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                    className="flex-1 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-medium text-sm"
                  >
                    Çıkış Yap
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

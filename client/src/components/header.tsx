import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "wouter";
import logoImage from "@assets/logo-final.png";
import { User, LogOut, Search, Settings, Mail, Calendar, UtensilsCrossed, Sparkles } from "lucide-react";
import EtkiniumAIChat from "./etkinium-ai-chat";
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
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
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

  return (
    <header className="fixed top-0 w-full z-50 bg-spotify-black/95 backdrop-blur-md border-b border-gray-800">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* LOGO VE İSİM - SOL KÖŞE */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center">
              <img 
                src={logoImage}
                alt="ETKİNİUM Logo"
                className="w-10 h-10 object-contain"
              />
            </div>
            <span className="text-xl md:text-2xl font-bold">ETKİNİUM</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center flex-1 justify-center">
            {/* ARAMA BUTONU - ORTADA */}
            <form onSubmit={handleSearch} className="relative flex items-center">
              <Input
                type="text"
                placeholder="Keşfetmeye başla..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500 pr-10 w-96"
                data-testid="input-search"
              />
              <button
                type="submit"
                className="absolute right-2 text-gray-400 hover:text-accent-amber"
                data-testid="button-search"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* BUTONLAR - SAĞ TARAFA YAKIN */}
          <div className="hidden lg:flex items-center space-x-2 flex-shrink-0">
            <Button 
              onClick={() => setIsAIChatOpen(true)}
              className="relative bg-gradient-to-r from-accent-amber/90 to-yellow-500 hover:from-accent-amber hover:to-yellow-400 text-black font-semibold transition-all flex items-center gap-2 shadow-lg shadow-accent-amber/20"
              data-testid="button-ai-chat"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI</span>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </Button>
            
            <Link href="/etkinlikler">
              <Button 
                variant="ghost"
                className="text-white bg-black border border-gray-600 hover:bg-accent-amber hover:text-black transition-all flex items-center gap-2"
                data-testid="button-etkinlikler"
              >
                <Calendar className="w-4 h-4" />
                Etkinlikler
              </Button>
            </Link>
            
            <Link href="/restoranlar">
              <Button 
                variant="ghost"
                className="text-white bg-black border border-gray-600 hover:bg-accent-amber hover:text-black transition-all flex items-center gap-2"
                data-testid="button-restoranlar"
              >
                <UtensilsCrossed className="w-4 h-4" />
                Restoranlar
              </Button>
            </Link>
            
            <Link href="/contact">
              <Button 
                variant="ghost"
                className="text-white bg-black border border-gray-600 hover:bg-accent-amber hover:text-black transition-all text-sm"
                data-testid="button-contact"
              >
                İletişim
              </Button>
            </Link>
            
            {!user && (
              <>
                <Link href="/signup">
                  <Button 
                    className="text-white bg-black border border-gray-600 hover:bg-accent-amber hover:text-black transition-all"
                    data-testid="button-signup"
                  >
                    Üye Ol
                  </Button>
                </Link>
                <Link href="/login">
                  <Button 
                    variant="ghost"
                    className="text-white bg-black border border-gray-600 hover:bg-accent-amber hover:text-black transition-all"
                    data-testid="button-login"
                  >
                    Giriş Yap
                  </Button>
                </Link>
              </>
            )}
            
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button 
                    className="bg-black hover:bg-accent-amber text-white hover:text-black rounded-full px-4 py-2 transition-all flex items-center gap-2"
                    data-testid="button-profile"
                  >
                    <div className="w-8 h-8 rounded-full bg-accent-amber text-black flex items-center justify-center font-bold">
                      {getUserInitials()}
                    </div>
                    <span className="hidden md:inline font-medium">Hesabım</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 bg-gray-900 border-gray-700">
                  <DropdownMenuLabel className="text-white">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem asChild className="cursor-pointer text-white hover:bg-gray-800 focus:bg-gray-800">
                    <Link href="/profile" className="flex items-center w-full" data-testid="menu-profile">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profilim</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer text-white hover:bg-gray-800 focus:bg-gray-800">
                    <Link href="/settings" className="flex items-center w-full" data-testid="menu-settings">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Ayarlar</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <div className="px-2 py-2 text-xs text-gray-400">
                    <div className="flex items-start gap-2">
                      <Mail className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-white mb-1">Bizimle İletişime Geç</p>
                        <a href="mailto:iletisim@etkinium.com" className="text-accent-amber hover:underline">
                          iletisim@etkinium.com
                        </a>
                      </div>
                    </div>
                  </div>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="cursor-pointer text-red-400 hover:bg-gray-800 hover:text-red-300 focus:bg-gray-800 focus:text-red-300"
                    data-testid="menu-logout"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Çıkış Yap</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <button 
              className="md:hidden text-white hover:text-accent-amber transition-colors"
              onClick={toggleMobileMenu}
              data-testid="button-mobile-menu"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4 pt-4">
              <Button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsAIChatOpen(true);
                }}
                className="relative bg-gradient-to-r from-accent-amber/90 to-yellow-500 hover:from-accent-amber hover:to-yellow-400 text-black font-semibold transition-all w-full flex items-center justify-center gap-2"
                data-testid="button-mobile-ai-chat"
              >
                <Sparkles className="w-4 h-4" />
                <span>Etkinium AI</span>
                <span className="absolute top-1/2 -translate-y-1/2 right-3 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </Button>
              
              <Link href="/etkinlikler">
                <Button 
                  variant="ghost"
                  className="text-white bg-black border border-gray-600 hover:bg-accent-amber hover:text-black transition-all w-full flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid="button-mobile-etkinlikler"
                >
                  <Calendar className="w-4 h-4" />
                  Etkinlikler
                </Button>
              </Link>
              
              <Link href="/restoranlar">
                <Button 
                  variant="ghost"
                  className="text-white bg-black border border-gray-600 hover:bg-accent-amber hover:text-black transition-all w-full flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid="button-mobile-restoranlar"
                >
                  <UtensilsCrossed className="w-4 h-4" />
                  Restoranlar
                </Button>
              </Link>
              
              <Link href="/contact">
                <Button 
                  variant="ghost"
                  className="text-white bg-black border border-gray-600 hover:bg-accent-amber hover:text-black transition-all w-full text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid="button-mobile-contact"
                >
                  İletişim
                </Button>
              </Link>
              
              {!user && (
                <>
                  <Link href="/signup">
                    <Button 
                      className="text-white bg-black border border-gray-600 hover:bg-accent-amber hover:text-black transition-all w-full"
                      onClick={() => setIsMobileMenuOpen(false)}
                      data-testid="button-mobile-signup"
                    >
                      Üye Ol
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button 
                      variant="ghost"
                      className="text-white bg-black border border-gray-600 hover:bg-accent-amber hover:text-black transition-all w-full"
                      onClick={() => setIsMobileMenuOpen(false)}
                      data-testid="button-mobile-login"
                    >
                      Giriş Yap
                    </Button>
                  </Link>
                </>
              )}
              
              {user && (
                <>
                  <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-accent-amber text-black flex items-center justify-center font-bold text-lg">
                        {getUserInitials()}
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-sm text-white font-medium">{user.firstName} {user.lastName}</span>
                        <span className="text-gray-400 text-xs">{user.email}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Link href="/profile">
                        <Button 
                          variant="ghost"
                          className="w-full justify-start text-white hover:bg-gray-800"
                          onClick={() => setIsMobileMenuOpen(false)}
                          data-testid="button-mobile-profile"
                        >
                          <User className="mr-2 h-4 w-4" />
                          Profilim
                        </Button>
                      </Link>
                      <Link href="/settings">
                        <Button 
                          variant="ghost"
                          className="w-full justify-start text-white hover:bg-gray-800"
                          onClick={() => setIsMobileMenuOpen(false)}
                          data-testid="button-mobile-settings"
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          Ayarlar
                        </Button>
                      </Link>
                      <div className="text-xs text-gray-400 py-2 border-t border-gray-700">
                        <p className="font-medium text-white mb-1">Bizimle İletişime Geç</p>
                        <a href="mailto:iletisim@etkinium.com" className="text-accent-amber hover:underline">
                          iletisim@etkinium.com
                        </a>
                      </div>
                      <Button 
                        variant="ghost"
                        className="w-full justify-start text-red-400 hover:bg-gray-800 hover:text-red-300 border-t border-gray-700 rounded-none pt-4"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          handleLogout();
                        }}
                        data-testid="button-mobile-logout"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Çıkış Yap
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
      
      <EtkiniumAIChat isOpen={isAIChatOpen} onClose={() => setIsAIChatOpen(false)} />
    </header>
  );
}

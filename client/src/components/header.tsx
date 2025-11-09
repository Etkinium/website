import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "wouter";
import logoImage from "@assets/logo-final.png";
import { User, LogOut, Ticket, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  points: number;
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: user } = useQuery<UserProfile>({
    queryKey: ["/api/auth/user"],
    retry: false,
  });

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (query.includes("konaklama") || query.includes("otel")) {
      setLocation("/konaklama");
    } else if (query.includes("seyahat") || query.includes("uçak") || query.includes("otobüs") || query.includes("tren")) {
      setLocation("/seyahat");
    }
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
            
            <Link href="/konaklama">
              <Button 
                variant="ghost"
                className="text-white bg-black border border-gray-600 hover:bg-accent-amber hover:text-black transition-all"
                data-testid="button-konaklama"
              >
                Konaklama
              </Button>
            </Link>
            <Link href="/seyahat">
              <Button 
                variant="ghost"
                className="text-white bg-black border border-gray-600 hover:bg-accent-amber hover:text-black transition-all"
                data-testid="button-seyahat"
              >
                Seyahat
              </Button>
            </Link>
            
            {/* BİZİMLE İLETİŞİME GEÇİN DROPDOWN */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost"
                  className="text-white bg-black border border-gray-600 hover:bg-accent-amber hover:text-black transition-all"
                  data-testid="button-contact-dropdown"
                >
                  Bizimle İletişime Geçin
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-gray-900 border-gray-700">
                <DropdownMenuItem asChild className="cursor-pointer text-white hover:bg-gray-800 focus:bg-gray-800">
                  <Link href="/about" className="flex items-center w-full">
                    Hakkımızda
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer text-white hover:bg-gray-800 focus:bg-gray-800">
                  <Link href="/contact" className="flex items-center w-full">
                    İletişim
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
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
                  <Button 
                    className="text-white bg-black border border-gray-600 hover:bg-accent-amber hover:text-black transition-all flex items-center gap-2"
                    data-testid="button-profile"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">👤</span>
                      <div className="flex flex-col items-start">
                        <span className="text-xs leading-none">{user.name}</span>
                        <span className="text-accent-amber text-xs font-bold leading-none" data-testid="text-header-points">
                          {user.points} puan
                        </span>
                      </div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-gray-900 border-gray-700">
                  <DropdownMenuItem 
                    className="cursor-pointer text-white hover:bg-gray-800 focus:bg-gray-800"
                    data-testid="menu-coupons"
                  >
                    <Ticket className="mr-2 h-4 w-4" />
                    <span>Kuponlarım</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="cursor-pointer text-red-400 hover:bg-gray-800 hover:text-red-300 focus:bg-gray-800 focus:text-red-300"
                    data-testid="menu-logout"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Çıkış Yap</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <div className="px-2 py-1.5 text-xs text-gray-400 text-center" data-testid="text-details-soon">
                    Detaylar yakında duyurulacak
                  </div>
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
              <Link href="/konaklama">
                <Button 
                  variant="ghost"
                  className="text-white bg-black border border-gray-600 hover:bg-accent-amber hover:text-black transition-all w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid="button-mobile-konaklama"
                >
                  Konaklama
                </Button>
              </Link>
              <Link href="/seyahat">
                <Button 
                  variant="ghost"
                  className="text-white bg-black border border-gray-600 hover:bg-accent-amber hover:text-black transition-all w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid="button-mobile-seyahat"
                >
                  Seyahat
                </Button>
              </Link>
              
              <div className="border-t border-gray-700 pt-2">
                <p className="text-xs text-gray-400 px-2 mb-2">Bizimle İletişime Geçin</p>
                <Link href="/about">
                  <Button 
                    variant="ghost"
                    className="text-white bg-black border border-gray-600 hover:bg-accent-amber hover:text-black transition-all w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                    data-testid="button-mobile-about"
                  >
                    Hakkımızda
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button 
                    variant="ghost"
                    className="text-white bg-black border border-gray-600 hover:bg-accent-amber hover:text-black transition-all w-full mt-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                    data-testid="button-mobile-contact"
                  >
                    İletişim
                  </Button>
                </Link>
              </div>
              
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
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl">👤</span>
                      <div className="flex flex-col items-start">
                        <span className="text-sm text-white">{user.name}</span>
                        <span className="text-accent-amber text-xs font-bold" data-testid="text-mobile-points">
                          {user.points} puan
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Button 
                        variant="ghost"
                        className="w-full justify-start text-white hover:bg-gray-800"
                        onClick={() => setIsMobileMenuOpen(false)}
                        data-testid="button-mobile-coupons"
                      >
                        <Ticket className="mr-2 h-4 w-4" />
                        Kuponlarım
                      </Button>
                      <Button 
                        variant="ghost"
                        className="w-full justify-start text-red-400 hover:bg-gray-800 hover:text-red-300"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          handleLogout();
                        }}
                        data-testid="button-mobile-logout"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Çıkış Yap
                      </Button>
                      <div className="text-xs text-gray-400 text-center pt-2 border-t border-gray-700" data-testid="text-mobile-details-soon">
                        Detaylar yakında duyurulacak
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

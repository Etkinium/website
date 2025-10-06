import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import logoImage from "@assets/logo-final.png";
import { User } from "lucide-react";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  points: number;
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data: user } = useQuery<UserProfile>({
    queryKey: ["/api/user"],
    retry: false,
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-spotify-black/95 backdrop-blur-md border-b border-gray-800">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
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
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/about">
              <Button 
                variant="ghost"
                className="text-white bg-black border border-gray-600 hover:bg-accent-amber hover:text-black transition-all"
                data-testid="button-about"
              >
                Hakkımızda
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                variant="ghost"
                className="text-white bg-black border border-gray-600 hover:bg-accent-amber hover:text-black transition-all"
                data-testid="button-contact"
              >
                Bizimle İletişime Geçin
              </Button>
            </Link>
            
            {user ? (
              <Link href="/profile">
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
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button 
                    className="text-white bg-black border border-gray-600 hover:bg-accent-amber hover:text-black transition-all"
                    data-testid="button-login"
                  >
                    Giriş Yap
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button 
                    className="text-white bg-black border border-gray-600 hover:bg-accent-amber hover:text-black transition-all"
                    data-testid="button-signup"
                  >
                    Üye Ol
                  </Button>
                </Link>
              </>
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
                  className="text-white bg-black border border-gray-600 hover:bg-accent-amber hover:text-black transition-all w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid="button-mobile-contact"
                >
                  Bizimle İletişime Geçin
                </Button>
              </Link>
              
              {user ? (
                <Link href="/profile">
                  <Button 
                    className="text-white bg-black border border-gray-600 hover:bg-accent-amber hover:text-black transition-all w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                    data-testid="button-mobile-profile"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">👤</span>
                      <div className="flex flex-col items-start">
                        <span className="text-xs">{user.name}</span>
                        <span className="text-accent-amber text-xs font-bold">
                          {user.points} puan
                        </span>
                      </div>
                    </div>
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login">
                    <Button 
                      className="text-white bg-black border border-gray-600 hover:bg-accent-amber hover:text-black transition-all w-full"
                      onClick={() => setIsMobileMenuOpen(false)}
                      data-testid="button-mobile-login"
                    >
                      Giriş Yap
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button 
                      className="text-white bg-black border border-gray-600 hover:bg-accent-amber hover:text-black transition-all w-full"
                      onClick={() => setIsMobileMenuOpen(false)}
                      data-testid="button-mobile-signup"
                    >
                      Üye Ol
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

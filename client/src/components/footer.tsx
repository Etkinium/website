import { Mail } from "lucide-react";
import { Link } from "wouter";
import logoImage from "@assets/logo-final.png";
import { SiX, SiInstagram } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-black py-8 sm:py-12 border-t border-white/10 mb-16 md:mb-0">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
          
          <div className="col-span-2 sm:col-span-2 lg:col-span-1 text-center lg:text-left mb-2 sm:mb-0">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
              <img 
                src={logoImage}
                alt="ETKİNİUM Logo"
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
              />
              <span className="text-lg sm:text-xl font-bold text-white">ETKİNİUM</span>
            </div>
            
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
              <Mail className="text-accent-amber w-3.5 h-3.5" />
              <a 
                href="mailto:iletisim@etkinium.com" 
                className="text-white/60 hover:text-accent-amber transition-all text-xs sm:text-sm"
              >
                iletisim@etkinium.com
              </a>
            </div>
            
            <p className="text-white/40 text-[10px] sm:text-xs italic">
              Tek Platform, Sonsuz Sanat.
            </p>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-xs sm:text-sm font-semibold text-accent-amber mb-2 sm:mb-3">
              Destek & Yasal
            </h3>
            <ul className="space-y-1 sm:space-y-1.5">
              <li>
                <Link href="/kvkk" className="text-white/50 hover:text-accent-amber transition-all text-[10px] sm:text-xs">
                  KVKK Politikası
                </Link>
              </li>
              <li>
                <Link href="/gizlilik-politikasi" className="text-white/50 hover:text-accent-amber transition-all text-[10px] sm:text-xs">
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link href="/kullanim-sartlari" className="text-white/50 hover:text-accent-amber transition-all text-[10px] sm:text-xs">
                  Kullanım Koşulları
                </Link>
              </li>
              <li>
                <Link href="/cerez-politikasi" className="text-white/50 hover:text-accent-amber transition-all text-[10px] sm:text-xs">
                  Çerez Politikası
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-xs sm:text-sm font-semibold text-accent-amber mb-2 sm:mb-3">
              İletişim
            </h3>
            <ul className="space-y-1 sm:space-y-1.5">
              <li>
                <Link href="/contact" className="text-white/50 hover:text-accent-amber transition-all text-[10px] sm:text-xs">
                  Bize Ulaşın
                </Link>
              </li>
              <li>
                <Link href="/sss" className="text-white/50 hover:text-accent-amber transition-all text-[10px] sm:text-xs">
                  SSS
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/50 hover:text-accent-amber transition-all text-[10px] sm:text-xs">
                  Hakkımızda
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left col-span-2 sm:col-span-1">
            <h3 className="text-xs sm:text-sm font-semibold text-accent-amber mb-2 sm:mb-3">
              Takip Edin
            </h3>
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <a 
                href="https://x.com/etkinium" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-accent-amber flex items-center justify-center text-white/50 hover:text-black transition-all border border-white/10 hover:border-accent-amber"
                data-testid="link-x"
              >
                <SiX className="w-3.5 h-3.5" />
              </a>
              <a 
                href="https://instagram.com/etkinium" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-accent-amber flex items-center justify-center text-white/50 hover:text-black transition-all border border-white/10 hover:border-accent-amber"
                data-testid="link-instagram"
              >
                <SiInstagram className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-white/5 text-center">
          <p className="text-white/30 text-[10px] sm:text-xs">
            © 2025 ETKİNİUM. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}

import { Mail, Users, Star, Shield, Headphones } from "lucide-react";
import { Link } from "wouter";
import logoImage from "@assets/logo-final.png";

export default function Footer() {
  return (
    <footer className="bg-spotify-black py-16 border-t border-gray-800">
      <div className="container mx-auto px-4">
        {/* Ana Footer İçeriği */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          
          {/* Logo ve Email Bölümü */}
          <div className="lg:col-span-2 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-amber/20 to-accent-amber/5 border border-accent-amber/30 flex items-center justify-center">
                <img 
                  src={logoImage}
                  alt="ETKİNİUM Logo"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <span className="text-3xl font-bold text-white tracking-wide">ETKİNİUM</span>
            </div>
            
            <div className="flex items-center justify-center lg:justify-start space-x-3 mb-4">
              <div className="p-2 rounded-lg bg-accent-amber/10 border border-accent-amber/20">
                <Mail className="text-accent-amber w-5 h-5" />
              </div>
              <a 
                href="mailto:iletisim@etkinium.com" 
                className="text-gray-300 hover:text-accent-amber transition-all duration-300 text-lg font-medium"
              >
                iletisim@etkinium.com
              </a>
            </div>
            
            <p className="text-gray-400 max-w-md mx-auto lg:mx-0 text-center lg:text-left">
              Dijital eğlence dünyasının öncü platformu. Müzik ve etkinliklerde yeni deneyimler yaşayın.
            </p>
          </div>

          {/* Hukuki Belgeler */}
          <div className="text-center lg:text-left">
            <h3 className="text-xl font-bold text-white mb-6 relative">
              <span className="bg-gradient-to-r from-accent-amber to-yellow-400 bg-clip-text text-transparent">
                Hukuki Belgeler
              </span>
              <div className="absolute -bottom-2 left-1/2 lg:left-0 transform -translate-x-1/2 lg:translate-x-0 w-12 h-1 bg-gradient-to-r from-accent-amber to-yellow-400 rounded-full"></div>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/kvkk" 
                  className="text-gray-400 hover:text-accent-amber transition-all duration-300 flex items-center justify-center lg:justify-start space-x-2 group"
                >
                  <span className="w-2 h-2 bg-gray-600 group-hover:bg-accent-amber rounded-full transition-all duration-300"></span>
                  <span>KVKK</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/kullanim-sartlari" 
                  className="text-gray-400 hover:text-accent-amber transition-all duration-300 flex items-center justify-center lg:justify-start space-x-2 group"
                >
                  <span className="w-2 h-2 bg-gray-600 group-hover:bg-accent-amber rounded-full transition-all duration-300"></span>
                  <span>Kullanım Şartları</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/gizlilik-politikasi" 
                  className="text-gray-400 hover:text-accent-amber transition-all duration-300 flex items-center justify-center lg:justify-start space-x-2 group"
                >
                  <span className="w-2 h-2 bg-gray-600 group-hover:bg-accent-amber rounded-full transition-all duration-300"></span>
                  <span>Gizlilik Politikası</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* İletişim */}
          <div className="text-center lg:text-left">
            <h3 className="text-xl font-bold text-white mb-6 relative">
              <span className="bg-gradient-to-r from-accent-amber to-yellow-400 bg-clip-text text-transparent">
                İletişim
              </span>
              <div className="absolute -bottom-2 left-1/2 lg:left-0 transform -translate-x-1/2 lg:translate-x-0 w-12 h-1 bg-gradient-to-r from-accent-amber to-yellow-400 rounded-full"></div>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/contact" 
                  className="text-gray-400 hover:text-accent-amber transition-all duration-300 flex items-center justify-center lg:justify-start space-x-2 group"
                >
                  <span className="w-2 h-2 bg-gray-600 group-hover:bg-accent-amber rounded-full transition-all duration-300"></span>
                  <span>Bizimle İletişime Geçin</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-gray-400 hover:text-accent-amber transition-all duration-300 flex items-center justify-center lg:justify-start space-x-2 group"
                >
                  <span className="w-2 h-2 bg-gray-600 group-hover:bg-accent-amber rounded-full transition-all duration-300"></span>
                  <span>Hakkımızda</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 mb-3">
            © 2025 ETKİNİUM. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <img 
                src={logoImage}
                alt="ETKİNİUM Logo"
                className="w-6 h-6 object-contain"
              />
            </div>
            <span className="text-lg font-bold text-white">ETKİNİUM</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
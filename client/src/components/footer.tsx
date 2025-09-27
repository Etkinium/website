import { Mail, Phone, MapPin } from "lucide-react";
import logoImage from "@assets/logo-final.png";

export default function Footer() {
  return (
    <footer className="bg-spotify-black py-16 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo ve İletişim */}
          <div className="md:col-span-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                <img 
                  src={logoImage}
                  alt="ETKİNİUM Logo"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <span className="text-2xl font-bold text-accent-amber">ETKİNİUM</span>
            </div>
            <p className="text-lg text-gray-400 mb-6">
              Sanatın ve Eğlencenin Yeni Nesil Sahnesi
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <Mail className="text-accent-amber w-5 h-5" />
                <a href="mailto:iletisim@etkinium.com" className="text-gray-300 hover:text-accent-amber transition-colors">
                  iletisim@etkinium.com
                </a>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <Phone className="text-accent-amber w-5 h-5" />
                <span className="text-gray-300">+90 (212) XXX XX XX</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <MapPin className="text-accent-amber w-5 h-5" />
                <span className="text-gray-300">İstanbul, Türkiye</span>
              </div>
            </div>
          </div>

          {/* Hukuki Belgeler */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-white mb-4">Hukuki Belgeler</h3>
            <ul className="space-y-2">
              <li>
                <a href="/kvkk" className="text-gray-400 hover:text-accent-amber transition-colors">
                  KVKK
                </a>
              </li>
              <li>
                <a href="/kullanim-sartlari" className="text-gray-400 hover:text-accent-amber transition-colors">
                  Kullanım Şartları
                </a>
              </li>
              <li>
                <a href="/gizlilik-politikasi" className="text-gray-400 hover:text-accent-amber transition-colors">
                  Gizlilik Politikası
                </a>
              </li>
            </ul>
          </div>

          {/* İletişim */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-white mb-4">İletişim</h3>
            <ul className="space-y-2">
              <li>
                <a href="/contact" className="text-gray-400 hover:text-accent-amber transition-colors">
                  Bizimle İletişime Geçin
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-accent-amber transition-colors">
                  Hakkımızda
                </a>
              </li>
              <li>
                <a href="/partnership" className="text-gray-400 hover:text-accent-amber transition-colors">
                  İş Birliği
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <img 
                src={logoImage}
                alt="ETKİNİUM Logo"
                className="w-6 h-6 object-contain"
              />
            </div>
            <span className="text-lg font-bold text-accent-amber">ETKİNİUM</span>
          </div>
          <p className="text-gray-400">
            © 2025 ETKİNİUM. Tüm hakları saklıdır. | Sanatın ve Eğlencenin Yeni Nesil Sahnesi
          </p>
        </div>
      </div>
    </footer>
  );
}
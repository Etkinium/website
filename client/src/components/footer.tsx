import { Music, Instagram, Twitter, Facebook, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-spotify-black py-16 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-spotify-green to-accent-purple rounded-lg flex items-center justify-center">
                <Music className="text-white w-5 h-5" />
              </div>
              <span className="text-2xl font-bold">ETKİNİUM</span>
            </div>
            <p className="text-gray-400">
              Türkiye'nin en büyük premium müzik ve etkinlik platformu
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-spotify-green transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-spotify-green transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-spotify-green transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-spotify-green transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Etkinlikler</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Müzik</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Canlı Yayınlar</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Premium</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Destek</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Yardım Merkezi</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">İletişim</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Bilet İadesi</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">SSS</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Yasal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Gizlilik Politikası</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Kullanım Şartları</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Çerez Politikası</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">KVKK</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            © 2024 ETKİNİUM. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}

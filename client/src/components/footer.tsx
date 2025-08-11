import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";
import logoImage from "@/assets/logo-final.png";

export default function Footer() {
  return (
    <footer className="bg-spotify-black py-16 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center">
              <img 
                src={logoImage}
                alt="ETKİNİUM Logo"
                className="w-10 h-10 object-contain"
              />
            </div>
            <span className="text-2xl font-bold">ETKİNİUM</span>
          </div>
          <p className="text-lg text-gray-400">
            Sanatın ve Eğlencenin Yeni Nesil Sahnesi
          </p>
          <div className="mt-12 pt-8 border-t border-gray-800">
            <p className="text-gray-400">
              © 2025 ETKİNİUM. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";
import logoPath from "@assets/Logo_1754937780593.png";

export default function Footer() {
  return (
    <footer className="bg-spotify-black py-16 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center">
            <img 
              src={logoPath} 
              alt="ETKİNİUM Logo" 
              className="h-12 w-auto"
            />
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

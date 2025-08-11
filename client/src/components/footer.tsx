import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-spotify-black py-16 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-black" fill="currentColor">
                <path d="M3 3h6v4H3V3zm8 0h6v4h-6V3zm0 6h6v4h-6V9zM3 15h6v4H3v-4z"/>
                <path d="M11 15h6v4h-6v-4z"/>
              </svg>
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

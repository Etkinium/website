import { Music } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-spotify-black/95 backdrop-blur-md border-b border-gray-800">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-spotify-green to-accent-purple rounded-lg flex items-center justify-center">
            <Music className="text-white text-lg w-5 h-5" />
          </div>
          <span className="text-2xl font-bold">ETKİNİUM</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="hover:text-accent-amber transition-colors">Hakkımızda</a>
          <a href="#" className="hover:text-accent-amber transition-colors">Bizimle İletişime Geçin</a>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="md:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}

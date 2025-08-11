import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-spotify-black/95 backdrop-blur-md border-b border-gray-800">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-black" fill="currentColor">
              <path d="M3 3h6v4H3V3zm8 0h6v4h-6V3zm0 6h6v4h-6V9zM3 15h6v4H3v-4z"/>
              <path d="M11 15h6v4h-6v-4z"/>
            </svg>
          </div>
          <span className="text-2xl font-bold">ETKİNİUM</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/about" className="hover:text-accent-amber transition-colors">Hakkımızda</Link>
          <Link href="/contact" className="hover:text-accent-amber transition-colors">Bizimle İletişime Geçin</Link>
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

import { useEffect } from "react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function Signup() {
  const [, setLocation] = useLocation();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      setLocation("/");
    }
  }, [isAuthenticated, isLoading, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-spotify-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent-amber border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-gray-900/50 rounded-lg p-6 md:p-8 border border-gray-800">
              <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">
                <span className="text-white">ETKİNİUM'e</span>
                <span className="text-accent-amber ml-2">Katılın</span>
              </h1>
              
              <p className="text-gray-300 text-center mb-8">
                Hesap oluşturmak için Google, Apple, GitHub, X veya E-posta ile devam edin
              </p>
              
              <Button 
                onClick={() => window.location.href = "/api/login"}
                className="w-full text-white bg-gradient-to-r from-accent-amber to-yellow-600 hover:from-yellow-600 hover:to-accent-amber transition-all py-6 text-lg font-semibold"
                data-testid="button-signup-replit"
              >
                Üye Ol / Giriş Yap
              </Button>
              
              <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <p className="text-xs text-gray-400 text-center">
                  Üye olarak{" "}
                  <a href="/kullanim-kosullari" className="text-accent-amber hover:underline">
                    Kullanım Koşulları
                  </a>
                  {" "}ve{" "}
                  <a href="/gizlilik-politikasi" className="text-accent-amber hover:underline">
                    Gizlilik Politikası
                  </a>
                  'nı kabul etmiş olursunuz.
                </p>
              </div>
              
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <svg className="w-5 h-5 text-accent-amber" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Ücretsiz hesap oluşturma</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <svg className="w-5 h-5 text-accent-amber" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>100 hoşgeldin puanı hediye</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <svg className="w-5 h-5 text-accent-amber" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Özel kampanya ve fırsatlar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

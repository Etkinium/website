import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";

export default function Signup() {
  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-gray-900/50 rounded-lg p-8">
              <h1 className="text-3xl font-bold mb-8 text-center">
                <span className="text-white">Üye</span>
                <span className="text-accent-amber ml-2">Ol</span>
              </h1>
              
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Ad Soyad
                  </label>
                  <Input
                    type="text"
                    placeholder="Ad ve soyadınızı girin"
                    className="bg-gray-800 border-gray-600 text-white"
                    data-testid="input-name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    E-posta
                  </label>
                  <Input
                    type="email"
                    placeholder="E-posta adresinizi girin"
                    className="bg-gray-800 border-gray-600 text-white"
                    data-testid="input-email"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Şifre
                  </label>
                  <Input
                    type="password"
                    placeholder="Güçlü bir şifre oluşturun"
                    className="bg-gray-800 border-gray-600 text-white"
                    data-testid="input-password"
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="w-full text-white bg-black border border-gray-600 hover:bg-accent-amber hover:text-black transition-all"
                  data-testid="button-submit-signup"
                >
                  Üye Ol
                </Button>
                
                <div className="text-center pt-4">
                  <p className="text-gray-400">
                    Zaten hesabınız var mı?{" "}
                    <Link href="/login" className="text-accent-amber hover:underline">
                      Giriş Yap
                    </Link>
                  </p>
                </div>
              </form>
              
              <div className="mt-8 p-4 bg-accent-amber/10 rounded-lg border border-accent-amber/30">
                <p className="text-accent-amber font-semibold text-center">
                  🎉 Özel Lansman Fırsatı!
                </p>
                <p className="text-gray-300 text-center mt-2">
                  İlk üyeler %10 indirim + 100 ETKİNİUM puan kazanacak!
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
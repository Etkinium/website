import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { CheckCircle, Smartphone } from "lucide-react";

export default function Signup() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setIsSuccess(true);
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-spotify-black text-white">
        <Header />
        
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <div className="bg-gray-900/50 rounded-lg p-8 text-center">
                <div className="mb-6">
                  <CheckCircle className="w-20 h-20 text-accent-amber mx-auto mb-4" />
                  <h1 className="text-3xl font-bold mb-4">
                    <span className="text-white">Başarıyla</span>
                    <span className="text-accent-amber ml-2">Üye Oldunuz!</span>
                  </h1>
                  <p className="text-gray-300 text-lg">
                    Hoş geldiniz! Hesabınız başarıyla oluşturuldu.
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="p-4 bg-accent-amber/10 rounded-lg border border-accent-amber/30">
                    <p className="text-accent-amber font-semibold">
                      🎉 Başarıyla Kaydoldunuz!
                    </p>
                    <p className="text-gray-300 mt-2">
                      Etkinlikler yakında duyurulacak. %10 indirim ve 100 puan hesabınıza yüklenmiştir - lansman sonrası kullanabilirsiniz.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link href="/login">
                    <Button className="w-full text-white bg-black border border-gray-600 hover:bg-accent-amber hover:text-black transition-all">
                      Şimdi Giriş Yap
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button variant="ghost" className="w-full text-gray-400 hover:text-accent-amber">
                      Ana Sayfaya Dön
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

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
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Ad Soyad
                  </label>
                  <Input
                    name="name"
                    type="text"
                    placeholder="Ad ve soyadınızı girin"
                    className="bg-gray-800 border-gray-600 text-white"
                    data-testid="input-name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    E-posta
                  </label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="E-posta adresinizi girin"
                    className="bg-gray-800 border-gray-600 text-white"
                    data-testid="input-email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Şifre
                  </label>
                  <Input
                    name="password"
                    type="password"
                    placeholder="Güçlü bir şifre oluşturun"
                    className="bg-gray-800 border-gray-600 text-white"
                    data-testid="input-password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
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
              
              {/* OAuth Seçenekleri */}
              <div className="mt-8 pt-6 border-t border-gray-700">
                <div className="text-center mb-4">
                  <p className="text-gray-300 text-sm">
                    Hızlı kayıt için
                  </p>
                </div>
                
                <div className="space-y-3">
                  <button 
                    type="button"
                    className="w-full flex items-center justify-center space-x-3 bg-white hover:bg-gray-100 text-gray-900 px-4 py-3 rounded-lg border border-gray-300 transition-all font-medium"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span>Google ile Üye Ol</span>
                  </button>
                  
                  <button 
                    type="button"
                    className="w-full flex items-center justify-center space-x-3 bg-black hover:bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-600 transition-all font-medium"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    <span>Apple ile Üye Ol</span>
                  </button>
                </div>
                
                <div className="text-center mt-4">
                  <p className="text-xs text-gray-500">
                    Üye olarak <Link href="/kullanim-sartlari" className="text-accent-amber hover:underline">Kullanım Şartları</Link> ve <Link href="/gizlilik-politikasi" className="text-accent-amber hover:underline">Gizlilik Politikası</Link>'nı kabul etmiş olursunuz.
                  </p>
                </div>
              </div>
              
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
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
                      🎁 Hoş Geldin Bonusu!
                    </p>
                    <p className="text-gray-300 mt-2">
                      100 ETKİNİUM puan hesabınıza yüklendi!
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
              
              {/* Mobil Uygulama Linkleri */}
              <div className="mt-8 pt-6 border-t border-gray-700">
                <div className="text-center mb-4">
                  <Smartphone className="w-6 h-6 text-accent-amber mx-auto mb-2" />
                  <p className="text-gray-300 text-sm">
                    Mobil uygulamamızı indirin
                  </p>
                </div>
                
                <div className="flex gap-4 justify-center">
                  <a 
                    href="#" 
                    className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg border border-gray-600 transition-all"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">GP</span>
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-gray-400">Şu an mevcut</p>
                      <p className="text-sm text-white font-medium">Google Play</p>
                    </div>
                  </a>
                  
                  <a 
                    href="#" 
                    className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg border border-gray-600 transition-all"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">AS</span>
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-gray-400">Çok yakında</p>
                      <p className="text-sm text-white font-medium">App Store</p>
                    </div>
                  </a>
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
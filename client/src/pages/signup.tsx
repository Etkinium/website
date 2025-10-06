import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { CheckCircle, Loader2 } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Signup() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const signupMutation = useMutation({
    mutationFn: async (data: { name: string; email: string; password: string }) => {
      const response = await apiRequest("POST", "/api/signup", data);
      return response.json();
    },
    onSuccess: (data) => {
      setIsSuccess(true);
      toast({
        title: "Başarılı!",
        description: data.message,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      setTimeout(() => {
        setLocation("/profile");
      }, 2000);
    },
    onError: (error: any) => {
      toast({
        title: "Hata",
        description: error.message || "Üye olurken bir hata oluştu.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signupMutation.mutate(formData);
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
                      🎉 Hoş Geldiniz!
                    </p>
                    <p className="text-gray-300 mt-2">
                      %10 indirim kuponu ve 100 puan hesabınıza yüklendi. Profilinize yönlendiriliyorsunuz...
                    </p>
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
                    disabled={signupMutation.isPending}
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
                    disabled={signupMutation.isPending}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Şifre
                  </label>
                  <Input
                    name="password"
                    type="password"
                    placeholder="Güçlü bir şifre oluşturun (en az 6 karakter)"
                    className="bg-gray-800 border-gray-600 text-white"
                    data-testid="input-password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    disabled={signupMutation.isPending}
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="w-full text-white bg-black border border-gray-600 hover:bg-accent-amber hover:text-black transition-all"
                  data-testid="button-submit-signup"
                  disabled={signupMutation.isPending}
                >
                  {signupMutation.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Üye Olunuyor...
                    </>
                  ) : (
                    "Üye Ol"
                  )}
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
                  Üye olun, %10 indirim + 100 ETKİNİUM puan kazanın!
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

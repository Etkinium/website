import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Shield, Mail, X, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function EmailSubscription() {
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const subscriptionMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await apiRequest("POST", "/api/subscribe", { email });
      return response.json();
    },
    onSuccess: (data) => {
      if (data.alreadySubscribed) {
        toast({
          title: "Zaten Kayıtlısınız",
          description: "Bu e-posta adresi zaten abone listesinde bulunuyor.",
          variant: "destructive",
        });
      } else {
        setIsSuccess(true);
        setEmail("");
        toast({
          title: "Başarıyla Abone Oldunuz!",
          description: "E-posta adresinizi doğrulamak için gelen kutunuzu kontrol edin.",
        });
      }
    },
    onError: (error: any) => {
      toast({
        title: "Bir Hata Oluştu",
        description: error.message || "Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    }
  });

  const submitEmail = () => {
    if (!email.trim()) {
      toast({
        title: "E-posta Gerekli",
        description: "Lütfen e-posta adresinizi girin.",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Geçersiz E-posta",
        description: "Lütfen geçerli bir e-posta adresi girin.",
        variant: "destructive",
      });
      return;
    }

    subscriptionMutation.mutate(email);
  };

  if (isSuccess) {
    return (
      <section className="py-20 bg-spotify-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mt-8 p-6 bg-yellow-900/30 border border-accent-amber/30 rounded-xl animate-slide-in">
              <div className="flex items-center justify-center space-x-3">
                <CheckCircle className="text-accent-amber w-8 h-8" />
                <div>
                  <h3 className="text-lg font-semibold text-accent-amber">Başarıyla Abone Oldunuz!</h3>
                  <p className="text-yellow-300">E-posta adresinizi doğrulamak için gelen kutunuzu kontrol edin.</p>
                </div>
              </div>
              <Button 
                onClick={() => setIsSuccess(false)}
                variant="outline"
                className="mt-4 border-accent-amber/30 text-accent-amber hover:bg-accent-amber/10"
              >
                Yeni Abonelik Ekle
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-spotify-black">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Özel Fırsatları</span>
              <span className="text-accent-amber ml-4">Kaçırma!</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Lansman öncesi büyük indirimler için hemen ücretsiz abone ol! Özel fırsatlar ve erken erişim imkanları için e-posta listemize katıl.
            </p>
          </div>
          
          <div className="max-w-md mx-auto space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    e.stopPropagation();
                    submitEmail();
                    return false;
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                  }
                }}
                placeholder="E-posta adresinizi girin"
                className="w-full px-6 py-4 bg-gray-800 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:border-spotify-green focus:ring-2 focus:ring-spotify-green/20 h-auto"
                disabled={subscriptionMutation.isPending}
                data-testid="input-email-subscription"
              />
            </div>
            
            <Button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                submitEmail();
              }}
              disabled={subscriptionMutation.isPending}
              className="w-full bg-accent-amber text-black font-bold py-4 px-8 rounded-full hover:bg-yellow-300 hover:text-black transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed h-auto border-2 border-accent-amber hover:border-yellow-300"
              data-testid="button-subscribe"
            >
              {subscriptionMutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Kaydediliyor...
                </>
              ) : (
                "Ücretsiz Abone Ol"
              )}
            </Button>
          </div>
          
          <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Shield className="text-accent-amber w-4 h-4" />
              <span>Güvenli</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="text-accent-amber w-4 h-4" />
              <span>Spam Yok</span>
            </div>
            <div className="flex items-center space-x-2">
              <X className="text-accent-amber w-4 h-4" />
              <span>İstediğiniz Zaman Çıkın</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CheckCircle, Shield, Mail, X, Loader2, Building2, Handshake, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function EmailSubscription() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const partnershipMutation = useMutation({
    mutationFn: async (formData: { name: string; email: string; company: string; message: string }) => {
      const response = await apiRequest("POST", "/api/contact", formData);
      return response.json();
    },
    onSuccess: () => {
      setIsSuccess(true);
      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
      setIsDialogOpen(false);
      toast({
        title: "Teşekkür Ederiz! 🎉",
        description: "İş birliği başvurunuz alındı. Uzman ekibimiz en kısa sürede sizlerle iletişime geçecektir.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Bir Hata Oluştu",
        description: error.message || "Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    }
  });

  const submitPartnership = () => {
    if (!name.trim() || !email.trim() || !company.trim() || !message.trim()) {
      toast({
        title: "Eksik Bilgi",
        description: "Lütfen tüm alanları doldurun.",
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

    partnershipMutation.mutate({ name, email, company, message });
  };

  if (isSuccess) {
    return (
      <section className="py-20 bg-spotify-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mt-8 p-8 bg-gradient-to-br from-accent-amber/20 to-accent-amber/10 border-2 border-accent-amber/40 rounded-2xl animate-slide-in">
              <div className="flex flex-col items-center justify-center space-y-4">
                <CheckCircle className="text-accent-amber w-16 h-16 animate-pulse" />
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-accent-amber mb-3">
                    Teşekkür Ederiz! 🎉
                  </h3>
                  <p className="text-white text-lg mb-2">
                    İş birliği başvurunuz başarıyla alındı.
                  </p>
                  <p className="text-gray-200 text-base leading-relaxed max-w-xl mx-auto">
                    ETKİNİUM ekibi olarak iş birliği talebinizi değerlendiriyoruz. 
                    Uzman ekibimiz en kısa sürede sizlerle iletişime geçecek ve 
                    detayları paylaşacaktır. Bizimle birlikte büyümeye hazır olun!
                  </p>
                </div>
              </div>
              <Button 
                onClick={() => setIsSuccess(false)}
                variant="outline"
                className="mt-6 border-accent-amber text-accent-amber hover:bg-accent-amber hover:text-black transition-all font-semibold"
                data-testid="button-new-partnership"
              >
                Yeni İş Birliği Başvurusu
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
              <span className="text-white">İş Birliği</span>
              <span className="text-accent-amber ml-4">Fırsatları!</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              ETKİNİUM ile iş birliği yapmak ve büyümeye birlikte devam etmek için bizimle iletişime geçin. Stratejik ortaklıklar kuralım!
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="text-white bg-black border border-gray-600 hover:bg-accent-amber hover:text-black font-bold px-8 py-4 rounded-full transition-all transform hover:scale-105"
                  data-testid="button-partnership"
                >
                  İş Birliği Başvurusu
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-spotify-black text-white border-gray-600">
                <DialogHeader>
                  <DialogTitle className="text-accent-amber">İş Birliği İletişim Formu</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Ad Soyad"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white"
                    data-testid="input-name"
                  />
                  <Input
                    placeholder="E-posta"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white"
                    data-testid="input-email"
                  />
                  <Input
                    placeholder="Şirket/Kurum"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white"
                    data-testid="input-company"
                  />
                  <Textarea
                    placeholder="İş birliği önerinizi detaylandırın..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white min-h-[100px]"
                    data-testid="input-message"
                  />
                  <Button
                    onClick={submitPartnership}
                    disabled={partnershipMutation.isPending}
                    className="w-full text-white bg-black border border-gray-600 hover:bg-accent-amber hover:text-black transition-all"
                    data-testid="button-submit-partnership"
                  >
                    {partnershipMutation.isPending ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Gönderiliyor...
                      </>
                    ) : (
                      "Gönder"
                    )}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:gap-8 text-xs md:text-sm text-gray-500 px-4">
            <div className="flex items-center space-x-2">
              <Building2 className="text-accent-amber w-4 h-4" />
              <span>Kurumsal Çözümler</span>
            </div>
            <div className="flex items-center space-x-2">
              <Handshake className="text-accent-amber w-4 h-4" />
              <span>Stratejik Ortaklık</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="text-accent-amber w-4 h-4" />
              <span>Uzun Vadeli İş Birliği</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdvertisingButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const advertisingMutation = useMutation({
    mutationFn: async (formData: { name: string; email: string; company: string; message: string }) => {
      const response = await apiRequest("POST", "/api/advertising", formData);
      return response.json();
    },
    onSuccess: () => {
      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
      setIsOpen(false);
      toast({
        title: "Başvurunuz Alındı! 🎉",
        description: "Reklam başvurunuz için teşekkür ederiz. En kısa sürede sizinle iletişime geçeceğiz.",
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

  const handleSubmit = () => {
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

    advertisingMutation.mutate({ name, email, company, message });
  };

  return (
    <div className="text-center mt-6">
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-black text-white border border-gray-600 hover:bg-accent-amber hover:text-black font-bold px-6 py-3 rounded-xl transition-all shadow-lg"
        data-testid="button-advertising"
      >
        Reklam Vermek İçin Başvurun
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-gradient-to-br from-gray-900 to-black text-white border border-accent-amber/30 max-w-lg">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 rounded-full p-2 hover:bg-white/10 transition-all"
            data-testid="button-close-dialog"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          
          <DialogHeader>
            <DialogTitle className="text-accent-amber text-2xl font-bold">
              Reklam Başvurusu
            </DialogTitle>
            <p className="text-gray-400 text-sm mt-2">
              ETKİNİUM platformunda reklam vermek için bilgilerinizi paylaşın
            </p>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <Input
              placeholder="Ad Soyad *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500"
              data-testid="input-advertising-name"
            />
            <Input
              placeholder="E-posta *"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500"
              data-testid="input-advertising-email"
            />
            <Input
              placeholder="Şirket/Kurum *"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500"
              data-testid="input-advertising-company"
            />
            <Textarea
              placeholder="Reklam detayları ve bütçe bilgisi... *"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500 min-h-[100px]"
              data-testid="input-advertising-message"
            />
            <Button
              onClick={handleSubmit}
              disabled={advertisingMutation.isPending}
              className="w-full bg-accent-amber text-black hover:bg-accent-amber/90 font-bold transition-all"
              data-testid="button-submit-advertising"
            >
              {advertisingMutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Gönderiliyor...
                </>
              ) : (
                "Başvuruyu Gönder"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

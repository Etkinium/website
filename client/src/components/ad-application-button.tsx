import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertAdvertisingApplicationSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Megaphone, CheckCircle2, Send, Building2, User, Mail, MessageSquare } from "lucide-react";
import type { z } from "zod";

type FormData = z.infer<typeof insertAdvertisingApplicationSchema>;

export default function AdApplicationButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(insertAdvertisingApplicationSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await apiRequest("POST", "/api/advertising", data);
      return await res.json();
    },
    onSuccess: () => {
      setIsSuccess(true);
      form.reset();
      setTimeout(() => {
        setIsOpen(false);
        setIsSuccess(false);
      }, 3000);
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="w-full flex justify-center px-4 pb-4">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            className="bg-gradient-to-r from-gray-900 to-black text-accent-amber border border-accent-amber/40 hover:bg-accent-amber hover:text-black font-semibold px-6 py-2 rounded-full transition-all transform hover:scale-105 flex items-center gap-2"
            data-testid="button-ad-application"
          >
            <Megaphone className="w-4 h-4" />
            <span className="text-sm">Reklam Vermek İçin Başvurun</span>
          </Button>
        </DialogTrigger>
        
        <DialogContent className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-accent-amber/40 max-w-md mx-auto">
          {isSuccess ? (
            <div className="py-12 text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center animate-pulse">
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">Teşekkürler!</h3>
                <p className="text-accent-amber font-semibold">
                  Mesajınız başarıyla gönderildi
                </p>
                <p className="text-gray-400 text-sm">
                  Bizimle iletişime geçtiğiniz için teşekkür ederiz. En kısa sürede size dönüş yapacağız.
                </p>
              </div>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-center text-xl md:text-2xl font-bold text-white flex items-center justify-center gap-2">
                  <Megaphone className="w-6 h-6 text-accent-amber" />
                  <span>Reklam Başvurusu</span>
                </DialogTitle>
              </DialogHeader>
              
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label className="text-white flex items-center gap-2">
                    <User className="w-4 h-4 text-accent-amber" />
                    Yetkili Ad Soyad
                  </Label>
                  <Input
                    {...form.register("name")}
                    placeholder="Ad Soyad"
                    className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500"
                    data-testid="input-ad-name"
                  />
                  {form.formState.errors.name && (
                    <p className="text-red-400 text-xs">{form.formState.errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-white flex items-center gap-2">
                    <Mail className="w-4 h-4 text-accent-amber" />
                    E-posta Adresi
                  </Label>
                  <Input
                    {...form.register("email")}
                    type="email"
                    placeholder="ornek@firma.com"
                    className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500"
                    data-testid="input-ad-email"
                  />
                  {form.formState.errors.email && (
                    <p className="text-red-400 text-xs">{form.formState.errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-white flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-accent-amber" />
                    Firma / Kurum Adı
                  </Label>
                  <Input
                    {...form.register("company")}
                    placeholder="Firma Adı"
                    className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500"
                    data-testid="input-ad-company"
                  />
                  {form.formState.errors.company && (
                    <p className="text-red-400 text-xs">{form.formState.errors.company.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-white flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-accent-amber" />
                    Mesajınız
                  </Label>
                  <Textarea
                    {...form.register("message")}
                    placeholder="Reklam talebiniz hakkında detayları yazın..."
                    className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500 min-h-[100px]"
                    data-testid="input-ad-message"
                  />
                  {form.formState.errors.message && (
                    <p className="text-red-400 text-xs">{form.formState.errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full bg-accent-amber text-black hover:bg-yellow-400 font-bold py-2.5 rounded-full transition-all flex items-center justify-center gap-2"
                  data-testid="button-ad-submit"
                >
                  {mutation.isPending ? (
                    <span>Gönderiliyor...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Başvuruyu Gönder</span>
                    </>
                  )}
                </Button>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

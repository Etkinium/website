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
    <div className="w-full flex justify-center px-3 pb-3">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button
            className="bg-black text-accent-amber/80 border border-white/10 hover:bg-accent-amber hover:text-black text-[10px] sm:text-xs font-medium px-3 sm:px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5"
            data-testid="button-ad-application"
          >
            <Megaphone className="w-3 h-3" />
            <span>İş Birliği Fırsatları</span>
          </button>
        </DialogTrigger>
        
        <DialogContent className="bg-black/95 backdrop-blur-xl border border-accent-amber/30 max-w-[90vw] sm:max-w-md mx-auto rounded-2xl">
          {isSuccess ? (
            <div className="py-8 text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-white">Teşekkürler!</h3>
                <p className="text-accent-amber text-sm font-medium">
                  Mesajınız gönderildi
                </p>
                <p className="text-white/50 text-xs">
                  En kısa sürede size dönüş yapacağız.
                </p>
              </div>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-center text-base sm:text-lg font-semibold text-white flex items-center justify-center gap-2">
                  <Megaphone className="w-4 h-4 text-accent-amber" />
                  <span>Reklam Başvurusu</span>
                </DialogTitle>
              </DialogHeader>
              
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 py-3">
                <div className="space-y-1.5">
                  <Label className="text-white/70 text-xs flex items-center gap-1.5">
                    <User className="w-3 h-3 text-accent-amber" />
                    Yetkili Ad Soyad
                  </Label>
                  <Input
                    {...form.register("name")}
                    placeholder="Ad Soyad"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 text-sm h-9 rounded-xl"
                    data-testid="input-ad-name"
                  />
                  {form.formState.errors.name && (
                    <p className="text-red-400 text-[10px]">{form.formState.errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label className="text-white/70 text-xs flex items-center gap-1.5">
                    <Mail className="w-3 h-3 text-accent-amber" />
                    E-posta Adresi
                  </Label>
                  <Input
                    {...form.register("email")}
                    type="email"
                    placeholder="ornek@firma.com"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 text-sm h-9 rounded-xl"
                    data-testid="input-ad-email"
                  />
                  {form.formState.errors.email && (
                    <p className="text-red-400 text-[10px]">{form.formState.errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label className="text-white/70 text-xs flex items-center gap-1.5">
                    <Building2 className="w-3 h-3 text-accent-amber" />
                    Firma / Kurum Adı
                  </Label>
                  <Input
                    {...form.register("company")}
                    placeholder="Firma Adı"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 text-sm h-9 rounded-xl"
                    data-testid="input-ad-company"
                  />
                  {form.formState.errors.company && (
                    <p className="text-red-400 text-[10px]">{form.formState.errors.company.message}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label className="text-white/70 text-xs flex items-center gap-1.5">
                    <MessageSquare className="w-3 h-3 text-accent-amber" />
                    Mesajınız
                  </Label>
                  <Textarea
                    {...form.register("message")}
                    placeholder="Reklam talebiniz hakkında detayları yazın..."
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 text-sm min-h-[80px] rounded-xl"
                    data-testid="input-ad-message"
                  />
                  {form.formState.errors.message && (
                    <p className="text-red-400 text-[10px]">{form.formState.errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full bg-accent-amber text-black hover:bg-yellow-400 font-semibold py-2 rounded-full transition-all flex items-center justify-center gap-2 text-sm"
                  data-testid="button-ad-submit"
                >
                  {mutation.isPending ? (
                    <span>Gönderiliyor...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Gönder</span>
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

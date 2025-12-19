import { useState } from "react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import MobileTabBar from "@/components/mobile-tab-bar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Ticket, User, Phone, Mail, Calendar, MapPin, Clock, CreditCard, CheckCircle2, ChevronLeft, Users, Info, Shield } from "lucide-react";
import { useForm } from "react-hook-form";

interface TicketFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  ticketCount: string;
}

export default function BiletAl() {
  const [, setLocation] = useLocation();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<TicketFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      ticketCount: "1",
    },
  });

  const handleSubmit = (data: TicketFormData) => {
    console.log("Ticket data:", data);
    setIsSuccess(true);
  };

  const ticketOptions = Array.from({ length: 10 }, (_, i) => i + 1);

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center pt-16 px-4">
          <div 
            className="w-full max-w-sm bg-black/80 backdrop-blur-xl border border-accent-amber/30 rounded-2xl p-6 text-center"
            style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
          >
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <h2 className="text-lg font-bold text-white mb-2">
              Bilet Talebiniz Alındı!
            </h2>
            <p className="text-accent-amber text-sm font-medium mb-3">
              Başarıyla iletildi
            </p>
            <p className="text-white/50 text-xs mb-6">
              En kısa sürede sizinle iletişime geçilecektir.
            </p>
            <button
              onClick={() => setLocation("/etkinlikler")}
              className="w-full bg-accent-amber text-black hover:bg-yellow-400 font-semibold py-2.5 rounded-full transition-all text-sm flex items-center justify-center gap-2"
              data-testid="button-back-to-events"
            >
              <ChevronLeft className="w-4 h-4" />
              Etkinliklere Dön
            </button>
          </div>
        </main>
        <MobileTabBar />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      <main className="flex-1 pt-16 pb-24 overflow-y-auto">
        <div 
          className="h-48 sm:h-56 bg-gradient-to-br from-purple-900/60 via-gray-900 to-black flex items-center justify-center relative"
          style={{
            backgroundImage: "linear-gradient(180deg, rgba(88,28,135,0.4) 0%, rgba(0,0,0,0.9) 100%)"
          }}
        >
          <div className="text-center px-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-purple-500/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-3 border border-purple-400/20">
              <Calendar className="w-8 h-8 sm:w-10 sm:h-10 text-purple-300" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white mb-1" data-testid="event-detail-title">
              Etkinlik Başlığı
            </h1>
            <p className="text-white/50 text-sm">Kategori</p>
          </div>
          
          <button
            onClick={() => setLocation("/etkinlikler")}
            className="absolute top-4 left-4 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white transition-all border border-white/10"
            data-testid="button-go-back"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        <div className="container mx-auto px-4 -mt-6">
          <div 
            className="bg-black/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
            style={{ boxShadow: "0 -10px 40px rgba(0,0,0,0.5)" }}
          >
            <div className="p-4 border-b border-white/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-sm text-white/60">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-accent-amber" />
                    <span data-testid="event-detail-date">— — ——</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-accent-amber" />
                    <span data-testid="event-detail-time">—:—</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-white/40">Bilet Fiyatı</p>
                  <p className="text-lg font-bold text-accent-amber" data-testid="event-detail-price">— ₺</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-sm text-white/60">
                <MapPin className="w-3.5 h-3.5 text-accent-amber" />
                <span data-testid="event-detail-location">Konum Bilgisi</span>
              </div>
            </div>

            <form onSubmit={form.handleSubmit(handleSubmit)} className="p-4 space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Ticket className="w-4 h-4 text-accent-amber" />
                <h3 className="text-sm font-semibold text-white">Bilet Bilgileri</h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-white/70 text-xs flex items-center gap-1">
                    <User className="w-3 h-3 text-accent-amber" />
                    Ad
                  </Label>
                  <Input
                    {...form.register("firstName", { required: true })}
                    placeholder="Adınız"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 text-sm h-9 rounded-xl"
                    data-testid="input-ticket-firstname"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-white/70 text-xs">Soyad</Label>
                  <Input
                    {...form.register("lastName", { required: true })}
                    placeholder="Soyadınız"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 text-sm h-9 rounded-xl"
                    data-testid="input-ticket-lastname"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-white/70 text-xs flex items-center gap-1">
                  <Phone className="w-3 h-3 text-accent-amber" />
                  Telefon
                </Label>
                <Input
                  {...form.register("phone", { required: true })}
                  type="tel"
                  placeholder="0532 xxx xx xx"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 text-sm h-9 rounded-xl"
                  data-testid="input-ticket-phone"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-white/70 text-xs flex items-center gap-1">
                  <Mail className="w-3 h-3 text-accent-amber" />
                  E-posta
                </Label>
                <Input
                  {...form.register("email", { required: true })}
                  type="email"
                  placeholder="ornek@email.com"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 text-sm h-9 rounded-xl"
                  data-testid="input-ticket-email"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-white/70 text-xs flex items-center gap-1">
                  <Users className="w-3 h-3 text-accent-amber" />
                  Bilet Adedi
                </Label>
                <Select defaultValue="1" onValueChange={(val) => form.setValue("ticketCount", val)}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white text-sm h-9 rounded-xl" data-testid="select-ticket-count">
                    <SelectValue placeholder="Bilet adedi" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-white/10">
                    {ticketOptions.map((num) => (
                      <SelectItem key={num} value={num.toString()} className="text-white hover:bg-white/10">
                        {num} Bilet
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-3 border-t border-white/5">
                <div className="flex items-start gap-2 p-3 rounded-xl bg-white/5 border border-white/5">
                  <Info className="w-4 h-4 text-accent-amber flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] text-white/70 font-medium mb-1">Kurallar</p>
                    <ul className="text-[10px] text-white/50 space-y-0.5">
                      <li>• Biletler iade edilemez</li>
                      <li>• Etkinlik saatinden 30 dk önce mekanınızda olunuz</li>
                      <li>• Kimlik ibrazı zorunludur</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[10px] text-white/40">
                <Shield className="w-3 h-3" />
                <span>256-bit SSL güvenlik ile korunmaktadır</span>
              </div>
            </form>
          </div>
        </div>
      </main>

      <div 
        className="fixed bottom-0 left-0 right-0 z-40 md:relative md:z-0"
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.95) 30%)",
          paddingBottom: "env(safe-area-inset-bottom)"
        }}
      >
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-[10px] text-white/40">Toplam Tutar</p>
              <p className="text-xl font-bold text-accent-amber" data-testid="ticket-total-price">— ₺</p>
            </div>
            <button
              onClick={form.handleSubmit(handleSubmit)}
              className="bg-accent-amber text-black hover:bg-yellow-400 font-semibold py-3 px-8 rounded-full transition-all text-sm flex items-center gap-2"
              data-testid="button-ticket-submit"
            >
              <CreditCard className="w-4 h-4" />
              Satın Al
            </button>
          </div>
        </div>
      </div>

      <div className="hidden md:block">
        <MobileTabBar />
      </div>
    </div>
  );
}

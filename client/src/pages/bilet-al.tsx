import { useState } from "react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Ticket, User, Phone, Mail, Calendar, MapPin, Clock, CreditCard, CheckCircle2, ChevronLeft, Users } from "lucide-react";
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
      <div className="min-h-screen bg-spotify-black text-white">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-lg">
            <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-accent-amber/40 rounded-2xl p-8 md:p-12 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-14 h-14 text-green-500" />
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Bilet Talebiniz Alındı!
              </h2>
              <p className="text-accent-amber font-semibold mb-4">
                Talebiniz başarıyla iletildi
              </p>
              <p className="text-gray-400 text-sm mb-8">
                En kısa sürede sizinle iletişime geçilecek ve ödeme bilgileri paylaşılacaktır.
              </p>
              <Button
                onClick={() => setLocation("/etkinlikler")}
                className="bg-accent-amber text-black hover:bg-yellow-400 font-bold px-8 py-3 rounded-full"
                data-testid="button-back-to-events"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Etkinliklere Dön
              </Button>
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
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              onClick={() => setLocation("/etkinlikler")}
              className="text-gray-400 hover:text-white mb-6"
              data-testid="button-go-back"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Etkinliklere Dön
            </Button>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-gray-700">
                <div className="h-48 md:h-64 bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-gray-600/50 flex items-center justify-center">
                    <Calendar className="w-10 h-10 text-gray-500" />
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <h2 className="text-2xl font-bold text-white" data-testid="event-detail-title">
                    Etkinlik Başlığı
                  </h2>
                  
                  <div className="space-y-3 text-gray-400">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-accent-amber" />
                      <span data-testid="event-detail-date">— — ——</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-accent-amber" />
                      <span data-testid="event-detail-time">—:—</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-accent-amber" />
                      <span data-testid="event-detail-location">Konum Bilgisi</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-700">
                    <p className="text-gray-500 text-sm">Bilet Fiyatı</p>
                    <p className="text-3xl font-bold text-accent-amber" data-testid="event-detail-price">— ₺</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-accent-amber/40 rounded-2xl p-6 md:p-8">
                <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
                  <Ticket className="w-6 h-6 text-accent-amber" />
                  Bilet Bilgileri
                </h3>

                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label className="text-white flex items-center gap-2">
                        <User className="w-4 h-4 text-accent-amber" />
                        Ad
                      </Label>
                      <Input
                        {...form.register("firstName", { required: true })}
                        placeholder="Adınız"
                        className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500"
                        data-testid="input-ticket-firstname"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Soyad</Label>
                      <Input
                        {...form.register("lastName", { required: true })}
                        placeholder="Soyadınız"
                        className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500"
                        data-testid="input-ticket-lastname"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white flex items-center gap-2">
                      <Phone className="w-4 h-4 text-accent-amber" />
                      Telefon Numarası
                    </Label>
                    <Input
                      {...form.register("phone", { required: true })}
                      type="tel"
                      placeholder="0532 xxx xx xx"
                      className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500"
                      data-testid="input-ticket-phone"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white flex items-center gap-2">
                      <Mail className="w-4 h-4 text-accent-amber" />
                      E-posta
                    </Label>
                    <Input
                      {...form.register("email", { required: true })}
                      type="email"
                      placeholder="ornek@email.com"
                      className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500"
                      data-testid="input-ticket-email"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white flex items-center gap-2">
                      <Users className="w-4 h-4 text-accent-amber" />
                      Bilet Adedi
                    </Label>
                    <Select defaultValue="1" onValueChange={(val) => form.setValue("ticketCount", val)}>
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white" data-testid="select-ticket-count">
                        <SelectValue placeholder="Bilet adedi" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        {ticketOptions.map((num) => (
                          <SelectItem key={num} value={num.toString()} className="text-white hover:bg-gray-700">
                            {num} Bilet
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-4 border-t border-gray-700 space-y-3">
                    <div className="flex justify-between text-gray-400">
                      <span>Bilet Fiyatı</span>
                      <span data-testid="ticket-unit-price">— ₺</span>
                    </div>
                    <div className="flex justify-between text-white text-lg font-bold">
                      <span>Toplam</span>
                      <span className="text-accent-amber" data-testid="ticket-total-price">— ₺</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-accent-amber text-black hover:bg-yellow-400 font-bold py-3 rounded-full transition-all flex items-center justify-center gap-2 mt-4"
                    data-testid="button-ticket-submit"
                  >
                    <CreditCard className="w-5 h-5" />
                    Bilet Talebini Gönder
                  </Button>

                  <p className="text-gray-500 text-xs text-center mt-4">
                    Talebiniz alındıktan sonra ödeme bilgileri tarafınıza iletilecektir.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

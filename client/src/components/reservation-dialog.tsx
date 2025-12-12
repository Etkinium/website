import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { UtensilsCrossed, User, Users, Phone, Calendar, Clock, CheckCircle2, Send } from "lucide-react";

interface ReservationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  restaurantName?: string;
}

interface ReservationFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: string;
  notes: string;
}

export default function ReservationDialog({ isOpen, onClose, restaurantName = "Restoran" }: ReservationDialogProps) {
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ReservationFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      date: "",
      time: "",
      guests: "2",
      notes: "",
    },
  });

  const handleSubmit = (data: ReservationFormData) => {
    console.log("Reservation data:", data);
    setIsSuccess(true);
    setTimeout(() => {
      onClose();
      setIsSuccess(false);
      form.reset();
    }, 3000);
  };

  const guestOptions = Array.from({ length: 20 }, (_, i) => i + 1);
  const timeOptions = [
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", 
    "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-accent-amber/40 max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        {isSuccess ? (
          <div className="py-12 text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center animate-pulse">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">Rezervasyon Alındı!</h3>
              <p className="text-accent-amber font-semibold">
                Talebiniz başarıyla iletildi
              </p>
              <p className="text-gray-400 text-sm">
                En kısa sürede sizinle iletişime geçilecektir.
              </p>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-center text-xl md:text-2xl font-bold text-white flex items-center justify-center gap-2">
                <UtensilsCrossed className="w-6 h-6 text-accent-amber" />
                <span>Rezervasyon Yap</span>
              </DialogTitle>
              <p className="text-center text-gray-400 text-sm mt-2">{restaurantName}</p>
            </DialogHeader>

            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-4">
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
                    data-testid="input-reservation-firstname"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Soyad</Label>
                  <Input
                    {...form.register("lastName", { required: true })}
                    placeholder="Soyadınız"
                    className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500"
                    data-testid="input-reservation-lastname"
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
                  data-testid="input-reservation-phone"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">E-posta (Opsiyonel)</Label>
                <Input
                  {...form.register("email")}
                  type="email"
                  placeholder="ornek@email.com"
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500"
                  data-testid="input-reservation-email"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-accent-amber" />
                    Tarih
                  </Label>
                  <Input
                    {...form.register("date", { required: true })}
                    type="date"
                    className="bg-gray-800 border-gray-600 text-white"
                    data-testid="input-reservation-date"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-accent-amber" />
                    Saat
                  </Label>
                  <Select onValueChange={(val) => form.setValue("time", val)}>
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white" data-testid="select-reservation-time">
                      <SelectValue placeholder="Saat seçin" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      {timeOptions.map((time) => (
                        <SelectItem key={time} value={time} className="text-white hover:bg-gray-700">
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-accent-amber" />
                  Kişi Sayısı
                </Label>
                <Select defaultValue="2" onValueChange={(val) => form.setValue("guests", val)}>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white" data-testid="select-reservation-guests">
                    <SelectValue placeholder="Kişi sayısı" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    {guestOptions.map((num) => (
                      <SelectItem key={num} value={num.toString()} className="text-white hover:bg-gray-700">
                        {num} Kişi
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Özel İstekler (Opsiyonel)</Label>
                <Input
                  {...form.register("notes")}
                  placeholder="Özel istek veya not..."
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500"
                  data-testid="input-reservation-notes"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-accent-amber text-black hover:bg-yellow-400 font-bold py-3 rounded-full transition-all flex items-center justify-center gap-2 mt-6"
                data-testid="button-reservation-submit"
              >
                <Send className="w-4 h-4" />
                Rezervasyon Yap
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

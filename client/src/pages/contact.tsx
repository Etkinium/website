import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest } from "@/lib/queryClient";
import { insertContactMessageSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CheckCircle, Loader2, Mail, Phone, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/header";
import Footer from "@/components/footer";
import MobileTabBar from "@/components/mobile-tab-bar";
import type { z } from "zod";

type ContactFormData = z.infer<typeof insertContactMessageSchema>;

export default function Contact() {
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: (data) => {
      setIsSuccess(true);
      form.reset();
      toast({
        title: "Mesaj Gönderildi!",
        description: data.message,
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

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-black text-white pb-20 md:pb-0">
        <Header />
        
        <section className="py-24 mt-16">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto text-center">
              <div 
                className="p-8 rounded-2xl"
                style={{
                  background: "linear-gradient(145deg, rgba(245,158,11,0.15) 0%, rgba(0,0,0,0.9) 100%)",
                  border: "1px solid rgba(245,158,11,0.3)"
                }}
              >
                <div className="w-16 h-16 rounded-full bg-accent-amber/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="text-accent-amber w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-accent-amber mb-3">Mesajınız Gönderildi!</h2>
                <p className="text-white/60 mb-6">
                  Mesajınız başarıyla alındı. En kısa sürede size dönüş yapacağız.
                </p>
                <Button 
                  onClick={() => setIsSuccess(false)}
                  className="bg-accent-amber hover:bg-yellow-500 text-black font-semibold"
                >
                  Yeni Mesaj Gönder
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
        <MobileTabBar />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20 md:pb-0">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
              <span className="text-white">Bizimle</span>
              <span className="text-accent-amber ml-2">İletişime Geçin</span>
            </h1>
            <p className="text-white/60 max-w-lg mx-auto text-sm sm:text-base">
              Sorularınız, önerileriniz veya iş birliği teklifleriniz için bize ulaşın.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-6">
            
            {/* Contact Info Cards */}
            <div className="md:col-span-2 space-y-4">
              <div 
                className="p-4 rounded-xl"
                style={{
                  background: "linear-gradient(145deg, rgba(245,158,11,0.1) 0%, rgba(0,0,0,0.8) 100%)",
                  border: "1px solid rgba(245,158,11,0.2)"
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-accent-amber/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-accent-amber" />
                  </div>
                  <div>
                    <p className="text-white/50 text-xs">E-posta</p>
                    <a 
                      href="mailto:iletisim@etkinium.com" 
                      className="text-white hover:text-accent-amber transition-colors font-medium text-sm"
                    >
                      iletisim@etkinium.com
                    </a>
                  </div>
                </div>
              </div>

              <div 
                className="p-4 rounded-xl"
                style={{
                  background: "linear-gradient(145deg, rgba(245,158,11,0.1) 0%, rgba(0,0,0,0.8) 100%)",
                  border: "1px solid rgba(245,158,11,0.2)"
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-accent-amber/20 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-accent-amber" />
                  </div>
                  <div>
                    <p className="text-white/50 text-xs">Telefon</p>
                    <a 
                      href="tel:08503077019" 
                      className="text-white hover:text-accent-amber transition-colors font-medium text-sm"
                    >
                      0850 307 7019
                    </a>
                  </div>
                </div>
              </div>

              <div 
                className="p-4 rounded-xl"
                style={{
                  background: "linear-gradient(145deg, rgba(245,158,11,0.1) 0%, rgba(0,0,0,0.8) 100%)",
                  border: "1px solid rgba(245,158,11,0.2)"
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent-amber/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-accent-amber" />
                  </div>
                  <div>
                    <p className="text-white/50 text-xs mb-1">Adres</p>
                    <p className="text-white text-sm leading-relaxed">
                      Dikilitaş Mah. Ayazmaderesi Cad. No:6/1 İç Kapı No:9 Beşiktaş/ İstanbul
                    </p>
                  </div>
                </div>
              </div>

              <div 
                className="p-4 rounded-xl"
                style={{
                  background: "linear-gradient(145deg, rgba(245,158,11,0.1) 0%, rgba(0,0,0,0.8) 100%)",
                  border: "1px solid rgba(245,158,11,0.2)"
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent-amber/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-accent-amber" />
                  </div>
                  <div>
                    <p className="text-white/50 text-xs">Çalışma Saatleri</p>
                    <p className="text-white font-medium text-sm">Pazartesi - Cuma: 09:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-3">
              <div 
                className="p-5 sm:p-6 rounded-2xl"
                style={{
                  background: "linear-gradient(145deg, rgba(20,20,20,0.9) 0%, rgba(0,0,0,0.95) 100%)",
                  border: "1px solid rgba(245,158,11,0.2)"
                }}
              >
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-accent-amber" />
                  Mesaj Gönderin
                </h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/70 text-xs">Ad</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Adınız" 
                                {...field}
                                className="bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-600 focus:border-accent-amber h-9 text-sm"
                                disabled={contactMutation.isPending}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/70 text-xs">Soyad</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Soyadınız" 
                                {...field}
                                className="bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-600 focus:border-accent-amber h-9 text-sm"
                                disabled={contactMutation.isPending}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/70 text-xs">E-posta</FormLabel>
                            <FormControl>
                              <Input 
                                type="email"
                                placeholder="ornek@email.com" 
                                {...field}
                                className="bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-600 focus:border-accent-amber h-9 text-sm"
                                disabled={contactMutation.isPending}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/70 text-xs">Telefon</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="05XX XXX XX XX" 
                                {...field}
                                className="bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-600 focus:border-accent-amber h-9 text-sm"
                                disabled={contactMutation.isPending}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/70 text-xs">Mesajınız</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Mesajınızı buraya yazın..." 
                              {...field}
                              rows={4}
                              className="bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-600 focus:border-accent-amber resize-none text-sm"
                              disabled={contactMutation.isPending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      disabled={contactMutation.isPending}
                      className="w-full bg-gradient-to-r from-accent-amber to-yellow-500 hover:from-yellow-500 hover:to-accent-amber text-black font-bold py-5 rounded-xl transition-all"
                      style={{
                        boxShadow: "0 4px 20px rgba(245,158,11,0.3)"
                      }}
                    >
                      {contactMutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Gönderiliyor...
                        </>
                      ) : (
                        "Mesaj Gönder"
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <MobileTabBar />
    </div>
  );
}

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
import { Mail, Phone, MapPin, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/header";
import Footer from "@/components/footer";
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
      <div className="min-h-screen bg-spotify-black text-white">
        <Header />
        
        <section className="py-32 mt-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="p-8 bg-green-900/30 border border-green-500/30 rounded-xl animate-slide-in">
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <CheckCircle className="text-green-400 w-12 h-12" />
                </div>
                <h2 className="text-3xl font-bold text-green-400 mb-4">Mesajınız Gönderildi!</h2>
                <p className="text-green-300 mb-6">
                  Mesajınız başarıyla alındı. En kısa sürede size dönüş yapacağız.
                </p>
                <Button 
                  onClick={() => setIsSuccess(false)}
                  variant="outline"
                  className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                >
                  Yeni Mesaj Gönder
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 mt-16 bg-gradient-to-br from-spotify-black via-gray-900 to-spotify-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="text-white">Bizimle</span>
              <span className="text-accent-amber ml-4">İletişime Geçin!</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Sorularınız, önerileriniz veya iş birliği teklifleriniz için bize ulaşın.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="bg-gray-800 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Lütfen Mesajınızı Yazınız</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ad</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Adınız" 
                              {...field}
                              className="bg-gray-700 border-gray-600 text-white"
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
                          <FormLabel>Soyad</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Soyadınız" 
                              {...field}
                              className="bg-gray-700 border-gray-600 text-white"
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-posta</FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="ornek@email.com" 
                            {...field}
                            className="bg-gray-700 border-gray-600 text-white"
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
                        <FormLabel>Telefon</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Telefon numaranız" 
                            {...field}
                            className="bg-gray-700 border-gray-600 text-white"
                            disabled={contactMutation.isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mesaj</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Mesajınızı buraya yazın..." 
                            className="bg-gray-700 border-gray-600 text-white resize-none min-h-[120px]"
                            {...field}
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
                    className="w-full bg-black text-white font-bold py-4 px-8 rounded-full hover:bg-accent-amber hover:text-black transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed h-auto border-2 border-gray-600 hover:border-accent-amber"
                  >
                    {contactMutation.isPending ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Gönderiliyor...
                      </>
                    ) : (
                      "Formu Gönder"
                    )}
                  </Button>
                </form>
              </Form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">İletişim Bilgileri</h2>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-accent-amber/20 rounded-lg flex items-center justify-center">
                      <Mail className="text-accent-amber w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">E-posta</h3>
                      <p className="text-gray-400">iletisim@etkinium.com</p>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
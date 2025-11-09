import { useEffect } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

const signupSchema = z.object({
  firstName: z.string().min(1, "İsim gerekli"),
  lastName: z.string().min(1, "Soyisim gerekli"),
  email: z.string().email("Lütfen geçerli bir e-posta adresi girin"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalı"),
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function Signup() {
  const [, setLocation] = useLocation();
  const { user, isLoading } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading && user) {
      setLocation("/");
    }
  }, [user, isLoading, setLocation]);

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const signupMutation = useMutation({
    mutationFn: async (data: SignupFormData) => {
      const res = await apiRequest("POST", "/api/register", data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      toast({
        title: "Hoş Geldiniz!",
        description: "Hesabınız oluşturuldu ve giriş yaptınız",
      });
      setLocation("/");
    },
    onError: (error: any) => {
      toast({
        title: "Hata",
        description: error.message || "Kayıt sırasında bir hata oluştu",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: SignupFormData) => {
    signupMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-spotify-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent-amber border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <Header />
      
      <main className="pt-24 md:pt-32 pb-12 md:pb-20">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-gray-900/50 rounded-lg p-4 sm:p-6 md:p-8 border border-gray-800">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-center">
                <span className="text-white">ETKİNİUM'e</span>
                <span className="text-accent-amber ml-2">Katılın</span>
              </h1>
              
              <p className="text-sm sm:text-base text-gray-300 text-center mb-6 md:mb-8">
                Hemen üye olun ve 100 puan kazanın
              </p>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">İsim</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Lütfen isim giriniz"
                            className="bg-gray-800 border-gray-700 text-white focus:border-accent-amber"
                            data-testid="input-firstName"
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
                        <FormLabel className="text-white">Soyisim</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Lütfen soyisim giriniz"
                            className="bg-gray-800 border-gray-700 text-white focus:border-accent-amber"
                            data-testid="input-lastName"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Mail Adresi</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="Lütfen mail giriniz"
                            className="bg-gray-800 border-gray-700 text-white focus:border-accent-amber"
                            data-testid="input-email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Parola Oluştur</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="Lütfen şifre oluşturunuz"
                            className="bg-gray-800 border-gray-700 text-white focus:border-accent-amber"
                            data-testid="input-password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={signupMutation.isPending}
                    className="w-full bg-black hover:bg-accent-amber text-white hover:text-black transition-all py-5 sm:py-6 text-base sm:text-lg font-semibold"
                    data-testid="button-signup"
                  >
                    {signupMutation.isPending ? "Hesap oluşturuluyor..." : "Hesap Oluştur"}
                  </Button>
                </form>
              </Form>

              <div className="mt-4 sm:mt-6 text-center">
                <p className="text-sm sm:text-base text-gray-400">
                  Zaten hesabınız var mı?{" "}
                  <a href="/login" className="text-accent-amber hover:underline">
                    Giriş Yap
                  </a>
                </p>
              </div>

              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <p className="text-xs sm:text-sm text-gray-400 text-center">
                  Üye olarak{" "}
                  <a href="/kullanim-kosullari" className="text-accent-amber hover:underline">
                    Kullanım Koşulları
                  </a>
                  {" "}ve{" "}
                  <a href="/gizlilik-politikasi" className="text-accent-amber hover:underline">
                    Gizlilik Politikası
                  </a>
                  'nı kabul etmiş olursunuz.
                </p>
              </div>

              <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-400">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-accent-amber flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Ücretsiz hesap oluşturma</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-400">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-accent-amber flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>100 hoşgeldin puanı hediye</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-400">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-accent-amber flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Özel kampanya ve fırsatlar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

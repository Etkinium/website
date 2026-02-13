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
                Hemen üye olun, ayrıcalıklı dünyaya adım atın
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

              <div className="mt-4 sm:mt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 h-px bg-gray-700" />
                  <span className="text-xs text-gray-500">veya</span>
                  <div className="flex-1 h-px bg-gray-700" />
                </div>

                <div className="space-y-2.5">
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-3 py-3 rounded-lg bg-white hover:bg-gray-100 text-black font-medium text-sm transition-all"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Google ile Devam Et
                  </button>

                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-3 py-3 rounded-lg bg-black hover:bg-gray-900 text-white font-medium text-sm transition-all border border-gray-700 hover:border-gray-600"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                    </svg>
                    Apple ile Devam Et
                  </button>
                </div>
              </div>

              <div className="mt-4 sm:mt-5 text-center">
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
                  <span>Güvenli bilet ve rezervasyon</span>
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

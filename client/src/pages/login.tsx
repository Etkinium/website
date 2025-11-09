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
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

const loginSchema = z.object({
  email: z.string().email("Lütfen geçerli bir e-posta adresi girin"),
  password: z.string().min(1, "Şifre gerekli"),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const [, setLocation] = useLocation();
  const { user, isLoading } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading && user) {
      setLocation("/");
    }
  }, [user, isLoading, setLocation]);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      return await apiRequest("/api/login", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      toast({
        title: "Başarılı!",
        description: "Giriş yapıldı",
      });
      setLocation("/");
    },
    onError: (error: any) => {
      toast({
        title: "Hata",
        description: error.message || "Giriş yapılırken bir hata oluştu",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
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
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-gray-900/50 rounded-lg p-6 md:p-8 border border-gray-800">
              <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">
                <span className="text-white">ETKİNİUM'e</span>
                <span className="text-accent-amber ml-2">Hoş Geldiniz</span>
              </h1>
              
              <p className="text-gray-300 text-center mb-8">
                Hesabınıza giriş yapın
              </p>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                            placeholder="ornek@email.com"
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
                        <FormLabel className="text-white">Şifre</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="••••••••"
                            className="bg-gray-800 border-gray-700 text-white focus:border-accent-amber"
                            data-testid="input-password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border-gray-700 data-[state=checked]:bg-accent-amber data-[state=checked]:border-accent-amber"
                            data-testid="checkbox-remember"
                          />
                        </FormControl>
                        <FormLabel className="text-sm text-gray-300 font-normal cursor-pointer">
                          Beni hatırla
                        </FormLabel>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={loginMutation.isPending}
                    className="w-full bg-black hover:bg-accent-amber text-white hover:text-black transition-all py-6 text-lg font-semibold"
                    data-testid="button-login"
                  >
                    {loginMutation.isPending ? "Giriş yapılıyor..." : "Giriş Yap"}
                  </Button>
                </form>
              </Form>

              <div className="mt-6 text-center">
                <p className="text-gray-400">
                  Hesabınız yok mu?{" "}
                  <a href="/signup" className="text-accent-amber hover:underline">
                    Üye Ol
                  </a>
                </p>
              </div>

              <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <p className="text-xs text-gray-400 text-center">
                  Giriş yaparak{" "}
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
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

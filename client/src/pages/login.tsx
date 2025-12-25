import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Eye, EyeOff, User, Building2 } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("user");

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
      const res = await apiRequest("POST", "/api/login", data);
      return await res.json();
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

  const businessLoginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const res = await apiRequest("POST", "/api/login", data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      toast({
        title: "Başarılı!",
        description: "İşletme girişi yapıldı",
      });
      setLocation("/business-dashboard");
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

  const onBusinessSubmit = (data: LoginFormData) => {
    businessLoginMutation.mutate(data);
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
                <span className="text-accent-amber ml-2">Hoş Geldiniz</span>
              </h1>
              
              <p className="text-sm sm:text-base text-gray-300 text-center mb-6 md:mb-8">
                Hesabınıza giriş yapın
              </p>

              <Tabs defaultValue="user" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-gray-800 border border-gray-700 mb-6">
                  <TabsTrigger 
                    value="user" 
                    className="flex items-center gap-2 data-[state=active]:bg-accent-amber data-[state=active]:text-black"
                    data-testid="tab-user-login"
                  >
                    <User className="w-4 h-4" />
                    Kullanıcı
                  </TabsTrigger>
                  <TabsTrigger 
                    value="business" 
                    className="flex items-center gap-2 data-[state=active]:bg-accent-amber data-[state=active]:text-black"
                    data-testid="tab-business-login"
                  >
                    <Building2 className="w-4 h-4" />
                    İşletme
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="user">
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
                              <div className="relative">
                                <Input
                                  {...field}
                                  type={showPassword ? "text" : "password"}
                                  placeholder="••••••••"
                                  className="bg-gray-800 border-gray-700 text-white focus:border-accent-amber pr-10"
                                  data-testid="input-password"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-accent-amber transition-colors"
                                  data-testid="button-toggle-password"
                                >
                                  {showPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                  ) : (
                                    <Eye className="w-5 h-5" />
                                  )}
                                </button>
                              </div>
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
                        className="w-full bg-accent-amber hover:bg-yellow-500 text-black font-bold transition-all py-5 sm:py-6 text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        data-testid="button-login"
                      >
                        {loginMutation.isPending ? "Giriş yapılıyor..." : "Giriş Yap"}
                      </Button>
                    </form>
                  </Form>

                  <div className="mt-4 sm:mt-6 text-center">
                    <p className="text-sm sm:text-base text-gray-400">
                      Hesabınız yok mu?{" "}
                      <a href="/signup" className="text-accent-amber hover:underline">
                        Üye Ol
                      </a>
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="business">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onBusinessSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">İşletme Mail Adresi</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="email"
                                placeholder="isletme@firma.com"
                                className="bg-gray-800 border-gray-700 text-white focus:border-accent-amber"
                                data-testid="input-business-email"
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
                              <div className="relative">
                                <Input
                                  {...field}
                                  type={showPassword ? "text" : "password"}
                                  placeholder="••••••••"
                                  className="bg-gray-800 border-gray-700 text-white focus:border-accent-amber pr-10"
                                  data-testid="input-business-password"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-accent-amber transition-colors"
                                  data-testid="button-toggle-business-password"
                                >
                                  {showPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                  ) : (
                                    <Eye className="w-5 h-5" />
                                  )}
                                </button>
                              </div>
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
                                data-testid="checkbox-business-remember"
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
                        disabled={businessLoginMutation.isPending}
                        className="w-full bg-accent-amber hover:bg-yellow-500 text-black font-bold transition-all py-5 sm:py-6 text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        data-testid="button-business-login"
                      >
                        {businessLoginMutation.isPending ? "Giriş yapılıyor..." : "İşletme Girişi"}
                      </Button>
                    </form>
                  </Form>

                  <div className="mt-4 sm:mt-6 text-center">
                    <p className="text-sm sm:text-base text-gray-400">
                      İşletme hesabınız yok mu?{" "}
                      <a href="/signup" className="text-accent-amber hover:underline">
                        İşletme Kaydı Oluştur
                      </a>
                    </p>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <p className="text-xs sm:text-sm text-gray-400 text-center">
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

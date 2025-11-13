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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

const profileUpdateSchema = z.object({
  email: z.string().email("Lütfen geçerli bir e-posta adresi girin"),
  phone: z.string().min(10, "Lütfen geçerli bir telefon numarası girin").optional().or(z.literal("")),
});

type ProfileUpdateData = z.infer<typeof profileUpdateSchema>;

export default function Profile() {
  const [, setLocation] = useLocation();
  const { user, isLoading } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading && !user) {
      setLocation("/login");
    }
  }, [user, isLoading, setLocation]);

  const form = useForm<ProfileUpdateData>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      email: user?.email || "",
      phone: user?.phone || "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        email: user.email,
        phone: user.phone || "",
      });
    }
  }, [user, form]);

  const updateMutation = useMutation({
    mutationFn: async (data: ProfileUpdateData) => {
      const payload: any = { email: data.email };
      if (data.phone && data.phone.trim() !== "") {
        payload.phone = data.phone;
      }
      const res = await apiRequest("PATCH", "/api/user/profile", payload);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      toast({
        title: "Başarılı!",
        description: "Profiliniz güncellendi",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Hata",
        description: error.message || "Profil güncellenirken bir hata oluştu",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ProfileUpdateData) => {
    updateMutation.mutate(data);
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

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <Header />
      
      <main className="pt-24 md:pt-32 pb-12 md:pb-20">
        <div className="container mx-auto px-3 sm:px-4 max-w-4xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8">
            <span className="text-white">Profilim</span>
          </h1>

          <div className="grid gap-4 sm:gap-6">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Hesap Bilgileri</CardTitle>
                <CardDescription className="text-gray-400">
                  Genel bilgileriniz
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-3">
                <div>
                  <p className="text-xs sm:text-sm text-gray-400">İsim Soyisim</p>
                  <p className="text-sm sm:text-base text-white font-medium">{user.firstName} {user.lastName}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-400">E-posta</p>
                  <p className="text-sm sm:text-base text-white font-medium break-all">{user.email}</p>
                </div>
                {user.phone && (
                  <div>
                    <p className="text-xs sm:text-sm text-gray-400">Telefon</p>
                    <p className="text-sm sm:text-base text-white font-medium">{user.phone}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gray-900/50 border-gray-800 mt-4 sm:mt-6">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg text-white">Profil Güncelle</CardTitle>
              <CardDescription className="text-xs sm:text-sm text-gray-400">
                E-posta adresinizi veya telefon numaranızı güncelleyin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
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
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Telefon Numarası</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="tel"
                            placeholder="05XX XXX XX XX"
                            className="bg-gray-800 border-gray-700 text-white focus:border-accent-amber"
                            data-testid="input-phone"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={updateMutation.isPending}
                    className="w-full bg-black hover:bg-accent-amber text-white hover:text-black transition-all py-5 sm:py-6 text-sm sm:text-base"
                    data-testid="button-update-profile"
                  >
                    {updateMutation.isPending ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}

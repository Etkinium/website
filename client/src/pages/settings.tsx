import { useEffect } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Bell } from "lucide-react";

const notificationSettingsSchema = z.object({
  smsNotifications: z.boolean(),
  emailNotifications: z.boolean(),
});

type NotificationSettingsData = z.infer<typeof notificationSettingsSchema>;

export default function Settings() {
  const [, setLocation] = useLocation();
  const { user, isLoading } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading && !user) {
      setLocation("/login");
    }
  }, [user, isLoading, setLocation]);

  const form = useForm<NotificationSettingsData>({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues: {
      smsNotifications: user?.smsNotifications || false,
      emailNotifications: user?.emailNotifications || true,
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        smsNotifications: user.smsNotifications,
        emailNotifications: user.emailNotifications,
      });
    }
  }, [user, form]);

  const updateMutation = useMutation({
    mutationFn: async (data: NotificationSettingsData) => {
      const res = await apiRequest("PATCH", "/api/user/profile", data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      toast({
        title: "Başarılı!",
        description: "Bildirim tercihlerin güncellendi",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Hata",
        description: error.message || "Ayarlar güncellenirken bir hata oluştu",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: NotificationSettingsData) => {
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
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            <span className="text-white">Ayarlar</span>
          </h1>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Bell className="h-5 w-5 text-accent-amber" />
                Bildirim Tercihleri
              </CardTitle>
              <CardDescription className="text-gray-400">
                Bildirim almak istediğiniz kanalları seçin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="emailNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-gray-700 p-4 bg-gray-800/50">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border-gray-600 data-[state=checked]:bg-accent-amber data-[state=checked]:border-accent-amber"
                            data-testid="checkbox-email"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-white font-medium cursor-pointer">
                            E-posta Bildirimleri
                          </FormLabel>
                          <FormDescription className="text-gray-400 text-sm">
                            Kampanyalar, etkinlikler ve özel fırsatlar hakkında e-posta bildirimleri almak istiyorum
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="smsNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-gray-700 p-4 bg-gray-800/50">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border-gray-600 data-[state=checked]:bg-accent-amber data-[state=checked]:border-accent-amber"
                            data-testid="checkbox-sms"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-white font-medium cursor-pointer">
                            SMS Bildirimleri
                          </FormLabel>
                          <FormDescription className="text-gray-400 text-sm">
                            Kampanyalar, etkinlikler ve özel fırsatlar hakkında SMS bildirimleri almak istiyorum
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={updateMutation.isPending}
                    className="w-full bg-black hover:bg-accent-amber text-white hover:text-black transition-all"
                    data-testid="button-save-settings"
                  >
                    {updateMutation.isPending ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 mt-6">
            <CardHeader>
              <CardTitle className="text-white">İletişim</CardTitle>
              <CardDescription className="text-gray-400">
                Bizimle iletişime geçin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <p className="text-sm text-gray-400 mb-2">E-posta</p>
                <a href="mailto:iletisim@etkinium.com" className="text-accent-amber hover:underline font-medium">
                  iletisim@etkinium.com
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}

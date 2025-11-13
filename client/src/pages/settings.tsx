import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Bell, Mail, MessageSquare, Newspaper, Lock, Eye, EyeOff } from "lucide-react";

const notificationSettingsSchema = z.object({
  smsNotifications: z.boolean(),
  emailNotifications: z.boolean(),
});

const passwordChangeSchema = z.object({
  currentPassword: z.string().min(1, "Mevcut şifre gerekli"),
  newPassword: z.string().min(6, "Yeni şifre en az 6 karakter olmalı"),
  confirmPassword: z.string().min(1, "Şifre tekrarı gerekli"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Şifreler eşleşmiyor",
  path: ["confirmPassword"],
});

type NotificationSettingsData = z.infer<typeof notificationSettingsSchema>;
type PasswordChangeData = z.infer<typeof passwordChangeSchema>;

export default function Settings() {
  const [, setLocation] = useLocation();
  const { user, isLoading } = useAuth();
  const { toast } = useToast();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      setLocation("/login");
    }
  }, [user, isLoading, setLocation]);

  const notificationForm = useForm<NotificationSettingsData>({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues: {
      smsNotifications: user?.smsNotifications || false,
      emailNotifications: user?.emailNotifications || true,
    },
  });

  const passwordForm = useForm<PasswordChangeData>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (user) {
      notificationForm.reset({
        smsNotifications: user.smsNotifications,
        emailNotifications: user.emailNotifications,
      });
    }
  }, [user, notificationForm]);

  const updateNotificationsMutation = useMutation({
    mutationFn: async (data: NotificationSettingsData) => {
      const res = await apiRequest("PATCH", "/api/user/profile", data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      toast({
        title: "Başarılı!",
        description: "Bildirim tercihleriniz güncellendi",
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

  const changePasswordMutation = useMutation({
    mutationFn: async (data: PasswordChangeData) => {
      const res = await apiRequest("POST", "/api/user/change-password", {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      return await res.json();
    },
    onSuccess: () => {
      passwordForm.reset();
      toast({
        title: "Başarılı!",
        description: "Şifreniz başarıyla değiştirildi",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Hata",
        description: error.message || "Şifre değiştirilirken bir hata oluştu",
        variant: "destructive",
      });
    },
  });

  const onNotificationSubmit = (data: NotificationSettingsData) => {
    updateNotificationsMutation.mutate(data);
  };

  const onPasswordSubmit = (data: PasswordChangeData) => {
    changePasswordMutation.mutate(data);
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
            <span className="text-white">Ayarlar</span>
          </h1>

          {/* BİLDİRİM TERCİHLERİ */}
          <Card className="bg-white border-gray-200 mb-6">
            <CardHeader className="border-b border-gray-200">
              <CardTitle className="text-lg md:text-xl text-gray-900 flex items-center gap-2">
                <Bell className="h-5 w-5 text-accent-amber" />
                Bildirim Tercihleri
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <Form {...notificationForm}>
                <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)} className="space-y-4">
                  <FormField
                    control={notificationForm.control}
                    name="emailNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between p-4 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-gray-600" />
                          <div>
                            <FormLabel className="text-base text-gray-900 font-normal cursor-pointer">
                              E-posta Bildirimleri
                            </FormLabel>
                            <p className="text-sm text-gray-500">
                              Etkinlik hatırlatıcıları ve kampanyalar
                            </p>
                          </div>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-accent-amber"
                            data-testid="switch-email"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={notificationForm.control}
                    name="smsNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between p-4 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <MessageSquare className="h-5 w-5 text-gray-600" />
                          <div>
                            <FormLabel className="text-base text-gray-900 font-normal cursor-pointer">
                              SMS Bildirimleri
                            </FormLabel>
                            <p className="text-sm text-gray-500">
                              Bilet bilgileri ve önemli duyurular
                            </p>
                          </div>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-accent-amber"
                            data-testid="switch-sms"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-row items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <Newspaper className="h-5 w-5 text-gray-600" />
                      <div>
                        <FormLabel className="text-base text-gray-900 font-normal">
                          E-Bülten Aboneliği
                        </FormLabel>
                        <p className="text-sm text-gray-500">
                          Kampanyalar ve özel teklifler
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={notificationForm.watch("emailNotifications")}
                      onCheckedChange={(checked) => notificationForm.setValue("emailNotifications", checked)}
                      className="data-[state=checked]:bg-accent-amber"
                      data-testid="switch-newsletter"
                    />
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={updateNotificationsMutation.isPending}
                      className="w-full bg-black hover:bg-accent-amber text-white hover:text-black transition-all py-6 text-base font-semibold"
                      data-testid="button-save-notifications"
                    >
                      {updateNotificationsMutation.isPending ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* ŞİFRE DEĞİŞTİR */}
          <Card className="bg-white border-gray-200">
            <CardHeader className="border-b border-gray-200">
              <CardTitle className="text-lg md:text-xl text-gray-900 flex items-center gap-2">
                <Lock className="h-5 w-5 text-accent-amber" />
                Şifre Değiştir
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <Form {...passwordForm}>
                <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                  <FormField
                    control={passwordForm.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900">Mevcut Şifre</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showCurrentPassword ? "text" : "password"}
                              placeholder="Mevcut şifreniz"
                              className="bg-gray-50 border-gray-300 text-gray-900 pr-10"
                              data-testid="input-current-password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-accent-amber transition-colors"
                            >
                              {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={passwordForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900">Yeni Şifre</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showNewPassword ? "text" : "password"}
                              placeholder="Yeni şifreniz (en az 6 karakter)"
                              className="bg-gray-50 border-gray-300 text-gray-900 pr-10"
                              data-testid="input-new-password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-accent-amber transition-colors"
                            >
                              {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={passwordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900">Yeni Şifre (Tekrar)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Yeni şifrenizi tekrar girin"
                              className="bg-gray-50 border-gray-300 text-gray-900 pr-10"
                              data-testid="input-confirm-password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-accent-amber transition-colors"
                            >
                              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={changePasswordMutation.isPending}
                      className="w-full bg-black hover:bg-accent-amber text-white hover:text-black transition-all py-6 text-base font-semibold"
                      data-testid="button-change-password"
                    >
                      {changePasswordMutation.isPending ? "Kaydediliyor..." : "Şifreyi Değiştir"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 mt-4 sm:mt-6">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg text-white">İletişim</CardTitle>
              <CardDescription className="text-xs sm:text-sm text-gray-400">
                Bizimle iletişime geçin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-800/50 rounded-lg p-3 sm:p-4 border border-gray-700">
                <p className="text-xs sm:text-sm text-gray-400 mb-2">E-posta</p>
                <a href="mailto:iletisim@etkinium.com" className="text-sm sm:text-base text-accent-amber hover:underline font-medium break-all">
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

import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import Header from "@/components/header";
import Footer from "@/components/footer";
import MobileTabBar from "@/components/mobile-tab-bar";
import SpinWheel from "@/components/spin-wheel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { 
  User, Settings, Bell, Ticket, Gift, Star, Mail, Phone, Trash2, 
  LogOut, ChevronRight, Crown, Zap, Shield, ArrowRight, Check, X
} from "lucide-react";

const profileUpdateSchema = z.object({
  firstName: z.string().min(2, "İsim en az 2 karakter olmalı"),
  lastName: z.string().min(2, "Soyisim en az 2 karakter olmalı"),
  email: z.string().email("Lütfen geçerli bir e-posta adresi girin"),
  phone: z.string().min(10, "Lütfen geçerli bir telefon numarası girin").optional().or(z.literal("")),
});

type ProfileUpdateData = z.infer<typeof profileUpdateSchema>;

const membershipTiers = [
  {
    name: "Etkinium Classic",
    points: 25000,
    price: 4999,
    icon: Star,
    color: "from-gray-400 to-gray-600",
    borderColor: "border-gray-500/50",
    benefits: ["Öncelikli bilet erişimi", "Ücretsiz iptal hakkı", "Özel indirimler"]
  },
  {
    name: "Etkinium Premium",
    points: 40000,
    price: 8999,
    icon: Crown,
    color: "from-accent-amber to-yellow-500",
    borderColor: "border-accent-amber/50",
    benefits: ["Tüm Classic avantajları", "VIP müşteri hizmetleri", "2x puan kazanımı", "Özel etkinlik davetiyeleri"]
  },
  {
    name: "Etkinium Business",
    points: 65000,
    price: 12999,
    icon: Zap,
    color: "from-purple-500 to-indigo-600",
    borderColor: "border-purple-500/50",
    benefits: ["Tüm Premium avantajları", "Kurumsal fatura", "Sınırsız iptal", "Özel hesap yöneticisi", "3x puan kazanımı"]
  }
];

export default function Profile() {
  const [, setLocation] = useLocation();
  const { user, isLoading } = useAuth();
  const { toast } = useToast();
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [canSpinWheel, setCanSpinWheel] = useState(true);
  const [lastSpinDate, setLastSpinDate] = useState<string | null>(null);
  const [showPointsModal, setShowPointsModal] = useState(false);
  const [showPriceInTL, setShowPriceInTL] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      setLocation("/login");
    }
  }, [user, isLoading, setLocation]);

  useEffect(() => {
    if (user) {
      setSmsNotifications(user.smsNotifications || false);
      setEmailNotifications(user.emailNotifications !== false);
      
      const storedSpinDate = localStorage.getItem(`lastSpin_${user.id}`);
      if (storedSpinDate) {
        setLastSpinDate(storedSpinDate);
        const lastSpin = new Date(storedSpinDate);
        const now = new Date();
        const daysSinceLastSpin = Math.floor((now.getTime() - lastSpin.getTime()) / (1000 * 60 * 60 * 24));
        setCanSpinWheel(daysSinceLastSpin >= 7);
      }
    }
  }, [user]);

  const form = useForm<ProfileUpdateData>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone || "",
      });
    }
  }, [user, form]);

  const updateMutation = useMutation({
    mutationFn: async (data: ProfileUpdateData) => {
      const res = await apiRequest("PATCH", "/api/user/profile", data);
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

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/logout");
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      setLocation("/");
      toast({
        title: "Çıkış yapıldı",
        description: "Başarıyla çıkış yaptınız",
      });
    },
  });

  const onSubmit = (data: ProfileUpdateData) => {
    updateMutation.mutate(data);
  };

  const handleSpinComplete = (result: string) => {
    const now = new Date().toISOString();
    if (user) {
      localStorage.setItem(`lastSpin_${user.id}`, now);
    }
    setLastSpinDate(now);
    
    if (result !== "retry") {
      setCanSpinWheel(false);
    }
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Hesap Silme",
      description: "Hesap silme işlemi için iletisim@etkinium.com adresine mail atınız.",
    });
    setShowDeleteConfirm(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
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
    <div className="min-h-screen bg-black text-white pb-20 md:pb-0">
      <Header />
      
      <main className="pt-20 md:pt-28 pb-12 md:pb-20">
        <div className="container mx-auto px-3 sm:px-4 max-w-5xl">
          {/* Profile Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-accent-amber to-yellow-500 flex items-center justify-center text-black font-bold text-2xl sm:text-3xl">
              {user.firstName[0]}{user.lastName[0]}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">{user.firstName} {user.lastName}</h1>
              <p className="text-white/50 text-sm">{user.email}</p>
            </div>
          </div>

          {/* Points Card - Black background with yellow interior */}
          <div 
            className="mb-6 rounded-xl overflow-hidden"
            style={{
              background: "linear-gradient(145deg, #000000 0%, #1a1a1a 100%)",
              border: "2px solid rgba(245,158,11,0.4)"
            }}
          >
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)"
                    }}
                  >
                    <Star className="w-7 h-7 text-black" />
                  </div>
                  <div>
                    <p className="text-accent-amber text-sm font-medium">Etkinium Puanlarınız</p>
                    <p className="text-3xl sm:text-4xl font-black text-accent-amber">{user.points || 0}</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <Button 
                    onClick={() => setShowPointsModal(true)}
                    className="bg-accent-amber hover:bg-yellow-500 text-black font-bold px-6"
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    Puanlarımı Gör
                  </Button>
                </div>
              </div>
              
              {/* Earned Points Section */}
              <div 
                className="mt-4 p-3 rounded-lg"
                style={{
                  background: "rgba(245,158,11,0.1)",
                  border: "1px solid rgba(245,158,11,0.2)"
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-accent-amber" />
                    <span className="text-white/70 text-sm">Kazanılan Puanlar (Bu Ay)</span>
                  </div>
                  <span className="text-accent-amber font-bold">+{Math.floor((user.points || 0) * 0.1)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-neutral-900 border border-neutral-800 mb-6">
              <TabsTrigger value="account" className="data-[state=active]:bg-accent-amber data-[state=active]:text-black text-xs sm:text-sm">
                <User className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Hesap</span>
              </TabsTrigger>
              <TabsTrigger value="wheel" className="data-[state=active]:bg-accent-amber data-[state=active]:text-black text-xs sm:text-sm">
                <Gift className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Çark</span>
              </TabsTrigger>
              <TabsTrigger value="events" className="data-[state=active]:bg-accent-amber data-[state=active]:text-black text-xs sm:text-sm">
                <Ticket className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Etkinlikler</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-accent-amber data-[state=active]:text-black text-xs sm:text-sm">
                <Settings className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Ayarlar</span>
              </TabsTrigger>
            </TabsList>

            {/* Account Tab */}
            <TabsContent value="account">
              <Card className="bg-neutral-900/50 border-neutral-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <User className="w-5 h-5 text-accent-amber" />
                    Bilgileri Güncelle
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Kişisel bilgilerinizi güncelleyin
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Ad</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  className="bg-neutral-800 border-neutral-700 text-white focus:border-accent-amber"
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
                              <FormLabel className="text-white">Soyad</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  className="bg-neutral-800 border-neutral-700 text-white focus:border-accent-amber"
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
                            <FormLabel className="text-white">E-posta</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="email"
                                className="bg-neutral-800 border-neutral-700 text-white focus:border-accent-amber"
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
                            <FormLabel className="text-white">Telefon</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="tel"
                                placeholder="05XX XXX XX XX"
                                className="bg-neutral-800 border-neutral-700 text-white focus:border-accent-amber"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        disabled={updateMutation.isPending}
                        className="w-full bg-accent-amber hover:bg-yellow-500 text-black font-semibold py-5"
                      >
                        {updateMutation.isPending ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Wheel Tab */}
            <TabsContent value="wheel">
              <Card className="bg-neutral-900/50 border-neutral-800">
                <CardHeader className="text-center">
                  <CardTitle className="text-white flex items-center justify-center gap-2">
                    <Gift className="w-5 h-5 text-accent-amber" />
                    Haftalık Şans Çarkı
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Haftada 1 kez çarkı çevirerek ödüller kazanın!
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center py-8">
                  <SpinWheel 
                    canSpin={canSpinWheel} 
                    onSpinComplete={handleSpinComplete}
                    lastSpinDate={lastSpinDate}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events">
              <Card className="bg-neutral-900/50 border-neutral-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Ticket className="w-5 h-5 text-accent-amber" />
                    Geçmiş Etkinliklerim
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Katıldığınız etkinlikler ve aldığınız biletler
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Ticket className="w-16 h-16 text-neutral-700 mx-auto mb-4" />
                    <p className="text-white/60 mb-2">Henüz bir etkinliğe katılmadınız</p>
                    <p className="text-white/40 text-sm mb-4">Etkinliklere göz atarak ilk biletinizi alın!</p>
                    <Link href="/etkinlikler">
                      <Button className="bg-accent-amber hover:bg-yellow-500 text-black font-semibold">
                        Etkinlikleri Keşfet
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-4">
              {/* Notification Preferences */}
              <Card className="bg-neutral-900/50 border-neutral-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Bell className="w-5 h-5 text-accent-amber" />
                    Bildirim Tercihleri
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-accent-amber" />
                      <div>
                        <p className="text-white font-medium">E-posta Bildirimleri</p>
                        <p className="text-white/50 text-sm">Kampanya ve etkinlik bilgileri</p>
                      </div>
                    </div>
                    <Switch 
                      checked={emailNotifications} 
                      onCheckedChange={setEmailNotifications}
                      className="data-[state=checked]:bg-accent-amber"
                    />
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-accent-amber" />
                      <div>
                        <p className="text-white font-medium">SMS Bildirimleri</p>
                        <p className="text-white/50 text-sm">Bilet ve rezervasyon hatırlatmaları</p>
                      </div>
                    </div>
                    <Switch 
                      checked={smsNotifications} 
                      onCheckedChange={setSmsNotifications}
                      className="data-[state=checked]:bg-accent-amber"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Contact & Support */}
              <Card className="bg-neutral-900/50 border-neutral-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Shield className="w-5 h-5 text-accent-amber" />
                    İletişim & Destek
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <a 
                    href="mailto:iletisim@etkinium.com"
                    className="flex items-center justify-between p-3 rounded-lg bg-neutral-800/50 hover:bg-neutral-800 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-accent-amber" />
                      <span className="text-white">iletisim@etkinium.com</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/50 group-hover:text-accent-amber transition-colors" />
                  </a>
                  <a 
                    href="tel:08503077019"
                    className="flex items-center justify-between p-3 rounded-lg bg-neutral-800/50 hover:bg-neutral-800 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-accent-amber" />
                      <span className="text-white">0850 307 7019</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/50 group-hover:text-accent-amber transition-colors" />
                  </a>
                </CardContent>
              </Card>

              {/* Account Actions */}
              <Card className="bg-neutral-900/50 border-neutral-800">
                <CardHeader>
                  <CardTitle className="text-white">Hesap İşlemleri</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    onClick={() => logoutMutation.mutate()}
                    variant="outline"
                    className="w-full justify-start bg-transparent border-neutral-700 text-white hover:bg-neutral-800 hover:text-white"
                  >
                    <LogOut className="w-5 h-5 mr-3 text-accent-amber" />
                    Çıkış Yap
                  </Button>
                  
                  {!showDeleteConfirm ? (
                    <Button
                      onClick={() => setShowDeleteConfirm(true)}
                      variant="outline"
                      className="w-full justify-start bg-transparent border-red-900/50 text-red-400 hover:bg-red-900/20 hover:text-red-300"
                    >
                      <Trash2 className="w-5 h-5 mr-3" />
                      Hesabı Sil
                    </Button>
                  ) : (
                    <div className="p-4 rounded-lg bg-red-900/20 border border-red-900/50">
                      <p className="text-red-400 text-sm mb-3">
                        Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
                      </p>
                      <div className="flex gap-2">
                        <Button
                          onClick={handleDeleteAccount}
                          size="sm"
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          Evet, Sil
                        </Button>
                        <Button
                          onClick={() => setShowDeleteConfirm(false)}
                          size="sm"
                          variant="outline"
                          className="border-neutral-700 text-white hover:bg-neutral-800"
                        >
                          İptal
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Points & Membership Modal */}
      <Dialog open={showPointsModal} onOpenChange={setShowPointsModal}>
        <DialogContent className="bg-black border border-neutral-800 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              <Crown className="w-7 h-7 text-accent-amber" />
              Puanlarım & Üyelik Seviyeleri
            </DialogTitle>
          </DialogHeader>

          {/* Current Points Display */}
          <div 
            className="p-4 rounded-xl mb-6"
            style={{
              background: "linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(0,0,0,0.8) 100%)",
              border: "1px solid rgba(245,158,11,0.3)"
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Mevcut Puanınız</p>
                <p className="text-3xl font-black text-accent-amber">{user.points || 0}</p>
              </div>
              <div className="text-right">
                <p className="text-white/60 text-sm">Hediye Çark Hakları</p>
                <p className="text-xl font-bold text-white">3</p>
              </div>
            </div>
          </div>

          {/* Toggle Button */}
          <div className="flex justify-center mb-6">
            <div 
              className="flex items-center p-1 rounded-full"
              style={{ background: "rgba(255,255,255,0.1)" }}
            >
              <button
                onClick={() => setShowPriceInTL(false)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  !showPriceInTL 
                    ? "bg-accent-amber text-black" 
                    : "text-white/60 hover:text-white"
                }`}
              >
                Puan ile
              </button>
              <button
                onClick={() => setShowPriceInTL(true)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  showPriceInTL 
                    ? "bg-accent-amber text-black" 
                    : "text-white/60 hover:text-white"
                }`}
              >
                TL ile
              </button>
            </div>
          </div>

          {/* Membership Tiers */}
          <div className="grid md:grid-cols-3 gap-4">
            {membershipTiers.map((tier, index) => {
              const IconComponent = tier.icon;
              const canAfford = showPriceInTL ? true : (user.points || 0) >= tier.points;
              
              return (
                <div 
                  key={index}
                  className={`relative p-5 rounded-xl transition-all hover:scale-[1.02] ${tier.borderColor}`}
                  style={{
                    background: "linear-gradient(145deg, rgba(30,30,30,0.9) 0%, rgba(0,0,0,0.95) 100%)",
                    border: `2px solid`,
                    borderColor: index === 1 ? "rgba(245,158,11,0.5)" : "rgba(255,255,255,0.1)"
                  }}
                >
                  {index === 1 && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-accent-amber text-black text-xs font-bold rounded-full">
                      EN POPÜLER
                    </div>
                  )}
                  
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tier.color} flex items-center justify-center mb-4`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2">{tier.name}</h3>
                  
                  <div className="mb-4">
                    {showPriceInTL ? (
                      <div>
                        <span className="text-2xl font-black text-accent-amber">{tier.price.toLocaleString()}</span>
                        <span className="text-white/50 ml-1">TL</span>
                      </div>
                    ) : (
                      <div>
                        <span className="text-2xl font-black text-accent-amber">{tier.points.toLocaleString()}</span>
                        <span className="text-white/50 ml-1">Puan</span>
                      </div>
                    )}
                  </div>

                  <ul className="space-y-2 mb-4">
                    {tier.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-white/70">
                        <Check className="w-4 h-4 text-accent-amber flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full ${
                      canAfford 
                        ? "bg-accent-amber hover:bg-yellow-500 text-black" 
                        : "bg-neutral-800 text-white/50 cursor-not-allowed"
                    }`}
                    disabled={!canAfford}
                  >
                    {showPriceInTL ? "Satın Al" : (canAfford ? "Puanla Al" : "Yetersiz Puan")}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              );
            })}
          </div>

          {/* How to Earn Points */}
          <div className="mt-6 p-4 rounded-xl bg-neutral-900/50 border border-neutral-800">
            <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
              <Gift className="w-5 h-5 text-accent-amber" />
              Puan Nasıl Kazanılır?
            </h4>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-white/70">
                <Check className="w-4 h-4 text-green-500" />
                <span>Her bilet alımında puan kazanın</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <Check className="w-4 h-4 text-green-500" />
                <span>Haftalık çark çevirin</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <Check className="w-4 h-4 text-green-500" />
                <span>Arkadaşlarınızı davet edin</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <Check className="w-4 h-4 text-green-500" />
                <span>Değerlendirme yapın</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
      <MobileTabBar />
    </div>
  );
}

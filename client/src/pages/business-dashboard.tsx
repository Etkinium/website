import { useState } from "react";
import { useLocation } from "wouter";
import { 
  Building2, 
  Headphones, 
  Plus, 
  TrendingUp, 
  Users, 
  FileText, 
  LogOut, 
  Settings, 
  FileCheck,
  Calendar,
  Ticket,
  DollarSign,
  MapPin,
  PieChart,
  BarChart3,
  ArrowUpRight,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

const mockSalesData = {
  monthlyEarnings: "—",
  totalTicketsSold: "—",
  totalEvents: "—",
  thisMonthSales: "—",
  lastMonthSales: "—",
  growthRate: "—",
};

const mockCustomerData = {
  ageGroups: [
    { range: "18-24", percentage: "—" },
    { range: "25-34", percentage: "—" },
    { range: "35-44", percentage: "—" },
    { range: "45-54", percentage: "—" },
    { range: "55+", percentage: "—" },
  ],
  geoDistribution: [
    { city: "İstanbul", percentage: "—" },
    { city: "Ankara", percentage: "—" },
    { city: "İzmir", percentage: "—" },
    { city: "Antalya", percentage: "—" },
    { city: "Diğer", percentage: "—" },
  ],
  totalCustomers: "—",
  returningCustomers: "—",
};

const mockFinancialData = {
  grossIncome: "—",
  netIncome: "—",
  refundAmount: "—",
  refundRate: "—",
  pendingPayments: "—",
};

export default function BusinessDashboard() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("sales");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const businessName = user?.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : "İşletme Adı";

  const handleLogout = async () => {
    try {
      await apiRequest("POST", "/api/logout");
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      toast({
        title: "Çıkış Yapıldı",
        description: "Başarıyla çıkış yaptınız.",
      });
      setLocation("/login");
    } catch (error) {
      toast({
        title: "Hata",
        description: "Çıkış yapılırken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-50 bg-black border-b border-accent-amber/20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center border-2 border-accent-amber/50">
                <Building2 className="w-5 h-5 text-accent-amber" />
              </div>
              <div>
                <h1 className="font-bold text-accent-amber text-lg" data-testid="text-business-name">
                  {businessName}
                </h1>
                <p className="text-xs text-accent-amber/60">İşletme Paneli</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-2 border-accent-amber bg-black text-accent-amber hover:bg-accent-amber hover:text-black font-bold gap-2 transition-all"
                data-testid="button-support"
              >
                <Headphones className="w-4 h-4" />
                <span className="hidden sm:inline">Destek</span>
              </Button>
              
              <Button
                size="sm"
                className="bg-black border-2 border-accent-amber/50 hover:bg-accent-amber text-accent-amber hover:text-black font-bold gap-2 transition-all"
                data-testid="button-add-event"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Etkinlik Yükle</span>
              </Button>

              <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-accent-amber hover:text-white hover:bg-accent-amber/20"
                    data-testid="button-settings"
                  >
                    <Settings className="w-5 h-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-black border-2 border-accent-amber/30 text-white max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-accent-amber flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Üyelik Bilgileri
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div className="p-4 bg-black rounded-xl border-2 border-accent-amber/20">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center border-2 border-accent-amber/50">
                          <Building2 className="w-6 h-6 text-accent-amber" />
                        </div>
                        <div>
                          <p className="font-semibold text-accent-amber">{businessName}</p>
                          <p className="text-sm text-accent-amber/60">İşletme Hesabı</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="p-2 bg-black rounded-lg border border-accent-amber/20">
                          <p className="text-accent-amber/60">Toplam Etkinlik</p>
                          <p className="font-semibold text-accent-amber">—</p>
                        </div>
                        <div className="p-2 bg-black rounded-lg border border-accent-amber/20">
                          <p className="text-accent-amber/60">Satılan Bilet</p>
                          <p className="font-semibold text-accent-amber">—</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <a 
                        href="/kullanim-sartlari" 
                        className="flex items-center gap-3 p-3 bg-black rounded-lg border border-accent-amber/20 hover:border-accent-amber/50 transition-colors"
                        data-testid="link-terms"
                      >
                        <FileCheck className="w-5 h-5 text-accent-amber" />
                        <span className="text-accent-amber">Kullanım Sözleşmesi</span>
                      </a>
                      <a 
                        href="/gizlilik-politikasi" 
                        className="flex items-center gap-3 p-3 bg-black rounded-lg border border-accent-amber/20 hover:border-accent-amber/50 transition-colors"
                        data-testid="link-privacy"
                      >
                        <FileText className="w-5 h-5 text-accent-amber" />
                        <span className="text-accent-amber">Gizlilik Politikası</span>
                      </a>
                      <a 
                        href="/kvkk" 
                        className="flex items-center gap-3 p-3 bg-black rounded-lg border border-accent-amber/20 hover:border-accent-amber/50 transition-colors"
                        data-testid="link-kvkk"
                      >
                        <FileText className="w-5 h-5 text-accent-amber" />
                        <span className="text-accent-amber">KVKK Aydınlatma Metni</span>
                      </a>
                    </div>

                    <Button
                      onClick={handleLogout}
                      className="w-full bg-black border-2 border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white font-bold gap-2 transition-all"
                      data-testid="button-logout"
                    >
                      <LogOut className="w-4 h-4" />
                      Çıkış Yap
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-black rounded-xl p-4 border-2 border-accent-amber/20">
            <div className="flex items-center gap-2 mb-2">
              <Ticket className="w-4 h-4 text-accent-amber" />
              <span className="text-xs text-accent-amber">Satılan Bilet</span>
            </div>
            <p className="text-2xl font-bold text-accent-amber" data-testid="text-total-tickets">—</p>
            <p className="text-xs text-accent-amber/50 mt-1">Toplam</p>
          </div>
          
          <div className="bg-black rounded-xl p-4 border-2 border-accent-amber/20">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-accent-amber" />
              <span className="text-xs text-accent-amber">Etkinlik</span>
            </div>
            <p className="text-2xl font-bold text-accent-amber" data-testid="text-total-events">—</p>
            <p className="text-xs text-accent-amber/50 mt-1">Düzenlenen</p>
          </div>
          
          <div className="bg-black rounded-xl p-4 border-2 border-accent-amber/20">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-accent-amber" />
              <span className="text-xs text-accent-amber">Gelir</span>
            </div>
            <p className="text-2xl font-bold text-accent-amber" data-testid="text-total-income">— ₺</p>
            <p className="text-xs text-accent-amber/50 mt-1">Bu Ay</p>
          </div>
          
          <div className="bg-black rounded-xl p-4 border-2 border-accent-amber/20">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-accent-amber" />
              <span className="text-xs text-accent-amber">Müşteri</span>
            </div>
            <p className="text-2xl font-bold text-accent-amber" data-testid="text-total-customers">—</p>
            <p className="text-xs text-accent-amber/50 mt-1">Toplam</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-3 bg-black border-2 border-accent-amber/20 mb-6 p-1 rounded-xl">
            <TabsTrigger 
              value="sales" 
              className="flex items-center gap-2 data-[state=active]:bg-accent-amber data-[state=active]:text-black text-accent-amber rounded-lg transition-all font-bold"
              data-testid="tab-sales"
            >
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Satış Analizi</span>
              <span className="sm:hidden">Satış</span>
            </TabsTrigger>
            <TabsTrigger 
              value="customers" 
              className="flex items-center gap-2 data-[state=active]:bg-accent-amber data-[state=active]:text-black text-accent-amber rounded-lg transition-all font-bold"
              data-testid="tab-customers"
            >
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Müşteri Analizi</span>
              <span className="sm:hidden">Müşteri</span>
            </TabsTrigger>
            <TabsTrigger 
              value="financial" 
              className="flex items-center gap-2 data-[state=active]:bg-accent-amber data-[state=active]:text-black text-accent-amber rounded-lg transition-all font-bold"
              data-testid="tab-financial"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Mali Raporlar</span>
              <span className="sm:hidden">Mali</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sales" className="space-y-4">
            <div className="bg-black rounded-2xl p-6 border-2 border-accent-amber/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-accent-amber flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-accent-amber" />
                  Aylık Kazançlar
                </h2>
                <Button variant="ghost" size="sm" className="text-accent-amber/50 hover:text-accent-amber">
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-black rounded-xl p-4 border-2 border-accent-amber/30">
                  <p className="text-sm text-accent-amber/60 mb-1">Bu Ay</p>
                  <p className="text-3xl font-bold text-accent-amber" data-testid="text-this-month-sales">
                    {mockSalesData.thisMonthSales} ₺
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-accent-amber text-sm">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>— %</span>
                  </div>
                </div>
                
                <div className="bg-black rounded-xl p-4 border-2 border-accent-amber/20">
                  <p className="text-sm text-accent-amber/60 mb-1">Geçen Ay</p>
                  <p className="text-3xl font-bold text-accent-amber" data-testid="text-last-month-sales">
                    {mockSalesData.lastMonthSales} ₺
                  </p>
                </div>
                
                <div className="bg-black rounded-xl p-4 border-2 border-accent-amber/20">
                  <p className="text-sm text-accent-amber/60 mb-1">Büyüme Oranı</p>
                  <p className="text-3xl font-bold text-accent-amber" data-testid="text-growth-rate">
                    {mockSalesData.growthRate}
                  </p>
                </div>
              </div>

              <div className="h-48 bg-black rounded-xl border-2 border-accent-amber/10 flex items-center justify-center">
                <div className="text-center text-accent-amber/30">
                  <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                  <p>API bağlantısı sonrası grafik gösterilecek</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black rounded-2xl p-6 border-2 border-accent-amber/20">
                <h3 className="text-lg font-bold text-accent-amber mb-4 flex items-center gap-2">
                  <Ticket className="w-5 h-5 text-accent-amber" />
                  Bilet Satışları
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-black rounded-lg border border-accent-amber/10">
                    <span className="text-accent-amber/70">Toplam Satılan</span>
                    <span className="font-bold text-accent-amber">—</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-black rounded-lg border border-accent-amber/10">
                    <span className="text-accent-amber/70">Bu Ay Satılan</span>
                    <span className="font-bold text-accent-amber">—</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-black rounded-lg border border-accent-amber/10">
                    <span className="text-accent-amber/70">Ortalama Fiyat</span>
                    <span className="font-bold text-accent-amber">— ₺</span>
                  </div>
                </div>
              </div>

              <div className="bg-black rounded-2xl p-6 border-2 border-accent-amber/20">
                <h3 className="text-lg font-bold text-accent-amber mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-accent-amber" />
                  Etkinlik Özeti
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-black rounded-lg border border-accent-amber/10">
                    <span className="text-accent-amber/70">Toplam Etkinlik</span>
                    <span className="font-bold text-accent-amber">—</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-black rounded-lg border border-accent-amber/10">
                    <span className="text-accent-amber/70">Aktif Etkinlik</span>
                    <span className="font-bold text-accent-amber">—</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-black rounded-lg border border-accent-amber/10">
                    <span className="text-accent-amber/70">Tamamlanan</span>
                    <span className="font-bold text-accent-amber">—</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="customers" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black rounded-2xl p-6 border-2 border-accent-amber/20">
                <h3 className="text-lg font-bold text-accent-amber mb-4 flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-accent-amber" />
                  Yaş Grubu Dağılımı
                </h3>
                <div className="space-y-3">
                  {mockCustomerData.ageGroups.map((group, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="text-accent-amber/70 w-16">{group.range}</span>
                      <div className="flex-1 h-3 bg-black border border-accent-amber/20 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-accent-amber rounded-full"
                          style={{ width: '0%' }}
                        />
                      </div>
                      <span className="text-accent-amber font-bold w-12 text-right">{group.percentage}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-black rounded-2xl p-6 border-2 border-accent-amber/20">
                <h3 className="text-lg font-bold text-accent-amber mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-accent-amber" />
                  Coğrafi Dağılım
                </h3>
                <div className="space-y-3">
                  {mockCustomerData.geoDistribution.map((location, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="text-accent-amber/70 w-20">{location.city}</span>
                      <div className="flex-1 h-3 bg-black border border-accent-amber/20 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-accent-amber rounded-full"
                          style={{ width: '0%' }}
                        />
                      </div>
                      <span className="text-accent-amber font-bold w-12 text-right">{location.percentage}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-black rounded-2xl p-6 border-2 border-accent-amber/20">
              <h3 className="text-lg font-bold text-accent-amber mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-accent-amber" />
                Müşteri İstatistikleri
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-black rounded-xl p-4 text-center border-2 border-accent-amber/20">
                  <p className="text-3xl font-bold text-accent-amber mb-1">—</p>
                  <p className="text-sm text-accent-amber/60">Toplam Müşteri</p>
                </div>
                <div className="bg-black rounded-xl p-4 text-center border-2 border-accent-amber/20">
                  <p className="text-3xl font-bold text-accent-amber mb-1">—</p>
                  <p className="text-sm text-accent-amber/60">Tekrar Eden</p>
                </div>
                <div className="bg-black rounded-xl p-4 text-center border-2 border-accent-amber/20">
                  <p className="text-3xl font-bold text-accent-amber mb-1">—</p>
                  <p className="text-sm text-accent-amber/60">Yeni Müşteri</p>
                </div>
                <div className="bg-black rounded-xl p-4 text-center border-2 border-accent-amber/20">
                  <p className="text-3xl font-bold text-accent-amber mb-1">— %</p>
                  <p className="text-sm text-accent-amber/60">Sadakat Oranı</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="financial" className="space-y-4">
            <div className="bg-black rounded-2xl p-6 border-2 border-accent-amber/20">
              <h2 className="text-xl font-bold text-accent-amber mb-6 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-accent-amber" />
                Gelir Dökümü
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-black rounded-xl p-5 border-2 border-accent-amber/30">
                  <p className="text-sm text-accent-amber/60 mb-2">Brüt Gelir</p>
                  <p className="text-3xl font-bold text-accent-amber" data-testid="text-gross-income">
                    {mockFinancialData.grossIncome} ₺
                  </p>
                  <p className="text-xs text-accent-amber/50 mt-2">Toplam satış geliri</p>
                </div>
                
                <div className="bg-black rounded-xl p-5 border-2 border-accent-amber/30">
                  <p className="text-sm text-accent-amber/60 mb-2">Net Gelir</p>
                  <p className="text-3xl font-bold text-accent-amber" data-testid="text-net-income">
                    {mockFinancialData.netIncome} ₺
                  </p>
                  <p className="text-xs text-accent-amber/50 mt-2">Komisyon düşüldükten sonra</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black rounded-2xl p-6 border-2 border-accent-amber/20">
                <h3 className="text-lg font-bold text-accent-amber mb-4 flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-accent-amber" />
                  İade ve Geri Dönüşüm
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-black rounded-lg border border-accent-amber/10">
                    <span className="text-accent-amber/70">Toplam İade</span>
                    <span className="font-bold text-accent-amber">{mockFinancialData.refundAmount} ₺</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-black rounded-lg border border-accent-amber/10">
                    <span className="text-accent-amber/70">İade Oranı</span>
                    <span className="font-bold text-accent-amber">{mockFinancialData.refundRate}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-black rounded-lg border border-accent-amber/10">
                    <span className="text-accent-amber/70">İade Edilen Bilet</span>
                    <span className="font-bold text-accent-amber">—</span>
                  </div>
                </div>
              </div>

              <div className="bg-black rounded-2xl p-6 border-2 border-accent-amber/20">
                <h3 className="text-lg font-bold text-accent-amber mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-accent-amber" />
                  Ödeme Durumu
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-black rounded-lg border border-accent-amber/10">
                    <span className="text-accent-amber/70">Bekleyen Ödeme</span>
                    <span className="font-bold text-accent-amber">{mockFinancialData.pendingPayments} ₺</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-black rounded-lg border border-accent-amber/10">
                    <span className="text-accent-amber/70">Tamamlanan Ödeme</span>
                    <span className="font-bold text-accent-amber">— ₺</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-black rounded-lg border border-accent-amber/10">
                    <span className="text-accent-amber/70">Sonraki Ödeme Tarihi</span>
                    <span className="font-bold text-accent-amber">—</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-black rounded-2xl p-6 border-2 border-accent-amber/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-accent-amber flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-accent-amber" />
                  Mali Raporlar
                </h3>
                <Button 
                  variant="outline"
                  size="sm"
                  className="bg-black border-2 border-accent-amber/50 text-accent-amber hover:bg-accent-amber hover:text-black font-bold transition-all"
                  data-testid="button-download-report"
                >
                  Rapor İndir
                </Button>
              </div>
              <div className="text-center py-8 text-accent-amber/30">
                <FileText className="w-12 h-12 mx-auto mb-2" />
                <p>API bağlantısı sonrası detaylı raporlar burada gösterilecek</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

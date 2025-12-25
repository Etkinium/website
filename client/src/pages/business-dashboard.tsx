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
  RefreshCw,
  ChevronRight
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
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white">
      <header className="sticky top-0 z-50 bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
                  boxShadow: "0 4px 20px rgba(245, 158, 11, 0.3)"
                }}
              >
                <Building2 className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="font-bold text-white text-xl tracking-tight" data-testid="text-business-name">
                  {businessName}
                </h1>
                <p className="text-sm text-neutral-400">İşletme Yönetim Paneli</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="border-neutral-700 bg-neutral-800/50 text-neutral-300 hover:bg-neutral-700 hover:text-white hover:border-neutral-600 gap-2 h-10 px-4"
                data-testid="button-support"
              >
                <Headphones className="w-4 h-4" />
                <span className="hidden sm:inline">Destek</span>
              </Button>
              
              <Button
                size="sm"
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold gap-2 h-10 px-5 shadow-lg shadow-amber-500/20"
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
                    className="text-neutral-400 hover:text-white hover:bg-neutral-800 h-10 w-10 p-0"
                    data-testid="button-settings"
                  >
                    <Settings className="w-5 h-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-neutral-900 border-neutral-800 text-white max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-white flex items-center gap-2 text-lg">
                      <Settings className="w-5 h-5 text-amber-500" />
                      Üyelik Bilgileri
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div className="p-5 bg-neutral-800/50 rounded-2xl border border-neutral-700/50">
                      <div className="flex items-center gap-4 mb-4">
                        <div 
                          className="w-14 h-14 rounded-2xl flex items-center justify-center"
                          style={{
                            background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
                          }}
                        >
                          <Building2 className="w-7 h-7 text-black" />
                        </div>
                        <div>
                          <p className="font-semibold text-white text-lg">{businessName}</p>
                          <p className="text-sm text-neutral-400">Premium İşletme Hesabı</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-neutral-900/50 rounded-xl border border-neutral-700/30">
                          <p className="text-neutral-500 text-xs">Toplam Etkinlik</p>
                          <p className="font-bold text-white text-xl mt-1">—</p>
                        </div>
                        <div className="p-3 bg-neutral-900/50 rounded-xl border border-neutral-700/30">
                          <p className="text-neutral-500 text-xs">Satılan Bilet</p>
                          <p className="font-bold text-white text-xl mt-1">—</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <a 
                        href="/kullanim-sartlari" 
                        className="flex items-center justify-between p-3 bg-neutral-800/30 rounded-xl border border-neutral-700/30 hover:bg-neutral-800/50 hover:border-neutral-600 transition-all group"
                        data-testid="link-terms"
                      >
                        <div className="flex items-center gap-3">
                          <FileCheck className="w-5 h-5 text-amber-500" />
                          <span className="text-neutral-300 group-hover:text-white transition-colors">Kullanım Sözleşmesi</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-neutral-500" />
                      </a>
                      <a 
                        href="/gizlilik-politikasi" 
                        className="flex items-center justify-between p-3 bg-neutral-800/30 rounded-xl border border-neutral-700/30 hover:bg-neutral-800/50 hover:border-neutral-600 transition-all group"
                        data-testid="link-privacy"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-amber-500" />
                          <span className="text-neutral-300 group-hover:text-white transition-colors">Gizlilik Politikası</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-neutral-500" />
                      </a>
                      <a 
                        href="/kvkk" 
                        className="flex items-center justify-between p-3 bg-neutral-800/30 rounded-xl border border-neutral-700/30 hover:bg-neutral-800/50 hover:border-neutral-600 transition-all group"
                        data-testid="link-kvkk"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-amber-500" />
                          <span className="text-neutral-300 group-hover:text-white transition-colors">KVKK Aydınlatma Metni</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-neutral-500" />
                      </a>
                    </div>

                    <Button
                      onClick={handleLogout}
                      variant="outline"
                      className="w-full border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/50 gap-2 h-11"
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

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Ticket, label: "Satılan Bilet", value: "—", sub: "Toplam", testId: "text-total-tickets" },
            { icon: Calendar, label: "Etkinlik", value: "—", sub: "Düzenlenen", testId: "text-total-events" },
            { icon: DollarSign, label: "Gelir", value: "— ₺", sub: "Bu Ay", testId: "text-total-income" },
            { icon: Users, label: "Müşteri", value: "—", sub: "Toplam", testId: "text-total-customers" },
          ].map((item, index) => (
            <div 
              key={index}
              className="relative bg-neutral-900/50 rounded-2xl p-5 border border-neutral-800/50 overflow-hidden group hover:border-neutral-700/50 transition-all"
              style={{
                boxShadow: "0 4px 24px rgba(0,0,0,0.2)"
              }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-500/5 to-transparent rounded-bl-full" />
              <div className="flex items-center gap-2 mb-3">
                <item.icon className="w-4 h-4 text-amber-500" />
                <span className="text-xs text-neutral-400 font-medium">{item.label}</span>
              </div>
              <p className="text-3xl font-bold text-white mb-1" data-testid={item.testId}>{item.value}</p>
              <p className="text-xs text-neutral-500">{item.sub}</p>
            </div>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-3 bg-neutral-900/50 border border-neutral-800/50 mb-8 p-1.5 rounded-2xl h-auto">
            {[
              { value: "sales", icon: TrendingUp, label: "Satış Analizi", shortLabel: "Satış" },
              { value: "customers", icon: Users, label: "Müşteri Analizi", shortLabel: "Müşteri" },
              { value: "financial", icon: FileText, label: "Mali Raporlar", shortLabel: "Mali" },
            ].map((tab) => (
              <TabsTrigger 
                key={tab.value}
                value={tab.value} 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-amber-600 data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:shadow-amber-500/20 text-neutral-400 rounded-xl transition-all py-3 font-medium"
                data-testid={`tab-${tab.value}`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="sales" className="space-y-6">
            <div className="bg-neutral-900/50 rounded-3xl p-6 border border-neutral-800/50" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-amber-500" />
                  </div>
                  Aylık Kazançlar
                </h2>
                <Button variant="ghost" size="sm" className="text-neutral-500 hover:text-white hover:bg-neutral-800">
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-amber-500/10 to-transparent rounded-2xl p-5 border border-amber-500/20">
                  <p className="text-sm text-neutral-400 mb-2">Bu Ay</p>
                  <p className="text-3xl font-bold text-white" data-testid="text-this-month-sales">
                    {mockSalesData.thisMonthSales} ₺
                  </p>
                  <div className="flex items-center gap-1 mt-3 text-amber-500 text-sm font-medium">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>— %</span>
                  </div>
                </div>
                
                <div className="bg-neutral-800/30 rounded-2xl p-5 border border-neutral-700/30">
                  <p className="text-sm text-neutral-400 mb-2">Geçen Ay</p>
                  <p className="text-3xl font-bold text-white" data-testid="text-last-month-sales">
                    {mockSalesData.lastMonthSales} ₺
                  </p>
                </div>
                
                <div className="bg-neutral-800/30 rounded-2xl p-5 border border-neutral-700/30">
                  <p className="text-sm text-neutral-400 mb-2">Büyüme Oranı</p>
                  <p className="text-3xl font-bold text-white" data-testid="text-growth-rate">
                    {mockSalesData.growthRate}
                  </p>
                </div>
              </div>

              <div className="h-48 bg-neutral-800/20 rounded-2xl border border-neutral-700/20 flex items-center justify-center">
                <div className="text-center text-neutral-600">
                  <BarChart3 className="w-12 h-12 mx-auto mb-3" />
                  <p className="text-sm">API bağlantısı sonrası grafik gösterilecek</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-neutral-900/50 rounded-3xl p-6 border border-neutral-800/50" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}>
                <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center">
                    <Ticket className="w-4 h-4 text-amber-500" />
                  </div>
                  Bilet Satışları
                </h3>
                <div className="space-y-3">
                  {["Toplam Satılan", "Bu Ay Satılan", "Ortalama Fiyat"].map((label, i) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-neutral-800/30 rounded-xl border border-neutral-700/20">
                      <span className="text-neutral-400">{label}</span>
                      <span className="font-bold text-white">{i === 2 ? "— ₺" : "—"}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-neutral-900/50 rounded-3xl p-6 border border-neutral-800/50" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}>
                <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-amber-500" />
                  </div>
                  Etkinlik Özeti
                </h3>
                <div className="space-y-3">
                  {["Toplam Etkinlik", "Aktif Etkinlik", "Tamamlanan"].map((label, i) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-neutral-800/30 rounded-xl border border-neutral-700/20">
                      <span className="text-neutral-400">{label}</span>
                      <span className="font-bold text-white">—</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="customers" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-neutral-900/50 rounded-3xl p-6 border border-neutral-800/50" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}>
                <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center">
                    <PieChart className="w-4 h-4 text-amber-500" />
                  </div>
                  Yaş Grubu Dağılımı
                </h3>
                <div className="space-y-4">
                  {mockCustomerData.ageGroups.map((group, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <span className="text-neutral-400 w-14 text-sm">{group.range}</span>
                      <div className="flex-1 h-2 bg-neutral-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full" style={{ width: '0%' }} />
                      </div>
                      <span className="text-white font-medium w-10 text-right text-sm">{group.percentage}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-neutral-900/50 rounded-3xl p-6 border border-neutral-800/50" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}>
                <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-amber-500" />
                  </div>
                  Coğrafi Dağılım
                </h3>
                <div className="space-y-4">
                  {mockCustomerData.geoDistribution.map((location, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <span className="text-neutral-400 w-16 text-sm">{location.city}</span>
                      <div className="flex-1 h-2 bg-neutral-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full" style={{ width: '0%' }} />
                      </div>
                      <span className="text-white font-medium w-10 text-right text-sm">{location.percentage}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-neutral-900/50 rounded-3xl p-6 border border-neutral-800/50" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}>
              <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <Users className="w-4 h-4 text-amber-500" />
                </div>
                Müşteri İstatistikleri
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["Toplam Müşteri", "Tekrar Eden", "Yeni Müşteri", "Sadakat Oranı"].map((label, i) => (
                  <div key={i} className="bg-neutral-800/30 rounded-2xl p-5 text-center border border-neutral-700/20">
                    <p className="text-3xl font-bold text-white mb-2">{i === 3 ? "— %" : "—"}</p>
                    <p className="text-sm text-neutral-500">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="financial" className="space-y-6">
            <div className="bg-neutral-900/50 rounded-3xl p-6 border border-neutral-800/50" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}>
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-amber-500" />
                </div>
                Gelir Dökümü
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-amber-500/10 to-transparent rounded-2xl p-6 border border-amber-500/20">
                  <p className="text-sm text-neutral-400 mb-2">Brüt Gelir</p>
                  <p className="text-4xl font-bold text-white" data-testid="text-gross-income">
                    {mockFinancialData.grossIncome} ₺
                  </p>
                  <p className="text-xs text-neutral-500 mt-3">Toplam satış geliri</p>
                </div>
                
                <div className="bg-gradient-to-br from-green-500/10 to-transparent rounded-2xl p-6 border border-green-500/20">
                  <p className="text-sm text-neutral-400 mb-2">Net Gelir</p>
                  <p className="text-4xl font-bold text-white" data-testid="text-net-income">
                    {mockFinancialData.netIncome} ₺
                  </p>
                  <p className="text-xs text-neutral-500 mt-3">Komisyon düşüldükten sonra</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-neutral-900/50 rounded-3xl p-6 border border-neutral-800/50" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}>
                <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center">
                    <RefreshCw className="w-4 h-4 text-amber-500" />
                  </div>
                  İade ve Geri Dönüşüm
                </h3>
                <div className="space-y-3">
                  {[
                    { label: "Toplam İade", value: `${mockFinancialData.refundAmount} ₺` },
                    { label: "İade Oranı", value: mockFinancialData.refundRate },
                    { label: "İade Edilen Bilet", value: "—" },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-neutral-800/30 rounded-xl border border-neutral-700/20">
                      <span className="text-neutral-400">{item.label}</span>
                      <span className="font-bold text-white">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-neutral-900/50 rounded-3xl p-6 border border-neutral-800/50" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}>
                <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-amber-500" />
                  </div>
                  Ödeme Durumu
                </h3>
                <div className="space-y-3">
                  {[
                    { label: "Bekleyen Ödeme", value: `${mockFinancialData.pendingPayments} ₺` },
                    { label: "Tamamlanan Ödeme", value: "— ₺" },
                    { label: "Sonraki Ödeme Tarihi", value: "—" },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-neutral-800/30 rounded-xl border border-neutral-700/20">
                      <span className="text-neutral-400">{item.label}</span>
                      <span className="font-bold text-white">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-neutral-900/50 rounded-3xl p-6 border border-neutral-800/50" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center">
                    <FileCheck className="w-4 h-4 text-amber-500" />
                  </div>
                  Mali Raporlar
                </h3>
                <Button 
                  size="sm"
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold shadow-lg shadow-amber-500/20"
                  data-testid="button-download-report"
                >
                  Rapor İndir
                </Button>
              </div>
              <div className="text-center py-10 text-neutral-600">
                <FileText className="w-12 h-12 mx-auto mb-3" />
                <p className="text-sm">API bağlantısı sonrası detaylı raporlar burada gösterilecek</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

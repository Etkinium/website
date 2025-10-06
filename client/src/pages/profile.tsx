import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { User, Settings, Gift, LogOut, Ticket } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  points: number;
}

export default function Profile() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: user, isLoading } = useQuery<UserProfile>({
    queryKey: ["/api/user"],
    retry: false,
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/logout");
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Başarıyla Çıkış Yaptınız",
        description: "Güvenli bir şekilde çıkış yaptınız.",
      });
      setLocation("/");
    },
    onError: () => {
      toast({
        title: "Hata",
        description: "Çıkış yapılırken bir hata oluştu.",
        variant: "destructive",
      });
    }
  });

  if (!user && !isLoading) {
    setLocation("/login");
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-spotify-black text-white">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="text-gray-400">Yükleniyor...</div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Profile Header */}
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-4 md:p-8 mb-8 border border-gray-700">
              <div className="flex flex-col md:flex-row items-center md:justify-between gap-6">
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left w-full md:w-auto">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-accent-amber/20 rounded-full flex items-center justify-center text-3xl md:text-4xl">
                    👤
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2" data-testid="text-user-name">
                      {user?.name}
                    </h1>
                    <p className="text-sm md:text-base text-gray-400" data-testid="text-user-email">{user?.email}</p>
                  </div>
                </div>
                <div className="w-full md:w-auto flex justify-center">
                  <div className="bg-accent-amber/10 border border-accent-amber/30 rounded-xl px-8 py-3">
                    <div className="text-center">
                      <div className="text-2xl md:text-3xl font-bold text-accent-amber" data-testid="text-user-points">
                        {user?.points}
                      </div>
                      <div className="text-sm text-gray-400">Puan</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Account Settings Card */}
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-8 border border-gray-700 hover:border-accent-amber/50 transition-all">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-accent-amber/10 rounded-lg flex items-center justify-center">
                    <Settings className="w-6 h-6 text-accent-amber" />
                  </div>
                  <h2 className="text-2xl font-bold">Hesabım</h2>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-600">
                  <p className="text-gray-300 text-center" data-testid="text-settings-placeholder">
                    Detaylar daha sonra aktarılacak
                  </p>
                </div>
              </div>

              {/* Coupons Card */}
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-8 border border-gray-700 hover:border-accent-amber/50 transition-all">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-accent-amber/10 rounded-lg flex items-center justify-center">
                    <Gift className="w-6 h-6 text-accent-amber" />
                  </div>
                  <h2 className="text-2xl font-bold">Kuponlarım</h2>
                </div>
                
                {/* Active Coupon */}
                <div className="bg-gradient-to-r from-accent-amber/20 to-accent-amber/10 rounded-lg p-6 border border-accent-amber/30 mb-4" data-testid="card-coupon-active">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Ticket className="w-5 h-5 text-accent-amber" />
                      <span className="font-semibold text-accent-amber">Hoş Geldin Kuponu</span>
                    </div>
                    <div className="bg-accent-amber text-black px-3 py-1 rounded-full text-sm font-bold" data-testid="text-discount-amount">
                      %10 İndirim
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">
                    İlk rezervasyonunuzda kullanabilirsiniz
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Kod: HOSGELDIN10</span>
                    <span className="text-xs text-green-400 font-semibold">Aktif</span>
                  </div>
                </div>

                <p className="text-gray-400 text-sm text-center">
                  Yeni kuponlar yakında eklenecek!
                </p>
              </div>
            </div>

            {/* Logout Button */}
            <div className="mt-8 text-center">
              <Button
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg transition-all"
                data-testid="button-logout"
              >
                <LogOut className="w-5 h-5 mr-2" />
                {logoutMutation.isPending ? "Çıkış Yapılıyor..." : "Çıkış Yap"}
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

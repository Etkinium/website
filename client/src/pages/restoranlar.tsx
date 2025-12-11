import Header from "@/components/header";
import Footer from "@/components/footer";
import { UtensilsCrossed, Clock, Wine, Coffee, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const restaurantCategories = [
  { name: "Fine Dining", icon: UtensilsCrossed, color: "from-amber-600 to-yellow-500" },
  { name: "Café & Brunch", icon: Coffee, color: "from-brown-500 to-orange-400" },
  { name: "Bar & Lounge", icon: Wine, color: "from-purple-600 to-pink-500" },
];

export default function Restoranlar() {
  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <UtensilsCrossed className="w-10 h-10 text-accent-amber" />
              <h1 className="text-4xl md:text-5xl font-bold">Restoranlar</h1>
            </div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              En seçkin restoranlardan kolayca rezervasyon yapın
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-accent-amber/30 rounded-2xl p-8 md:p-12 text-center mb-12">
            <div className="flex items-center justify-center gap-2 text-accent-amber mb-6">
              <Clock className="w-6 h-6 animate-spin" style={{ animationDuration: "3s" }} />
              <span className="text-lg font-medium uppercase tracking-widest">Çok Yakında</span>
              <Clock className="w-6 h-6 animate-spin" style={{ animationDuration: "3s" }} />
            </div>
            
            <div className="space-y-4 mb-8">
              <p className="text-3xl md:text-4xl font-bold text-white">
                Premium Restoran Rezervasyonları
              </p>
              <p className="text-xl md:text-2xl text-accent-amber font-semibold">
                Yakında Sizlerle!
              </p>
              <p className="text-gray-400 max-w-xl mx-auto">
                Şehrin en popüler restoranlarında masa ayırtın, özel deneyimler yaşayın. 
                Üye olun, ilk siz haberdar olun!
              </p>
            </div>

            <Link href="/signup">
              <Button
                className="bg-accent-amber text-black hover:bg-yellow-400 font-bold px-8 py-3 rounded-full transition-all transform hover:scale-105 text-lg"
                data-testid="button-restoranlar-signup"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Hemen Üye Ol
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {restaurantCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={category.name}
                  className={`bg-gradient-to-br ${category.color} rounded-xl p-8 text-center opacity-60 hover:opacity-100 transition-opacity cursor-pointer`}
                  data-testid={`restaurant-card-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <IconComponent className="w-12 h-12 mx-auto mb-4 text-white" />
                  <p className="font-bold text-white text-xl">{category.name}</p>
                  <p className="text-sm text-white/70 mt-2">Çok Yakında</p>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

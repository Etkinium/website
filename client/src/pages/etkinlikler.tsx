import Header from "@/components/header";
import Footer from "@/components/footer";
import { Calendar, Clock, Music, Theater, PartyPopper, Users, Mic2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const eventCategories = [
  { name: "Konser", icon: Music, color: "from-purple-500 to-pink-500" },
  { name: "Tiyatro", icon: Theater, color: "from-blue-500 to-cyan-500" },
  { name: "Festival", icon: PartyPopper, color: "from-orange-500 to-yellow-500" },
  { name: "Konferans", icon: Users, color: "from-green-500 to-emerald-500" },
  { name: "Stand-up", icon: Mic2, color: "from-red-500 to-rose-500" },
];

export default function Etkinlikler() {
  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Calendar className="w-10 h-10 text-accent-amber" />
              <h1 className="text-4xl md:text-5xl font-bold">Etkinlikler</h1>
            </div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Türkiye'nin en özel etkinliklerini keşfedin
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
                Heyecan Verici Etkinlikler
              </p>
              <p className="text-xl md:text-2xl text-accent-amber font-semibold">
                Kapınızda!
              </p>
              <p className="text-gray-400 max-w-xl mx-auto">
                Konserler, tiyatrolar, festivaller ve daha fazlası için geri sayım başladı. 
                Üye olun, ilk siz haberdar olun!
              </p>
            </div>

            <Link href="/signup">
              <Button
                className="bg-accent-amber text-black hover:bg-yellow-400 font-bold px-8 py-3 rounded-full transition-all transform hover:scale-105 text-lg"
                data-testid="button-etkinlikler-signup"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Hemen Üye Ol
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {eventCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={category.name}
                  className={`bg-gradient-to-br ${category.color} rounded-xl p-6 text-center opacity-60 hover:opacity-100 transition-opacity cursor-pointer`}
                  data-testid={`category-card-${category.name.toLowerCase()}`}
                >
                  <IconComponent className="w-10 h-10 mx-auto mb-3 text-white" />
                  <p className="font-bold text-white">{category.name}</p>
                  <p className="text-xs text-white/70 mt-1">Çok Yakında</p>
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

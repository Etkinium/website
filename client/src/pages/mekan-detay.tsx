import { useRoute, Link } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import MobileTabBar from "@/components/mobile-tab-bar";
import { MapPin, Clock, Star, Users, CalendarDays, Ticket, ChevronLeft, ArrowRight } from "lucide-react";

const VENUE_DATA: Record<string, { name: string; location: string; capacity: string; type: string; description: string }> = {
  "zorlu-psm": { name: "Zorlu PSM", location: "Beşiktaş, İstanbul", capacity: "2.993", type: "Konser & Tiyatro", description: "İstanbul'un kalbinde, dünya standartlarında performans sanatları merkezi." },
  "volkswagen-arena": { name: "Volkswagen Arena", location: "Maslak, İstanbul", capacity: "5.000", type: "Konser & Etkinlik", description: "Türkiye'nin en modern kapalı etkinlik mekanlarından biri." },
  "kucukciftlik-park": { name: "Küçükçiftlik Park", location: "Maçka, İstanbul", capacity: "12.000", type: "Açık Hava", description: "Eşsiz Boğaz manzarasıyla açık hava konserlerinin vazgeçilmez adresi." },
  "if-performance-hall": { name: "IF Performance Hall", location: "Beşiktaş, İstanbul", capacity: "1.200", type: "Konser", description: "Alternatif müziğin ve bağımsız sanatçıların buluşma noktası." },
  "bostanci-gosteri": { name: "Bostancı Gösteri Merkezi", location: "Kadıköy, İstanbul", capacity: "2.500", type: "Konser & Tiyatro", description: "Anadolu yakasının en büyük gösteri merkezi." },
  "congresium": { name: "Congresium", location: "Söğütözü, Ankara", capacity: "6.000", type: "Kongre & Konser", description: "Ankara'nın en prestijli kongre ve etkinlik merkezi." },
  "jolly-joker": { name: "Jolly Joker", location: "Beyoğlu, İstanbul", capacity: "1.500", type: "Konser", description: "Canlı müziğin kalbi, İstanbul'un efsanevi sahne mekanı." },
  "meb-sura-salonu": { name: "MEB Şura Salonu", location: "Çankaya, Ankara", capacity: "3.200", type: "Konser & Tiyatro", description: "Ankara'nın kültür ve sanat etkinliklerinin merkez noktası." },
  "harbiye-acikhava": { name: "Harbiye Açıkhava", location: "Harbiye, İstanbul", capacity: "4.234", type: "Açık Hava", description: "İstanbul'un tarihi açık hava tiyatrosu, unutulmaz yaz konserleri." },
  "ulker-sports-arena": { name: "Ülker Sports Arena", location: "Kadıköy, İstanbul", capacity: "13.800", type: "Spor & Konser", description: "Türkiye'nin en büyük kapalı arenalarından biri." },
  "besiktas-kultur": { name: "Beşiktaş Kültür Merkezi", location: "Beşiktaş, İstanbul", capacity: "800", type: "Tiyatro", description: "Tiyatro ve sahne sanatlarının buluşma noktası." },
  "uniq-hall": { name: "Uniq Hall", location: "Maslak, İstanbul", capacity: "3.000", type: "Konser", description: "Modern mimarisiyle dikkat çeken çok amaçlı etkinlik mekanı." },
  "babylon": { name: "Babylon", location: "Beyoğlu, İstanbul", capacity: "900", type: "Konser", description: "İstanbul'un efsanevi müzik kulübü, bağımsız müziğin evi." },
  "moda-sahnesi": { name: "MODA Sahnesi", location: "Kadıköy, İstanbul", capacity: "650", type: "Konser & Tiyatro", description: "Kadıköy'ün kalbinde samimi bir sahne deneyimi." },
};

const UPCOMING_EVENTS = [
  { title: "Tarkan - Harbiye Konserleri", date: "15 Mart 2026", time: "21:00", price: "₺850", category: "Konser" },
  { title: "Sezen Aksu - Nostalji Gecesi", date: "22 Mart 2026", time: "20:30", price: "₺1.200", category: "Konser" },
  { title: "Müslüm Gürses Anma Gecesi", date: "28 Mart 2026", time: "20:00", price: "₺450", category: "Konser" },
  { title: "Stand-up Night: Cem Yılmaz", date: "5 Nisan 2026", time: "21:00", price: "₺950", category: "Stand-up" },
  { title: "Pinhani - Akustik", date: "12 Nisan 2026", time: "21:30", price: "₺350", category: "Konser" },
  { title: "Hamlet - Tiyatro", date: "18 Nisan 2026", time: "20:00", price: "₺280", category: "Tiyatro" },
];

export default function MekanDetay() {
  const [, params] = useRoute("/mekan/:slug");
  const slug = params?.slug || "";
  const venue = VENUE_DATA[slug];

  if (!venue) {
    return (
      <div className="min-h-screen bg-spotify-black text-white">
        <Header />
        <main className="pt-24 pb-32">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Mekan bulunamadı</h1>
            <Link href="/">
              <span className="text-accent-amber hover:underline">Ana Sayfaya Dön</span>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <Header />
      
      <main className="pt-20 md:pt-28 pb-32">
        <div className="container mx-auto px-3 sm:px-4">
          <Link href="/">
            <span className="inline-flex items-center gap-1 text-white/50 hover:text-accent-amber text-sm mb-6 transition-colors cursor-pointer">
              <ChevronLeft className="w-4 h-4" />
              Ana Sayfa
            </span>
          </Link>

          <div 
            className="relative rounded-2xl overflow-hidden mb-8 p-6 sm:p-10"
            style={{
              background: "linear-gradient(135deg, rgba(13,13,13,0.98) 0%, rgba(20,20,20,0.95) 50%, rgba(10,10,10,0.98) 100%)",
              border: "1px solid rgba(245,158,11,0.15)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 80px rgba(245,158,11,0.03)"
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
            
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-accent-amber/10 flex items-center justify-center border border-accent-amber/20 flex-shrink-0">
                <MapPin className="w-10 h-10 sm:w-12 sm:h-12 text-accent-amber" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-accent-amber/90 text-black text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {venue.type}
                  </span>
                  <div className="flex items-center gap-0.5">
                    <Star className="w-3.5 h-3.5 fill-accent-amber text-accent-amber" />
                    <span className="text-sm font-semibold text-accent-amber">—</span>
                  </div>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">{venue.name}</h1>
                <p className="text-white/50 text-sm sm:text-base mb-3">{venue.description}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-white/40">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-accent-amber/60" />
                    <span>{venue.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-accent-amber/60" />
                    <span>Kapasite: {venue.capacity}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <CalendarDays className="w-5 h-5 text-accent-amber" />
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Yaklaşan <span className="text-accent-amber">Etkinlikler</span>
            </h2>
          </div>

          <div className="space-y-3">
            {UPCOMING_EVENTS.map((event, index) => (
              <div 
                key={index}
                className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 hover:border-accent-amber/30 transition-all"
                style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
              >
                <div className="flex items-start sm:items-center gap-4 mb-3 sm:mb-0">
                  <div className="w-12 h-12 rounded-xl bg-accent-amber/10 flex items-center justify-center border border-accent-amber/20 flex-shrink-0">
                    <Ticket className="w-5 h-5 text-accent-amber" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm sm:text-base group-hover:text-accent-amber transition-colors">
                      {event.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 mt-1">
                      <span className="flex items-center gap-1 text-white/40 text-xs">
                        <CalendarDays className="w-3 h-3" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1 text-white/40 text-xs">
                        <Clock className="w-3 h-3" />
                        {event.time}
                      </span>
                      <span className="bg-white/5 text-white/50 text-[10px] px-2 py-0.5 rounded-full border border-white/5">
                        {event.category}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="text-accent-amber font-bold text-base sm:text-lg">{event.price}</span>
                  <Link href="/bilet-secenekleri">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-accent-amber hover:bg-yellow-400 text-black transition-all hover:scale-105">
                      Bilet Al
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <MobileTabBar />
      <Footer />
    </div>
  );
}

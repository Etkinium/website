import Header from "@/components/header";
import HeroCarousel from "@/components/hero-carousel";
import EmailSubscription from "@/components/email-subscription";
import Footer from "@/components/footer";
import { Headphones, Ticket, CalendarDays } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <Header />
      
      <HeroCarousel />
      
      <EmailSubscription />

      <Footer />
    </div>
  );
}

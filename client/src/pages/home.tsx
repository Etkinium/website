import Header from "@/components/header";
import HeroCarousel from "@/components/hero-carousel";
import OvalAdBanner from "@/components/oval-ad-banner";
import AdApplicationButton from "@/components/ad-application-button";
import EmailSubscription from "@/components/email-subscription";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <Header />
      
      <HeroCarousel />
      
      <OvalAdBanner />
      
      <AdApplicationButton />
      
      <EmailSubscription />

      <Footer />
    </div>
  );
}

import Header from "@/components/header";
import HeroCarousel from "@/components/hero-carousel";
import EmailSubscription from "@/components/email-subscription";
import Footer from "@/components/footer";
import AdvertisingButton from "@/components/advertising-button";
import logoImage from "@assets/logo-final.png";

export default function Home() {

  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <Header />
      
      <HeroCarousel />

      {/* BANNER - ETKİNİUM Logo ve Slogan */}
      <section className="bg-gradient-to-b from-spotify-black via-gray-900 to-spotify-black py-6 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-xl bg-gradient-to-r from-black via-gray-900 to-black border-4 border-accent-amber/60 shadow-[0_0_30px_rgba(251,191,36,0.3)] hover:shadow-[0_0_40px_rgba(251,191,36,0.5)] transition-shadow duration-300"
               style={{ height: "120px" }}>
            <div className="flex items-center justify-start h-full gap-4 px-6">
              <div className="flex-shrink-0">
                <img 
                  src={logoImage}
                  alt="ETKİNİUM Logo"
                  className="w-16 h-16 object-contain drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]"
                />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-accent-amber drop-shadow-[0_2px_10px_rgba(251,191,36,0.3)]">
                  ETKİNİUM
                </h2>
                <p className="text-base md:text-lg text-white font-medium">
                  Tek Platform, Sonsuz Sanat
                </p>
              </div>
            </div>
          </div>

          {/* REKLAM VERMEK İÇİN BUTON */}
          <AdvertisingButton />
        </div>
      </section>
      
      <EmailSubscription />

      <Footer />
    </div>
  );
}

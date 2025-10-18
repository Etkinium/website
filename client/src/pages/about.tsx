import Header from "@/components/header";
import Footer from "@/components/footer";
import { Sparkles, Award, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function About() {
  const faqs = [
    {
      question: "Mobil Uygulama olacak mı?",
      answer: "Mobil Uygulama lansman sonrası aktif hale gelecektir. Güncellemeler duyurularda paylaşılacaktır."
    },
    {
      question: "Kazandığım %10 indirim ve 100 Etkinium puanı nasıl kullanabilirim?",
      answer: "Hiçbir alt limit olmadan Lansman sonrası kullanıma açılacaktır ve puan ile %10 indirim fırsatınızı tek kampanyada bile birleştirerek kullanabilirsiniz."
    },
    {
      question: "Etkinium ne zaman kullanıma açılacak?",
      answer: "Etkinium'un lansmanı çok yakında gerçekleşecektir. Lansman ile birlikte tüm Giriş Paneli aktif hale gelecek ve mail adresinize İndirim ve Puan Haklarınız aktif tanımlanmış olacaktır."
    }
  ];

  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 mt-16 bg-gradient-to-br from-spotify-black via-gray-900 to-spotify-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(251,191,36,0.05),transparent_50%)]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <Sparkles className="w-16 h-16 text-accent-amber mx-auto animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6" data-testid="heading-about">
              <span className="text-white">ETKİNİUM</span>
              <span className="text-accent-amber ml-4">Hakkında</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed" data-testid="text-about-description">
              Türkiye'nin en yenilikçi, <span className="text-accent-amber font-semibold">dijital dünyanın yeni nesil deneyim platformudur</span>. 
              Kullanıcılarına farklı alanlarda <span className="text-accent-amber font-semibold">tek merkezden erişim ve kolaylık</span> sağlar. 
              Lansman sonrası detaylar resmi duyurularla paylaşılacaktır.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-spotify-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black mb-4" data-testid="heading-values">
                <span className="text-white">Değerlerimiz</span>
              </h2>
              <p className="text-gray-400 text-lg">
                ETKİNİUM'u özel kılan prensipler
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Value 1 */}
              <div className="group relative" data-testid="card-value-premium">
                <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-8 h-full border border-gray-700 hover:border-accent-amber/50 transition-all duration-300 hover:-translate-y-2">
                  <div className="w-14 h-14 bg-accent-amber/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Award className="w-7 h-7 text-accent-amber" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">Premium Kalite</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Her detayda mükemmellik arayışı ile kullanıcılarımıza 
                    en üst düzey hizmet kalitesini sunuyoruz.
                  </p>
                </div>
              </div>

              {/* Value 2 */}
              <div className="group relative" data-testid="card-value-innovation">
                <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-8 h-full border border-gray-700 hover:border-accent-amber/50 transition-all duration-300 hover:-translate-y-2">
                  <div className="w-14 h-14 bg-accent-amber/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-7 h-7 text-accent-amber" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">Yenilikçi Yaklaşım</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Teknoloji ve yaratıcılığı harmanlayarak sektörde 
                    fark yaratan çözümler üretiyoruz.
                  </p>
                </div>
              </div>

              {/* Value 3 */}
              <div className="group relative" data-testid="card-value-trust">
                <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-8 h-full border border-gray-700 hover:border-accent-amber/50 transition-all duration-300 hover:-translate-y-2">
                  <div className="w-14 h-14 bg-accent-amber/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <HelpCircle className="w-7 h-7 text-accent-amber" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">Güvenilir Platform</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Güvenlik ve şeffaflık ilkesiyle kullanıcılarımızın 
                    güvenini kazanıyor ve koruyoruz.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-spotify-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-6">
                <HelpCircle className="w-16 h-16 text-accent-amber mx-auto" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-4" data-testid="heading-faq">
                <span className="text-white">Sıkça Sorulan</span>
                <span className="text-accent-amber ml-2">Sorular</span>
              </h2>
              <p className="text-gray-400 text-lg">
                Merak ettiklerinizin yanıtları burada
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700 overflow-hidden hover:border-accent-amber/50 transition-all duration-300 px-6 md:px-8"
                  data-testid={`faq-item-${index}`}
                >
                  <AccordionTrigger 
                    className="py-5 md:py-6 hover:no-underline group"
                    data-testid={`button-faq-toggle-${index}`}
                  >
                    <h3 className="text-lg md:text-xl font-semibold text-white text-left pr-4 group-hover:text-accent-amber transition-colors">
                      {faq.question}
                    </h3>
                  </AccordionTrigger>
                  <AccordionContent 
                    className="pb-6 md:pb-8"
                    data-testid={`text-faq-answer-${index}`}
                  >
                    <div className="border-t border-gray-700 pt-4">
                      <p className="text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

import Header from "@/components/header";
import Footer from "@/components/footer";
import { HelpCircle, ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    category: "Genel",
    questions: [
      {
        q: "ETKİNİUM nedir?",
        a: "ETKİNİUM, etkinlik, seyahat ve konaklamayı tek çatı altında birleştiren Türkiye'nin ilk yapay zeka destekli dijital biletleme ekosistemidir."
      },
      {
        q: "ETKİNİUM'un avantajları nelerdir?",
        a: "Tek platformdan etkinlik bileti, konaklama rezervasyonu ve seyahat hizmeti alabilirsiniz. Blockchain tabanlı güvenli biletleme ve yapay zeka destekli öneri sistemi ile benzersiz bir deneyim yaşarsınız."
      }
    ]
  },
  {
    category: "Bilet İşlemleri",
    questions: [
      {
        q: "Biletimi nasıl alabilirim?",
        a: "Etkinliği seçin, tarih ve koltuk bilgilerini girin, ödeme yapın. Biletiniz e-posta adresinize ve hesabınıza tanımlanır."
      },
      {
        q: "Biletimi iptal edebilir miyim?",
        a: "Bilet iptal seçeneklerinde esneklikler mevcut olup, organizatöre göre değişkenlik göstermektedir. İptal şartlarını satın alma öncesi mutlaka kontrol ediniz."
      },
      {
        q: "Biletim güvende mi?",
        a: "Evet, biletleriniz blockchain tabanlı teknoloji ile güvence altındadır. Her bilet, 10 saniyede bir değişen dinamik QR kod sistemi ile korunur ve sahtecilik riskini minimuma indirir."
      }
    ]
  },
  {
    category: "Ödeme ve Güvenlik",
    questions: [
      {
        q: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
        a: "Kredi kartı ve banka kartı ile güvenli ödeme gerçekleştirebilirsiniz. Diğer ödeme özellikleri lansman sonrası açıklanacaktır."
      },
      {
        q: "Ödeme bilgilerim güvende mi?",
        a: "Evet, tüm ödeme işlemleri 256-bit SSL şifrelemesi ile korunmaktadır. Kart bilgileriniz sistemimizde saklanmaz."
      },
      {
        q: "Fatura alabilir miyim?",
        a: "Evet, her alışverişiniz için e-fatura düzenlenebilir. Fatura bilgilerinizi ödeme sırasında girebilir veya profil ayarlarınızdan kaydedebilirsiniz."
      }
    ]
  },
  {
    category: "Konaklama",
    questions: [
      {
        q: "Otel rezervasyonu nasıl yapılır?",
        a: "Konaklama sekmesinden şehir ve tarihleri seçin, uygun oteli seçip rezervasyon yapın. Onay e-postanız hemen gelecektir."
      },
      {
        q: "Rezervasyonumu değiştirebilir miyim?",
        a: "Otelin iptal koşullarına bağlı olarak rezervasyonunuzu değiştirebilir veya iptal edebilirsiniz. Detaylar rezervasyon onay mailinizde belirtilmiştir."
      },
      {
        q: "Konaklama rezervasyonlarım güvende mi?",
        a: "Evet, tüm konaklama rezervasyonlarınız güvenli altyapımızla korunmaktadır. Onay e-postanız anında gönderilir."
      }
    ]
  },
  {
    category: "Teknik Destek",
    questions: [
      {
        q: "Şifremi unuttum, ne yapmalıyım?",
        a: "Giriş sayfasında 'Şifremi Unuttum' linkine tıklayarak e-posta adresinize şifre sıfırlama linki gönderebilirsiniz."
      },
      {
        q: "Hesabımı nasıl silerim?",
        a: "Hesap silme talebi için iletisim@etkinium.com adresine e-posta gönderebilirsiniz. KVKK kapsamında verileriniz silinecektir."
      },
      {
        q: "Mobil uygulama var mı?",
        a: "Şu anda mobil uygulamamız bulunmamaktadır ancak web sitemiz tüm mobil cihazlarda sorunsuz çalışmaktadır. Yakında iOS ve Android uygulamaları yayınlanacaktır."
      }
    ]
  }
];

export default function SSS() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenIndex(openIndex === key ? null : key);
  };

  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <Header />
      
      <main className="pt-32 pb-20 px-4 md:px-20 lg:px-32">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-accent-amber/10 border border-accent-amber/20">
              <HelpCircle className="w-8 h-8 text-accent-amber" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="text-accent-amber">Sıkça Sorulan</span> Sorular
            </h1>
          </div>

          <div className="space-y-8">
            {faqs.map((category, catIndex) => (
              <section key={catIndex}>
                <h2 className="text-2xl font-bold text-accent-amber mb-6 border-b border-gray-800 pb-3">
                  {category.category}
                </h2>
                
                <div className="space-y-3">
                  {category.questions.map((faq, qIndex) => {
                    const key = `${catIndex}-${qIndex}`;
                    const isOpen = openIndex === key;
                    
                    return (
                      <div
                        key={qIndex}
                        className="bg-gray-900/50 rounded-2xl border border-gray-800 overflow-hidden transition-all"
                      >
                        <button
                          onClick={() => toggleQuestion(catIndex, qIndex)}
                          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-800/50 transition-colors"
                          data-testid={`faq-question-${catIndex}-${qIndex}`}
                        >
                          <span className="font-semibold text-lg text-white pr-4">
                            {faq.q}
                          </span>
                          <ChevronDown
                            className={`w-6 h-6 text-accent-amber flex-shrink-0 transition-transform ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        
                        {isOpen && (
                          <div
                            className="px-6 pb-4 text-gray-300 leading-relaxed"
                            data-testid={`faq-answer-${catIndex}-${qIndex}`}
                          >
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-12 p-8 bg-gradient-to-br from-purple-900/30 to-gray-900/30 rounded-3xl border border-gray-800 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Sorunuz yanıtlanmadı mı?
            </h3>
            <p className="text-gray-300 mb-6">
              Size yardımcı olmak için buradayız! Bizimle iletişime geçin.
            </p>
            <a
              href="mailto:iletisim@etkinium.com"
              className="inline-block px-8 py-3 bg-accent-amber text-spotify-black font-semibold rounded-xl hover:bg-accent-amber/90 transition-all"
            >
              İletişime Geç
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

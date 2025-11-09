import Header from "@/components/header";
import Footer from "@/components/footer";
import { Cookie } from "lucide-react";

export default function CerezPolitikasi() {
  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <Header />
      
      <main className="pt-32 pb-20 px-4 md:px-20 lg:px-32">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-accent-amber/10 border border-accent-amber/20">
              <Cookie className="w-8 h-8 text-accent-amber" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="text-accent-amber">Çerez</span> Politikası
            </h1>
          </div>

          <div className="space-y-8 text-gray-300">
            <section>
              <p className="text-lg mb-4">
                <strong>Son Güncellenme:</strong> 09 Kasım 2025
              </p>
              <p>
                ETKİNİUM olarak, web sitemizde kullanıcı deneyimini iyileştirmek, site performansını analiz etmek 
                ve kişiselleştirilmiş içerik sunmak amacıyla çerezler kullanıyoruz.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Çerez Nedir?</h2>
              <p>
                Çerezler, ziyaret ettiğiniz internet siteleri tarafından tarayıcınıza gönderilen ve cihazınızda saklanan 
                küçük metin dosyalarıdır. Çerezler, web sitelerinin daha verimli çalışmasını sağlar ve site sahiplerine 
                bilgi sağlar.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Hangi Çerezleri Kullanıyoruz?</h2>
              
              <div className="space-y-4">
                <div className="p-6 bg-gray-900/50 rounded-2xl border border-gray-800">
                  <h3 className="text-xl font-semibold text-accent-amber mb-2">Zorunlu Çerezler</h3>
                  <p>
                    Web sitesinin düzgün çalışması için gerekli olan çerezlerdir. Kullanıcı oturumları, 
                    güvenlik ayarları ve tercih edilen dil gibi temel işlevleri sağlar.
                  </p>
                </div>

                <div className="p-6 bg-gray-900/50 rounded-2xl border border-gray-800">
                  <h3 className="text-xl font-semibold text-accent-amber mb-2">Performans Çerezleri</h3>
                  <p>
                    Ziyaretçilerin siteyi nasıl kullandığını anlamamıza yardımcı olan çerezlerdir. 
                    Hangi sayfaların en çok ziyaret edildiği, hata mesajları ve yükleme süreleri gibi 
                    anonim istatistikler toplar.
                  </p>
                </div>

                <div className="p-6 bg-gray-900/50 rounded-2xl border border-gray-800">
                  <h3 className="text-xl font-semibold text-accent-amber mb-2">İşlevsellik Çerezleri</h3>
                  <p>
                    Kullanıcı tercihlerinizi hatırlamak için kullanılır. Örneğin; dil seçimi, konum bilgisi, 
                    yazı boyutu gibi kişiselleştirme ayarlarını saklar.
                  </p>
                </div>

                <div className="p-6 bg-gray-900/50 rounded-2xl border border-gray-800">
                  <h3 className="text-xl font-semibold text-accent-amber mb-2">Hedefleme/Reklam Çerezleri</h3>
                  <p>
                    İlgi alanlarınıza uygun reklam gösterilmesi için kullanılır. Aynı reklamın tekrar 
                    gösterilmesini önler ve reklam kampanyalarının etkinliğini ölçer.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Çerezleri Nasıl Kontrol Edebilirsiniz?</h2>
              <p className="mb-4">
                Çerez tercihlerinizi tarayıcı ayarlarınızdan değiştirebilirsiniz. Çoğu tarayıcı, çerezleri 
                otomatik olarak kabul edecek şekilde ayarlanmıştır ancak:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Tüm çerezleri engelleyebilirsiniz</li>
                <li>Yalnızca üçüncü taraf çerezleri engelleyebilirsiniz</li>
                <li>Çerezleri her seferinde kabul etmek veya reddetmek için uyarı alabilirsiniz</li>
                <li>Mevcut çerezleri silebilirsiniz</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Google Analytics</h2>
              <p>
                Web sitemizde Google Analytics kullanıyoruz. Google Analytics, ziyaretçilerin siteyi nasıl 
                kullandığını anlamamıza yardımcı olan bir web analitik hizmetidir. Toplanan veriler anonim 
                olup kişisel kimlik bilgilerinizi içermez.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">İletişim</h2>
              <p>
                Çerez politikamız hakkında sorularınız varsa, bizimle iletişime geçebilirsiniz:
              </p>
              <p className="mt-4">
                <strong>E-posta:</strong>{" "}
                <a href="mailto:iletisim@etkinium.com" className="text-accent-amber hover:underline">
                  iletisim@etkinium.com
                </a>
              </p>
            </section>

            <section className="pt-8 border-t border-gray-800">
              <p className="text-sm text-gray-500">
                Bu çerez politikası en son 09 Kasım 2025 tarihinde güncellenmiştir. Çerez kullanımımızda 
                değişiklik olması durumunda bu sayfayı güncelleyeceğiz.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

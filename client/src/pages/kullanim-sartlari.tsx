import Header from "@/components/header";
import Footer from "@/components/footer";

export default function KullanimSartlari() {
  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
              <span className="text-white">Kullanım</span>
              <span className="text-accent-amber ml-4">Şartları</span>
            </h1>
            
            <div className="prose prose-invert max-w-none">
              <div className="bg-gray-900/50 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-semibold text-accent-amber mb-6">Kullanım Şartları</h2>
                
                <div className="text-gray-300 space-y-6 leading-relaxed">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                        <span className="w-2 h-2 bg-accent-amber rounded-full"></span>
                        <span>Üyelik</span>
                      </h3>
                      <p>Etkinium'a üye olan herkes, doğru ve güncel bilgiler vermekle yükümlüdür.</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                        <span className="w-2 h-2 bg-accent-amber rounded-full"></span>
                        <span>Hizmetler</span>
                      </h3>
                      <p>Platform üzerinden bilet alımı, satışı, etkinlik görüntüleme, konaklama ve ulaşım hizmetlerine erişim sağlanmaktadır.</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                        <span className="w-2 h-2 bg-accent-amber rounded-full"></span>
                        <span>Sorumluluk</span>
                      </h3>
                      <p>Kullanıcı, siteyi yalnızca yasal amaçlarla kullanacağını kabul eder. Etkinium, üçüncü taraf hizmet sağlayıcıların hatalarından sorumlu tutulamaz.</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                        <span className="w-2 h-2 bg-accent-amber rounded-full"></span>
                        <span>Ücretlendirme</span>
                      </h3>
                      <p>Satın alınan bilet ve hizmetlerin ücretleri, ödeme esnasında kullanıcıya açıkça gösterilmektedir.</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                        <span className="w-2 h-2 bg-accent-amber rounded-full"></span>
                        <span>İptal/İade</span>
                      </h3>
                      <p>Kullanıcı, ilgili etkinlik veya hizmet sağlayıcının iade/iptal politikalarına tabidir. Etkinium bu noktada aracıdır.</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                        <span className="w-2 h-2 bg-accent-amber rounded-full"></span>
                        <span>Haklar</span>
                      </h3>
                      <p>Etkinium, içerikleri ve site işleyişini değiştirme hakkını saklı tutar.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-accent-amber/10 rounded-lg border border-accent-amber/30">
                  <p className="text-accent-amber font-semibold text-lg mb-2">
                    ⚖️ Son Güncelleme
                  </p>
                  <p className="text-gray-300">
                    27 Eylül 2025 - Sorularınız için: iletisim@etkinium.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
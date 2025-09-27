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
                <h2 className="text-2xl font-semibold text-accent-amber mb-4">Genel Şartlar</h2>
                <p className="text-gray-300 mb-6">
                  ETKİNİUM platformunu kullanarak aşağıdaki şart ve koşulları kabul etmiş olursunuz.
                </p>
                
                <h3 className="text-xl font-semibold text-white mb-3">1. Hesap Oluşturma</h3>
                <p className="text-gray-300 mb-4">
                  Platform üyeliği için doğru ve güncel bilgiler vermeniz gerekmektedir. 
                  Hesap güvenliğinden siz sorumlusunuz.
                </p>

                <h3 className="text-xl font-semibold text-white mb-3">2. Hizmet Kullanımı</h3>
                <ul className="text-gray-300 mb-4 space-y-2">
                  <li>• Platformu yasal amaçlar için kullanabilirsiniz</li>
                  <li>• Telif haklarını ihlal eden içerik paylaşamazsınız</li>
                  <li>• Diğer kullanıcılara saygılı davranmalısınız</li>
                  <li>• Spam veya zararlı içerik üretemezsiniz</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3">3. Ödeme ve İptal</h3>
                <p className="text-gray-300 mb-4">
                  Premium üyelikler aylık veya yıllık olarak faturalandırılır. 
                  İptal işlemleri hesap ayarlarından yapılabilir.
                </p>

                <h3 className="text-xl font-semibold text-white mb-3">4. Sorumluluk</h3>
                <p className="text-gray-300 mb-4">
                  ETKİNİUM, hizmet kesintileri veya kullanıcı kaynaklı sorunlardan 
                  sorumlu tutulamaz.
                </p>

                <h3 className="text-xl font-semibold text-white mb-3">5. Değişiklikler</h3>
                <p className="text-gray-300 mb-4">
                  Bu şartlar zaman zaman güncellenebilir. Önemli değişiklikler 
                  kullanıcılara bildirilecektir.
                </p>

                <div className="mt-8 p-4 bg-accent-amber/10 rounded-lg border border-accent-amber/30">
                  <p className="text-accent-amber font-semibold">
                    ⚖️ Son Güncelleme: 27 Eylül 2025
                  </p>
                  <p className="text-gray-300 mt-2">
                    Sorularınız için: iletisim@etkinium.com
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
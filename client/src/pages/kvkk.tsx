import Header from "@/components/header";
import Footer from "@/components/footer";

export default function KVKK() {
  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
              <span className="text-white">KVKK</span>
              <span className="text-accent-amber ml-4">Aydınlatma Metni</span>
            </h1>
            
            <div className="prose prose-invert max-w-none">
              <div className="bg-gray-900/50 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-semibold text-accent-amber mb-4">Kişisel Verilerin Korunması</h2>
                <p className="text-gray-300 mb-6">
                  ETKİNİUM olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında 
                  kişisel verilerinizin güvenliği bizim için son derece önemlidir.
                </p>
                
                <h3 className="text-xl font-semibold text-white mb-3">Veri Sorumlusu</h3>
                <p className="text-gray-300 mb-4">
                  ETKİNİUM, kişisel verilerinizin işlenmesine ilişkin amaçları ve vasıtaları belirleyen 
                  veri sorumlusu sıfatıyla faaliyet göstermektedir.
                </p>

                <h3 className="text-xl font-semibold text-white mb-3">Toplanan Veriler</h3>
                <ul className="text-gray-300 mb-4 space-y-2">
                  <li>• Ad, soyad ve iletişim bilgileri</li>
                  <li>• E-posta adresi</li>
                  <li>• Kullanım tercihleri ve davranış verileri</li>
                  <li>• IP adresi ve çerez verileri</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3">İşleme Amaçları</h3>
                <ul className="text-gray-300 mb-4 space-y-2">
                  <li>• Hizmet sunumu ve geliştirme</li>
                  <li>• Müşteri memnuniyeti ve destek</li>
                  <li>• Pazarlama ve kampanya faaliyetleri</li>
                  <li>• Yasal yükümlülüklerin yerine getirilmesi</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3">Haklarınız</h3>
                <p className="text-gray-300 mb-4">
                  KVKK kapsamında kişisel verilerinize ilişkin bilgi talep etme, düzeltme, silme ve 
                  işlemeye itiraz etme haklarınız bulunmaktadır.
                </p>

                <div className="mt-8 p-4 bg-accent-amber/10 rounded-lg border border-accent-amber/30">
                  <p className="text-accent-amber font-semibold">
                    📧 İletişim: iletisim@etkinium.com
                  </p>
                  <p className="text-gray-300 mt-2">
                    Kişisel verilerinizle ilgili sorularınız için bizimle iletişime geçebilirsiniz.
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
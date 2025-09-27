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
                <h2 className="text-2xl font-semibold text-accent-amber mb-6">Kişisel Verilerin Korunması</h2>
                
                <div className="text-gray-300 space-y-6 leading-relaxed">
                  <p>
                    ETKİNİUM olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında 
                    kişisel verilerinizin güvenliğini önemsiyoruz. Bu kapsamda;
                  </p>
                  
                  <p>
                    Kişisel verileriniz (ad, soyad, e-posta, telefon numarası, ödeme bilgileri vb.), 
                    yalnızca üyelik işlemleri, bilet alım-satım süreçleri, kampanya ve avantajlardan 
                    yararlanmanız amacıyla işlenmektedir.
                  </p>
                  
                  <p>
                    Verileriniz, kanuni yükümlülüklerimiz ve hizmetin gereklilikleri dışında kesinlikle 
                    üçüncü kişilerle paylaşılmamaktadır.
                  </p>
                  
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-white mb-4">KVKK kapsamında veri sahibi olarak haklarınız:</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-accent-amber rounded-full mt-3 flex-shrink-0"></span>
                        <span>Kişisel verilerinizin işlenip işlenmediğini öğrenme,</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-accent-amber rounded-full mt-3 flex-shrink-0"></span>
                        <span>İşlenmişse bilgi talep etme,</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-accent-amber rounded-full mt-3 flex-shrink-0"></span>
                        <span>Yanlış veya eksik işlenmişse düzeltilmesini isteme,</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-accent-amber rounded-full mt-3 flex-shrink-0"></span>
                        <span>Silinmesini veya anonim hale getirilmesini talep etme,</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-accent-amber rounded-full mt-3 flex-shrink-0"></span>
                        <span>Yurt dışına aktarılıp aktarılmadığını öğrenme,</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-accent-amber rounded-full mt-3 flex-shrink-0"></span>
                        <span>İşlenmesine itiraz etme haklarınız bulunmaktadır.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-accent-amber/10 rounded-lg border border-accent-amber/30">
                  <p className="text-accent-amber font-semibold text-lg mb-2">
                    📧 İletişim
                  </p>
                  <p className="text-gray-300">
                    Talepleriniz için bizimle iletisim@etkinium.com üzerinden iletişime geçebilirsiniz.
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
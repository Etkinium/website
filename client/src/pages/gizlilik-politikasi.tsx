import Header from "@/components/header";
import Footer from "@/components/footer";

export default function GizlilikPolitikasi() {
  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
              <span className="text-white">Gizlilik</span>
              <span className="text-accent-amber ml-4">Politikası</span>
            </h1>
            
            <div className="prose prose-invert max-w-none">
              <div className="bg-gray-900/50 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-semibold text-accent-amber mb-6">Gizlilik Politikası</h2>
                
                <div className="text-gray-300 space-y-6 leading-relaxed">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-accent-amber rounded-full mt-3 flex-shrink-0"></span>
                      <p>Etkinium, kullanıcıların kişisel bilgilerini gizli tutmayı taahhüt eder.</p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-accent-amber rounded-full mt-3 flex-shrink-0"></span>
                      <p>Toplanan veriler yalnızca üyelik, kampanya, ödeme ve müşteri destek hizmetleri için kullanılmaktadır.</p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-accent-amber rounded-full mt-3 flex-shrink-0"></span>
                      <p>Çerezler (cookies), kullanıcı deneyimini iyileştirmek için kullanılmaktadır. Kullanıcı dilerse tarayıcı ayarlarından çerezleri kapatabilir.</p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-accent-amber rounded-full mt-3 flex-shrink-0"></span>
                      <p>Kullanıcı bilgileri, kanunen gerekmedikçe üçüncü kişilerle paylaşılmaz.</p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-accent-amber rounded-full mt-3 flex-shrink-0"></span>
                      <p>Veri güvenliği için gerekli teknik ve idari tedbirler alınmaktadır.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-accent-amber/10 rounded-lg border border-accent-amber/30">
                  <p className="text-accent-amber font-semibold text-lg mb-2">
                    🔒 Güvenlik Taahhüdü
                  </p>
                  <p className="text-gray-300">
                    Verileriniz bizim için değerlidir. Gizlilik ile ilgili sorularınız için: iletisim@etkinium.com
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
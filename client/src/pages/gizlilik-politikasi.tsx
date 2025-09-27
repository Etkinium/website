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
                <h2 className="text-2xl font-semibold text-accent-amber mb-4">Gizlilik Taahhüdümüz</h2>
                <p className="text-gray-300 mb-6">
                  ETKİNİUM olarak gizliliğinize saygı duyuyor ve kişisel verilerinizi 
                  en üst düzeyde koruma altına alıyoruz.
                </p>
                
                <h3 className="text-xl font-semibold text-white mb-3">Bilgi Toplama</h3>
                <p className="text-gray-300 mb-4">
                  Size daha iyi hizmet verebilmek için aşağıdaki bilgileri topluyoruz:
                </p>
                <ul className="text-gray-300 mb-4 space-y-2">
                  <li>• Kayıt sırasında verdiğiniz kişisel bilgiler</li>
                  <li>• Platform kullanım verileri ve tercihleri</li>
                  <li>• Çerez ve benzeri teknolojilerle toplanan veriler</li>
                  <li>• İletişim geçmişi ve destek talepleri</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3">Bilgi Kullanımı</h3>
                <ul className="text-gray-300 mb-4 space-y-2">
                  <li>• Hizmet kalitesini artırmak</li>
                  <li>• Kişiselleştirilmiş deneyim sunmak</li>
                  <li>• Güvenlik ve dolandırıcılık önlemi</li>
                  <li>• Yasal gereklilikleri karşılamak</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3">Veri Paylaşımı</h3>
                <p className="text-gray-300 mb-4">
                  Kişisel verilerinizi üçüncü taraflarla paylaşmıyoruz. 
                  Yalnızca yasal zorunluluklar doğrultusunda paylaşım yapılabilir.
                </p>

                <h3 className="text-xl font-semibold text-white mb-3">Çerezler</h3>
                <p className="text-gray-300 mb-4">
                  Web sitemizde kullanıcı deneyimini iyileştirmek için çerezler kullanıyoruz. 
                  Çerez tercihlerinizi tarayıcı ayarlarından yönetebilirsiniz.
                </p>

                <h3 className="text-xl font-semibold text-white mb-3">Veri Güvenliği</h3>
                <p className="text-gray-300 mb-4">
                  Verilerinizi korumak için endüstri standardı güvenlik önlemleri 
                  ve şifreleme teknolojileri kullanıyoruz.
                </p>

                <div className="mt-8 p-4 bg-accent-amber/10 rounded-lg border border-accent-amber/30">
                  <p className="text-accent-amber font-semibold">
                    🔒 Güvenlik: Verileriniz bizim için değerlidir
                  </p>
                  <p className="text-gray-300 mt-2">
                    Gizlilik ile ilgili sorularınız: iletisim@etkinium.com
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
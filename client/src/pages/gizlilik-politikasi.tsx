import Header from "@/components/header";
import Footer from "@/components/footer";
import { Lock } from "lucide-react";

export default function GizlilikPolitikasi() {
  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <Header />
      
      <main className="pt-32 pb-20 px-4 md:px-20 lg:px-32">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-accent-amber/10 border border-accent-amber/20">
              <Lock className="w-8 h-8 text-accent-amber" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="text-accent-amber">Gizlilik</span> Politikası
            </h1>
          </div>

          <div className="space-y-8 text-gray-300">
            <section>
              <p className="text-lg mb-4">
                <strong>Son Güncellenme:</strong> 09 Kasım 2025
              </p>
              <p>
                ETKİNİUM olarak kullanıcılarımızın gizliliğine saygı duyuyor ve kişisel bilgilerinizi 
                korumak için gerekli tüm önlemleri alıyoruz. Bu gizlilik politikası, hangi bilgilerin 
                toplandığını ve nasıl kullanıldığını açıklamaktadır.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Toplanan Bilgiler</h2>
              
              <div className="space-y-4">
                <div className="p-6 bg-gray-900/50 rounded-2xl border border-gray-800">
                  <h3 className="text-xl font-semibold text-accent-amber mb-2">Hesap Bilgileri</h3>
                  <p>
                    Kayıt sırasında ad, soyad, e-posta adresi, telefon numarası gibi bilgiler toplanır.
                  </p>
                </div>

                <div className="p-6 bg-gray-900/50 rounded-2xl border border-gray-800">
                  <h3 className="text-xl font-semibold text-accent-amber mb-2">İşlem Bilgileri</h3>
                  <p>
                    Satın aldığınız biletler, etkinlik tercihleri, ödeme bilgileri (güvenli şekilde saklanır) 
                    ve işlem geçmişiniz kaydedilir.
                  </p>
                </div>

                <div className="p-6 bg-gray-900/50 rounded-2xl border border-gray-800">
                  <h3 className="text-xl font-semibold text-accent-amber mb-2">Otomatik Toplanan Bilgiler</h3>
                  <p>
                    IP adresi, tarayıcı türü, cihaz bilgileri, site kullanım verileri ve çerezler 
                    otomatik olarak toplanabilir.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Bilgilerin Kullanım Amaçları</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Hesabınızı oluşturmak ve yönetmek</li>
                <li>Bilet satın alma işlemlerini gerçekleştirmek</li>
                <li>Müşteri desteği sağlamak</li>
                <li>Sipariş ve teslimat bilgilendirmesi yapmak</li>
                <li>Kampanya ve özel teklifler hakkında bilgilendirme (onayınız dahilinde)</li>
                <li>Platform güvenliğini sağlamak ve dolandırıcılığı önlemek</li>
                <li>Hizmet kalitesini artırmak ve kullanıcı deneyimini iyileştirmek</li>
                <li>Yasal yükümlülükleri yerine getirmek</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Bilgi Paylaşımı</h2>
              <p className="mb-4">
                Kişisel bilgileriniz aşağıdaki durumlar dışında üçüncü taraflarla paylaşılmaz:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Hizmet Sağlayıcılar:</strong> Ödeme işlemcileri, bulut depolama sağlayıcıları gibi güvenilir iş ortaklarımız</li>
                <li><strong>Etkinlik Organizatörleri:</strong> Satın aldığınız biletlerin doğrulanması için</li>
                <li><strong>Yasal Zorunluluklar:</strong> Mahkeme kararı veya yasal talep olması durumunda</li>
                <li><strong>İş Transferi:</strong> Şirket birleşmesi veya satışı durumunda</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Veri Güvenliği</h2>
              <div className="space-y-4">
                <p>
                  Kişisel bilgilerinizin güvenliğini sağlamak için endüstri standardı güvenlik önlemleri alıyoruz:
                </p>
                <div className="p-6 bg-gray-900/50 rounded-2xl border border-gray-800">
                  <ul className="list-disc list-inside space-y-2">
                    <li>SSL/TLS şifreleme ile güvenli veri iletimi</li>
                    <li>Ödeme bilgilerinin tokenize edilmesi (ham kart bilgileri saklanmaz)</li>
                    <li>Düzenli güvenlik denetimleri ve güncellemeleri</li>
                    <li>Erişim kontrolü ve yetkilendirme sistemleri</li>
                    <li>Güvenlik duvarları ve izinsiz giriş tespit sistemleri</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Çerezler</h2>
              <p>
                Web sitemizde kullanıcı deneyimini iyileştirmek için çerezler kullanılmaktadır. 
                Çerezler, tarayıcınızda saklanan küçük metin dosyalarıdır. Tarayıcı ayarlarından 
                çerezleri yönetebilir veya engelleyebilirsiniz. Detaylı bilgi için{" "}
                <a href="/cerez-politikasi" className="text-accent-amber hover:underline">
                  Çerez Politikası
                </a> sayfamızı ziyaret edebilirsiniz.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Haklarınız</h2>
              <p className="mb-4">
                Kişisel verileriniz ile ilgili aşağıdaki haklara sahipsiniz:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Hangi kişisel verilerinizi işlediğimizi öğrenme hakkı</li>
                <li>Kişisel verilerinizin bir kopyasını talep etme hakkı</li>
                <li>Yanlış veya eksik bilgilerin düzeltilmesini isteme hakkı</li>
                <li>Belirli şartlar altında verilerinizin silinmesini talep etme hakkı</li>
                <li>Veri işlemeye itiraz etme hakkı</li>
                <li>Pazarlama iletişimlerinden çıkma hakkı</li>
              </ul>
              <p className="mt-4">
                Bu haklarınızı kullanmak için{" "}
                <a href="mailto:iletisim@etkinium.com" className="text-accent-amber hover:underline">
                  iletisim@etkinium.com
                </a>{" "}
                adresinden bizimle iletişime geçebilirsiniz.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Üçüncü Taraf Bağlantılar</h2>
              <p>
                Platformumuzda üçüncü taraf web sitelerine bağlantılar bulunabilir. Bu sitelerin 
                gizlilik politikalarından sorumlu değiliz. Üçüncü taraf siteleri ziyaret ettiğinizde 
                gizlilik politikalarını incelemenizi öneririz.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Çocukların Gizliliği</h2>
              <p>
                Hizmetlerimiz 18 yaş ve üzeri kullanıcılara yöneliktir. 18 yaşından küçük bireylerden 
                bilerek kişisel bilgi toplamıyoruz. Eğer 18 yaşından küçük bir çocuğun bilgilerini 
                topladığımızı fark ederseniz, lütfen derhal bizimle iletişime geçin.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Politika Değişiklikleri</h2>
              <p>
                Gizlilik politikamızı zaman zaman güncelleyebiliriz. Değişiklikler bu sayfada 
                yayınlanacak ve önemli değişiklikler e-posta ile bildirilecektir. Politika 
                güncellemelerini düzenli olarak kontrol etmenizi öneririz.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">İletişim</h2>
              <p>
                Gizlilik politikamız hakkında sorularınız veya endişeleriniz için:
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
                Bu gizlilik politikası en son 09 Kasım 2025 tarihinde güncellenmiştir. 
                Gizlilik uygulamalarımızda değişiklik olması durumunda bu sayfayı güncelleyeceğiz.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

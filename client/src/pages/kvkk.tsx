import Header from "@/components/header";
import Footer from "@/components/footer";
import { Shield } from "lucide-react";

export default function KVKK() {
  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <Header />
      
      <main className="pt-32 pb-20 px-4 md:px-20 lg:px-32">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-accent-amber/10 border border-accent-amber/20">
              <Shield className="w-8 h-8 text-accent-amber" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="text-accent-amber">KVKK</span> Politikası
            </h1>
          </div>

          <div className="space-y-8 text-gray-300">
            <section>
              <p className="text-lg mb-4">
                <strong>Son Güncellenme:</strong> 09 Kasım 2025
              </p>
              <p>
                ETKİNİUM olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında 
                kişisel verilerinizin güvenliği bizim için önceliktir. Bu aydınlatma metni ile 
                kişisel verilerinizin nasıl işlendiğini öğrenebilirsiniz.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Veri Sorumlusu</h2>
              <p>
                Kişisel verileriniz, veri sorumlusu sıfatıyla ETKİNİUM tarafından aşağıda açıklanan 
                kapsamda işlenmektedir.
              </p>
              <div className="mt-4 p-6 bg-gray-900/50 rounded-2xl border border-gray-800">
                <p><strong>İletişim:</strong> iletisim@etkinium.com</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">İşlenen Kişisel Veriler</h2>
              
              <div className="space-y-4">
                <div className="p-6 bg-gray-900/50 rounded-2xl border border-gray-800">
                  <h3 className="text-xl font-semibold text-accent-amber mb-2">Kimlik Bilgileri</h3>
                  <p>
                    Ad, soyad, T.C. kimlik numarası (yasal zorunluluk halinde), doğum tarihi, 
                    cinsiyet gibi bilgiler.
                  </p>
                </div>

                <div className="p-6 bg-gray-900/50 rounded-2xl border border-gray-800">
                  <h3 className="text-xl font-semibold text-accent-amber mb-2">İletişim Bilgileri</h3>
                  <p>
                    E-posta adresi, telefon numarası, adres bilgileri.
                  </p>
                </div>

                <div className="p-6 bg-gray-900/50 rounded-2xl border border-gray-800">
                  <h3 className="text-xl font-semibold text-accent-amber mb-2">Müşteri İşlem Bilgileri</h3>
                  <p>
                    Satın alınan biletler, etkinlik tercihleri, ödeme bilgileri (tokenize şekilde), 
                    işlem geçmişi, ETKİNİUM Puan durumu.
                  </p>
                </div>

                <div className="p-6 bg-gray-900/50 rounded-2xl border border-gray-800">
                  <h3 className="text-xl font-semibold text-accent-amber mb-2">İşlem Güvenliği Bilgileri</h3>
                  <p>
                    IP adresi, çerez kayıtları, kullanıcı oturum bilgileri, cihaz bilgileri.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Kişisel Verilerin İşlenme Amaçları</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Bilet satış işlemlerinin gerçekleştirilmesi</li>
                <li>Kullanıcı hesabı oluşturma ve yönetimi</li>
                <li>Müşteri hizmetleri ve destek sağlanması</li>
                <li>Ödeme işlemlerinin güvenli şekilde gerçekleştirilmesi</li>
                <li>Yasal yükümlülüklerin yerine getirilmesi (fatura, vergi, vb.)</li>
                <li>Platform güvenliğinin sağlanması ve dolandırıcılık tespiti</li>
                <li>Pazarlama ve kampanya bildirimlerinin gönderilmesi (onay dahilinde)</li>
                <li>Site performansının analiz edilmesi ve iyileştirilmesi</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Kişisel Verilerin Aktarımı</h2>
              <p className="mb-4">
                Kişisel verileriniz, yukarıda belirtilen amaçların gerçekleştirilmesi doğrultusunda 
                aşağıdaki taraflara aktarılabilir:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Ödeme hizmeti sağlayıcıları (tokenize kart bilgileri)</li>
                <li>Etkinlik organizatörleri (bilet doğrulama amacıyla)</li>
                <li>Bulut altyapı sağlayıcıları (veri saklama)</li>
                <li>Yasal merciler (yasal zorunluluk halinde)</li>
                <li>İş ortakları (konaklama ve seyahat hizmetleri)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">KVKK Kapsamındaki Haklarınız</h2>
              <p className="mb-4">
                KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                <li>İşlenmişse buna ilişkin bilgi talep etme</li>
                <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
                <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
                <li>KVKK'da öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme</li>
                <li>Yukarıdaki haklarınız kapsamında yapılan işlemlerin, kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme</li>
                <li>İşlenen verilerin münhasıran otomatik sistemler ile analiz edilmesi nedeniyle aleyhinize bir sonuç doğması halinde buna itiraz etme</li>
                <li>Kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız halinde zararın giderilmesini talep etme</li>
              </ul>
              <p className="mt-4">
                Haklarınızı kullanmak için <a href="mailto:iletisim@etkinium.com" className="text-accent-amber hover:underline">iletisim@etkinium.com</a> 
                {" "}adresine başvurabilirsiniz.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Veri Güvenliği</h2>
              <p>
                Kişisel verilerinizin güvenliğini sağlamak için teknik ve idari önlemler alınmaktadır. 
                Veriler şifreli olarak saklanır, yetkisiz erişime karşı korunur ve düzenli olarak 
                güvenlik denetimleri yapılır.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Çocukların Gizliliği</h2>
              <p>
                Platformumuz 18 yaş altındaki kullanıcılara yönelik değildir. 18 yaşından küçük 
                bireylerden bilerek kişisel veri toplamıyoruz. Ebeveyn veya vasi olarak çocuğunuzun 
                izniniz olmadan kişisel veri sağladığını fark ederseniz lütfen bizimle iletişime geçin.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">İletişim</h2>
              <p>
                KVKK politikamız hakkında sorularınız veya talepleriniz için:
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
                Bu KVKK aydınlatma metni en son 09 Kasım 2025 tarihinde güncellenmiştir. 
                Politikamızda değişiklik olması durumunda bu sayfayı güncelleyeceğiz.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

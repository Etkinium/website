import Header from "@/components/header";
import Footer from "@/components/footer";
import { FileText } from "lucide-react";

export default function KullanimSartlari() {
  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <Header />
      
      <main className="pt-32 pb-20 px-4 md:px-20 lg:px-32">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-accent-amber/10 border border-accent-amber/20">
              <FileText className="w-8 h-8 text-accent-amber" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="text-accent-amber">Kullanım</span> Koşulları
            </h1>
          </div>

          <div className="space-y-8 text-gray-300">
            <section>
              <p className="text-lg mb-4">
                <strong>Son Güncellenme:</strong> 09 Kasım 2025
              </p>
              <p>
                ETKİNİUM platformunu kullanarak aşağıdaki kullanım koşullarını kabul etmiş sayılırsınız. 
                Lütfen bu koşulları dikkatlice okuyunuz. Koşulları kabul etmiyorsanız, platformumuzu 
                kullanmamanızı rica ederiz.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Hizmet Tanımı</h2>
              <p className="mb-4">
                ETKİNİUM, etkinlik, konser, tiyatro, festival, konaklama ve seyahat hizmetlerini 
                tek platformda birleştiren Türkiye'nin ilk yapay zeka destekli dijital biletleme 
                ekosistemidir. Platform aracılığıyla:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Etkinlik biletleri satın alabilir</li>
                <li>Konaklama rezervasyonu yapabilir</li>
                <li>Ulaşım biletleri satın alabilir (yakında)</li>
                <li>ETKİNİUM Puan kazanabilir ve kullanabilirsiniz</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Üyelik Koşulları</h2>
              
              <div className="space-y-4">
                <div className="p-6 bg-gray-900/50 rounded-2xl border border-gray-800">
                  <h3 className="text-xl font-semibold text-accent-amber mb-2">Yaş Sınırı</h3>
                  <p>
                    Platformumuzu kullanmak için en az 18 yaşında olmanız gerekmektedir. 18 yaşından 
                    küçükseniz, ebeveyn veya vasinizin onayı ile hizmetlerimizi kullanabilirsiniz.
                  </p>
                </div>

                <div className="p-6 bg-gray-900/50 rounded-2xl border border-gray-800">
                  <h3 className="text-xl font-semibold text-accent-amber mb-2">Hesap Bilgileri</h3>
                  <p>
                    Kayıt sırasında doğru, güncel ve eksiksiz bilgi vermekle yükümlüsünüz. Hesap 
                    bilgilerinizi gizli tutmak ve yetkisiz kullanımı önlemek sizin sorumluluğunuzdadır.
                  </p>
                </div>

                <div className="p-6 bg-gray-900/50 rounded-2xl border border-gray-800">
                  <h3 className="text-xl font-semibold text-accent-amber mb-2">Hesap Güvenliği</h3>
                  <p>
                    Hesabınızın güvenliğinden siz sorumlusunuz. Şifrenizi kimseyle paylaşmayın ve 
                    güçlü bir şifre kullanın. Yetkisiz erişim fark ederseniz derhal bize bildirin.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Bilet Satın Alma</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Tüm bilet satışları nihai satış olarak kabul edilir</li>
                <li>Bilet fiyatları, vergi ve hizmet bedelleri dahil gösterilir</li>
                <li>Satın alınan biletler e-posta ile QR kod olarak gönderilir</li>
                <li>Biletler blockchain tabanlı dinamik QR kod ile güvence altındadır</li>
                <li>Her bilet sadece bir kez kullanılabilir</li>
                <li>Bilet sahtecilik ve dolandırıcılık yasaktır</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Ödeme ve Faturalama</h2>
              <div className="space-y-4">
                <p>
                  Kabul edilen ödeme yöntemleri:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Kredi kartı (Visa, Mastercard, American Express)</li>
                  <li>Banka kartı</li>
                  <li>ETKİNİUM Puan</li>
                </ul>
                <p>
                  Ödeme bilgileriniz PCI-DSS standartlarına uygun şekilde şifrelenir ve saklanır. 
                  Ödeme işleminde hata olması durumunda sipariş iptal edilir ve ücret iade edilir.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. İptal ve İade Politikası</h2>
              <div className="space-y-4">
                <p>
                  İptal ve iade koşulları etkinlik organizatörü tarafından belirlenir. Genel kurallar:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Etkinlik iptal edilirse tam iade yapılır</li>
                  <li>Etkinlik ertelenirse bilet yeni tarihe geçerlidir veya iade alınabilir</li>
                  <li>Kullanıcı kaynaklı iptal taleplerinde organizatörün politikası geçerlidir</li>
                  <li>İade süreleri 7-14 iş günü arasında değişebilir</li>
                </ul>
                <div className="p-6 bg-gray-900/50 rounded-2xl border border-gray-800">
                  <p className="text-accent-amber font-semibold mb-2">Önemli Not:</p>
                  <p>
                    Bilet iptal seçeneklerinde esneklikler mevcut olup, organizatöre göre değişkenlik 
                    göstermektedir. İptal şartlarını satın alma öncesi mutlaka kontrol ediniz.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. ETKİNİUM Puan Sistemi</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Her satın alımda ETKİNİUM Puan kazanırsınız</li>
                <li>Puanlar sonraki alışverişlerde indirim olarak kullanılabilir</li>
                <li>Puan kullanım koşulları ve geçerlilik süresi değişebilir</li>
                <li>Puanlar başka hesaplara transfer edilemez</li>
                <li>İade durumunda kullanılan puanlar hesaba iade edilir</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Yasaklanan Davranışlar</h2>
              <p className="mb-4">
                Platformu kullanırken aşağıdaki davranışlar kesinlikle yasaktır:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Sahte hesap oluşturma veya kimlik hırsızlığı</li>
                <li>Spam, virüs veya zararlı yazılım yayma</li>
                <li>Platform güvenliğini tehdit edici faaliyetler</li>
                <li>Bilet karaborsacılığı veya haksız fiyat artırımı</li>
                <li>Botlar veya otomatik sistemlerle haksız avantaj sağlama</li>
                <li>Başkalarının hesaplarına yetkisiz erişim</li>
                <li>Platformun tersine mühendisliği veya kopyalanması</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Fikri Mülkiyet Hakları</h2>
              <p>
                ETKİNİUM platformundaki tüm içerik, tasarım, logo, yazılım ve materyaller 
                ETKİNİUM'un mülkiyetindedir ve telif hakkı yasalarıyla korunmaktadır. 
                İzinsiz kullanım, kopyalama veya dağıtım yasaktır.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Sorumluluk Sınırlaması</h2>
              <div className="space-y-4">
                <p>
                  ETKİNİUM, aşağıdaki durumlardan sorumlu tutulamaz:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Etkinlik organizatörlerinin iptal, değişiklik veya kalite sorunları</li>
                  <li>Konaklama ve seyahat hizmeti sağlayıcılarının hataları</li>
                  <li>Kullanıcı hatalarından kaynaklanan sorunlar</li>
                  <li>İnternet bağlantısı veya teknik aksaklıklar</li>
                  <li>Mücbir sebepler (doğal afet, pandemi, vb.)</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. Değişiklikler ve Güncellemeler</h2>
              <p>
                ETKİNİUM, kullanım koşullarını ve hizmetlerini herhangi bir zamanda değiştirme 
                hakkını saklı tutar. Önemli değişiklikler e-posta ile bildirilecektir. 
                Değişiklikler yayınlandıktan sonra platformu kullanmaya devam etmeniz, 
                yeni koşulları kabul ettiğiniz anlamına gelir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. Hesap Kapatma</h2>
              <p>
                ETKİNİUM, kullanım koşullarını ihlal eden hesapları uyarı vermeksizin askıya 
                alma veya kalıcı olarak kapatma hakkını saklı tutar. Hesabınızı kendiniz kapatmak 
                isterseniz müşteri hizmetleri ile iletişime geçebilirsiniz.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">12. Uygulanacak Hukuk</h2>
              <p>
                Bu kullanım koşulları Türkiye Cumhuriyeti yasalarına tabidir. Herhangi bir 
                uyuşmazlık durumunda İstanbul mahkemeleri ve icra daireleri yetkilidir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">İletişim</h2>
              <p>
                Kullanım koşulları hakkında sorularınız için:
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
                Bu kullanım koşulları en son 09 Kasım 2025 tarihinde güncellenmiştir. 
                Koşullarımızda değişiklik olması durumunda bu sayfayı güncelleyeceğiz.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

import Header from "@/components/header";
import Footer from "@/components/footer";

export default function About() {
  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 mt-16 bg-gradient-to-br from-spotify-black via-gray-900 to-spotify-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="text-white">ETKİNİUM</span>
              <span className="text-accent-amber ml-4">Hakkında</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Dijital eğlence dünyasında yeni bir çağ başlatıyoruz
            </p>
          </div>
        </div>
      </section>

      {/* About Content Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6 text-accent-amber">Vizyonumuz</h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  Dijital dünyanın sınırlarını zorlayarak, insanların hayatına 
                  değer katan deneyimler yaratıyoruz. Her kullanıcıya özel, 
                  benzersiz ve unutulmaz anlar sunmak için var oluyoruz.
                </p>
                
                <h3 className="text-3xl font-bold mb-6 text-accent-amber">Misyonumuz</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Kaliteden ödün vermeden, her detayda mükemmelliği hedefleyerek 
                  kullanıcılarımızın beklentilerini aşmayı amaçlıyoruz. 
                  Geleceğin trendsetterleri olmaya kararlıyız.
                </p>
              </div>
              
              <div className="space-y-8">
                <div 
                  className="bg-gray-800 rounded-2xl p-8 h-64"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}
                >
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <h4 className="text-2xl font-bold mb-4 text-white">Yaratıcılık</h4>
                      <p className="text-gray-300">
                        Sınırları zorlayan yaratıcı çözümlerle geleceği şekillendiriyoruz
                      </p>
                    </div>
                  </div>
                </div>
                
                <div 
                  className="bg-gray-800 rounded-2xl p-8 h-64"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}
                >
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <h4 className="text-2xl font-bold mb-4 text-white">İnovasyon</h4>
                      <p className="text-gray-300">
                        Teknoloji ve sanatı harmanlayarak yeni deneyimler yaratıyoruz
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <div className="bg-gray-800 rounded-2xl p-8">
                <h4 className="text-3xl font-bold mb-6 text-accent-amber">Geleceğe Bakış</h4>
                <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
                  Çok yakında sizlerle paylaşacağımız yenilikler, sektörde çığır açacak. 
                  Hazır olun, çünkü ETKİNİUM ile tanışacağınız deneyim, 
                  beklentilerinizi tamamen değiştirecek...
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
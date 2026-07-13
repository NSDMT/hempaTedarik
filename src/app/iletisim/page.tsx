import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata = { title: "İletişim | Hempa Tedarik" };

export default function IletisimPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-orange-500 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-black">İletişim</h1>
          <p className="mt-2 text-orange-100">Size nasıl yardımcı olabiliriz?</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-xl font-bold text-gray-900">İletişim Bilgileri</h2>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Adres</p>
                  <p className="text-gray-600 text-sm mt-1">Atatürk Cad. No:123<br />Merkez / İstanbul</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Telefon</p>
                  <a href="tel:08501234567" className="text-orange-500 hover:underline text-sm mt-1 block">
                    0850 123 45 67
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">E-posta</p>
                  <a href="mailto:info@hempatedarik.com" className="text-orange-500 hover:underline text-sm mt-1 block">
                    info@hempatedarik.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Çalışma Saatleri</p>
                  <p className="text-gray-600 text-sm mt-1">
                    Pazartesi – Cuma: 09:00 – 18:00<br />
                    Cumartesi: 09:00 – 14:00
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Sıkça Sorulan Sorular</h2>
            <div className="space-y-4 text-sm text-gray-700">
              {[
                { q: "Kargo ne kadar sürer?", a: "Standart teslimat 1–3 iş günüdür. Aynı gün kargo seçeneği için bizi arayın." },
                { q: "Ücretsiz kargo var mı?", a: "500₺ ve üzeri siparişlerde kargo ücretsizdir." },
                { q: "İade süreci nasıl işler?", a: "30 gün içinde iade talebinizi iletişime geçerek başlatabilirsiniz." },
                { q: "Toplu sipariş indirimi var mı?", a: "Toplu siparişler için bizimle iletişime geçin, özel fiyat sunalım." },
              ].map((faq) => (
                <div key={faq.q} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <p className="font-semibold text-gray-900 mb-1">{faq.q}</p>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

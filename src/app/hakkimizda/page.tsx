import Link from "next/link";

export const metadata = { title: "Hakkımızda | Hempa Tedarik" };

export default function HakkimizdaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-orange-500 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-black">Hakkımızda</h1>
          <p className="mt-2 text-orange-100">Hempa Tedarik — Türkiye'nin güvenilir ofis tedarik noktası</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Biz Kimiz?</h2>
            <p>
              Hempa Tedarik, ofis, işyeri ve ev ihtiyaçlarınız için 2.000'den fazla ürünü uygun
              fiyatlarla sunan bir e-ticaret platformudur. Müşterilerimize kaliteli ürünleri hızlı
              teslimat ve güvenli alışveriş güvencesiyle ulaştırmak temel önceliğimizdir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Misyonumuz</h2>
            <p>
              İş hayatının her anında yanınızda olmak, ihtiyaçlarınızı tek bir platformdan
              karşılamanızı sağlamak ve en kaliteli ürünleri en rekabetçi fiyatlarla sunmak.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Neden Hempa Tedarik?</h2>
            <ul className="space-y-2">
              {[
                "2.000+ çeşit ürün stoku",
                "Aynı gün kargo imkânı (belirli bölgeler)",
                "500₺ ve üzeri alışverişlerde ücretsiz kargo",
                "256-bit SSL şifreleme ile güvenli ödeme",
                "30 gün koşulsuz iade garantisi",
                "7/24 müşteri desteği",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="pt-4">
            <Link href="/iletisim" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors inline-block">
              Bize Ulaşın
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

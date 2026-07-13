export const metadata = { title: "İade Koşulları | Hempa Tedarik" };

export default function IadeKosullariPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-orange-500 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-black">İade ve İptal Koşulları</h1>
          <p className="mt-2 text-orange-100">30 gün koşulsuz iade garantisi</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-8">

          {/* İade Süreci */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">İade Süreci</h2>
            <ol className="space-y-3 text-gray-700">
              {[
                "Ürünü teslim aldıktan sonra 30 gün içinde iade talebini başlatın.",
                "info@hempatedarik.com adresine sipariş numaranızı ve iade nedeninizi bildirin.",
                "Size iade kargo kodu gönderilecektir (kargo ücreti tarafımızdan karşılanır).",
                "Ürün tarafımıza ulaştıktan sonra 3–5 iş günü içinde ödemeniz iade edilir.",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* İade Koşulları */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">İade Edilebilecek Ürünler</h2>
            <ul className="space-y-2 text-gray-700">
              {[
                "Orijinal ambalajında, kullanılmamış ve hasarsız ürünler",
                "Tüm aksesuarları ve belgeleri tam olan ürünler",
                "Teslimat tarihinden itibaren 30 gün içinde iade talebinde bulunulan ürünler",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-green-500 font-bold mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* İade Edilemeyecek Ürünler */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">İade Edilemeyen Ürünler</h2>
            <ul className="space-y-2 text-gray-700">
              {[
                "Kullanılmış veya ambalajı açılmış hijyen ürünleri",
                "Kişiselleştirilmiş / özel sipariş ürünler",
                "Fatura tarihi üzerinden 30 günü geçmiş ürünler",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-red-500 font-bold mt-0.5">✗</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
            <p className="text-sm text-orange-800 font-medium">
              İade ve iptal işlemleriniz için: <a href="mailto:info@hempatedarik.com" className="underline">info@hempatedarik.com</a> ya da <a href="tel:08501234567" className="underline">0850 123 45 67</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

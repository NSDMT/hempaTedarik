export const metadata = { title: "Kullanım Şartları | Hempa Tedarik" };

export default function KullanimSartlariPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-orange-500 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-black">Kullanım Şartları</h1>
          <p className="mt-2 text-orange-100">Son güncelleme: Temmuz 2026</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 prose prose-gray max-w-none">
          <h2>1. Genel Hükümler</h2>
          <p>hempatedarik.com web sitesini kullanarak aşağıdaki kullanım şartlarını kabul etmiş sayılırsınız. Bu şartları kabul etmiyorsanız siteyi kullanmayınız.</p>

          <h2>2. Üyelik ve Hesap Güvenliği</h2>
          <ul>
            <li>Üyelik 18 yaş ve üzeri kişilere açıktır.</li>
            <li>Hesap bilgilerinizin güvenliğinden siz sorumlusunuz.</li>
            <li>Doğru ve güncel bilgi girmeniz zorunludur.</li>
          </ul>

          <h2>3. Sipariş ve Ödeme</h2>
          <ul>
            <li>Siparişler stok durumuna göre onaylanır.</li>
            <li>Fiyatlar KDV dahildir ve önceden haber verilmeksizin değiştirilebilir.</li>
            <li>Ödeme İyzico altyapısı üzerinden güvenli olarak alınır.</li>
          </ul>

          <h2>4. Teslimat</h2>
          <p>Siparişler, onaylanmasının ardından 1–3 iş günü içinde kargoya verilir. Teslimat süreleri kargo firmasının yoğunluğuna göre değişebilir.</p>

          <h2>5. Sorumluluk Sınırlaması</h2>
          <p>Hempa Tedarik, ürün açıklamalarının doğruluğu için azami özeni göstermekle birlikte, yazım hatalarından kaynaklanan fiyat/özellik farklılıklarından doğan zararlardan sorumlu değildir.</p>

          <h2>6. Fikri Mülkiyet</h2>
          <p>Sitedeki tüm içerik, logo, tasarım ve kodlar Hempa Tedarik'e aittir. İzinsiz kullanım hukuki işleme tabidir.</p>

          <h2>7. İletişim</h2>
          <p>Şartlar hakkındaki sorularınız için: <strong>info@hempatedarik.com</strong></p>
        </div>
      </div>
    </div>
  );
}

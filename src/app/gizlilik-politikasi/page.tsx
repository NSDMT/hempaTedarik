export const metadata = { title: "Gizlilik Politikası | Hempa Tedarik" };

export default function GizlilikPolitikasiPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-orange-500 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-black">Gizlilik Politikası</h1>
          <p className="mt-2 text-orange-100">Son güncelleme: Temmuz 2026</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 prose prose-gray max-w-none">
          <h2>1. Veri Sorumlusu</h2>
          <p>Hempa Tedarik olarak, kişisel verilerinizin güvenliği ve gizliliği konusunda azami hassasiyeti göstermekteyiz. Bu politika, sitemizi ziyaret ettiğinizde ve alışveriş yaptığınızda hangi kişisel verilerin toplandığını ve bu verilerin nasıl kullanıldığını açıklar.</p>

          <h2>2. Toplanan Kişisel Veriler</h2>
          <ul>
            <li>Ad, soyad ve iletişim bilgileri (e-posta, telefon, adres)</li>
            <li>Sipariş ve ödeme bilgileri</li>
            <li>Tarayıcı ve cihaz bilgileri (çerezler aracılığıyla)</li>
            <li>Site kullanım davranışları</li>
          </ul>

          <h2>3. Verilerin Kullanım Amaçları</h2>
          <ul>
            <li>Siparişlerinizin işlenmesi ve teslimatı</li>
            <li>Müşteri hizmetleri ve destek sağlanması</li>
            <li>Yasal yükümlülüklerin yerine getirilmesi</li>
            <li>Site güvenliği ve hizmet kalitesinin artırılması</li>
          </ul>

          <h2>4. Verilerin Paylaşımı</h2>
          <p>Kişisel verileriniz, açık rızanız olmaksızın üçüncü taraflarla paylaşılmaz. Yalnızca ödeme altyapısı (İyzico) ve kargo firmalarıyla sipariş işlemleri kapsamında zorunlu bilgi paylaşımı yapılır.</p>

          <h2>5. Veri Güvenliği</h2>
          <p>Verileriniz 256-bit SSL şifreleme ile korunmaktadır. Ödeme bilgileriniz tarafımızca saklanmaz; İyzico'nun güvenli altyapısında işlenir.</p>

          <h2>6. Çerezler</h2>
          <p>Sitemiz, oturum yönetimi ve kullanıcı deneyimini iyileştirmek amacıyla çerez kullanmaktadır. Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz.</p>

          <h2>7. Haklarınız</h2>
          <p>KVKK kapsamında kişisel verilerinize erişim, düzeltme, silme veya işlemeyi kısıtlama hakkına sahipsiniz. Talepleriniz için: <strong>info@hempatedarik.com</strong></p>
        </div>
      </div>
    </div>
  );
}

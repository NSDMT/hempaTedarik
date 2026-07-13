export const metadata = { title: "KVKK Aydınlatma Metni | Hempa Tedarik" };

export default function KvkkPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-orange-500 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-black">KVKK Aydınlatma Metni</h1>
          <p className="mt-2 text-orange-100">6698 Sayılı Kişisel Verilerin Korunması Kanunu</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 prose prose-gray max-w-none">
          <h2>Veri Sorumlusu</h2>
          <p>6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, Hempa Tedarik ("Şirket") veri sorumlusu sıfatıyla aşağıdaki aydınlatmayı yapar.</p>

          <h2>İşlenen Kişisel Veriler</h2>
          <ul>
            <li><strong>Kimlik bilgileri:</strong> Ad, soyad</li>
            <li><strong>İletişim bilgileri:</strong> E-posta adresi, telefon numarası, teslimat adresi</li>
            <li><strong>Finansal bilgiler:</strong> Sipariş tutarı, ödeme yöntemi (kart bilgileri tarafımızca saklanmaz)</li>
            <li><strong>İşlem güvenliği bilgileri:</strong> IP adresi, çerez verileri</li>
          </ul>

          <h2>Kişisel Veri İşleme Amaçları</h2>
          <ul>
            <li>Sipariş alınması, işlenmesi ve teslimatın gerçekleştirilmesi</li>
            <li>Müşteri ilişkileri yönetimi ve destek hizmetleri</li>
            <li>Yasal ve idari yükümlülüklerin yerine getirilmesi</li>
            <li>Dolandırıcılık önleme ve bilgi güvenliğinin sağlanması</li>
          </ul>

          <h2>Kişisel Verilerin Aktarımı</h2>
          <p>Kişisel verileriniz yalnızca şu taraflarla ve belirtilen amaçlar doğrultusunda paylaşılabilir:</p>
          <ul>
            <li>Kargo ve lojistik firmaları (teslimat için)</li>
            <li>Ödeme kuruluşu İyzico A.Ş. (ödeme işlemleri için)</li>
            <li>Yasal zorunluluk halinde kamu kurum ve kuruluşları</li>
          </ul>

          <h2>Kişisel Veri Saklama Süreleri</h2>
          <p>Kişisel verileriniz, işlenme amacının ortadan kalkmasıyla birlikte ya da ilgili mevzuatta öngörülen süre sonunda silinir, yok edilir veya anonim hale getirilir.</p>

          <h2>Veri Sahibinin Hakları (KVKK Madde 11)</h2>
          <ul>
            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
            <li>İşlenmişse buna ilişkin bilgi talep etme</li>
            <li>Yanlış verilerin düzeltilmesini isteme</li>
            <li>Kanundaki şartlar dahilinde silinmesini ya da yok edilmesini isteme</li>
            <li>Verilerinizin aktarıldığı üçüncü kişilere bildirim yapılmasını talep etme</li>
            <li>Otomatik sistemlerle analiz edilmesi nedeniyle aleyhinize çıkan karara itiraz etme</li>
            <li>Hukuka aykırı işlenmesi nedeniyle uğradığınız zararın tazminini talep etme</li>
          </ul>

          <h2>Başvuru Yolu</h2>
          <p>
            KVKK kapsamındaki haklarınızı kullanmak için{" "}
            <strong>info@hempatedarik.com</strong> adresine e-posta gönderebilir ya da{" "}
            <strong>0850 123 45 67</strong> numaralı telefonu arayabilirsiniz.
            Talepleriniz en geç 30 gün içinde sonuçlandırılacaktır.
          </p>
        </div>
      </div>
    </div>
  );
}

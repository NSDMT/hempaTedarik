# Hempa Tedarik — Site Yönetici Kullanım Kılavuzu

**Site Adresi:** https://hempatedarik.com  
**Admin Paneli:** https://hempatedarik.com/admin  
**Versiyon:** 1.0 — Temmuz 2026

---

## İÇİNDEKİLER

1. [Giriş Yapma](#1-giriş-yapma)
2. [Admin Panel Genel Bakış](#2-admin-panel-genel-bakış)
3. [Ürün Yönetimi](#3-ürün-yönetimi)
4. [Kategori Yönetimi](#4-kategori-yönetimi)
5. [Banner / Slider Yönetimi](#5-banner--slider-yönetimi)
6. [Sipariş Yönetimi](#6-sipariş-yönetimi)
7. [Müşteri Deneyimi — Alışveriş Akışı](#7-müşteri-deneyimi--alışveriş-akışı)
8. [Sık Sorulan Sorular](#8-sık-sorulan-sorular)

## 1. Giriş Yapma

**Adres:** https://hempatedarik.com/giris

| Alan | Değer |
|---|---|
| E-posta | admin@hempatedarik.com |
| Şifre | Admin123! |

Giriş yaptıktan sonra sağ üstteki hesap menüsünden **Admin Panel** bağlantısına tıklayın  
ya da doğrudan https://hempatedarik.com/admin adresine gidin.

---

## 2. Admin Panel Genel Bakış

Sol kenar çubuğunda 4 bölüm bulunur:

| Menü | Açıklama |
|---|---|
| 📊 **Dashboard** | Özet istatistikler |
| 📦 **Ürünler** | Ürün ekleme, düzenleme, silme |
| 🗂️ **Kategoriler** | Kategori ağacı yönetimi |
| 🖼️ **Bannerlar** | Ana sayfa slider ve promo bantları |
| 🛒 **Siparişler** | Sipariş takibi ve durum güncelleme |

---

## 3. Ürün Yönetimi

**Adres:** https://hempatedarik.com/admin/urunler

### 3.1 Yeni Ürün Ekleme

1. Sağ üstteki **"+ Yeni Ürün"** butonuna tıklayın.
2. Açılan formda şu alanları doldurun:

| Alan | Zorunlu | Açıklama |
|---|---|---|
| **Ürün Adı** | ✅ | Sitede görünecek tam isim |
| **Kategori** | ✅ | Açılır listeden seçin |
| **Fiyat (₺)** | ✅ | Satış fiyatı (örn: 89.90) |
| **Karşılaştırma Fiyatı** | ❌ | Üstü çizili eski fiyat. Girilirse otomatik indirim etiketi çıkar |
| **Stok** | ✅ | Kaç adet stokta var (0 girilirse "Stokta Yok" görünür) |
| **SKU / Stok Kodu** | ❌ | İç takip kodu (örn: PLT-G2-MV-12) |
| **Açıklama** | ❌ | Ürün detay sayfasında görünür |
| **Aktif** | ✅ | Kapalıysa ürün sitede görünmez |
| **Öne Çıkan** | ❌ | Ana sayfada "Öne Çıkan Ürünler" bölümüne eklenir |

3. **Fotoğraf Ekleme** (iki yöntem):

   **A) URL ile:**
   - "Fotoğraf URL ekle" metin kutusuna Unsplash, CDN veya herhangi bir fotoğraf URL'i yazın.
   - **"Ekle"** butonuna tıklayın.
   - Birden fazla URL ekleyebilirsiniz; ilk fotoğraf liste kartında gösterilir.

   **B) Dosya yükleme:**
   - **"Dosya Yükle"** butonuna tıklayın.
   - Bilgisayardan JPG, PNG veya WEBP seçin (maks 5MB).
   - Fotoğraf sunucuya yüklenir, URL otomatik eklenir.

4. **"Kaydet"** butonuna tıklayın.

---

### 3.2 Ürün Düzenleme

1. Listeden ürünü bulun (arama kutusunu kullanabilirsiniz).
2. Sağdaki ✏️ **Düzenle** butonuna tıklayın.
3. İstediğiniz alanları güncelleyin.
4. **"Güncelle"** butonuna tıklayın.

> **İpucu:** Stok alanını 0 yaparsanız ürün "Stokta Yok" olarak görünür ama silinmez.

---

### 3.3 Ürün Silme

1. 🗑️ **Sil** butonuna tıklayın.
2. Onay kutusunda **"Evet, Sil"** deyin.

> ⚠️ **Uyarı:** Daha önce sipariş verilmiş ürünler silinemez. Bu durumda ürünü silmek yerine  
> **Aktif** kutusunu kaldırın — ürün siteden kaybolur ama sipariş geçmişi korunur.

---

### 3.4 Stok Takibi

- Ürün listesinde her ürünün yanında stok miktarı görünür.
- Stok 5'in altına düşünce ürün kartında **"Son X adet"** uyarısı çıkar.
- Ödeme tamamlandıktan sonra stok otomatik olarak düşer (başarısız ödemelerde stok düşmez).

---

## 4. Kategori Yönetimi

**Adres:** https://hempatedarik.com/admin/kategoriler

### 4.1 Yeni Kategori Ekleme

1. **"+ Yeni Kategori"** butonuna tıklayın.
2. Alanları doldurun:

| Alan | Açıklama |
|---|---|
| **Kategori Adı** | Sitede görünecek isim |
| **Açıklama** | İsteğe bağlı kısa açıklama |
| **Üst Kategori** | Seçilirse alt kategori olarak oluşturulur |
| **Görsel URL** | Kategori kartında gösterilecek ikon/görsel |
| **Sıra** | Menüde ve kategori sayfasında kaçıncı sırada çıksın |
| **Aktif** | Kapalıysa menüde ve arama sonuçlarında görünmez |

3. **"Kaydet"** butonuna tıklayın.

> **Otomatik:** Kategori adından URL slug'ı otomatik oluşturulur (örn: "Ofis & Kırtasiye" → `/kategori/ofis-kirtasiye`).

---

### 4.2 Kategori Düzenleme ve Silme

- Düzenlemek için ✏️ butonuna tıklayın.
- Silmek için 🗑️ butonuna tıklayın.

> ⚠️ **Uyarı:** İçinde ürün bulunan veya alt kategorisi olan bir kategori silinemez.  
> Önce ürünleri farklı kategoriye taşıyın ya da pasife alın.

---

## 5. Banner / Slider Yönetimi

**Adres:** https://hempatedarik.com/admin/bannerlar

Bannerlar iki türdedir:

| Tür | Nerede Görünür |
|---|---|
| **SLIDER** | Ana sayfanın büyük hero slider'ında |
| **PROMO** | Ana sayfanın ortasındaki promosyon bandında |

### 5.1 Yeni Banner Ekleme

1. **"+ Yeni Banner"** butonuna tıklayın.
2. Alanları doldurun:

| Alan | Açıklama |
|---|---|
| **Başlık** | Slider'da büyük yazı olarak görünür |
| **Alt Başlık** | Başlığın altındaki küçük yazı |
| **Görsel URL** | Banner görseli. Geniş format önerilir (1920×600 piksel) |
| **Bağlantı** | Tıklayınca gidilecek sayfa (örn: `/urunler`, `/kategori/ofis-kirtasiye`) |
| **Tür** | SLIDER veya PROMO |
| **Sıra** | Aynı türden birden fazla banner varsa hangi sırayla dönsün |
| **Aktif** | Kapalıysa slider'da görünmez |

3. **"Kaydet"** butonuna tıklayın.

### 5.2 Banner Aktif/Pasif Yapma

- Liste görünümünde 👁️ / 🙈 butonuna tıklayarak anında aktif/pasif yapabilirsiniz.
- Bir banner'ı sezon dışında devre dışı bırakmak için silmek yerine pasife alın.

### 5.3 Banner Sıralaması

`Sıra` alanına küçük sayı girilen banner önce gösterilir (0 = en önde).

---

## 6. Sipariş Yönetimi

**Adres:** https://hempatedarik.com/admin/siparisler

### 6.1 Sipariş Listesi

Sayfada şu bilgiler görünür:
- Sipariş numarası ve tarihi
- Müşteri adı ve teslimat adresi
- Sipariş durumu (renkli etiket)
- Toplam tutar ve ödeme durumu

### 6.2 Sipariş Durumları

| Durum | Anlamı | Ne Zaman Kullanılır |
|---|---|---|
| 🟡 **Bekliyor** | Ödeme alındı, onay bekleniyor | Otomatik — ödeme tamamlanınca |
| 🔵 **Onaylandı** | Sipariş onaylandı | Siparişi inceleyip onayladıktan sonra |
| 🟣 **Hazırlanıyor** | Paketleme aşamasında | Kargo hazırlığında |
| 🟠 **Kargoda** | Kargo şirketine verildi | Kargo kodunu girin, SMS gönderilir |
| 🟢 **Teslim Edildi** | Müşteriye ulaştı | Kargo teslim edilince |
| 🔴 **İptal** | Sipariş iptal edildi | İptal durumunda |
| 🟣 **İade Edildi** | Ürün iade alındı | İade işleminde |

### 6.3 Sipariş Durumu Güncelleme

1. Sipariş satırında **"Detay"** bağlantısına tıklayın.
2. Durum seçiciden yeni durumu seçin.
3. **"Kargoda"** seçilirse kargo takip kodunu girin — müşteriye otomatik SMS gönderilir *(Netgsm kuruluysa)*.
4. **"Güncelle"** butonuna tıklayın.

---

## 7. Müşteri Deneyimi — Alışveriş Akışı

Müşterinizin sitede izlediği yol:

```
Ana Sayfa → Kategori / Ürün Listesi → Ürün Detay
    → Sepete Ekle → Sepet → Ödeme Bilgileri → Ödeme (İyzico)
    → Sipariş Onayı
```

### 7.1 Müşteri Kayıt / Giriş

- **Kayıt:** https://hempatedarik.com/kayit
- **Giriş:** https://hempatedarik.com/giris
- Kayıt olmadan da alışveriş yapılabilir (misafir ödeme).
- Giriş yapan müşteriler **"Hesabım"** sayfasından geçmiş siparişlerini görebilir.

### 7.2 Sepet

- Sitede gezinirken eklenen ürünler tarayıcıda saklanır (oturum kapatılsa bile kalır).
- Stok kontrolü yapılır; stok yoksa "Stokta Yok" mesajı çıkar.
- Sepet sayfasında adet artırılıp azaltılabilir.

### 7.3 Ödeme (İyzico)

- Kargo hesaplaması:
  - 500₺ ve üzeri sipariş → Ücretsiz kargo
  - 500₺ altı → 29,90₺ kargo ücreti
- KDV %18 olarak hesaplanır.
- Ödeme formu İyzico Checkout Form ile açılır.
- **Test kartı (sandbox mod):**
  - Kart No: `5528790000000008`
  - SKT: `12/30` | CVV: `123`

> **Canlıya geçmek için:** İyzico hesabınızdan gerçek API bilgilerinizi alıp geliştiricinize iletin.

---

## 8. Sık Sorulan Sorular

**S: Yeni bir ürün eklediğimde neden fotoğraf çıkmıyor?**  
C: Fotoğraf URL'i girilmemiş olabilir. Admin panelinde ürünü düzenleyip URL ekleyin  
ya da bilgisayardan dosya yükleyin.

**S: Bir ürünü siteden kaldırmak istiyorum ama silmek istemiyorum.**  
C: Ürünü düzenleyin ve **"Aktif"** kutusunun işaretini kaldırın. Ürün sitede görünmez  
ama veritabanında ve sipariş geçmişinde korunur.

**S: Banner fotoğraf boyutu ne olmalı?**  
C: Slider için **1920 × 600 piksel** (geniş/yatay format). PROMO bantları için **800 × 400 piksel** uygundur.

**S: Müşteri siparişini iptal etmek istiyor, ne yapmalıyım?**  
C: Admin paneli → Siparişler → İlgili sipariş → Durum: "İptal" seçin.  
Para iadesi için ayrıca İyzico panelinize (merchant.iyzipay.com) girip ilgili işlemden iade başlatın.

**S: Stok bitince ne olur?**  
C: Ürün kartında "Stokta Yok" yazar, sepete eklenemez. Stoku güncellediğinizde otomatik açılır.

**S: Site açılmıyor, ne yapmalıyım?**  
C: Geliştiricinizle iletişime geçin. Sunucu ya da uygulama kaynaklı teknik bir sorun olabilir.

**S: Admin şifresini nasıl değiştiririm?**  
C: Geliştiricinize haber verin, sunucu ayarlarından günceller.

**S: Sipariş geldiğinde bildirim alabilir miyim?**  
C: Şu an otomatik e-posta bildirimi yoktur. Admin paneli → Siparişler sayfasını düzenli kontrol edin.  
E-posta bildirimi eklemek isterseniz geliştiricinizden talep edebilirsiniz.

---

*Bu kılavuz Hempa Tedarik e-ticaret sitesi için hazırlanmıştır.*

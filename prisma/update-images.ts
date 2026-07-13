import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Unsplash'tan alınan gerçek ürün görselleri (ücretsiz kullanım)
const productUpdates = [
  {
    slug: "pilot-g2-tukenmez-kalem-mavi-12li",
    images: [
      "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600&q=80",
      "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=600&q=80",
    ],
    description: `Pilot G2 tükenmez kalemler, dünya genelinde en çok satan jel kalemlerden biridir. Pürüzsüz yazma deneyimi ve uzun ömürlü mürekkep teknolojisiyle dikkat çeken bu kalemler, her türlü yazı işi için idealdir.

Özellikler:
• Jel mürekkep teknolojisi - pürüzsüz ve kesintisiz yazım
• 0.7mm uç çapı - ince ve net yazı
• Rahat tutunma için ergonomik kauçuk kavrama yeri
• Şeffaf gövde sayesinde mürekkep seviyesi kontrolü
• Mavi renk mürekkep - 12 adet kutu
• Ofis, okul ve her türlü not alma ihtiyacı için uygundur`,
    sku: "PLT-G2-MV-12",
  },
  {
    slug: "plastik-seffaf-dosya-a4-100lu",
    images: [
      "https://images.unsplash.com/photo-1568667256549-094345857637?w=600&q=80",
      "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=600&q=80",
    ],
    description: `Yüksek kaliteli şeffaf plastik dosya, belgelerinizi düzenli ve koruma altında tutmanızı sağlar. Her türlü A4 boyutundaki belge, rapor ve evrak için idealdir.

Özellikler:
• A4 boyutu uyumlu
• Şeffaf ön yüz - içeriği kolayca görme
• Delikli tasarım - klasör uyumlu
• 80 mikron kalınlık - dayanıklı ve esnek
• 100 adet ekonomik paket
• Ofis, okul ve arşivleme için ideal`,
    sku: "DOY-SF-A4-100",
  },
  {
    slug: "a4-fotokopi-kagidi-80gr-500-yaprak",
    images: [
      "https://images.unsplash.com/photo-1589840700256-41c5d8f4dde7?w=600&q=80",
      "https://images.unsplash.com/photo-1524675053006-18c17a4cf12b?w=600&q=80",
    ],
    description: `Yüksek beyazlık değerine sahip A4 fotokopi kağıdı, lazer yazıcılar, mürekkep püskürtmeli yazıcılar ve fotokopi makineleri için optimize edilmiştir. Pürüzsüz yüzeyi sayesinde keskin baskı kalitesi sağlar.

Özellikler:
• 80 g/m² ağırlık - standart kalite
• 500 yaprak / top
• Beyazlık: 146 CIE
• ISO 9706 kalıcılık standardı
• Çift taraflı baskıya uygun
• Lazer, inkjet ve fotokopi makineleri ile uyumlu
• FSC sertifikalı sürdürülebilir kaynaklardan üretim`,
    sku: "KAG-A4-80-500",
  },
  {
    slug: "vileda-h2pro-temizlik-seti",
    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80",
      "https://images.unsplash.com/photo-1527515637462-cff94aca7dc1?w=600&q=80",
    ],
    description: `Vileda H2PRO Kirli Su Ayrıştırıcı Temizlik Seti, geleneksel kova sistemlerinden farklı olarak kirli suyu temiz sudan ayırır. Bu sayede zeminlerinizi her zaman temiz suyla temizlemiş olursunuz.

Özellikler:
• Patentli kirli-temiz su ayrıştırma teknolojisi
• 2 ayrı bölmeli kova sistemi
• Geniş yüzey kaplayan microfiber paspas başlığı
• Ergonomik sapla rahat kullanım
• 360° dönen paspas başlığı - köşelere ulaşım kolaylığı
• Kolay sıkma mekanizması
• Uzun ömürlü microfiber materyal
• Ticari ve ev kullanımı için idealdir`,
    sku: "VLD-H2P-SET",
  },
  {
    slug: "cok-amacli-temizlik-spreyi-750ml",
    images: [
      "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&q=80",
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80",
    ],
    description: `Güçlü formülüyle yağ, kir ve çeşitli lekeler üzerinde etkili olan çok amaçlı temizlik spreyi. Mutfak, banyo ve ofis yüzeylerinde güvenle kullanılabilir.

Özellikler:
• 750ml ekonomik boy
• Çok yüzeyli kullanım - mutfak, banyo, ofis
• Yağ kesici güçlü formül
• Kötü kokuları giderir ve taze koku bırakır
• Durulamadan kullanım imkânı
• Paslanmaz çelik, granit, fayans ve emaye yüzeylere uygun
• Evcil hayvanlar ve çocuklar için güvenli formül (kuruyunca)`,
    sku: "TMP-SPRY-750",
  },
];

async function main() {
  console.log("Ürün görselleri ve detayları güncelleniyor...\n");

  for (const update of productUpdates) {
    const result = await prisma.product.updateMany({
      where: { slug: update.slug },
      data: {
        images: JSON.stringify(update.images),
        description: update.description,
        sku: update.sku,
      },
    });

    if (result.count > 0) {
      console.log(`✅ ${update.slug}`);
    } else {
      console.log(`⚠️  Bulunamadı: ${update.slug}`);
    }
  }

  console.log("\n✨ Güncelleme tamamlandı!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

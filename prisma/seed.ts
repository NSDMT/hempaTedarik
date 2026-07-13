import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seed işlemi başlıyor...");

  // Admin kullanıcısı oluştur
  const hashedPassword = await bcrypt.hash("Admin123!", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@hempatedarik.com" },
    update: {},
    create: {
      email: "admin@hempatedarik.com",
      password: hashedPassword,
      name: "Hempa Admin",
      role: "ADMIN",
    },
  });
  console.log("✅ Admin kullanıcısı:", admin.email);

  // Kategoriler
  const categories = [
    { name: "Ofis & Kırtasiye", slug: "ofis-kirtasiye", sortOrder: 1 },
    { name: "Kağıt Ürünleri", slug: "kagit-urunleri", sortOrder: 2 },
    { name: "Temizlik & Sağlık", slug: "temizlik-saglik", sortOrder: 3 },
    { name: "Gıda & Mutfak", slug: "gida-mutfak", sortOrder: 4 },
    { name: "Kartuş & Toner", slug: "kartus-toner", sortOrder: 5 },
    { name: "Ev & Yaşam", slug: "ev-yasam", sortOrder: 6 },
    { name: "Nalbur & Hırdavat", slug: "nalbur-hirdavat", sortOrder: 7 },
    { name: "Teknoloji", slug: "teknoloji", sortOrder: 8 },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: {
        name: cat.name,
        slug: cat.slug,
        isActive: true,
        sortOrder: cat.sortOrder,
      },
    });
  }
  console.log("✅ Kategoriler oluşturuldu");

  // Örnek ürünler
  const kirtasiyeCategory = await prisma.category.findUnique({
    where: { slug: "ofis-kirtasiye" },
  });
  const temizlikCategory = await prisma.category.findUnique({
    where: { slug: "temizlik-saglik" },
  });
  const kagitCategory = await prisma.category.findUnique({
    where: { slug: "kagit-urunleri" },
  });

  if (kirtasiyeCategory && temizlikCategory && kagitCategory) {
    const sampleProducts = [
      {
        name: "Pilot G2 Tükenmez Kalem Mavi 12'li",
        slug: "pilot-g2-tukenmez-kalem-mavi-12li",
        price: 67.50,
        comparePrice: 89.00,
        stock: 100,
        categoryId: kirtasiyeCategory.id,
        isFeatured: true,
        images: JSON.stringify([]),
      },
      {
        name: "Plastik Şeffaf Dosya A4 (100'lü)",
        slug: "plastik-seffaf-dosya-a4-100lu",
        price: 48.50,
        stock: 200,
        categoryId: kirtasiyeCategory.id,
        isFeatured: false,
        images: JSON.stringify([]),
      },
      {
        name: "A4 Fotokopi Kağıdı 80gr 500 Yaprak",
        slug: "a4-fotokopi-kagidi-80gr-500-yaprak",
        price: 89.90,
        comparePrice: 119.90,
        stock: 50,
        categoryId: kagitCategory.id,
        isFeatured: true,
        images: JSON.stringify([]),
      },
      {
        name: "Vileda H2PRO Kirli Su Ayrıştırıcı Temizlik Seti",
        slug: "vileda-h2pro-temizlik-seti",
        price: 2340.00,
        stock: 15,
        categoryId: temizlikCategory.id,
        isFeatured: false,
        images: JSON.stringify([]),
      },
      {
        name: "Çok Amaçlı Temizlik Spreyi 750ml",
        slug: "cok-amacli-temizlik-spreyi-750ml",
        price: 34.90,
        comparePrice: 44.90,
        stock: 5,
        categoryId: temizlikCategory.id,
        isFeatured: false,
        images: JSON.stringify([]),
      },
    ];

    for (const product of sampleProducts) {
      await prisma.product.upsert({
        where: { slug: product.slug },
        update: {},
        create: {
          ...product,
          description: null,
          sku: null,
          isActive: true,
        },
      });
    }
    console.log("✅ Örnek ürünler oluşturuldu");
  }

  // Bannerlar
  await prisma.banner.upsert({
    where: { id: "banner-1" },
    update: {},
    create: {
      id: "banner-1",
      title: "Ofisinizin Her İhtiyacı Tek Adreste",
      subtitle: "2.000+ ürün, uygun fiyatlar",
      image: "/banners/banner-1.jpg",
      link: "/urunler",
      type: "SLIDER",
      isActive: true,
      sortOrder: 1,
    },
  });
  console.log("✅ Bannerlar oluşturuldu");

  // Ayarlar
  const settings = [
    { key: "site_name", value: "Hempa Tedarik" },
    { key: "site_email", value: "info@hempatedarik.com" },
    { key: "site_phone", value: "0850 123 45 67" },
    { key: "shipping_free_min", value: "500" },
    { key: "shipping_cost", value: "49.90" },
    { key: "tax_rate", value: "0.18" },
  ];

  for (const s of settings) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: {},
      create: s,
    });
  }
  console.log("✅ Site ayarları oluşturuldu");

  console.log("\n🎉 Seed işlemi tamamlandı!");
  console.log("👤 Admin: admin@hempatedarik.com / Admin123!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

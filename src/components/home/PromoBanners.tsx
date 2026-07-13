import Link from "next/link";
import { ArrowRight } from "lucide-react";

const banners = [
  {
    title: "İş Yerinizin Hijyen İhtiyaçları",
    subtitle: "Tek Adreste",
    description: "Temizlik malzemeleri, dezenfektanlar ve kişisel bakım ürünleri",
    cta: "Alışverişe Başla",
    link: "/kategori/temizlik-saglik",
    bgColor: "from-teal-500 to-teal-700",
    icon: "🧴",
    badge: "Özel Fiyat",
  },
  {
    title: "Kurumsal Müşterilere",
    subtitle: "Özel Fırsatlar",
    description: "50'den fazla çalışanı olan firmalar için özel fiyatlandırma ve öncelikli teslimat",
    cta: "Bilgi Al",
    link: "/kurumsal",
    bgColor: "from-gray-700 to-gray-900",
    icon: "🏢",
    badge: "Kurumsal",
  },
  {
    title: "Ofis Mobilyaları",
    subtitle: "Büyük İndirimde",
    description: "Ergonomik koltuk, masa ve dolaplarla çalışma ortamınızı yenileyin",
    cta: "İncele",
    link: "/kategori/ofis-mobilya",
    bgColor: "from-orange-500 to-red-600",
    icon: "🪑",
    badge: "%30 İndirim",
  },
  {
    title: "Hızlı Teslimat",
    subtitle: "Aynı Gün Kargo",
    description: "Saat 14:00'a kadar verilen siparişler aynı gün kargoya verilir",
    cta: "Sipariş Ver",
    link: "/urunler",
    bgColor: "from-blue-500 to-blue-700",
    icon: "🚀",
    badge: "Hızlı Teslimat",
  },
];

export default function PromoBanners() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Özel Fırsatlar</h2>
        <Link href="/kampanyalar" className="text-sm text-orange-500 hover:text-orange-600 font-medium">
          Tüm Kampanyalar →
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {banners.map((banner, idx) => (
          <Link
            key={idx}
            href={banner.link}
            className={`bg-gradient-to-br ${banner.bgColor} rounded-xl p-6 flex items-center gap-4 hover:shadow-xl transition-all hover:-translate-y-0.5 group relative overflow-hidden`}
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-1/3 w-20 h-20 bg-white/5 rounded-full translate-y-1/2"></div>

            <div className="text-5xl flex-shrink-0 group-hover:scale-110 transition-transform relative z-10">
              {banner.icon}
            </div>
            <div className="flex-1 relative z-10">
              <span className="inline-block text-xs bg-white/20 text-white font-bold px-2.5 py-0.5 rounded-full mb-2 border border-white/20">
                {banner.badge}
              </span>
              <h3 className="text-white font-bold text-lg leading-tight">
                {banner.title}
              </h3>
              <p className="text-white/80 font-medium text-sm">{banner.subtitle}</p>
              <p className="text-white/70 text-xs mt-1 leading-relaxed">{banner.description}</p>
              <div className="flex items-center gap-1.5 mt-3 text-white font-semibold text-sm group-hover:gap-2.5 transition-all">
                {banner.cta}
                <ArrowRight size={16} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

import Link from "next/link";

const categories = [
  { name: "Ofis & Kırtasiye", slug: "ofis-kirtasiye", icon: "✏️", color: "bg-blue-50 hover:bg-blue-100", border: "border-blue-100 hover:border-blue-200", count: "1.200+" },
  { name: "Kağıt Ürünleri", slug: "kagit-urunleri", icon: "📄", color: "bg-green-50 hover:bg-green-100", border: "border-green-100 hover:border-green-200", count: "350+" },
  { name: "Temizlik & Sağlık", slug: "temizlik-saglik", icon: "🧹", color: "bg-cyan-50 hover:bg-cyan-100", border: "border-cyan-100 hover:border-cyan-200", count: "480+" },
  { name: "Gıda & Mutfak", slug: "gida-mutfak", icon: "☕", color: "bg-amber-50 hover:bg-amber-100", border: "border-amber-100 hover:border-amber-200", count: "290+" },
  { name: "Kartuş & Toner", slug: "kartus-toner", icon: "🖨️", color: "bg-purple-50 hover:bg-purple-100", border: "border-purple-100 hover:border-purple-200", count: "620+" },
  { name: "Ev & Yaşam", slug: "ev-yasam", icon: "🏠", color: "bg-rose-50 hover:bg-rose-100", border: "border-rose-100 hover:border-rose-200", count: "540+" },
  { name: "Nalbur & Hırdavat", slug: "nalbur-hirdavat", icon: "🔧", color: "bg-slate-50 hover:bg-slate-100", border: "border-slate-100 hover:border-slate-200", count: "780+" },
  { name: "Teknoloji", slug: "teknoloji", icon: "💻", color: "bg-indigo-50 hover:bg-indigo-100", border: "border-indigo-100 hover:border-indigo-200", count: "410+" },
];

export default function CategoryGrid() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Kategoriler</h2>
        <Link
          href="/urunler"
          className="text-sm text-orange-500 hover:text-orange-600 font-medium"
        >
          Tümünü Gör →
        </Link>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-3">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/kategori/${cat.slug}`}
            className={`${cat.color} ${cat.border} border rounded-xl p-3 flex flex-col items-center text-center transition-all hover:shadow-md hover:-translate-y-0.5 group`}
          >
            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
              {cat.icon}
            </div>
            <div className="text-xs font-semibold text-gray-700 leading-tight text-center">
              {cat.name}
            </div>
            <div className="text-[10px] text-gray-400 mt-0.5">{cat.count} ürün</div>
          </Link>
        ))}
      </div>
    </section>
  );
}

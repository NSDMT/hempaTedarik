import Link from "next/link";

export const metadata = { title: "Blog | Hempa Tedarik" };

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-24">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">📝</div>
        <h1 className="text-2xl font-black text-gray-900 mb-3">Blog Yakında!</h1>
        <p className="text-gray-500 mb-8">Ofis hayatına dair ipuçları, ürün rehberleri ve kampanya haberlerini buradan takip edebileceksiniz.</p>
        <Link href="/" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
}

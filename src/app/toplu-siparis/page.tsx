import Link from "next/link";
export const metadata = { title: "Toplu Sipariş | Hempa Tedarik" };
export default function TopluSiparisPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-24">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">📦</div>
        <h1 className="text-2xl font-black text-gray-900 mb-3">Toplu Sipariş</h1>
        <p className="text-gray-500 mb-8">50 adet ve üzeri siparişlerde özel fiyat teklifi için bizimle iletişime geçin.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="mailto:info@hempatedarik.com" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
            E-posta Gönder
          </a>
          <Link href="/iletisim" className="bg-white border border-gray-200 hover:border-orange-400 text-gray-700 font-semibold px-6 py-3 rounded-xl transition-colors">
            İletişim Sayfası
          </Link>
        </div>
      </div>
    </div>
  );
}

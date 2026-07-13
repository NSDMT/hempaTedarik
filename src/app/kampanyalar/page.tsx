import Link from "next/link";
export const metadata = { title: "Kampanyalar | Hempa Tedarik" };
export default function KampanyalarPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-24">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">🏷️</div>
        <h1 className="text-2xl font-black text-gray-900 mb-3">Kampanyalar Yakında!</h1>
        <p className="text-gray-500 mb-8">Özel indirimler ve fırsatlar burada yayınlanacak. Şu an tüm ürünlerimize göz atabilirsiniz.</p>
        <Link href="/urunler" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
          Ürünlere Git
        </Link>
      </div>
    </div>
  );
}

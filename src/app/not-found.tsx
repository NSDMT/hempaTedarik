import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="bg-orange-500 text-white font-black text-2xl px-3 py-1.5 rounded-md">H</div>
          <div>
            <div className="font-black text-2xl text-gray-900 leading-none">HEMPA</div>
            <div className="text-[11px] text-orange-500 font-bold tracking-widest leading-none">TEDARİK</div>
          </div>
        </div>
        <div className="text-8xl font-black text-orange-500 mb-4">404</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Sayfa Bulunamadı</h1>
        <p className="text-gray-500 mb-8">
          Aradığınız sayfa taşınmış, silinmiş ya da hiç var olmamış olabilir.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Ana Sayfaya Dön
          </Link>
          <Link
            href="/urunler"
            className="bg-white border border-gray-200 hover:border-orange-400 text-gray-700 font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Ürünlere Göz At
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCartStore();
  const total = totalPrice();
  const count = totalItems();
  const shipping = total >= 500 ? 0 : 49.90;
  const tax = total * 0.18;
  const grandTotal = total + shipping;

  if (count === 0) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="bg-white rounded-2xl p-12 max-w-md mx-auto shadow-sm">
            <div className="text-7xl mb-6">🛒</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-3">Sepetiniz Boş</h1>
            <p className="text-gray-500 mb-8 text-sm leading-relaxed">
              Sepetinizde henüz ürün yok. Alışverişe başlamak için ürün listemize göz atın.
            </p>
            <Link href="/urunler">
              <Button size="lg" className="rounded-full px-8">
                <ShoppingBag size={18} />
                Alışverişe Başla
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-3 text-sm text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:text-orange-500">Ana Sayfa</Link>
          <span>›</span>
          <span className="text-gray-800 font-medium">Sepetim</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/urunler" className="text-gray-500 hover:text-orange-500 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">
            Sepetim <span className="text-lg font-normal text-gray-500">({count} ürün)</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3">
            {items.map((item) => (
              <div
                key={item.productId}
                className="bg-white rounded-xl border border-gray-100 p-4 flex gap-4 hover:border-orange-100 transition-colors"
              >
                {/* Product Image */}
                <div className="w-20 h-20 bg-gray-50 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                  {item.image && item.image !== "/placeholder-product.jpg" ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" />
                  ) : (
                    <span className="text-3xl">📦</span>
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/urun/${item.slug}`}
                    className="text-sm font-medium text-gray-800 hover:text-orange-500 line-clamp-2 leading-snug"
                  >
                    {item.name}
                  </Link>
                  <p className="text-lg font-bold text-orange-500 mt-1">
                    {formatPrice(item.price)}
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-white transition-colors text-gray-600"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        disabled={item.quantity >= item.stock}
                        className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-white transition-colors text-gray-600 disabled:opacity-40"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-gray-800">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="text-red-400 hover:text-red-500 p-1 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Coupon Code */}
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Tag size={16} className="text-orange-500" />
                <span className="text-sm font-semibold text-gray-800">İndirim Kuponu</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Kupon kodunuzu girin"
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
                />
                <Button variant="outline" size="sm">Uygula</Button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-100 p-5 sticky top-32">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Sipariş Özeti</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Ara Toplam ({count} ürün)</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>KDV (%18)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Kargo</span>
                  <span className={shipping === 0 ? "text-green-600 font-semibold" : ""}>
                    {shipping === 0 ? "ÜCRETSİZ" : formatPrice(shipping)}
                  </span>
                </div>

                {total < 500 && (
                  <div className="bg-orange-50 border border-orange-100 rounded-lg p-3 text-xs text-orange-700">
                    🎉 {formatPrice(500 - total)} daha ekleyin, kargo ücretsiz!
                  </div>
                )}

                <hr />

                <div className="flex justify-between font-bold text-lg text-gray-800">
                  <span>Toplam</span>
                  <span className="text-orange-500">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              <Link href="/odeme" className="block mt-5">
                <Button size="lg" className="w-full rounded-xl">
                  Siparişi Tamamla →
                </Button>
              </Link>

              <div className="mt-4 text-center text-xs text-gray-400 flex items-center justify-center gap-1">
                🔒 256-bit SSL ile güvenli ödeme
              </div>

              {/* Trust Badges */}
              <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-3 gap-2 text-center">
                {["İyzico", "3D Secure", "SSL"].map((badge) => (
                  <div key={badge} className="text-xs bg-gray-50 rounded-lg p-2 text-gray-500 font-medium">
                    {badge}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { formatPrice, formatDate } from "@/lib/utils";

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  PENDING: { label: "Beklemede", color: "bg-yellow-100 text-yellow-700" },
  PROCESSING: { label: "Hazırlanıyor", color: "bg-blue-100 text-blue-700" },
  SHIPPED: { label: "Kargoda", color: "bg-purple-100 text-purple-700" },
  DELIVERED: { label: "Teslim Edildi", color: "bg-green-100 text-green-700" },
  CANCELLED: { label: "İptal", color: "bg-red-100 text-red-700" },
};

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/giris?callbackUrl=/hesabim");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      orders: {
        orderBy: { createdAt: "desc" },
        take: 10,
        include: {
          items: { include: { product: { select: { name: true, images: true, slug: true } } } },
        },
      },
    },
  });

  if (!user) redirect("/giris");

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Hesabım</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="md:col-span-1">
          <div className="bg-white border rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center text-3xl font-black text-orange-500 mb-3">
                {user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()}
              </div>
              <h2 className="font-bold text-gray-900">{user.name || "İsimsiz Kullanıcı"}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
              {user.phone && <p className="text-sm text-gray-500">{user.phone}</p>}
            </div>

            <div className="space-y-2 border-t pt-4">
              <p className="text-xs text-gray-400">Üyelik tarihi</p>
              <p className="text-sm font-medium text-gray-700">{formatDate(user.createdAt)}</p>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Toplam sipariş</span>
                <span className="font-bold text-gray-800">{user.orders.length}</span>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <Link
                href="/hesabim/duzenle"
                className="block w-full text-center py-2.5 border border-orange-400 text-orange-500 font-medium rounded-xl hover:bg-orange-50 transition-colors text-sm"
              >
                Profili Düzenle
              </Link>
            </div>
          </div>
        </div>

        {/* Orders */}
        <div className="md:col-span-2">
          <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <h3 className="font-bold text-gray-900">Siparişlerim</h3>
              <span className="text-sm text-gray-500">{user.orders.length} sipariş</span>
            </div>

            {user.orders.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <div className="text-5xl mb-3">📦</div>
                <p className="font-medium">Henüz siparişiniz bulunmuyor</p>
                <Link
                  href="/urunler"
                  className="mt-4 inline-block text-sm text-orange-500 hover:underline font-medium"
                >
                  Alışverişe başla →
                </Link>
              </div>
            ) : (
              <div className="divide-y">
                {user.orders.map((order) => {
                  const status = STATUS_MAP[order.status] || { label: order.status, color: "bg-gray-100 text-gray-600" };
                  const firstImg = (() => {
                    try {
                      const imgs = JSON.parse(order.items[0]?.product?.images || "[]");
                      return imgs[0] || "/placeholder-product.jpg";
                    } catch { return "/placeholder-product.jpg"; }
                  })();
                  return (
                    <div key={order.id} className="p-5 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                          <img src={firstImg} alt="" className="w-full h-full object-contain p-1" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-sm font-bold text-gray-800">#{order.orderNumber}</span>
                            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${status.color}`}>
                              {status.label}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mb-2">{formatDate(order.createdAt)}</p>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-gray-500">
                              {order.items.length} ürün
                            </p>
                            <span className="font-bold text-orange-500">{formatPrice(order.total)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

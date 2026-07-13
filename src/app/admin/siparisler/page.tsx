import { prisma } from "@/lib/prisma";
import { formatPrice, formatDate } from "@/lib/utils";
import Link from "next/link";

const statusLabels: Record<string, { label: string; color: string }> = {
  PENDING: { label: "Bekliyor", color: "bg-yellow-100 text-yellow-700" },
  CONFIRMED: { label: "Onaylandı", color: "bg-blue-100 text-blue-700" },
  PROCESSING: { label: "Hazırlanıyor", color: "bg-indigo-100 text-indigo-700" },
  SHIPPED: { label: "Kargoda", color: "bg-orange-100 text-orange-700" },
  DELIVERED: { label: "Teslim Edildi", color: "bg-green-100 text-green-700" },
  CANCELLED: { label: "İptal", color: "bg-red-100 text-red-700" },
  REFUNDED: { label: "İade Edildi", color: "bg-purple-100 text-purple-700" },
};

async function getOrders() {
  return prisma.order.findMany({
    include: {
      items: { include: { product: { select: { name: true } } } },
      payment: true,
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
}

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Sipariş Yönetimi</h1>
          <p className="text-gray-500 text-sm mt-1">{orders.length} sipariş</p>
        </div>
        <div className="flex gap-2">
          {["PENDING", "CONFIRMED", "SHIPPED"].map((status) => {
            const count = orders.filter((o) => o.status === status).length;
            if (count === 0) return null;
            const s = statusLabels[status];
            return (
              <span key={status} className={`text-xs px-3 py-1.5 rounded-full font-semibold ${s.color}`}>
                {s.label}: {count}
              </span>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {orders.length === 0 ? (
          <div className="text-center py-12 text-gray-500">Henüz sipariş yok</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-left">
                  <th className="px-4 py-3 font-semibold">Sipariş No</th>
                  <th className="px-4 py-3 font-semibold">Tarih</th>
                  <th className="px-4 py-3 font-semibold">Adres</th>
                  <th className="px-4 py-3 font-semibold">Ürünler</th>
                  <th className="px-4 py-3 font-semibold">Toplam</th>
                  <th className="px-4 py-3 font-semibold">Ödeme</th>
                  <th className="px-4 py-3 font-semibold">Durum</th>
                  <th className="px-4 py-3 font-semibold text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map((order) => {
                  const address = (() => {
                    try {
                      return JSON.parse(order.address);
                    } catch {
                      return {};
                    }
                  })();
                  const s = statusLabels[order.status] || { label: order.status, color: "bg-gray-100 text-gray-600" };
                  return (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-mono font-semibold text-orange-600">
                        #{order.orderNumber}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {formatDate(order.createdAt)}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        <div className="text-sm">
                          {address.firstName} {address.lastName}
                        </div>
                        <div className="text-xs text-gray-400">{address.city}</div>
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {order.items.length} ürün
                      </td>
                      <td className="px-4 py-3 font-semibold text-gray-800">
                        {formatPrice(order.total)}
                      </td>
                      <td className="px-4 py-3">
                        {order.payment ? (
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-semibold ${order.payment.status === "SUCCESS"
                                ? "bg-green-100 text-green-700"
                                : order.payment.status === "FAILED"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                          >
                            {order.payment.status}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${s.color}`}>
                          {s.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link
                          href={`/admin/siparisler/${order.id}`}
                          className="text-xs text-orange-500 hover:text-orange-600 font-medium"
                        >
                          Detay →
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

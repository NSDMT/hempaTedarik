import { prisma } from "@/lib/prisma";
import { formatPrice, formatDate } from "@/lib/utils";
import { Package, ShoppingCart, Users, TrendingUp, ArrowUpRight } from "lucide-react";
import Link from "next/link";

async function getDashboardStats() {
  const [
    totalProducts,
    totalOrders,
    totalRevenue,
    recentOrders,
    lowStockProducts,
    pendingOrders,
  ] = await Promise.all([
    prisma.product.count({ where: { isActive: true } }),
    prisma.order.count(),
    prisma.order.aggregate({
      where: { status: { in: ["CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED"] } },
      _sum: { total: true },
    }),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { items: true },
    }),
    prisma.product.findMany({
      where: { stock: { lte: 5 }, isActive: true },
      take: 5,
      orderBy: { stock: "asc" },
    }),
    prisma.order.count({ where: { status: "PENDING" } }),
  ]);

  return {
    totalProducts,
    totalOrders,
    totalRevenue: totalRevenue._sum.total || 0,
    recentOrders,
    lowStockProducts,
    pendingOrders,
  };
}

const statusLabels: Record<string, { label: string; color: string }> = {
  PENDING: { label: "Bekliyor", color: "bg-yellow-100 text-yellow-700" },
  CONFIRMED: { label: "Onaylandı", color: "bg-blue-100 text-blue-700" },
  PROCESSING: { label: "Hazırlanıyor", color: "bg-indigo-100 text-indigo-700" },
  SHIPPED: { label: "Kargoda", color: "bg-orange-100 text-orange-700" },
  DELIVERED: { label: "Teslim Edildi", color: "bg-green-100 text-green-700" },
  CANCELLED: { label: "İptal", color: "bg-red-100 text-red-700" },
};

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  const statCards = [
    {
      title: "Toplam Ürün",
      value: stats.totalProducts.toString(),
      icon: Package,
      color: "text-blue-500 bg-blue-50",
      change: "+12 bu ay",
      href: "/admin/urunler",
    },
    {
      title: "Toplam Sipariş",
      value: stats.totalOrders.toString(),
      icon: ShoppingCart,
      color: "text-orange-500 bg-orange-50",
      change: `${stats.pendingOrders} bekliyor`,
      href: "/admin/siparisler",
    },
    {
      title: "Toplam Gelir",
      value: formatPrice(stats.totalRevenue),
      icon: TrendingUp,
      color: "text-green-500 bg-green-50",
      change: "Bu ay",
      href: "/admin/raporlar",
    },
    {
      title: "Müşteriler",
      value: "—",
      icon: Users,
      color: "text-purple-500 bg-purple-50",
      change: "Kayıtlı kullanıcılar",
      href: "/admin/musteriler",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Hempa Tedarik yönetim paneline hoş geldiniz</p>
        </div>
        <Link
          href="/admin/urunler/yeni"
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          + Yeni Ürün
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map(({ title, value, icon: Icon, color, change, href }) => (
          <Link
            key={title}
            href={href}
            className="bg-white rounded-xl p-5 border border-gray-100 hover:border-orange-200 hover:shadow-sm transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>
                <Icon size={20} />
              </div>
              <ArrowUpRight size={16} className="text-gray-300 group-hover:text-orange-400 transition-colors" />
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">{value}</div>
            <div className="text-sm text-gray-500">{title}</div>
            <div className="text-xs text-gray-400 mt-1">{change}</div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-800">Son Siparişler</h2>
            <Link href="/admin/siparisler" className="text-xs text-orange-500 hover:text-orange-600">
              Tümünü Gör →
            </Link>
          </div>
          {stats.recentOrders.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-sm">
              Henüz sipariş yok
            </div>
          ) : (
            <div className="space-y-3">
              {stats.recentOrders.map((order) => (
                <div key={order.id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800">#{order.orderNumber}</p>
                    <p className="text-xs text-gray-400">{formatDate(order.createdAt)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-800">{formatPrice(order.total)}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${statusLabels[order.status]?.color || "bg-gray-100 text-gray-600"}`}>
                      {statusLabels[order.status]?.label || order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Low Stock */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-800">Stok Azalan Ürünler</h2>
            <Link href="/admin/urunler" className="text-xs text-orange-500 hover:text-orange-600">
              Stok Yönetimi →
            </Link>
          </div>
          {stats.lowStockProducts.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-sm">
              Tüm ürünler yeterli stokta
            </div>
          ) : (
            <div className="space-y-3">
              {stats.lowStockProducts.map((product) => (
                <div key={product.id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                  <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                    📦
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{product.name}</p>
                    <p className="text-xs text-gray-400">{formatPrice(product.price)}</p>
                  </div>
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-full ${product.stock === 0
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-600"
                      }`}
                  >
                    {product.stock === 0 ? "Tükendi" : `${product.stock} adet`}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

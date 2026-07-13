"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Package,
  Tag,
  ShoppingCart,
  Image,
  Settings,
  LogOut,
  MessageSquare,
  Users,
  BarChart3,
} from "lucide-react";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/urunler", icon: Package, label: "Ürünler" },
  { href: "/admin/kategoriler", icon: Tag, label: "Kategoriler" },
  { href: "/admin/siparisler", icon: ShoppingCart, label: "Siparişler" },
  { href: "/admin/bannerlar", icon: Image, label: "Bannerlar" },
  { href: "/admin/musteriler", icon: Users, label: "Müşteriler" },
  { href: "/admin/raporlar", icon: BarChart3, label: "Raporlar" },
  { href: "/admin/mesajlar", icon: MessageSquare, label: "Mesajlar" },
  { href: "/admin/ayarlar", icon: Settings, label: "Ayarlar" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white flex flex-col z-40">
      {/* Logo */}
      <div className="p-5 border-b border-gray-800">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-orange-500 text-white font-black text-lg px-2 py-1 rounded-md">H</div>
          <div>
            <div className="font-black text-lg text-white leading-none">HEMPA</div>
            <div className="text-[10px] text-orange-400 font-bold tracking-widest">TEDARİK</div>
          </div>
        </Link>
        <div className="mt-2 text-xs text-gray-500 font-medium">Admin Paneli</div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto">
        <div className="space-y-0.5">
          {navItems.map(({ href, icon: Icon, label }) => {
            const isActive = pathname === href || (href !== "/admin" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${isActive
                    ? "bg-orange-500 text-white font-semibold"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-gray-800">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors mb-1"
        >
          <LayoutDashboard size={18} />
          Siteye Dön
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-900/30 hover:text-red-300 transition-colors w-full"
        >
          <LogOut size={18} />
          Çıkış Yap
        </button>
      </div>
    </aside>
  );
}

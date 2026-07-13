"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  Search,
  ShoppingCart,
  User,
  ChevronDown,
  LogOut,
  Settings,
  Package,
  Heart,
  Menu,
  X,
  Phone,
} from "lucide-react";
import { useCartStore } from "@/store/cart";
import { Button } from "@/components/ui/button";

export default function Header() {
  const router = useRouter();
  const { data: session } = useSession();
  const { totalItems } = useCartStore();
  const cartCount = totalItems();

  const [searchQuery, setSearchQuery] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const safeCartCount = mounted ? cartCount : 0;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/urunler?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Top Notification Bar */}
      <div className="bg-orange-600 text-white text-center py-2 text-sm">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <span className="hidden sm:block">
            <Phone className="inline w-3.5 h-3.5 mr-1" />
            0850 XXX XX XX
          </span>
          <span className="font-medium">
            🎉 İlk siparişinize %15 indirim! Kod: <strong>HEMPA15</strong>
          </span>
          <span className="hidden sm:block text-orange-200 text-xs">
            Ücretsiz kargo: 500₺ ve üzeri
          </span>
        </div>
      </div>

      {/* Main Header */}
      <div
        className={`bg-white ${isScrolled ? "shadow-md" : "border-b border-gray-100"} transition-shadow`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 py-3">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-gray-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="flex items-center gap-1">
                <div className="bg-orange-500 text-white font-black text-xl px-2 py-1 rounded-md">
                  H
                </div>
                <div>
                  <div className="font-black text-xl text-gray-800 leading-none">
                    HEMPA
                  </div>
                  <div className="text-[10px] text-orange-500 font-bold tracking-widest leading-none">
                    TEDARİK
                  </div>
                </div>
              </div>
            </Link>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
              <div className="flex">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ürün, kategori veya marka ara..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-l-lg text-sm focus:outline-none focus:border-orange-400 bg-gray-50"
                />
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-r-lg transition-colors"
                >
                  <Search size={18} />
                </button>
              </div>
            </form>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-1.5 hover:text-orange-500 transition-colors px-2 py-1.5 rounded-lg hover:bg-orange-50"
                >
                  <User size={22} className="text-gray-600" />
                  <div className="hidden md:block text-left">
                    <div className="text-xs text-gray-500 leading-none">
                      {session?.user ? "Hesabım" : "Giriş Yap"}
                    </div>
                    <div className="text-sm font-semibold text-gray-800 leading-none mt-0.5">
                      {session?.user?.name
                        ? session.user.name.split(" ")[0]
                        : "Kayıt Ol"}
                    </div>
                  </div>
                  <ChevronDown size={14} className="text-gray-400 hidden md:block" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                    {session?.user ? (
                      <>
                        <div className="px-4 py-3 bg-orange-50 border-b border-orange-100">
                          <p className="text-sm font-semibold text-gray-800">
                            {session.user.name}
                          </p>
                          <p className="text-xs text-gray-500">{session.user.email}</p>
                        </div>
                        <div className="py-1">
                          <Link
                            href="/hesabim"
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <User size={16} />
                            Hesabım
                          </Link>
                          <Link
                            href="/hesabim/siparislerim"
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Package size={16} />
                            Siparişlerim
                          </Link>
                          <Link
                            href="/hesabim/favorilerim"
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Heart size={16} />
                            Favorilerim
                          </Link>
                          {(session.user as { role?: string }).role === "ADMIN" && (
                            <Link
                              href="/admin"
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-orange-600 hover:bg-orange-50 font-medium"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <Settings size={16} />
                              Admin Paneli
                            </Link>
                          )}
                          <hr className="my-1" />
                          <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 w-full"
                          >
                            <LogOut size={16} />
                            Çıkış Yap
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="p-4 space-y-2">
                        <Link href="/giris" onClick={() => setIsUserMenuOpen(false)}>
                          <Button className="w-full" size="sm">
                            Giriş Yap
                          </Button>
                        </Link>
                        <Link href="/kayit" onClick={() => setIsUserMenuOpen(false)}>
                          <Button variant="outline" className="w-full" size="sm">
                            Kayıt Ol
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Cart */}
              <Link
                href="/sepet"
                className="flex items-center gap-1.5 hover:text-orange-500 transition-colors px-2 py-1.5 rounded-lg hover:bg-orange-50 relative"
              >
                <div className="relative">
                  <ShoppingCart size={22} className="text-gray-600" />
                  {safeCartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {safeCartCount > 99 ? "99+" : safeCartCount}
                    </span>
                  )}
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-xs text-gray-500 leading-none">Sepetim</div>
                  <div className="text-sm font-semibold text-gray-800 leading-none mt-0.5">
                    {safeCartCount > 0 ? `${safeCartCount} Ürün` : "Boş"}
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <CategoryNavbar />

      {/* Mobile Menu Overlay */}
      {isUserMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </header>
  );
}

function CategoryNavbar() {
  const categories = [
    { name: "Ofis & Kırtasiye", slug: "ofis-kirtasiye", icon: "✏️" },
    { name: "Kağıt Ürünleri", slug: "kagit-urunleri", icon: "📄" },
    { name: "Temizlik & Sağlık", slug: "temizlik-saglik", icon: "🧹" },
    { name: "Gıda & Mutfak", slug: "gida-mutfak", icon: "☕" },
    { name: "Kartuş & Toner", slug: "kartus-toner", icon: "🖨️" },
    { name: "Ev & Yaşam", slug: "ev-yasam", icon: "🏠" },
    { name: "Nalbur & Hırdavat", slug: "nalbur-hirdavat", icon: "🔧" },
    { name: "Teknoloji", slug: "teknoloji", icon: "💻" },
    { name: "Tüm Ürünler", slug: "", icon: "🛍️" },
  ];

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-0.5">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.slug ? `/kategori/${cat.slug}` : "/urunler"}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2.5 text-sm text-gray-600 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors whitespace-nowrap font-medium"
            >
              <span className="text-base">{cat.icon}</span>
              {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

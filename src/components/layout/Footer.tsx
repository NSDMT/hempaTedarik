import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-1 mb-4">
              <div className="bg-orange-500 text-white font-black text-xl px-2 py-1 rounded-md">
                H
              </div>
              <div>
                <div className="font-black text-xl text-white leading-none">HEMPA</div>
                <div className="text-[10px] text-orange-400 font-bold tracking-widest leading-none">
                  TEDARİK
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              İş yerinizin her ihtiyacı için güvenilir tedarik noktanız.
              Ofis kırtasiye, ev yaşam ve nalbur ürünlerinde en iyi fiyatlar.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-500 transition-colors text-gray-400 hover:text-white">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-500 transition-colors text-gray-400 hover:text-white">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-500 transition-colors text-gray-400 hover:text-white">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" /></svg>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-500 transition-colors text-gray-400 hover:text-white">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" /></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Hızlı Bağlantılar
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Hakkımızda", href: "/hakkimizda" },
                { label: "İletişim", href: "/iletisim" },
                { label: "Blog", href: "/blog" },
                { label: "Kampanyalar", href: "/kampanyalar" },
                { label: "Bayilik", href: "/bayilik" },
                { label: "Toplu Sipariş", href: "/toplu-siparis" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kategoriler */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Kategoriler
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Ofis & Kırtasiye", slug: "ofis-kirtasiye" },
                { label: "Kağıt Ürünleri", slug: "kagit-urunleri" },
                { label: "Temizlik & Sağlık", slug: "temizlik-saglik" },
                { label: "Gıda & Mutfak", slug: "gida-mutfak" },
                { label: "Ev & Yaşam", slug: "ev-yasam" },
                { label: "Nalbur & Hırdavat", slug: "nalbur-hirdavat" },
              ].map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/kategori/${cat.slug}`}
                    className="text-sm text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              İletişim
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-orange-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-400">
                  Atatürk Cad. No:123<br />
                  Merkez / İstanbul
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-orange-400 flex-shrink-0" />
                <a href="tel:08501234567" className="text-sm text-gray-400 hover:text-orange-400 transition-colors">
                  0850 123 45 67
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-orange-400 flex-shrink-0" />
                <a href="mailto:info@hempatedarik.com" className="text-sm text-gray-400 hover:text-orange-400 transition-colors">
                  info@hempatedarik.com
                </a>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-5 pt-4 border-t border-gray-800">
              <p className="text-xs text-gray-500 mb-3">Güvenli Ödeme</p>
              <div className="flex flex-wrap gap-2">
                {["SSL", "İyzico", "3D Secure"].map((badge) => (
                  <span
                    key={badge}
                    className="text-xs bg-gray-800 border border-gray-700 rounded px-2 py-1 text-gray-400"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <p>© 2026 Hempa Tedarik. Tüm hakları saklıdır.</p>
            <div className="flex gap-4">
              <Link href="/gizlilik-politikasi" className="hover:text-orange-400 transition-colors">
                Gizlilik Politikası
              </Link>
              <Link href="/kullanim-sartlari" className="hover:text-orange-400 transition-colors">
                Kullanım Şartları
              </Link>
              <Link href="/iade-kosullari" className="hover:text-orange-400 transition-colors">
                İade Koşulları
              </Link>
              <Link href="/kvkk" className="hover:text-orange-400 transition-colors">
                KVKK
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

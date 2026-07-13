import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSlider from "@/components/home/HeroSlider";
import CategoryGrid from "@/components/home/CategoryGrid";
import PromoBanners from "@/components/home/PromoBanners";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import { Truck, Shield, RotateCcw, Headphones } from "lucide-react";

const trustFeatures = [
  { icon: Truck, title: "Hızlı Kargo", desc: "Aynı gün teslimat*", color: "text-orange-500" },
  { icon: Shield, title: "Güvenli Alışveriş", desc: "256-bit SSL şifreleme", color: "text-green-500" },
  { icon: RotateCcw, title: "Kolay İade", desc: "30 gün içinde iade", color: "text-blue-500" },
  { icon: Headphones, title: "7/24 Destek", desc: "Müşteri hizmetleri", color: "text-purple-500" },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1 min-h-screen bg-gray-50">
        {/* Trust Features Bar */}
        <div className="bg-white border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
              {trustFeatures.map(({ icon: Icon, title, desc, color }) => (
                <div key={title} className="flex items-center gap-3 py-3 px-4">
                  <Icon size={22} className={color} />
                  <div>
                    <p className="text-xs font-bold text-gray-800">{title}</p>
                    <p className="text-xs text-gray-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6 space-y-8">
          <HeroSlider />
          <CategoryGrid />
          <FeaturedProducts title="Öne Çıkan Ürünler" />
          <PromoBanners />
          <FeaturedProducts title="Çok Satan Ürünler" showAll={true} />

          {/* Newsletter */}
          <section className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-2">Fırsatları Kaçırma!</h2>
            <p className="text-orange-100 mb-6 text-sm">
              E-posta adresinizi girin, özel kampanya ve indirimleri ilk siz öğrenin.
            </p>
            <form className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 px-4 py-3 rounded-lg text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button
                type="submit"
                className="bg-white text-orange-500 hover:bg-orange-50 px-5 py-3 rounded-lg font-bold text-sm transition-colors whitespace-nowrap"
              >
                Abone Ol
              </button>
            </form>
            <p className="text-xs text-orange-200 mt-3">
              Spam göndermiyoruz. İstediğiniz zaman iptal edebilirsiniz.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}



import { notFound } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";
import AddToCartButton from "@/components/products/AddToCartButton";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    select: { name: true, description: true },
  });
  if (!product) return { title: "Ürün Bulunamadı" };
  return { title: `${product.name} | Hempa Tedarik`, description: product.description ?? undefined };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug, isActive: true },
    include: { category: true },
  });

  if (!product) notFound();

  const images: string[] = (() => {
    try { return JSON.parse(product.images); } catch { return []; }
  })();
  const mainImage = images[0] || "/placeholder-product.jpg";

  const discountPercent =
    product.comparePrice && product.comparePrice > product.price
      ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
      : null;

  const related = await prisma.product.findMany({
    where: { categoryId: product.categoryId, isActive: true, NOT: { id: product.id } },
    take: 4,
    include: { category: true },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Anasayfa</Link>
        <span>/</span>
        <Link href="/urunler" className="hover:text-orange-500">Ürünler</Link>
        <span>/</span>
        <Link href={`/kategori/${product.category.slug}`} className="hover:text-orange-500">
          {product.category.name}
        </Link>
        <span>/</span>
        <span className="text-gray-800 font-medium truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Product Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative bg-gray-50 rounded-2xl overflow-hidden aspect-square border">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-full object-contain p-8"
            />
            {discountPercent && (
              <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                -%{discountPercent}
              </div>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <div key={i} className="w-20 h-20 flex-shrink-0 border-2 rounded-lg overflow-hidden cursor-pointer hover:border-orange-400 transition-colors">
                  <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-contain p-1" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="mb-2">
            <Link href={`/kategori/${product.category.slug}`} className="text-orange-500 text-sm font-medium hover:underline">
              {product.category.name}
            </Link>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
            {product.name}
          </h1>

          {product.sku && (
            <p className="text-sm text-gray-400 mb-4">SKU: {product.sku}</p>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-4xl font-black text-orange-500">
              {formatPrice(product.price)}
            </span>
            {product.comparePrice && product.comparePrice > product.price && (
              <span className="text-xl text-gray-400 line-through">
                {formatPrice(product.comparePrice)}
              </span>
            )}
          </div>

          {/* Stock */}
          <div className="mb-6">
            {product.stock > 0 ? (
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block"></span>
                <span className="text-green-700 font-medium text-sm">
                  {product.stock <= 5 ? `Son ${product.stock} ürün!` : "Stokta var"}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span>
                <span className="text-red-600 font-medium text-sm">Stokta yok</span>
              </div>
            )}
          </div>

          {/* Add to Cart */}
          <AddToCartButton
            productId={product.id}
            name={product.name}
            price={product.price}
            image={mainImage}
            stock={product.stock}
            slug={product.slug}
          />

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t">
            {[
              { icon: "🚚", label: "Hızlı Teslimat", sub: "1-3 iş günü" },
              { icon: "↩️", label: "Kolay İade", sub: "14 gün içinde" },
              { icon: "🔒", label: "Güvenli Ödeme", sub: "SSL korumalı" },
            ].map((item) => (
              <div key={item.label} className="text-center bg-gray-50 rounded-xl p-3">
                <div className="text-2xl mb-1">{item.icon}</div>
                <div className="text-xs font-semibold text-gray-700">{item.label}</div>
                <div className="text-xs text-gray-500">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Description */}
      {product.description && (
        <div className="mb-16">
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">Ürün Açıklaması</h2>
          <div className="text-gray-600 leading-relaxed whitespace-pre-line">
            {product.description}
          </div>
        </div>
      )}

      {/* Related Products */}
      {related.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b">Benzer Ürünler</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((rel) => {
              const relImages: string[] = (() => {
                try { return JSON.parse(rel.images); } catch { return []; }
              })();
              const relImage = relImages[0] || "/placeholder-product.jpg";
              const relDiscount = rel.comparePrice && rel.comparePrice > rel.price
                ? Math.round(((rel.comparePrice - rel.price) / rel.comparePrice) * 100)
                : null;
              return (
                <Link key={rel.id} href={`/urun/${rel.slug}`} className="group border rounded-xl overflow-hidden hover:shadow-md transition-shadow bg-white">
                  <div className="relative aspect-square bg-gray-50 overflow-hidden">
                    <img src={relImage} alt={rel.name} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300" />
                    {relDiscount && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">-%{relDiscount}</span>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-gray-500 mb-1">{rel.category.name}</p>
                    <p className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2">{rel.name}</p>
                    <p className="text-orange-500 font-bold">{formatPrice(rel.price)}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

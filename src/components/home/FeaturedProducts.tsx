import Link from "next/link";
import ProductCard from "@/components/products/ProductCard";
import prisma from "@/lib/prisma";

interface FeaturedProductsProps {
  title?: string;
  showAll?: boolean;
  featured?: boolean;
}

export default async function FeaturedProducts({
  title = "Öne Çıkan Ürünler",
  showAll = true,
  featured = false,
}: FeaturedProductsProps) {
  const products = await prisma.product.findMany({
    where: { isActive: true, ...(featured ? { isFeatured: true } : {}) },
    include: { category: true },
    orderBy: featured ? { createdAt: "desc" } : { createdAt: "desc" },
    take: 8,
  });

  if (products.length === 0) return null;

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        {showAll && (
          <Link
            href="/urunler"
            className="text-sm text-orange-500 hover:text-orange-600 font-medium"
          >
            Tümünü Gör →
          </Link>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => {
          const imgs: string[] = (() => { try { return JSON.parse(product.images); } catch { return []; } })();
          return (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              slug={product.slug}
              price={product.price}
              comparePrice={product.comparePrice}
              image={imgs[0]}
              stock={product.stock}
              isFeatured={product.isFeatured}
              category={product.category.name}
            />
          );
        })}
      </div>
    </section>
  );
}


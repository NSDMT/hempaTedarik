import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import prisma from "@/lib/prisma";
import ProductCard from "@/components/products/ProductCard";
import SortSelect from "@/components/ui/SortSelect";
import { formatPrice } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ siralama?: string; min?: string; max?: string; sayfa?: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const cat = await prisma.category.findUnique({ where: { slug }, select: { name: true, description: true } });
  if (!cat) return { title: "Kategori Bulunamadı" };
  return { title: `${cat.name} | Hempa Tedarik`, description: cat.description ?? undefined };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams;
  const category = await prisma.category.findUnique({
    where: { slug, isActive: true },
    include: {
      children: { where: { isActive: true } },
      parent: true,
    },
  });

  if (!category) notFound();

  const page = Number(sp.sayfa) || 1;
  const perPage = 24;
  const sortKey = sp.siralama || "newest";
  const minPrice = sp.min ? Number(sp.min) : undefined;
  const maxPrice = sp.max ? Number(sp.max) : undefined;

  const orderBy: Record<string, unknown> =
    sortKey === "price_asc" ? { price: "asc" }
      : sortKey === "price_desc" ? { price: "desc" }
        : sortKey === "name" ? { name: "asc" }
          : { createdAt: "desc" };

  const where = {
    categoryId: category.id,
    isActive: true,
    ...(minPrice !== undefined || maxPrice !== undefined
      ? { price: { ...(minPrice !== undefined ? { gte: minPrice } : {}), ...(maxPrice !== undefined ? { lte: maxPrice } : {}) } }
      : {}),
  };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { category: true },
      orderBy,
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    prisma.product.count({ where }),
  ]);

  const totalPages = Math.ceil(total / perPage);

  // All active categories for sidebar
  const allCategories = await prisma.category.findMany({
    where: { isActive: true, parentId: null },
    include: { children: { where: { isActive: true } } },
    orderBy: { sortOrder: "asc" },
  });

  const sortOptions = [
    { value: "newest", label: "En Yeni" },
    { value: "price_asc", label: "Fiyat: Düşükten Yükseğe" },
    { value: "price_desc", label: "Fiyat: Yüksekten Düşüğe" },
    { value: "name", label: "İsme Göre (A-Z)" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Anasayfa</Link>
        <span>/</span>
        {category.parent && (
          <>
            <Link href={`/kategori/${category.parent.slug}`} className="hover:text-orange-500">
              {category.parent.name}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-gray-800 font-medium">{category.name}</span>
      </nav>

      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="bg-white border rounded-xl p-4 mb-4">
            <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wider">Kategoriler</h3>
            <ul className="space-y-1">
              {allCategories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/kategori/${cat.slug}`}
                    className={`block px-3 py-2 rounded-lg text-sm transition-colors ${cat.id === category.id
                        ? "bg-orange-50 text-orange-600 font-semibold"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                  >
                    {cat.name}
                  </Link>
                  {cat.children.length > 0 && (
                    <ul className="ml-3 mt-1 space-y-1">
                      {cat.children.map((child) => (
                        <li key={child.id}>
                          <Link
                            href={`/kategori/${child.slug}`}
                            className={`block px-3 py-1.5 rounded-lg text-xs transition-colors ${child.id === category.id
                                ? "text-orange-600 font-semibold"
                                : "text-gray-500 hover:text-gray-900"
                              }`}
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Subcategories */}
          {category.children.length > 0 && (
            <div className="bg-white border rounded-xl p-4 mb-4">
              <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wider">Alt Kategoriler</h3>
              <div className="space-y-1">
                {category.children.map((child) => (
                  <Link
                    key={child.id}
                    href={`/kategori/${child.slug}`}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                  >
                    {child.name}
                    <span className="text-orange-500">›</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{category.name}</h1>
              <p className="text-sm text-gray-500 mt-1">{total} ürün bulundu</p>
            </div>
            <Suspense fallback={null}>
              <SortSelect value={sortKey} options={sortOptions} />
            </Suspense>
          </div>

          {/* Product Grid */}
          {products.length === 0 ? (
            <div className="text-center py-24 text-gray-400">
              <div className="text-6xl mb-4">📦</div>
              <p className="text-lg font-medium">Bu kategoride ürün bulunamadı</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
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
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              {page > 1 && (
                <Link
                  href={`?siralama=${sortKey}&sayfa=${page - 1}`}
                  className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50 transition-colors"
                >
                  ← Önceki
                </Link>
              )}
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                const p = i + 1;
                return (
                  <Link
                    key={p}
                    href={`?siralama=${sortKey}&sayfa=${p}`}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${p === page ? "bg-orange-500 text-white font-bold" : "border hover:bg-gray-50"
                      }`}
                  >
                    {p}
                  </Link>
                );
              })}
              {page < totalPages && (
                <Link
                  href={`?siralama=${sortKey}&sayfa=${page + 1}`}
                  className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50 transition-colors"
                >
                  Sonraki →
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

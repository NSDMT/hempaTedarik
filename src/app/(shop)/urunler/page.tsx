import { Suspense } from "react";
import Link from "next/link";
import ProductCard from "@/components/products/ProductCard";
import SortSelect from "@/components/ui/SortSelect";
import { Search } from "lucide-react";
import prisma from "@/lib/prisma";

const sortOptions = [
  { label: "Önerilen", value: "recommended" },
  { label: "Fiyat (Düşükten Yükseğe)", value: "price-asc" },
  { label: "Fiyat (Yüksekten Düşüğe)", value: "price-desc" },
  { label: "En Yeniler", value: "newest" },
];

export default function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; kategori?: string; siralama?: string; sayfa?: string }>;
}) {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">Yükleniyor...</div>}>
      <ProductsContent searchParams={searchParams} />
    </Suspense>
  );
}

async function ProductsContent({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; kategori?: string; siralama?: string; sayfa?: string }>;
}) {
  const params = await searchParams;
  const query = params.q || "";
  const selectedCategorySlug = params.kategori || "";
  const sort = params.siralama || "recommended";
  const page = Number(params.sayfa) || 1;
  const perPage = 24;

  const orderBy =
    sort === "price-asc" ? { price: "asc" as const }
      : sort === "price-desc" ? { price: "desc" as const }
        : sort === "newest" ? { createdAt: "desc" as const }
          : { createdAt: "desc" as const };

  // Find selected category
  const selectedCategory = selectedCategorySlug
    ? await prisma.category.findUnique({ where: { slug: selectedCategorySlug } })
    : null;

  const where = {
    isActive: true,
    ...(selectedCategory ? { categoryId: selectedCategory.id } : {}),
    ...(query ? { name: { contains: query } } : {}),
  };

  const [products, total, allCategories] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { category: true },
      orderBy,
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    prisma.product.count({ where }),
    prisma.category.findMany({
      where: { isActive: true, parentId: null },
      orderBy: { sortOrder: "asc" },
    }),
  ]);

  const totalPages = Math.ceil(total / perPage);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-3 text-sm text-gray-500">
          <Link href="/" className="hover:text-orange-500">Ana Sayfa</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-800 font-medium">
            {selectedCategory ? selectedCategory.name : "Tüm Ürünler"}
          </span>
          {query && (
            <>
              <span className="mx-2">›</span>
              <span className="text-orange-500">&quot;{query}&quot;</span>
            </>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {query ? `"${query}" için sonuçlar` : selectedCategory ? selectedCategory.name : "Tüm Ürünler"}
            </h1>
            <p className="text-sm text-gray-500 mt-1">{total} ürün bulundu</p>
          </div>
          <div className="flex items-center gap-3">
            <Suspense fallback={null}>
              <SortSelect value={sort} options={sortOptions} />
            </Suspense>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-100 p-4 sticky top-32">
              <h3 className="font-semibold text-gray-800 mb-3 text-sm">Kategoriler</h3>
              <div className="space-y-1">
                <Link
                  href="/urunler"
                  className={`block text-sm px-3 py-2 rounded-lg transition-colors ${!selectedCategorySlug ? "bg-orange-50 text-orange-600 font-semibold" : "text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  Tümü
                </Link>
                {allCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/urunler?kategori=${cat.slug}`}
                    className={`block text-sm px-3 py-2 rounded-lg transition-colors ${selectedCategorySlug === cat.slug
                      ? "bg-orange-50 text-orange-600 font-semibold"
                      : "text-gray-600 hover:bg-gray-50"
                      }`}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>

              <hr className="my-4" />

              <h3 className="font-semibold text-gray-800 mb-3 text-sm">Stok Durumu</h3>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-orange-500" defaultChecked />
                <span className="text-sm text-gray-600">Stokta Olanlar</span>
              </label>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Search Bar */}
            <form method="GET" className="relative mb-4">
              {selectedCategorySlug && <input type="hidden" name="kategori" value={selectedCategorySlug} />}
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Ürünlerde ara..."
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-400 bg-white"
              />
            </form>

            {products.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Ürün bulunamadı</h3>
                <p className="text-gray-500 text-sm">
                  Farklı bir arama terimi deneyin veya filtreleri kaldırın.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
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

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-10">
                    {page > 1 && (
                      <Link href={`?${selectedCategorySlug ? `kategori=${selectedCategorySlug}&` : ""}siralama=${sort}&sayfa=${page - 1}`}
                        className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-100 transition-colors">
                        ← Önceki
                      </Link>
                    )}
                    {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1).map((p) => (
                      <Link key={p}
                        href={`?${selectedCategorySlug ? `kategori=${selectedCategorySlug}&` : ""}siralama=${sort}&sayfa=${p}`}
                        className={`px-4 py-2 rounded-lg text-sm transition-colors ${p === page ? "bg-orange-500 text-white font-bold" : "border hover:bg-gray-100"}`}>
                        {p}
                      </Link>
                    ))}
                    {page < totalPages && (
                      <Link href={`?${selectedCategorySlug ? `kategori=${selectedCategorySlug}&` : ""}siralama=${sort}&sayfa=${page + 1}`}
                        className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-100 transition-colors">
                        Sonraki →
                      </Link>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


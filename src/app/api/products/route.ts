import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { slugify } from "@/lib/utils";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q");
    const categorySlug = searchParams.get("kategori");
    const featured = searchParams.get("featured");
    const limit = parseInt(searchParams.get("limit") || "20");
    const page = parseInt(searchParams.get("page") || "1");

    const where: Record<string, unknown> = { isActive: true };

    if (q) {
      where.OR = [
        { name: { contains: q } },
        { description: { contains: q } },
        { sku: { contains: q } },
      ];
    }

    if (categorySlug) {
      const category = await prisma.category.findUnique({
        where: { slug: categorySlug },
      });
      if (category) {
        where.categoryId = category.id;
      }
    }

    if (featured === "true") {
      where.isFeatured = true;
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: { category: true },
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: (page - 1) * limit,
      }),
      prisma.product.count({ where }),
    ]);

    const productsWithImages = products.map((p) => ({
      ...p,
      images: JSON.parse(p.images || "[]"),
    }));

    return NextResponse.json({
      products: productsWithImages,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Products GET error:", error);
    return NextResponse.json({ error: "Ürünler alınamadı" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const role = (session?.user as { role?: string } | undefined)?.role;
    if (role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    const { name, description, price, comparePrice, sku, stock, images, categoryId, isActive, isFeatured } = body;

    if (!name || !price || !categoryId) {
      return NextResponse.json(
        { error: "Ad, fiyat ve kategori zorunludur" },
        { status: 400 }
      );
    }

    const slug = slugify(name) + "-" + Date.now().toString(36);

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price: parseFloat(price),
        comparePrice: comparePrice ? parseFloat(comparePrice) : null,
        sku,
        stock: parseInt(stock) || 0,
        images: JSON.stringify(images || []),
        categoryId,
        isActive: isActive !== false,
        isFeatured: isFeatured === true,
      },
      include: { category: true },
    });

    return NextResponse.json({
      ...product,
      images: JSON.parse(product.images),
    }, { status: 201 });
  } catch (error) {
    console.error("Product POST error:", error);
    return NextResponse.json({ error: "Ürün eklenemedi" }, { status: 500 });
  }
}

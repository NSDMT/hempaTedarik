"use client";

import React from "react";
import Link from "next/link";
import { ShoppingCart, Star, Eye } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { LocalCartItem } from "@/types";

interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number | null;
  image?: string;
  stock: number;
  isFeatured?: boolean;
  category?: string;
  rating?: number;
  reviewCount?: number;
}

export default function ProductCard({
  id,
  name,
  slug,
  price,
  comparePrice,
  image,
  stock,
  isFeatured,
  category,
  rating = 4.5,
  reviewCount = 12,
}: ProductCardProps) {
  const { addItem } = useCartStore();
  const discountPercent =
    comparePrice && comparePrice > price
      ? Math.round(((comparePrice - price) / comparePrice) * 100)
      : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    const item: LocalCartItem = {
      productId: id,
      name,
      price,
      image: image || "/placeholder-product.jpg",
      quantity: 1,
      stock,
      slug,
    };
    addItem(item);
  };

  return (
    <Link href={`/urun/${slug}`} className="group">
      <div className="bg-white rounded-xl border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col h-full">
        {/* Image Container */}
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt={name}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 p-4"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl bg-gradient-to-br from-orange-50 to-amber-50">
              📦
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {discountPercent && (
              <Badge variant="destructive" className="text-xs px-2 py-0.5">
                -%{discountPercent}
              </Badge>
            )}
            {isFeatured && (
              <Badge className="text-xs px-2 py-0.5 bg-orange-500">
                ⭐ Öne Çıkan
              </Badge>
            )}
            {stock === 0 && (
              <Badge variant="secondary" className="text-xs px-2 py-0.5">
                Tükendi
              </Badge>
            )}
            {stock > 0 && stock <= 5 && (
              <Badge variant="warning" className="text-xs px-2 py-0.5">
                Son {stock} adet
              </Badge>
            )}
          </div>

          {/* Quick View */}
          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="w-8 h-8 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-600 hover:text-orange-500">
              <Eye size={15} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 flex flex-col flex-1">
          {category && (
            <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide">
              {category}
            </p>
          )}

          <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 leading-snug flex-1">
            {name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={i < Math.floor(rating) ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}
                />
              ))}
            </div>
            <span className="text-xs text-gray-400">({reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-orange-500">
              {formatPrice(price)}
            </span>
            {comparePrice && comparePrice > price && (
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(comparePrice)}
              </span>
            )}
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={stock === 0}
            className={`w-full py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all ${stock === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 text-white active:scale-95"
              }`}
          >
            <ShoppingCart size={15} />
            {stock === 0 ? "Stokta Yok" : "Sepete Ekle"}
          </button>
        </div>
      </div>
    </Link>
  );
}

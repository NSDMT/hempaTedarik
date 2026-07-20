"use client";
import { useState } from "react";

export default function ProductImageGallery({
  images,
  productName,
  discountPercent,
}: {
  images: string[];
  productName: string;
  discountPercent: number | null;
}) {
  const [selected, setSelected] = useState(0);
  const main = images[selected] || "/placeholder-product.jpg";

  return (
    <div className="space-y-4">
      {/* Ana görsel */}
      <div className="relative bg-gray-50 rounded-2xl overflow-hidden aspect-square border">
        <img
          src={main}
          alt={productName}
          className="w-full h-full object-contain p-8"
        />
        {discountPercent && (
          <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
            -%{discountPercent}
          </div>
        )}
      </div>

      {/* Thumbnail'lar */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelected(i)}
              className={`w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden transition-all ${
                i === selected
                  ? "border-2 border-orange-500 shadow-md"
                  : "border-2 border-gray-200 hover:border-orange-300"
              }`}
            >
              <img
                src={img}
                alt={`${productName} ${i + 1}`}
                className="w-full h-full object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

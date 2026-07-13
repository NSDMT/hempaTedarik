"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart";
import type { LocalCartItem } from "@/types";

interface Props {
  productId: string;
  name: string;
  price: number;
  image: string;
  stock: number;
  slug: string;
}

export default function AddToCartButton({ productId, name, price, image, stock, slug }: Props) {
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    const item: LocalCartItem = { productId, name, price, image, quantity, stock, slug };
    addItem(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (stock === 0) {
    return (
      <button disabled className="w-full py-4 bg-gray-200 text-gray-500 font-semibold rounded-xl cursor-not-allowed">
        Stokta Yok
      </button>
    );
  }

  return (
    <div className="space-y-3">
      {/* Quantity */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-600">Adet:</span>
        <div className="flex items-center border rounded-lg overflow-hidden">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-2 bg-gray-50 hover:bg-gray-100 font-bold text-gray-600 transition-colors"
          >
            −
          </button>
          <span className="px-4 py-2 font-semibold text-gray-800 min-w-[48px] text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(Math.min(stock, quantity + 1))}
            className="px-3 py-2 bg-gray-50 hover:bg-gray-100 font-bold text-gray-600 transition-colors"
          >
            +
          </button>
        </div>
        <span className="text-xs text-gray-400">Maks: {stock}</span>
      </div>

      {/* Add button */}
      <button
        onClick={handleAdd}
        className={`w-full py-4 font-bold text-white rounded-xl transition-all text-lg shadow-md ${added
            ? "bg-green-500 scale-95"
            : "bg-orange-500 hover:bg-orange-600 active:scale-95"
          }`}
      >
        {added ? "✓ Sepete Eklendi!" : "Sepete Ekle"}
      </button>
    </div>
  );
}

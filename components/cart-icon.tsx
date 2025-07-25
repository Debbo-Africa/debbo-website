"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import Link from "next/link";

export function CartIcon() {
  const { getCartCount, isLoaded } = useCart();
  const count = getCartCount();

  if (!isLoaded) {
    return (
      <Link href="/cart" className="relative">
        <ShoppingCart className="w-6 h-6" />
      </Link>
    );
  }

  return (
    <Link href="/cart" className="relative">
      <ShoppingCart className="w-6 h-6" />
      {count > 0 && (
        <span className="absolute top-0 -right-2 bg-[#0D0D0DFC] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {count}
        </span>
      )}
    </Link>
  );
}

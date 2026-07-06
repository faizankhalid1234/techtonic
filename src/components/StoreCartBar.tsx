"use client";

import { useCart } from "@/context/CartContext";
import { copy } from "@/lib/copy";

/** Inline bag button for store listing pages (header has the main cart icon). */
export function StoreCartBar() {
  const { itemCount, openDrawer } = useCart();

  return (
    <button
      type="button"
      onClick={openDrawer}
      className="group inline-flex items-center gap-3 rounded-2xl border border-amber-500/20 bg-zinc-900/80 px-5 py-3 text-sm shadow-lg shadow-black/20 transition hover:border-amber-400/40 hover:bg-zinc-900"
    >
      <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 ring-1 ring-amber-400/25">
        <svg
          className="h-5 w-5 text-amber-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        {itemCount > 0 ? (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
            {itemCount}
          </span>
        ) : null}
      </span>
      <span className="font-semibold text-zinc-100 group-hover:text-white">
        {copy.cart.bag(itemCount)}
      </span>
    </button>
  );
}

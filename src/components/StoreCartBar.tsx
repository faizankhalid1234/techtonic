"use client";

import { useMemo, useState } from "react";
import { CartDrawer } from "@/components/CartDrawer";
import { copy } from "@/lib/copy";
import { useCart } from "@/context/CartContext";

export function StoreCartBar() {
  const { items, setQty, removeItem } = useCart();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.qty, 0),
    [items],
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setDrawerOpen(true)}
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

      <CartDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        items={items}
        itemCount={itemCount}
        setQty={setQty}
        removeItem={removeItem}
      />

      {itemCount > 0 && !drawerOpen ? (
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="cart-fab-pulse fixed bottom-6 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-500 text-zinc-950 shadow-xl shadow-amber-500/30 sm:right-6"
          aria-label="Open cart"
        >
          <svg
            className="h-6 w-6"
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
          <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
            {itemCount}
          </span>
        </button>
      ) : null}
    </>
  );
}

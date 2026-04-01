"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/lib/products";

export default function StorePage() {
  const { addItem, items, setQty, removeItem } = useCart();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.qty, 0),
    [items],
  );
  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items],
  );

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-12">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-400">
            SUNLONG Collection
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-100 md:text-4xl">
            Store
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-400 md:text-base">
            Original color screens with clear visuals, strong touch response,
            and quality replacement options for daily and professional use.
          </p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-2 text-sm text-zinc-300">
          Cart items: <span className="font-semibold text-white">{itemCount}</span>
        </div>
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="rounded-xl border border-zinc-700 bg-zinc-900/80 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:border-zinc-500"
        >
          Open cart panel
        </button>
      </div>

      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {PRODUCTS.map((p) => (
            <article
              key={p.id}
              className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 50vw, 33vw"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-zinc-100">{p.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {p.tagline}
                </p>
                <p className="mt-4 text-2xl font-bold text-white">
                  Rs {p.price.toLocaleString("en-PK")}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    addItem({
                      productId: p.id,
                      name: p.name,
                      price: p.price,
                      qty: 1,
                    });
                    setDrawerOpen(true);
                  }}
                  className="mt-4 w-full rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-amber-300"
                >
                  Add to cart
                </button>
                <button
                  type="button"
                  onClick={() => {
                    addItem({
                      productId: p.id,
                      name: p.name,
                      price: p.price,
                      qty: 1,
                    });
                    setDrawerOpen(true);
                  }}
                  className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm font-semibold text-zinc-200 transition hover:border-zinc-500"
                >
                  Buy now
                </button>
              </div>
            </article>
          ))}
      </section>

      {/* Global right-side drawer (desktop + mobile) */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity ${
          drawerOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setDrawerOpen(false)}
      />
      <aside
        className={`fixed bottom-0 right-0 top-0 z-50 w-[88%] max-w-md bg-zinc-950 p-4 shadow-2xl transition-transform ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-zinc-100">Your Cart</h3>
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            className="rounded-md border border-zinc-700 px-2 py-1 text-sm text-zinc-300"
          >
            Close
          </button>
        </div>

        {items.length === 0 ? (
          <p className="text-sm text-zinc-400">No items yet.</p>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.productId}
                className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-3"
              >
                <p className="text-sm font-medium text-zinc-100">{item.name}</p>
                <p className="text-xs text-zinc-400">
                  Rs {item.price.toLocaleString("en-PK")}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="h-7 w-7 rounded-md border border-zinc-700 text-zinc-200"
                      onClick={() =>
                        item.qty <= 1
                          ? removeItem(item.productId)
                          : setQty(item.productId, item.qty - 1)
                      }
                    >
                      -
                    </button>
                    <span className="text-sm text-zinc-200">{item.qty}</span>
                    <button
                      type="button"
                      className="h-7 w-7 rounded-md border border-zinc-700 text-zinc-200"
                      onClick={() => setQty(item.productId, item.qty + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className="text-xs text-rose-400 hover:text-rose-300"
                    onClick={() => removeItem(item.productId)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-5 border-t border-zinc-800 pt-4">
          <p className="flex items-center justify-between text-sm text-zinc-300">
            <span>Subtotal</span>
            <span className="font-semibold text-white">
              Rs {subtotal.toLocaleString("en-PK")}
            </span>
          </p>
          <Link
            href="/checkout"
            className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-semibold text-zinc-950 hover:bg-amber-300"
          >
            Go to checkout
          </Link>
        </div>
      </aside>
    </main>
  );
}

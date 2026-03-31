"use client";

import Image from "next/image";
import { useMemo } from "react";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/lib/products";

export default function StorePage() {
  const { addItem, items } = useCart();
  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.qty, 0),
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
      </div>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                sizes="(max-width: 1024px) 50vw, 25vw"
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
                onClick={() =>
                  addItem({
                    productId: p.id,
                    name: p.name,
                    price: p.price,
                    qty: 1,
                  })
                }
                className="mt-4 w-full rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-amber-300"
              >
                Add to cart
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

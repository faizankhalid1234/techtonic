"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import {
  STORE_CATEGORIES,
  descriptionForProductDetail,
  productItemHref,
  type StoreProductLine,
  type StoreVariant,
} from "@/lib/storeCatalog";

type Props = {
  line: StoreProductLine;
  variant: StoreVariant;
};

function formatPkr(n: number) {
  return n.toLocaleString("en-PK");
}

export function ProductDetailClient({ line, variant }: Props) {
  const router = useRouter();
  const { addItem } = useCart();
  const [addedFlash, setAddedFlash] = useState(false);

  const cat = STORE_CATEGORIES.find((c) => c.id === line.category);
  const displayName = `${line.title} — ${variant.label}`;
  const others = line.variants.filter((v) => v.id !== variant.id);

  function addToCart() {
    addItem({
      productId: variant.id,
      name: displayName,
      price: variant.price,
      qty: 1,
    });
    setAddedFlash(true);
    window.setTimeout(() => setAddedFlash(false), 2000);
  }

  function buyNow() {
    addItem({
      productId: variant.id,
      name: displayName,
      price: variant.price,
      qty: 1,
    });
    router.push("/checkout");
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-6 sm:px-6 sm:pt-8 lg:pb-24">
      <nav
        className="mb-8 flex flex-wrap items-center gap-2 text-sm text-zinc-500"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="transition hover:text-zinc-300">
          Home
        </Link>
        <span aria-hidden>/</span>
        <Link href="/store" className="transition hover:text-zinc-300">
          Store
        </Link>
        <span aria-hidden>/</span>
        <span className="text-zinc-400">{cat?.label ?? line.category}</span>
        <span aria-hidden>/</span>
        <span className="max-w-[12rem] truncate text-zinc-300 sm:max-w-md">
          {variant.label}
        </span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 lg:items-start">
        <div className="lg:sticky lg:top-28">
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-900 shadow-2xl shadow-black/40 ring-1 ring-white/[0.04]">
            <Image
              src={line.image}
              alt={displayName}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              unoptimized
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent" />
            <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-200 backdrop-blur-md">
              SUNLONG
            </span>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
            {cat?.label ?? "Display panel"}
          </p>
          <h1 className="mt-2 text-2xl font-bold leading-tight tracking-tight text-zinc-50 sm:text-3xl lg:text-4xl">
            {line.title}
          </h1>
          <p className="mt-3 inline-flex rounded-full border border-zinc-700/80 bg-zinc-900/60 px-3 py-1 text-sm font-medium text-zinc-300">
            Selected:{" "}
            <span className="ml-1.5 text-amber-200">{variant.label}</span>
          </p>

          <div className="mt-6 border-b border-zinc-800 pb-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Price
            </p>
            <p className="mt-1 flex flex-wrap items-baseline gap-2">
              <span className="text-4xl font-bold tabular-nums tracking-tight text-white sm:text-5xl">
                {formatPkr(variant.price)}
              </span>
              <span className="text-lg font-medium text-zinc-400">PKR</span>
            </p>
            <p className="mt-2 text-sm text-zinc-500">
              Cash on delivery available at checkout. No advance on COD orders.
            </p>
          </div>

          <div className="mt-6 space-y-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
              About this panel
            </h2>
            <div className="space-y-4 text-base leading-[1.7] text-zinc-300">
              {descriptionForProductDetail(line)
                .split(/\n\n+/)
                .filter(Boolean)
                .map((para, i) => (
                  <p key={i}>{para.trim()}</p>
                ))}
            </div>
            <ul className="grid gap-3 text-sm text-zinc-400">
              <li className="flex gap-3">
                <span className="mt-0.5 shrink-0 text-amber-500" aria-hidden>
                  ✓
                </span>
                <span>
                  You are viewing the{" "}
                  <span className="font-semibold text-zinc-200">
                    {variant.label}
                  </span>{" "}
                  variant — cart and checkout use this exact SKU and price.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 shrink-0 text-amber-500" aria-hidden>
                  ✓
                </span>
                SUNLONG panel quality with responsive touch and stable
                  brightness.
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 shrink-0 text-amber-500" aria-hidden>
                  ✓
                </span>
                Tech Tonic fulfilment — COD on delivery, no advance on standard
                  COD orders.
              </li>
            </ul>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={() => addToCart()}
              className="inline-flex min-h-[3.25rem] flex-1 items-center justify-center rounded-2xl bg-amber-400 px-8 text-base font-semibold text-zinc-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-300 active:scale-[0.99] sm:min-w-[200px]"
            >
              {addedFlash ? "Added to cart ✓" : "Add to cart"}
            </button>
            <button
              type="button"
              onClick={() => buyNow()}
              className="inline-flex min-h-[3.25rem] flex-1 items-center justify-center rounded-2xl border-2 border-zinc-600 bg-transparent px-8 text-base font-semibold text-zinc-100 transition hover:border-amber-500/50 hover:bg-zinc-900/50 active:scale-[0.99] sm:min-w-[200px]"
            >
              Buy now
            </button>
          </div>

          <Link
            href="/store"
            className="mt-8 inline-flex text-sm font-medium text-amber-400 transition hover:text-amber-300"
          >
            ← Back to all displays
          </Link>

          {others.length > 0 ? (
            <section className="mt-12 border-t border-zinc-800 pt-10">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
                More options in this range
              </h3>
              <div className="mt-4 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:thin]">
                {others.map((v) => (
                  <Link
                    key={v.id}
                    href={productItemHref(v.id)}
                    className="shrink-0 rounded-xl border border-zinc-700/80 bg-zinc-900/50 px-4 py-3 text-left transition hover:border-amber-500/40 hover:bg-zinc-800/50"
                  >
                    <p className="text-sm font-medium text-zinc-200">
                      {v.label}
                    </p>
                    <p className="mt-1 text-xs tabular-nums text-amber-400">
                      PKR {formatPkr(v.price)}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useCart } from "@/context/CartContext";
import {
  STORE_CATEGORIES,
  STORE_PRODUCT_LINES,
  minPrice,
  productItemHref,
  type StoreCategory,
  type StoreProductLine,
  type StoreVariant,
} from "@/lib/storeCatalog";

const CATEGORY_GLOW: Record<
  StoreCategory,
  string
> = {
  iphone:
    "from-amber-500/35 via-orange-500/10 to-transparent",
  samsung:
    "from-sky-500/30 via-blue-600/10 to-transparent",
  vivo: "from-cyan-500/30 via-teal-500/10 to-transparent",
  oppo: "from-emerald-500/30 via-green-600/10 to-transparent",
  xiaomi:
    "from-orange-500/35 via-amber-600/10 to-transparent",
  huawei:
    "from-violet-500/30 via-fuchsia-500/10 to-transparent",
};

function formatPkr(n: number) {
  return n.toLocaleString("en-PK");
}

function variantInitials(label: string) {
  const alnum = label.replace(/[^a-zA-Z0-9]/g, "");
  if (alnum.length >= 2) return alnum.slice(0, 2).toUpperCase();
  if (label.length >= 2) return label.slice(0, 2).toUpperCase();
  return "TT";
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.25}
      aria-hidden
    >
      <path strokeLinecap="round" d="M12 5v14M5 12h14" />
    </svg>
  );
}

function VariantListItem({
  variant,
  onAdd,
}: {
  variant: StoreVariant;
  onAdd: () => void;
}) {
  const initials = variantInitials(variant.label);
  const detailHref = productItemHref(variant.id);
  return (
    <li className="group/item">
      <div className="flex flex-col gap-3 rounded-2xl px-2 py-2 sm:flex-row sm:items-center sm:gap-3 sm:py-2">
        <Link
          href={detailHref}
          className="flex min-w-0 flex-1 flex-col gap-3 rounded-2xl px-2 py-2 transition hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 sm:flex-row sm:items-center sm:gap-4 sm:px-3 sm:py-2"
        >
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400/25 via-amber-500/10 to-fuchsia-500/15 text-xs font-bold tracking-tight text-amber-200 ring-1 ring-amber-400/20 shadow-inner shadow-black/20"
              aria-hidden
            >
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-[15px] font-medium leading-snug text-zinc-100">
                {variant.label}
              </p>
              <p className="mt-0.5 text-[11px] text-zinc-500 sm:hidden">
                Tap for full details &amp; photo
              </p>
            </div>
          </div>
          <div className="shrink-0 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-right backdrop-blur-sm sm:ml-auto">
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
              PKR
            </p>
            <p className="text-lg font-bold tabular-nums text-zinc-50">
              {formatPkr(variant.price)}
            </p>
          </div>
        </Link>
        <button
          type="button"
          onClick={() => onAdd()}
          className="inline-flex shrink-0 items-center justify-center gap-2 self-stretch rounded-full bg-amber-400 px-5 py-2.5 text-sm font-semibold text-zinc-900 shadow-lg shadow-amber-500/20 transition hover:bg-amber-300 hover:shadow-amber-400/30 active:scale-[0.97] sm:self-center"
        >
          <PlusIcon className="h-4 w-4" />
          Add
        </button>
      </div>
    </li>
  );
}

function ProductCard({
  line,
  onAddVariant,
}: {
  line: StoreProductLine;
  onAddVariant: (variant: StoreVariant) => void;
}) {
  const cat = STORE_CATEGORIES.find((c) => c.id === line.category);
  const from = minPrice(line);
  const to = Math.max(...line.variants.map((v) => v.price));

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-zinc-800/90 bg-gradient-to-b from-zinc-900/80 to-zinc-950/90 shadow-[0_20px_50px_rgba(0,0,0,0.35)] ring-1 ring-white/[0.04] transition hover:border-zinc-700 hover:ring-amber-500/10">
      <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[5/3]">
        <Image
          src={line.image}
          alt={line.title}
          fill
          className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 50vw"
          unoptimized
        />
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${CATEGORY_GLOW[line.category]} mix-blend-screen`}
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/45 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-200 backdrop-blur-sm sm:left-4 sm:top-4 sm:text-xs">
          {cat?.label ?? line.category}
        </span>
        <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 backdrop-blur-md">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
              From
            </span>
            <span className="text-xs font-bold tabular-nums text-amber-300">
              PKR {from.toLocaleString("en-PK")}
            </span>
            {line.variants.length > 1 && from !== to ? (
              <>
                <span className="text-zinc-600">·</span>
                <span className="text-[10px] font-medium text-zinc-500">
                  up to {to.toLocaleString("en-PK")}
                </span>
              </>
            ) : null}
          </div>
          <h2 className="mt-2 line-clamp-2 text-lg font-bold leading-snug text-white drop-shadow-md sm:text-xl">
            {line.title}
          </h2>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="line-clamp-2 text-sm leading-relaxed text-zinc-400">
          {line.description}
        </p>
        <div className="mt-5 flex items-center gap-3">
          <span className="h-px min-w-[2rem] flex-1 bg-gradient-to-r from-transparent to-zinc-700/80" />
          <span className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            {line.variants.length} model
            {line.variants.length !== 1 ? "s" : ""}
          </span>
          <span className="h-px min-w-[2rem] flex-1 bg-gradient-to-l from-transparent to-zinc-700/80" />
        </div>

        <div className="mt-4 overflow-hidden rounded-[1.35rem] border border-zinc-800/60 bg-zinc-950/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <ul className="max-h-[min(24rem,52svh)] divide-y divide-zinc-800/50 overflow-y-auto [scrollbar-color:rgba(82,82,91,0.5)_transparent] [scrollbar-width:thin]">
            {line.variants.map((variant) => (
              <VariantListItem
                key={variant.id}
                variant={variant}
                onAdd={() => onAddVariant(variant)}
              />
            ))}
          </ul>
        </div>
        <p className="mt-3 text-center text-[11px] text-zinc-600">
          Tap a model for full page · Add puts it in the side cart
        </p>
      </div>
    </article>
  );
}

export default function StorePage() {
  const { addItem, items, setQty, removeItem } = useCart();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [category, setCategory] = useState<StoreCategory | "all">("all");
  const [query, setQuery] = useState("");

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.qty, 0),
    [items],
  );
  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items],
  );

  const filtered = useMemo(() => {
    let lines = STORE_PRODUCT_LINES;
    if (category !== "all") {
      lines = lines.filter((l) => l.category === category);
    }
    const q = query.trim().toLowerCase();
    if (q) {
      lines = lines.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q) ||
          l.variants.some((v) => v.label.toLowerCase().includes(q)),
      );
    }
    return lines;
  }, [category, query]);

  function addVariant(line: StoreProductLine, variant: StoreVariant) {
    addItem({
      productId: variant.id,
      name: `${line.title} — ${variant.label}`,
      price: variant.price,
      qty: 1,
    });
    setDrawerOpen(true);
  }

  return (
    <main className="relative mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:py-14">
      <div className="pointer-events-none absolute inset-x-0 -top-24 h-64 bg-gradient-to-b from-amber-500/8 to-transparent blur-3xl" />

      <div className="relative mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-400">
            SUNLONG · Original color
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-50 md:text-4xl lg:text-5xl">
            Display store
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
            LCD &amp; OLED replacement panels — pick your exact model, see the
            price, add to cart or buy now. Swap images in{" "}
            <code className="rounded bg-zinc-800/80 px-1.5 py-0.5 text-xs text-zinc-300">
              public/store/
            </code>{" "}
            when your photos are ready.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 px-4 py-2.5 text-sm text-zinc-300">
            Cart:{" "}
            <span className="font-semibold text-white">{itemCount}</span>
          </div>
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="rounded-2xl border border-zinc-600 bg-zinc-900/80 px-4 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-amber-500/40 hover:text-white"
          >
            Open cart
          </button>
        </div>
      </div>

      <div className="relative mb-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory("all")}
            className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition sm:text-sm ${
              category === "all"
                ? "border-amber-400/60 bg-amber-400/15 text-amber-200"
                : "border-zinc-700 bg-zinc-900/50 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200"
            }`}
          >
            All
          </button>
          {STORE_CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                category === c.id
                  ? "border-amber-400/60 bg-amber-400/15 text-amber-200"
                  : "border-zinc-700 bg-zinc-900/50 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <label className="relative block w-full sm:max-w-xs sm:flex-1">
          <span className="sr-only">Search models</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search model e.g. A12, Y21, 13 Pro…"
            className="w-full rounded-2xl border border-zinc-700 bg-zinc-900/80 py-2.5 pl-4 pr-4 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none ring-amber-500/0 transition focus:border-amber-500/40 focus:ring-2 focus:ring-amber-500/20"
          />
        </label>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-10 text-center text-zinc-400">
          No products match your filters. Try another category or clear search.
        </p>
      ) : (
        <section className="grid gap-6 md:grid-cols-2 md:gap-8">
          {filtered.map((line) => (
            <ProductCard
              key={line.id}
              line={line}
              onAddVariant={(variant) => addVariant(line, variant)}
            />
          ))}
        </section>
      )}

      <div
        className={`fixed inset-0 z-50 bg-black/55 backdrop-blur-[2px] transition-opacity duration-300 ${
          drawerOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden={!drawerOpen}
      />
      <aside
        className={`fixed bottom-0 right-0 top-0 z-50 flex w-[min(100%,24rem)] flex-col border-l border-zinc-800 bg-zinc-950 p-4 shadow-2xl shadow-black/50 transition-transform duration-300 ease-out sm:p-5 ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-4 flex items-center justify-between gap-2">
          <h3 className="text-lg font-semibold text-zinc-100">Your cart</h3>
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            className="rounded-lg border border-zinc-700 px-3 py-1.5 text-sm text-zinc-300 transition hover:bg-zinc-900"
          >
            Close
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-sm text-zinc-500">No items yet.</p>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item.productId}
                  className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-3"
                >
                  <p className="text-sm font-medium leading-snug text-zinc-100">
                    {item.name}
                  </p>
                  <div className="mt-2 inline-flex flex-col rounded-xl border border-zinc-700/60 bg-zinc-800/40 px-2.5 py-1.5">
                    <span className="text-[8px] font-semibold uppercase tracking-wider text-zinc-500">
                      PKR
                    </span>
                    <span className="text-sm font-bold tabular-nums text-amber-400">
                      {item.price.toLocaleString("en-PK")}
                    </span>
                    <span className="text-[10px] text-zinc-500">per unit</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-700 text-zinc-200"
                        onClick={() =>
                          item.qty <= 1
                            ? removeItem(item.productId)
                            : setQty(item.productId, item.qty - 1)
                        }
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm text-zinc-200">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-700 text-zinc-200"
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
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-auto border-t border-zinc-800 pt-4">
          <div className="flex items-end justify-between gap-3">
            <span className="text-sm text-zinc-400">Subtotal</span>
            <div className="text-right">
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                PKR
              </span>
              <span className="text-xl font-bold tabular-nums tracking-tight text-white">
                {subtotal.toLocaleString("en-PK")}
              </span>
            </div>
          </div>
          <Link
            href="/checkout"
            className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-amber-400 px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-amber-300"
          >
            Go to checkout
          </Link>
        </div>
      </aside>
    </main>
  );
}

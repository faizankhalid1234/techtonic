"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { AddToCartButton } from "@/components/AddToCartButton";
import { StoreCartBar } from "@/components/StoreCartBar";
import { useCart } from "@/context/CartContext";
import { copy } from "@/lib/copy";
import {
  galleryImagesForLine,
  minPrice,
  maxPrice,
  type StoreCategory,
  type StoreProductLine,
  type StoreVariant,
} from "@/lib/storeCatalog";

type CategoryInfo = {
  id: StoreCategory;
  label: string;
  short: string;
};

function formatPkr(n: number) {
  return n.toLocaleString("en-PK");
}

export function BrandModelsClient({
  category,
  series,
}: {
  category: CategoryInfo;
  series: StoreProductLine[];
}) {
  const [query, setQuery] = useState("");
  const [openSeriesId, setOpenSeriesId] = useState<string | null>(
    series[0]?.id ?? null,
  );
  const [addedId, setAddedId] = useState<string | null>(null);

  const filteredSeries = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return series;
    return series
      .map((line) => {
        const matchingVariants = line.variants.filter(
          (v) =>
            v.label.toLowerCase().includes(q) ||
            line.seriesName.toLowerCase().includes(q),
        );
        if (matchingVariants.length === 0) return null;
        return { ...line, variants: matchingVariants };
      })
      .filter(Boolean) as StoreProductLine[];
  }, [series, query]);

  function flashAdded(variantId: string) {
    setAddedId(variantId);
    window.setTimeout(
      () => setAddedId((id) => (id === variantId ? null : id)),
      2000,
    );
  }

  return (
    <main className="relative mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:py-14">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-amber-500/10 to-transparent blur-3xl"
        aria-hidden
      />

      <nav
        className="relative mb-6 flex flex-wrap items-center gap-1.5 text-sm text-zinc-500"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="transition hover:text-amber-300">
          Home
        </Link>
        <span className="text-zinc-600">›</span>
        <Link href="/store" className="transition hover:text-amber-300">
          Shop
        </Link>
        <span className="text-zinc-600">›</span>
        <span className="text-amber-300">{category.label}</span>
      </nav>

      <header className="relative mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-400">
            {category.short}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {category.label} series
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-400">
            Pick a series (like iPhone 11), then choose your exact model —
            11, 11 Pro, or 11 Pro Max.
          </p>
        </div>
        <StoreCartBar />
      </header>

      <label className="relative mb-8 block">
        <span className="sr-only">Search series or models</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${category.label} series or models…`}
          className="w-full rounded-2xl border border-zinc-700/80 bg-zinc-900/80 px-5 py-3.5 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
        />
      </label>

      {filteredSeries.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/40 p-12 text-center text-zinc-400">
          No series or models match your search.
        </p>
      ) : (
        <div className="relative space-y-4">
          {filteredSeries.map((line) => {
            const open = openSeriesId === line.id || Boolean(query.trim());
            return (
              <SeriesCategory
                key={line.id}
                line={line}
                brandLabel={category.label}
                open={open}
                onToggle={() =>
                  setOpenSeriesId((id) => (id === line.id ? null : line.id))
                }
                addedId={addedId}
                onAdded={flashAdded}
              />
            );
          })}
        </div>
      )}

      <Link
        href="/store"
        className="relative mt-12 inline-flex items-center gap-2 text-sm font-medium text-amber-400 transition hover:text-amber-300"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        {copy.shop.backToBrands}
      </Link>
    </main>
  );
}

function SeriesCategory({
  line,
  brandLabel,
  open,
  onToggle,
  addedId,
  onAdded,
}: {
  line: StoreProductLine;
  brandLabel: string;
  open: boolean;
  onToggle: () => void;
  addedId: string | null;
  onAdded: (id: string) => void;
}) {
  const gallery = galleryImagesForLine(line);
  const thumb = gallery[0] ?? line.image;
  const low = minPrice(line);
  const high = maxPrice(line);
  const priceLabel =
    low === high
      ? `From Rs. ${formatPkr(low)}`
      : `Rs. ${formatPkr(low)} – ${formatPkr(high)}`;

  return (
    <section className="overflow-hidden rounded-3xl border border-zinc-800/80 bg-gradient-to-br from-zinc-900/95 via-zinc-950 to-zinc-950 shadow-xl shadow-black/30 ring-1 ring-white/[0.04] transition hover:border-amber-500/25">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-4 p-4 text-left transition hover:bg-zinc-900/60 sm:p-5"
        aria-expanded={open}
      >
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-zinc-700/60 bg-zinc-800/80 sm:h-20 sm:w-20">
          <Image
            src={thumb}
            alt={line.seriesName}
            fill
            className="object-contain object-center p-1.5"
            sizes="80px"
            unoptimized
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-400/80">
            Series
          </p>
          <h2 className="mt-0.5 text-lg font-bold text-white sm:text-xl">
            {line.seriesName}
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            {line.variants.length} models · {priceLabel}
          </p>
        </div>
        <span className="flex shrink-0 items-center gap-2">
          <span className="hidden rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-200 ring-1 ring-amber-500/25 sm:inline">
            {line.variants.length}
          </span>
          <svg
            className={`h-5 w-5 text-zinc-400 transition ${open ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      {open ? (
        <div className="border-t border-zinc-800/80 bg-zinc-950/40 px-3 pb-4 pt-3 sm:px-5">
          <p className="mb-3 px-1 text-xs text-zinc-500">
            Choose your exact model in this series
          </p>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {line.variants.map((variant) => (
              <ModelCard
                key={variant.id}
                line={line}
                variant={variant}
                brandLabel={brandLabel}
                thumb={thumb}
                gallery={gallery}
                added={addedId === variant.id}
                onAdded={() => onAdded(variant.id)}
              />
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

function ModelCard({
  line,
  variant,
  brandLabel,
  thumb,
  gallery,
  added,
  onAdded,
}: {
  line: StoreProductLine;
  variant: StoreVariant;
  brandLabel: string;
  thumb: string;
  gallery: string[];
  added: boolean;
  onAdded: () => void;
}) {
  const router = useRouter();
  const { addItem, replaceWithItem } = useCart();
  const displayName = `${brandLabel} — ${variant.label}`;

  function payload() {
    return {
      productId: variant.id,
      name: displayName,
      price: variant.price,
      image: thumb,
      images: gallery,
      qty: 1,
    };
  }

  return (
    <li className="flex flex-col overflow-hidden rounded-2xl border border-zinc-800/70 bg-gradient-to-b from-zinc-900 to-zinc-950/90 shadow-md shadow-black/20 transition hover:border-amber-500/35 hover:shadow-amber-500/5">
      <div className="relative aspect-[4/3] w-full border-b border-zinc-800/80 bg-zinc-900/50 p-3">
        <Image
          src={thumb}
          alt={variant.label}
          fill
          className="object-contain object-center p-2"
          sizes="(max-width: 640px) 100vw, 220px"
          unoptimized
        />
      </div>
      <div className="flex flex-1 flex-col p-3.5">
        <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
          {line.seriesName}
        </p>
        <p className="mt-0.5 text-base font-semibold text-zinc-100">
          {variant.label}
        </p>
        <p className="mt-2 text-xl font-bold tabular-nums text-amber-300">
          Rs. {formatPkr(variant.price)}
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => {
              replaceWithItem(payload());
              router.push("/checkout");
            }}
            className="min-h-[2.5rem] rounded-xl bg-sky-500/90 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-sky-400"
          >
            Buy now
          </button>
          <AddToCartButton
            onClick={() => {
              addItem(payload());
              onAdded();
            }}
            added={added}
            variant="daraz"
          />
        </div>
      </div>
    </li>
  );
}

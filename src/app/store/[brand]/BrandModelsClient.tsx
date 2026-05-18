"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ProductThumb } from "@/components/ProductThumb";
import { StoreCartBar } from "@/components/StoreCartBar";
import { copy } from "@/lib/copy";
import {
  brandStoreHref,
  productItemHref,
  type StoreCategory,
  type StoreModelEntry,
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
  models,
}: {
  category: CategoryInfo;
  models: StoreModelEntry[];
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return models;
    return models.filter((m) => m.displayName.toLowerCase().includes(q));
  }, [models, query]);

  return (
    <main className="relative mx-auto w-full max-w-2xl flex-1 px-4 py-12 sm:py-16">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-amber-500/10 to-transparent blur-3xl"
        aria-hidden
      />

      <nav
        className="relative mb-8 flex flex-wrap items-center gap-2 text-sm text-zinc-500"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="transition hover:text-zinc-300">
          Home
        </Link>
        <span className="text-zinc-700">/</span>
        <Link href="/store" className="transition hover:text-zinc-300">
          Shop
        </Link>
        <span className="text-zinc-700">/</span>
        <span className="font-medium text-amber-200/90">{category.label}</span>
      </nav>

      <header className="relative mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-400">
          {category.short}
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
          {category.label}
        </h1>
        <p className="mt-3 text-base text-zinc-400">{copy.shop.selectModel}</p>
      </header>

      <div className="relative mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block w-full flex-1">
          <span className="sr-only">Search models</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={copy.shop.searchPlaceholder(category.label)}
            className="w-full rounded-2xl border border-zinc-700/80 bg-zinc-900/70 py-3.5 pl-5 pr-4 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
          />
        </label>
        <StoreCartBar />
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/30 p-12 text-center text-zinc-400">
          No models match your search.
        </p>
      ) : (
        <ul className="relative space-y-3">
          {filtered.map((entry) => (
            <li key={entry.variant.id}>
              <Link
                href={productItemHref(entry.variant.id)}
                className="group flex items-center gap-4 rounded-2xl border border-zinc-800/60 bg-zinc-900/40 px-4 py-3.5 shadow-sm transition hover:border-amber-500/35 hover:bg-zinc-900/70 hover:shadow-lg hover:shadow-amber-500/5 sm:px-5 sm:py-4"
              >
                <ProductThumb
                  src={entry.line.image}
                  alt={entry.displayName}
                  size="md"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-lg font-semibold text-white group-hover:text-amber-100">
                    {entry.displayName}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">{copy.shop.modelHint}</p>
                </div>
                <ModelPrice price={entry.variant.price} />
              </Link>
            </li>
          ))}
        </ul>
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

function ModelPrice({ price }: { price: number }) {
  return (
    <div className="shrink-0 rounded-xl border border-zinc-700/50 bg-zinc-950/50 px-4 py-2 text-right">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
        PKR
      </p>
      <p className="text-xl font-bold tabular-nums text-amber-300">
        {formatPkr(price)}
      </p>
    </div>
  );
}

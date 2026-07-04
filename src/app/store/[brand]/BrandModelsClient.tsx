"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { StoreCartBar } from "@/components/StoreCartBar";
import { copy } from "@/lib/copy";
import {
  galleryImagesForLine,
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
    <main className="relative mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:py-14">
      <nav
        className="relative mb-6 flex flex-wrap items-center gap-1.5 text-sm text-zinc-500"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="transition hover:text-orange-400">
          Home
        </Link>
        <span className="text-zinc-600">›</span>
        <Link href="/store" className="transition hover:text-orange-400">
          Shop
        </Link>
        <span className="text-zinc-600">›</span>
        <span className="text-orange-400">{category.label}</span>
      </nav>

      <header className="relative mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-orange-400">
            {category.short}
          </p>
          <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
            {category.label} panels
          </h1>
          <p className="mt-2 text-sm text-zinc-400">{copy.shop.selectModel}</p>
        </div>
        <StoreCartBar />
      </header>

      <label className="relative mb-6 block">
        <span className="sr-only">Search models</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={copy.shop.searchPlaceholder(category.label)}
          className="w-full rounded-sm border border-zinc-600 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
        />
      </label>

      {filtered.length === 0 ? (
        <p className="rounded-sm border border-dashed border-zinc-600 bg-zinc-900/40 p-12 text-center text-zinc-400">
          No models match your search.
        </p>
      ) : (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {filtered.map((entry) => {
            const thumb = galleryImagesForLine(entry.line)[0] ?? entry.line.image;
            return (
              <li key={entry.variant.id}>
                <Link
                  href={productItemHref(entry.variant.id)}
                  className="group flex h-full flex-col overflow-hidden rounded-sm border border-zinc-200 bg-white shadow-sm transition hover:border-orange-400 hover:shadow-md"
                >
                  <div className="relative aspect-square w-full border-b border-zinc-100 bg-white p-2">
                    <Image
                      src={thumb}
                      alt={entry.displayName}
                      fill
                      className="object-contain object-center p-2 transition group-hover:scale-[1.02]"
                      sizes="(max-width: 640px) 50vw, 200px"
                      unoptimized
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-3">
                    <p className="line-clamp-2 text-sm font-medium leading-snug text-zinc-800 group-hover:text-orange-600">
                      {entry.displayName}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-orange-500">
                      Rs. {formatPkr(entry.variant.price)}
                    </p>
                    <p className="mt-auto pt-2 text-[10px] uppercase tracking-wide text-zinc-400">
                      {copy.shop.modelHint}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      <Link
        href="/store"
        className="relative mt-10 inline-flex items-center gap-2 text-sm font-medium text-orange-400 transition hover:text-orange-300"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        {copy.shop.backToBrands}
      </Link>
    </main>
  );
}

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
  const [addedId, setAddedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return models;
    return models.filter((m) => m.displayName.toLowerCase().includes(q));
  }, [models, query]);

  function flashAdded(variantId: string) {
    setAddedId(variantId);
    window.setTimeout(() => setAddedId((id) => (id === variantId ? null : id)), 2000);
  }

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
          className="w-full rounded-xl border border-zinc-700/80 bg-zinc-900/80 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
        />
      </label>

      {filtered.length === 0 ? (
        <p className="rounded-sm border border-dashed border-zinc-600 bg-zinc-900/40 p-12 text-center text-zinc-400">
          No models match your search.
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((entry) => (
            <ModelCard
              key={entry.variant.id}
              entry={entry}
              categoryLabel={category.label}
              added={addedId === entry.variant.id}
              onAdded={() => flashAdded(entry.variant.id)}
            />
          ))}
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

function ModelCard({
  entry,
  categoryLabel,
  added,
  onAdded,
}: {
  entry: StoreModelEntry;
  categoryLabel: string;
  added: boolean;
  onAdded: () => void;
}) {
  const router = useRouter();
  const { addItem, replaceWithItem } = useCart();
  const gallery = galleryImagesForLine(entry.line);
  const thumb = gallery[0] ?? entry.line.image;
  const displayName = `${categoryLabel} — ${entry.variant.label}`;

  function payload() {
    return {
      productId: entry.variant.id,
      name: displayName,
      price: entry.variant.price,
      image: thumb,
      images: gallery,
      qty: 1,
    };
  }

  function addToCart() {
    addItem(payload());
    onAdded();
  }

  function buyNow() {
    replaceWithItem(payload());
    router.push("/checkout");
  }

  return (
    <li className="flex flex-col overflow-hidden rounded-2xl border border-zinc-800/80 bg-gradient-to-b from-zinc-900/90 to-zinc-950/95 shadow-lg shadow-black/30 ring-1 ring-white/[0.04] transition hover:border-amber-500/30 hover:ring-amber-500/10">
      <div className="relative aspect-square w-full border-b border-zinc-800/80 bg-zinc-900/60 p-3">
        <Image
          src={thumb}
          alt={entry.displayName}
          fill
          className="object-contain object-center p-2"
          sizes="(max-width: 640px) 100vw, 280px"
          unoptimized
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-base font-semibold leading-snug text-zinc-100">
          {entry.displayName}
        </p>
        <p className="mt-2 text-xl font-bold text-amber-300">
          Rs. {formatPkr(entry.variant.price)}
        </p>
        <p className="mt-1 text-xs text-zinc-500">{copy.shop.modelHint}</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => buyNow()}
            className="min-h-[2.5rem] rounded-sm bg-sky-400 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-sky-500"
          >
            Buy now
          </button>
          <AddToCartButton
            onClick={() => addToCart()}
            added={added}
            variant="daraz"
          />
        </div>
      </div>
    </li>
  );
}

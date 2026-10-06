"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
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
  return n.toLocaleString("en-PK", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function BrandModelsClient({
  category,
  series,
}: {
  category: CategoryInfo;
  series: StoreProductLine[];
}) {
  return (
    <Suspense
      fallback={
        <main className="mx-auto flex w-full max-w-5xl flex-1 items-center justify-center px-4 py-20">
          <p className="text-sm text-zinc-500">Loading shop…</p>
        </main>
      }
    >
      <BrandModelsInner category={category} series={series} />
    </Suspense>
  );
}

function BrandModelsInner({
  category,
  series,
}: {
  category: CategoryInfo;
  series: StoreProductLine[];
}) {
  const search = useSearchParams();
  const selectedSeriesId = search.get("series");
  const [query, setQuery] = useState("");
  const [addedId, setAddedId] = useState<string | null>(null);

  const selectedLine = useMemo(
    () => series.find((line) => line.id === selectedSeriesId) ?? null,
    [series, selectedSeriesId],
  );

  const seriesMatches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return series;
    return series.filter(
      (line) =>
        line.seriesName.toLowerCase().includes(q) ||
        line.variants.some((v) => v.label.toLowerCase().includes(q)),
    );
  }, [series, query]);

  const selectedVariants = useMemo(() => {
    if (!selectedLine) return [];
    const q = query.trim().toLowerCase();
    if (!q) return selectedLine.variants;
    return selectedLine.variants.filter((v) =>
      v.label.toLowerCase().includes(q),
    );
  }, [selectedLine, query]);

  function flashAdded(variantId: string) {
    setAddedId(variantId);
    window.setTimeout(
      () => setAddedId((id) => (id === variantId ? null : id)),
      2000,
    );
  }

  const brandHref = `/store/${category.id}`;

  return (
    <main className="relative mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <nav
        className="mb-8 flex flex-wrap items-center gap-1.5 text-sm text-zinc-500"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="transition hover:text-zinc-200">
          Home
        </Link>
        <span className="text-zinc-700">/</span>
        <Link href="/store" className="transition hover:text-zinc-200">
          Shop
        </Link>
        <span className="text-zinc-700">/</span>
        {selectedLine ? (
          <>
            <Link href={brandHref} className="transition hover:text-zinc-200">
              {category.label}
            </Link>
            <span className="text-zinc-700">/</span>
            <span className="text-zinc-200">{selectedLine.seriesName}</span>
          </>
        ) : (
          <span className="text-zinc-200">{category.label}</span>
        )}
      </nav>

      <header className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-zinc-500">
            {category.short}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {selectedLine ? selectedLine.seriesName : category.label}
          </h1>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-500">
            {selectedLine
              ? "Only this series. Go back to see other models."
              : "Pick a series. Other models stay hidden until you go back."}
          </p>
        </div>
        <StoreCartBar />
      </header>

      <label className="mb-10 block">
        <span className="sr-only">Search</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={
            selectedLine
              ? `Search ${selectedLine.seriesName} models…`
              : `Search ${category.label} series…`
          }
          className="w-full border-0 border-b border-zinc-800 bg-transparent px-0 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition focus:border-zinc-500"
        />
      </label>

      {selectedLine ? (
        selectedVariants.length === 0 ? (
          <p className="py-16 text-center text-sm text-zinc-500">
            No models match your search.
          </p>
        ) : (
          <ul className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {selectedVariants.map((variant) => (
              <ModelCard
                key={variant.id}
                line={selectedLine}
                variant={variant}
                brandLabel={category.label}
                added={addedId === variant.id}
                onAdded={() => flashAdded(variant.id)}
              />
            ))}
          </ul>
        )
      ) : seriesMatches.length === 0 ? (
        <p className="py-16 text-center text-sm text-zinc-500">
          No series match your search.
        </p>
      ) : (
        <ul className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {seriesMatches.map((line) => (
            <SeriesPickCard
              key={line.id}
              line={line}
              href={`${brandHref}?series=${encodeURIComponent(line.id)}`}
            />
          ))}
        </ul>
      )}

      <Link
        href={selectedLine ? brandHref : "/store"}
        className="mt-16 inline-flex items-center gap-2 text-sm font-medium text-zinc-300 transition hover:text-white"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        {selectedLine ? `Back to ${category.label}` : copy.shop.backToBrands}
      </Link>
    </main>
  );
}

function SeriesPickCard({
  line,
  href,
}: {
  line: StoreProductLine;
  href: string;
}) {
  const gallery = galleryImagesForLine(line);
  const thumb = gallery[0] ?? line.image;
  const low = minPrice(line);
  const high = maxPrice(line);

  return (
    <li>
      <Link
        href={href}
        className="flex h-full flex-col overflow-hidden rounded-2xl bg-zinc-900 ring-1 ring-zinc-800 transition hover:ring-amber-400/50"
      >
        <div className="relative aspect-[4/5] w-full bg-zinc-950">
          <Image
            src={thumb}
            alt={line.seriesName}
            fill
            className="object-contain object-center p-4 sm:p-5"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 220px"
            unoptimized
          />
        </div>
        <div className="flex flex-1 flex-col px-3 pb-3.5 pt-3 sm:px-3.5">
          <p className="line-clamp-2 min-h-[2.5rem] text-[13px] font-medium leading-snug text-zinc-100 sm:text-sm">
            {line.seriesName}
          </p>
          <p className="mt-1.5 text-[15px] font-semibold tabular-nums text-white sm:text-base">
            {low === high
              ? `Rs.${formatPkr(low)}.00`
              : `From Rs.${formatPkr(low)}.00`}
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            {line.variants.length} models
            {low !== high ? ` · up to Rs.${formatPkr(high)}` : ""}
          </p>
          <span className="mt-3 flex min-h-[2.6rem] items-center justify-center rounded-xl bg-amber-400 px-3 text-[13px] font-bold text-zinc-950">
            View models
          </span>
        </div>
      </Link>
    </li>
  );
}

function ModelCard({
  line,
  variant,
  brandLabel,
  added,
  onAdded,
}: {
  line: StoreProductLine;
  variant: StoreVariant;
  brandLabel: string;
  added: boolean;
  onAdded: () => void;
}) {
  const router = useRouter();
  const { addItem, replaceWithItem } = useCart();
  const gallery = galleryImagesForLine(line);
  const thumb = gallery[0] ?? line.image;
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
    <li className="flex flex-col overflow-hidden rounded-2xl bg-zinc-900 ring-1 ring-zinc-800">
      <div className="relative aspect-[4/5] w-full bg-zinc-950">
        <Image
          src={thumb}
          alt={variant.label}
          fill
          className="object-contain object-center p-4 sm:p-5"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 220px"
          unoptimized
        />
      </div>

      <div className="flex flex-1 flex-col px-3 pb-3 pt-3 sm:px-3.5 sm:pb-3.5">
        <p className="line-clamp-2 min-h-[2.5rem] text-[13px] font-medium leading-snug text-zinc-100 sm:text-sm">
          {variant.label}
        </p>
        <p className="mt-1.5 text-[15px] font-semibold tabular-nums text-white sm:text-base">
          Rs.{formatPkr(variant.price)}.00
        </p>
        <div className="mt-3 grid grid-cols-1 gap-2">
          <button
            type="button"
            onClick={() => {
              replaceWithItem(payload());
              router.push("/checkout");
            }}
            className="flex min-h-[2.6rem] w-full items-center justify-center rounded-xl bg-amber-400 px-3 text-[13px] font-bold text-zinc-950 transition hover:bg-amber-300"
          >
            Buy now
          </button>
          <button
            type="button"
            onClick={() => {
              addItem(payload());
              onAdded();
            }}
            className={`flex min-h-[2.6rem] w-full items-center justify-center rounded-xl px-3 text-[13px] font-bold transition ${
              added
                ? "bg-emerald-500 text-white"
                : "bg-zinc-800 text-white ring-1 ring-zinc-600 hover:bg-zinc-700"
            }`}
          >
            {added ? "Added ✓" : "Add to cart"}
          </button>
        </div>
      </div>
    </li>
  );
}

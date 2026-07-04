"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { AddToCartButton } from "@/components/AddToCartButton";
import { ProductImageGallery } from "@/components/ProductImageGallery";
import { QuantityStepper } from "@/components/QuantityStepper";
import { useCart } from "@/context/CartContext";
import {
  STORE_CATEGORIES,
  brandStoreHref,
  descriptionForProductDetail,
  galleryImagesForLine,
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
  const { addItem, replaceWithItem } = useCart();
  const [addedFlash, setAddedFlash] = useState(false);
  const [qty, setQty] = useState(1);

  const cat = STORE_CATEGORIES.find((c) => c.id === line.category);
  const displayName = `${cat?.label ?? "Display"} — ${variant.label}`;
  const gallery = useMemo(() => galleryImagesForLine(line), [line]);
  const primaryImage = gallery[0] ?? line.image;

  const listPrice = Math.round(variant.price * 1.15);

  function cartPayload() {
    return {
      productId: variant.id,
      name: displayName,
      price: variant.price,
      image: primaryImage,
      images: gallery,
      qty,
    };
  }

  function addToCart() {
    addItem(cartPayload());
    setAddedFlash(true);
    window.setTimeout(() => setAddedFlash(false), 2000);
  }

  function buyNow() {
    replaceWithItem(cartPayload());
    router.push("/checkout");
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-6 sm:px-6 sm:pt-8 lg:pb-24">
      <nav
        className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-zinc-500"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="transition hover:text-orange-400">
          Home
        </Link>
        <span aria-hidden className="text-zinc-600">
          ›
        </span>
        <Link href="/store" className="transition hover:text-orange-400">
          Shop
        </Link>
        <span aria-hidden className="text-zinc-600">
          ›
        </span>
        <Link
          href={brandStoreHref(line.category)}
          className="transition hover:text-orange-400"
        >
          {cat?.label ?? line.category}
        </Link>
        <span aria-hidden className="text-zinc-600">
          ›
        </span>
        <span className="max-w-[14rem] truncate text-zinc-400 sm:max-w-md">
          {variant.label}
        </span>
      </nav>

      <div className="overflow-hidden rounded-lg bg-white shadow-xl shadow-black/20 ring-1 ring-zinc-200/80">
        <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="border-b border-zinc-100 p-4 sm:p-6 lg:border-b-0 lg:border-r">
            <ProductImageGallery images={gallery} alt={displayName} />
          </div>

          <div className="flex flex-col p-5 sm:p-8">
            <p className="text-xs font-medium text-sky-600">
              Brand:{" "}
              <span className="text-sky-700">{cat?.label ?? "Tech Tonic"}</span>
            </p>
            <h1 className="mt-2 text-xl font-normal leading-snug text-zinc-900 sm:text-2xl">
              {displayName} — Tech Tonic replacement LCD panel, original colours,
              responsive touch, cash on delivery.
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-zinc-500">
              <span className="text-amber-500">★★★★★</span>
              <span>Tech Tonic verified panel</span>
            </div>

            <div className="mt-6 border-b border-zinc-100 pb-6">
              <p className="flex flex-wrap items-baseline gap-2">
                <span className="text-3xl font-medium text-orange-500 sm:text-4xl">
                  Rs. {formatPkr(variant.price)}
                </span>
                <span className="text-base text-zinc-400 line-through">
                  Rs. {formatPkr(listPrice)}
                </span>
                <span className="rounded bg-orange-100 px-1.5 py-0.5 text-xs font-semibold text-orange-600">
                  Panel price
                </span>
              </p>
              <p className="mt-2 text-sm text-zinc-500">
                Cash on delivery · Free pickup available
              </p>
            </div>

            <div className="mt-6">
              <QuantityStepper value={qty} onChange={setQty} />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => buyNow()}
                className="touch-manipulation min-h-[3rem] rounded-sm bg-sky-400 px-4 text-sm font-semibold uppercase tracking-wide text-white shadow-sm transition hover:bg-sky-500 active:scale-[0.99]"
              >
                Buy now
              </button>
              <AddToCartButton
                onClick={() => addToCart()}
                added={addedFlash}
                variant="daraz"
              />
            </div>

            <div className="mt-8 space-y-3 border-t border-zinc-100 pt-6 text-sm leading-relaxed text-zinc-600">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-800">
                About this panel
              </h2>
              {descriptionForProductDetail(line)
                .split(/\n\n+/)
                .filter(Boolean)
                .map((para, i) => (
                  <p key={i}>{para.trim()}</p>
                ))}
              <ul className="space-y-2 text-zinc-500">
                <li>
                  Variant:{" "}
                  <strong className="font-semibold text-zinc-800">
                    {variant.label}
                  </strong>
                </li>
                <li>Tech Tonic panel quality · COD checkout</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Link
        href={brandStoreHref(line.category)}
        className="mt-8 inline-flex text-sm font-medium text-orange-400 transition hover:text-orange-300"
      >
        ← Back to {cat?.label ?? "brand"} models
      </Link>
    </div>
  );
}

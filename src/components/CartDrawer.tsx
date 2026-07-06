"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import { copy } from "@/lib/copy";
import type { CartItem } from "@/context/CartContext";
import {
  displayNameForVariant,
  findVariantById,
  galleryImagesForLine,
  groupCartItemsBySeriesLine,
  imageForVariant,
  type CartSeriesPanel,
} from "@/lib/storeCatalog";

function formatPkr(n: number) {
  return n.toLocaleString("en-PK");
}

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  itemCount: number;
  setQty: (productId: string, qty: number) => void;
  removeItem: (productId: string) => void;
  addItem: (item: Omit<CartItem, "qty"> & { qty?: number }) => void;
};

function itemImages(item: CartItem): string[] {
  if (item.images?.length) return item.images;
  const img = item.image ?? imageForVariant(item.productId);
  return img ? [img] : ["/featured-picks-v3.png"];
}

export function CartDrawer({
  open,
  onClose,
  items,
  itemCount,
  setQty,
  removeItem,
  addItem,
}: CartDrawerProps) {
  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items],
  );

  const { sections, orphans } = useMemo(
    () => groupCartItemsBySeriesLine(items),
    [items],
  );

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      <DrawerBackdrop open={open} onClose={onClose} />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`cart-drawer fixed bottom-0 right-0 top-0 z-[60] flex w-full max-w-[min(100%,30rem)] flex-col bg-gradient-to-b from-zinc-950 via-zinc-950 to-zinc-900 shadow-[-20px_0_60px_rgba(0,0,0,0.5)] ring-1 ring-amber-500/10 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:max-w-md ${
          open ? "translate-x-0" : "translate-x-full pointer-events-none"
        }`}
      >
        <header className="relative shrink-0 border-b border-amber-500/15 px-5 py-5">
          <div
            className="pointer-events-none absolute -right-10 top-0 h-36 w-36 rounded-full bg-amber-500/10 blur-3xl"
            aria-hidden
          />
          <div className="relative flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-400/90">
                Tech Tonic
              </p>
              <h2 className="mt-1 flex items-center gap-2.5 text-xl font-bold text-white">
                Your bag
                {itemCount > 0 ? (
                  <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-gradient-to-br from-amber-400/30 to-amber-600/20 px-2 text-sm font-bold text-amber-100 ring-1 ring-amber-400/35">
                    {itemCount}
                  </span>
                ) : null}
              </h2>
              <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">
                Same series models · pay only for items in your bag
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-zinc-700/80 bg-zinc-900/90 p-2.5 text-zinc-400 transition hover:border-zinc-500 hover:text-white"
              aria-label="Close cart"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </header>

        <div className="mobile-scroll min-h-0 flex-1 overflow-y-auto px-4 py-4">
          {items.length === 0 ? (
            <EmptyCart onClose={onClose} />
          ) : (
            <div className="space-y-4">
              {sections.map((section) => (
                <SeriesSection
                  key={section.line.id}
                  title={section.title}
                  brandLabel={section.brandLabel}
                  models={section.models}
                  setQty={setQty}
                  removeItem={removeItem}
                  addItem={addItem}
                />
              ))}
              {orphans.map((item) => (
                <OrphanLine
                  key={item.productId}
                  item={item}
                  setQty={setQty}
                  removeItem={removeItem}
                />
              ))}
            </div>
          )}
        </div>

        <footer className="shrink-0 border-t border-amber-500/15 bg-zinc-950/95 px-5 py-5 backdrop-blur-md">
          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  {copy.cart.subtotal}
                </p>
                <p className="mt-0.5 text-[11px] text-zinc-600">
                  {copy.cart.items(itemCount)}
                </p>
              </div>
              <p className="text-2xl font-bold tabular-nums tracking-tight text-amber-300">
                Rs. {formatPkr(subtotal)}
              </p>
            </div>
          </div>
          <Link
            href="/checkout"
            onClick={onClose}
            className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 py-3.5 text-sm font-bold text-zinc-950 shadow-lg shadow-amber-500/30 transition hover:shadow-amber-400/40 active:scale-[0.99] ${
              items.length === 0 ? "pointer-events-none opacity-40" : ""
            }`}
          >
            {copy.cart.checkout}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </footer>
      </aside>
    </>
  );
}

function DrawerBackdrop({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <div
      className={`fixed inset-0 z-[55] bg-zinc-950/80 transition-opacity duration-400 md:backdrop-blur-sm ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      onClick={onClose}
      aria-hidden={!open}
    />
  );
}

function EmptyCart({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex min-h-[16rem] flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-700/50 bg-zinc-900/30 px-6 py-14 text-center">
      <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400/25 to-fuchsia-500/10 ring-1 ring-amber-400/25">
        <svg className="h-8 w-8 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      </span>
      <p className="mt-5 text-base font-semibold text-zinc-200">{copy.cart.empty}</p>
      <p className="mt-1.5 max-w-[14rem] text-xs leading-relaxed text-zinc-500">
        {copy.cart.emptyHint}
      </p>
      <Link
        href="/store"
        onClick={onClose}
        className="mt-6 rounded-full bg-gradient-to-r from-amber-400 to-amber-300 px-6 py-2.5 text-sm font-bold text-zinc-950 shadow-md shadow-amber-500/25 transition hover:brightness-105"
      >
        {copy.cart.browse}
      </Link>
    </div>
  );
}

function SeriesSection({
  title,
  brandLabel,
  models,
  setQty,
  removeItem,
  addItem,
}: {
  title: string;
  brandLabel: string;
  models: CartSeriesPanel[];
  setQty: (productId: string, qty: number) => void;
  removeItem: (productId: string) => void;
  addItem: (item: Omit<CartItem, "qty"> & { qty?: number }) => void;
}) {
  const inCartCount = models.filter((m) => m.inCart).length;

  return (
    <section className="overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40 ring-1 ring-white/[0.04]">
      <header className="border-b border-amber-500/15 bg-gradient-to-r from-amber-500/10 via-zinc-900/90 to-transparent px-4 py-3.5">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-400/80">
          {brandLabel}
        </p>
        <h3 className="mt-0.5 text-sm font-bold leading-snug text-white">{title}</h3>
        <p className="mt-1 text-[11px] text-zinc-500">
          {models.length} models · {inCartCount} in your bag
        </p>
      </header>
      <ul className="max-h-[min(50vh,22rem)] space-y-2 overflow-y-auto p-3">
        {models.map((model) => (
          <ModelRow
            key={model.variant.id}
            model={model}
            setQty={setQty}
            removeItem={removeItem}
            addItem={addItem}
          />
        ))}
      </ul>
    </section>
  );
}

function ModelRow({
  model,
  setQty,
  removeItem,
  addItem,
}: {
  model: CartSeriesPanel;
  setQty: (productId: string, qty: number) => void;
  removeItem: (productId: string) => void;
  addItem: (item: Omit<CartItem, "qty"> & { qty?: number }) => void;
}) {
  const { line, variant, inCart } = model;
  const gallery = galleryImagesForLine(line);
  const thumb = gallery[0] ?? line.image;
  const name = displayNameForVariant(line, variant);

  function handleAdd() {
    addItem({
      productId: variant.id,
      name,
      price: variant.price,
      image: thumb,
      images: gallery,
      qty: 1,
    });
  }

  if (inCart) {
    return (
      <li className="overflow-hidden rounded-xl border border-amber-500/35 bg-gradient-to-r from-amber-500/10 to-zinc-950/80 ring-1 ring-amber-500/15">
        <div className="flex gap-3 p-3">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-zinc-700/60 bg-zinc-800/80">
            <Image src={thumb} alt={name} fill className="object-contain p-1" sizes="56px" unoptimized />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-zinc-100">{variant.label}</p>
            <span className="mt-0.5 inline-flex items-center gap-1 text-[10px] font-bold uppercase text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              In bag
            </span>
            <p className="mt-1 text-sm font-bold text-amber-300">Rs. {formatPkr(variant.price)}</p>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-zinc-800/80 bg-zinc-950/50 px-3 py-2.5">
          <div className="inline-flex items-center rounded-lg border border-zinc-700 bg-zinc-900 p-0.5">
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-300 hover:bg-zinc-800"
              onClick={() =>
                inCart.qty <= 1
                  ? removeItem(variant.id)
                  : setQty(variant.id, inCart.qty - 1)
              }
              aria-label="Decrease"
            >
              −
            </button>
            <span className="min-w-[2rem] text-center text-sm font-bold tabular-nums text-amber-200">
              {inCart.qty}
            </span>
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-300 hover:bg-zinc-800"
              onClick={() => setQty(variant.id, inCart.qty + 1)}
              aria-label="Increase"
            >
              +
            </button>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold tabular-nums text-white">
              Rs. {formatPkr(inCart.price * inCart.qty)}
            </p>
            <button
              type="button"
              onClick={() => removeItem(variant.id)}
              className="text-[11px] text-rose-400 hover:underline"
            >
              Remove
            </button>
          </div>
        </div>
      </li>
    );
  }

  return (
    <li className="flex items-center gap-3 rounded-xl border border-zinc-800/70 bg-zinc-950/50 px-3 py-2.5 transition hover:border-zinc-700">
      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-zinc-700 bg-zinc-800/80">
        <Image src={thumb} alt={name} fill className="object-contain p-1" sizes="44px" unoptimized />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-zinc-300">{variant.label}</p>
        <p className="text-xs font-semibold text-amber-400/90">Rs. {formatPkr(variant.price)}</p>
      </div>
      <button
        type="button"
        onClick={handleAdd}
        className="shrink-0 rounded-lg bg-amber-500/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-amber-200 ring-1 ring-amber-500/30 transition hover:bg-amber-500 hover:text-zinc-950"
      >
        Add
      </button>
    </li>
  );
}

function OrphanLine({
  item,
  setQty,
  removeItem,
}: {
  item: CartItem;
  setQty: (productId: string, qty: number) => void;
  removeItem: (productId: string) => void;
}) {
  const images = itemImages(item);
  return (
    <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-4">
      <div className="flex gap-3">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-zinc-700 bg-zinc-800/80">
          <Image src={images[0]} alt={item.name} fill className="object-contain p-1" sizes="56px" unoptimized />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-zinc-200">{item.name}</p>
          <p className="mt-1 font-bold text-amber-300">Rs. {formatPkr(item.price * item.qty)}</p>
          <div className="mt-2 flex gap-2">
            <button type="button" onClick={() => setQty(item.productId, Math.max(1, item.qty - 1))} className="h-7 w-7 rounded border border-zinc-700 text-zinc-300">−</button>
            <span className="text-sm font-bold text-amber-200">{item.qty}</span>
            <button type="button" onClick={() => setQty(item.productId, item.qty + 1)} className="h-7 w-7 rounded border border-zinc-700 text-zinc-300">+</button>
            <button type="button" onClick={() => removeItem(item.productId)} className="ml-auto text-xs text-rose-400">Remove</button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import { CartItemGallery } from "@/components/CartItemGallery";
import { copy } from "@/lib/copy";
import type { CartItem } from "@/context/CartContext";
import { imageForVariant } from "@/lib/storeCatalog";

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
};

export function CartDrawer({
  open,
  onClose,
  items,
  itemCount,
  setQty,
  removeItem,
}: CartDrawerProps) {
  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
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
        className={`cart-drawer fixed bottom-0 right-0 top-0 z-[60] flex w-full max-w-[min(100%,28rem)] flex-col bg-zinc-100 shadow-[-8px_0_32px_rgba(0,0,0,0.15)] transition-transform duration-400 ease-out sm:max-w-md ${
          open ? "translate-x-0" : "translate-x-full pointer-events-none"
        }`}
      >
        <header className="flex items-center justify-between gap-3 border-b border-zinc-200 bg-white px-4 py-4 sm:px-5">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">
              Shopping cart
              <span className="ml-2 text-sm font-normal text-zinc-500">
                ({itemCount} {itemCount === 1 ? "item" : "items"})
              </span>
            </h2>
            <p className="mt-0.5 text-xs text-zinc-500">{copy.cart.codNote}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-sm p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-800"
            aria-label="Close cart"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="mobile-scroll min-h-0 flex-1 overflow-y-auto bg-zinc-100 px-3 py-3 sm:px-4">
          {items.length === 0 ? (
            <EmptyCart onClose={onClose} />
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <CartLineItem
                  key={item.productId}
                  item={item}
                  setQty={setQty}
                  removeItem={removeItem}
                />
              ))}
            </ul>
          )}
        </div>

        <footer className="border-t border-zinc-200 bg-white px-4 py-4 sm:px-5">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-zinc-600">{copy.cart.subtotal}</span>
            <span className="text-xl font-bold tabular-nums text-orange-500">
              Rs. {formatPkr(subtotal)}
            </span>
          </div>
          <Link
            href="/checkout"
            onClick={onClose}
            className={`mt-3 flex w-full items-center justify-center rounded-sm bg-orange-500 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-sm transition hover:bg-orange-600 active:scale-[0.99] ${
              items.length === 0 ? "pointer-events-none opacity-40" : ""
            }`}
          >
            {copy.cart.checkout}
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
      className={`fixed inset-0 z-[55] bg-black/40 transition-opacity duration-300 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      onClick={onClose}
      aria-hidden={!open}
    />
  );
}

function EmptyCart({ onClose }: { onClose: () => void }) {
  return (
    <div className="rounded-sm border border-dashed border-zinc-300 bg-white px-6 py-12 text-center">
      <p className="text-sm font-medium text-zinc-700">{copy.cart.empty}</p>
      <p className="mt-1 text-xs text-zinc-500">{copy.cart.emptyHint}</p>
      <Link
        href="/store"
        onClick={onClose}
        className="mt-5 inline-block rounded-sm bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
      >
        {copy.cart.browse}
      </Link>
    </div>
  );
}

function cartImagesForItem(item: CartItem): string[] {
  if (item.images?.length) return item.images;
  const found = imageForVariant(item.productId);
  return found ? [found] : ["/featured-picks-v3.png"];
}

function CartLineItem({
  item,
  setQty,
  removeItem,
}: {
  item: CartItem;
  setQty: (productId: string, qty: number) => void;
  removeItem: (productId: string) => void;
}) {
  const lineTotal = item.price * item.qty;
  const images = cartImagesForItem(item);

  return (
    <li className="cart-item-enter overflow-hidden rounded-sm border border-zinc-200 bg-white shadow-sm">
      <div className="flex gap-3 p-3">
        <CartItemGallery images={images} alt={item.name} />
        <div className="min-w-0 flex-1">
          <p className="line-clamp-2 text-sm leading-snug text-zinc-800">
            {item.name}
          </p>
          <p className="mt-1 text-lg font-medium text-orange-500">
            Rs. {formatPkr(item.price)}
          </p>
          <p className="text-xs text-zinc-400">Unit price · PKR</p>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-zinc-100 bg-zinc-50/80 px-3 py-2.5">
        <div className="inline-flex items-center rounded-sm border border-zinc-300 bg-white text-zinc-800">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center text-base transition hover:bg-zinc-50"
            onClick={() =>
              item.qty <= 1
                ? removeItem(item.productId)
                : setQty(item.productId, item.qty - 1)
            }
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="min-w-[2rem] border-x border-zinc-300 text-center text-sm font-semibold tabular-nums">
            {item.qty}
          </span>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center text-base transition hover:bg-zinc-50"
            onClick={() => setQty(item.productId, item.qty + 1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-wide text-zinc-400">
            Line total
          </p>
          <p className="text-base font-bold tabular-nums text-zinc-900">
            Rs. {formatPkr(lineTotal)}
          </p>
        </div>
      </div>
      <div className="border-t border-zinc-100 px-3 py-2">
        <button
          type="button"
          className="text-xs font-medium text-rose-500 hover:text-rose-600 hover:underline"
          onClick={() => removeItem(item.productId)}
        >
          Remove
        </button>
      </div>
    </li>
  );
}

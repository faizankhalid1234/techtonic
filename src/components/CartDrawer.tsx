"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import { copy } from "@/lib/copy";
import type { CartItem } from "@/context/CartContext";

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
        className={`cart-drawer fixed bottom-0 right-0 top-0 z-[60] flex w-full max-w-[min(100%,26rem)] flex-col border-l border-amber-500/15 bg-gradient-to-b from-zinc-950 via-zinc-950 to-zinc-900 shadow-[-24px_0_80px_rgba(0,0,0,0.55)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:max-w-md ${
          open ? "translate-x-0" : "translate-x-full pointer-events-none"
        }`}
      >
        <div
          className="pointer-events-none absolute -left-20 top-24 h-56 w-56 rounded-full bg-amber-500/10 blur-3xl"
          aria-hidden
        />
        <header className="relative z-10 flex items-start justify-between gap-3 border-b border-white/[0.06] px-5 pb-4 pt-5 sm:px-6 sm:pt-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-amber-400/90">
              {copy.brand}
            </p>
            <h2 className="mt-1 flex items-center gap-2 text-2xl font-bold tracking-tight text-white">
              {copy.cart.title}
              <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-amber-400/20 px-2 text-sm font-semibold text-amber-200 ring-1 ring-amber-400/30">
                {itemCount}
              </span>
            </h2>
            <p className="mt-1 text-xs text-zinc-500">{copy.cart.codNote}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-zinc-700/80 bg-zinc-900/80 p-2.5 text-zinc-400 transition hover:border-zinc-500 hover:text-white"
            aria-label="Close cart"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>
        <div className="mobile-scroll relative z-10 min-h-0 flex-1 overflow-y-auto px-5 py-4 sm:px-6">
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
        <footer className="relative z-10 border-t border-white/[0.06] bg-zinc-950/90 px-5 py-5 backdrop-blur-md sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                {copy.cart.subtotal}
              </p>
              <p className="mt-0.5 text-xs text-zinc-600">
                {copy.cart.items(itemCount)} · PKR
              </p>
            </div>
            <p className="text-3xl font-bold tabular-nums tracking-tight text-white">
              {formatPkr(subtotal)}
            </p>
          </div>
          <Link
            href="/checkout"
            onClick={onClose}
            className={`mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 px-4 py-3.5 text-sm font-bold text-zinc-950 shadow-lg shadow-amber-500/25 transition hover:shadow-amber-400/35 active:scale-[0.99] ${
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
      className={`fixed inset-0 z-[55] bg-zinc-950/70 transition-opacity duration-400 md:backdrop-blur-sm ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      onClick={onClose}
      aria-hidden={!open}
    />
  );
}

function EmptyCart({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex min-h-[12rem] flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-700/60 bg-zinc-900/30 px-6 py-10 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400/20 to-fuchsia-500/10 ring-1 ring-amber-400/20">
        <svg className="h-7 w-7 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      </span>
      <p className="mt-4 text-sm font-medium text-zinc-300">{copy.cart.empty}</p>
      <p className="mt-1 text-xs text-zinc-500">{copy.cart.emptyHint}</p>
      <Link
        href="/store"
        onClick={onClose}
        className="mt-5 rounded-full bg-amber-400 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-amber-300"
      >
        {copy.cart.browse}
      </Link>
    </div>
  );
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
  return (
    <li className="cart-item-enter group relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-4 ring-1 ring-white/[0.03] transition hover:border-amber-500/20 hover:bg-zinc-900/80">
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-amber-400/5 blur-2xl transition group-hover:bg-amber-400/10"
        aria-hidden
      />
      <p className="pr-4 text-sm font-semibold leading-snug text-zinc-50">{item.name}</p>
      <PriceRow item={item} lineTotal={lineTotal} />
      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="inline-flex items-center rounded-full border border-zinc-700/80 bg-zinc-950/80 p-0.5 shadow-inner shadow-black/30">
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
            onClick={() =>
              item.qty <= 1
                ? removeItem(item.productId)
                : setQty(item.productId, item.qty - 1)
            }
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="min-w-[2rem] text-center text-sm font-bold tabular-nums text-amber-200">
            {item.qty}
          </span>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
            onClick={() => setQty(item.productId, item.qty + 1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <button
          type="button"
          className="text-xs font-medium text-rose-400/90 underline-offset-2 transition hover:text-rose-300 hover:underline"
          onClick={() => removeItem(item.productId)}
        >
          Remove
        </button>
      </div>
    </li>
  );
}

function PriceRow({
  item,
  lineTotal,
}: {
  item: CartItem;
  lineTotal: number;
}) {
  return (
    <div className="mt-3 flex flex-wrap items-end justify-between gap-2">
      <UnitPrice price={item.price} />
      <div className="text-right">
        <span className="text-[10px] text-zinc-500">× {item.qty}</span>
        <p className="text-lg font-bold tabular-nums text-white">{formatPkr(lineTotal)}</p>
      </div>
    </div>
  );
}

function UnitPrice({ price }: { price: number }) {
  return (
    <div>
      <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
        Unit
      </span>
      <p className="text-sm font-bold tabular-nums text-amber-300/90">
        {formatPkr(price)} PKR
      </p>
    </div>
  );
}

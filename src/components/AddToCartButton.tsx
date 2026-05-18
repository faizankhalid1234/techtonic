"use client";

type AddToCartButtonProps = {
  onClick: () => void;
  compact?: boolean;
  added?: boolean;
};

export function AddToCartButton({
  onClick,
  compact = false,
  added = false,
}: AddToCartButtonProps) {
  if (compact) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`group/add touch-manipulation inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold shadow-lg transition active:scale-[0.97] sm:self-center ${
          added
            ? "bg-emerald-500/20 text-emerald-200 ring-2 ring-emerald-400/50"
            : "bg-gradient-to-r from-amber-400 to-amber-300 text-zinc-900 shadow-amber-500/25 hover:shadow-amber-400/40 hover:brightness-105"
        }`}
      >
        <CartIcon added={added} />
        {added ? "Added" : "Add"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`touch-manipulation inline-flex min-h-[3.25rem] flex-1 items-center justify-center gap-2.5 rounded-2xl px-8 text-base font-semibold shadow-lg transition active:scale-[0.99] sm:min-w-[200px] ${
        added
          ? "bg-emerald-500/15 text-emerald-100 ring-2 ring-emerald-400/40"
          : "bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 text-zinc-950 shadow-amber-500/25 hover:shadow-amber-400/35"
      }`}
    >
      <CartIcon added={added} large />
      {added ? "Added to cart ✓" : "Add to cart"}
    </button>
  );
}

function CartIcon({ added, large }: { added: boolean; large?: boolean }) {
  const size = large ? "h-5 w-5" : "h-4 w-4";
  if (added) {
    return (
      <svg className={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    );
  }
  return (
    <svg className={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  );
}

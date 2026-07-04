"use client";

type Props = {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
};

export function QuantityStepper({ value, onChange, min = 1, max = 99 }: Props) {
  return (
    <div className="inline-flex items-center gap-3">
      <span className="text-sm text-zinc-600">Quantity</span>
      <div className="inline-flex items-center rounded-sm border border-zinc-300 bg-white">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="flex h-9 w-9 items-center justify-center text-lg text-zinc-600 transition hover:bg-zinc-50 disabled:opacity-40"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="min-w-[2.5rem] border-x border-zinc-300 py-1 text-center text-sm font-semibold tabular-nums text-zinc-900">
          {value}
        </span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="flex h-9 w-9 items-center justify-center text-lg text-zinc-600 transition hover:bg-zinc-50 disabled:opacity-40"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    </div>
  );
}

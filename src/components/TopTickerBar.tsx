import { copy } from "@/lib/copy";

export function TopTickerBar() {
  const items = [...copy.ticker, ...copy.ticker];
  return (
    <div className="border-b border-amber-500/10 bg-zinc-950/95">
      <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6">
        <div className="ticker-wrap w-full">
          <div className="ticker-track">
            {items.map((item, idx) => (
              <span key={`${item}-${idx}`} className="ticker-pill">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

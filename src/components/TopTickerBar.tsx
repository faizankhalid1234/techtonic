const TICKER_ITEMS = [
  "Free delivery",
  "📱 Original color screen — vivid panels, true blacks",
  "COD checkout — pay the rider on delivery",
  "Free delivery",
  "📱 Original color screen — vivid panels, true blacks",
  "COD checkout — pay the rider on delivery",
] as const;

export function TopTickerBar() {
  return (
    <div className="border-b border-zinc-800 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 sm:py-2.5">
        <div className="ticker-wrap w-full">
          <div className="ticker-track">
            {TICKER_ITEMS.map((item, idx) => (
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

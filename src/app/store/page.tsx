import Link from "next/link";
import { StoreCartBar } from "@/components/StoreCartBar";
import { copy } from "@/lib/copy";
import {
  STORE_CATEGORIES,
  brandStoreHref,
  modelCountForCategory,
  type StoreCategory,
} from "@/lib/storeCatalog";

const BRAND_STYLE: Record<
  StoreCategory,
  { gradient: string; ring: string; accent: string }
> = {
  iphone: {
    gradient: "from-amber-500/30 via-orange-600/15 to-zinc-900/95",
    ring: "ring-amber-400/30",
    accent: "text-amber-300",
  },
  samsung: {
    gradient: "from-sky-500/30 via-blue-600/15 to-zinc-900/95",
    ring: "ring-sky-400/30",
    accent: "text-sky-300",
  },
  vivo: {
    gradient: "from-cyan-500/30 via-teal-600/15 to-zinc-900/95",
    ring: "ring-cyan-400/30",
    accent: "text-cyan-300",
  },
  oppo: {
    gradient: "from-emerald-500/30 via-green-600/15 to-zinc-900/95",
    ring: "ring-emerald-400/30",
    accent: "text-emerald-300",
  },
  xiaomi: {
    gradient: "from-orange-500/30 via-amber-600/15 to-zinc-900/95",
    ring: "ring-orange-400/30",
    accent: "text-orange-300",
  },
  huawei: {
    gradient: "from-violet-500/30 via-fuchsia-600/15 to-zinc-900/95",
    ring: "ring-violet-400/30",
    accent: "text-violet-300",
  },
};

export default function StorePage() {
  return (
    <main className="relative mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:py-16">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-amber-500/10 to-transparent blur-3xl"
        aria-hidden
      />

      <header className="relative mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-400">
            {copy.brand} · Shop
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-5xl">
            {copy.shop.title}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-400">
            {copy.shop.subtitle}
          </p>
        </div>
        <StoreCartBar />
      </header>

      <section className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {STORE_CATEGORIES.map((cat) => {
          const style = BRAND_STYLE[cat.id];
          const count = modelCountForCategory(cat.id);
          return (
            <Link
              key={cat.id}
              href={brandStoreHref(cat.id)}
              className={`group relative overflow-hidden rounded-3xl border border-zinc-800/60 bg-gradient-to-br ${style.gradient} p-7 shadow-xl shadow-black/25 ring-1 ${style.ring} transition duration-300 hover:-translate-y-1 hover:border-amber-500/30 hover:shadow-amber-500/10`}
            >
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-amber-400/10 blur-3xl transition group-hover:bg-amber-400/20"
                aria-hidden
              />
              <p
                className={`text-xs font-bold uppercase tracking-[0.25em] ${style.accent}`}
              >
                {cat.short}
              </p>
              <h2 className="mt-3 text-2xl font-bold text-white">{cat.label}</h2>
              <p className="mt-2 text-sm text-zinc-400">
                {copy.shop.modelsAvailable(count)}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-zinc-200 group-hover:text-amber-200">
                {copy.shop.viewModels}
                <svg
                  className="h-4 w-4 transition group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          );
        })}
      </section>
    </main>
  );
}

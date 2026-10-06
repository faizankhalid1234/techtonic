import Image from "next/image";
import Link from "next/link";
import { STORE_CATEGORIES, brandStoreHref } from "@/lib/storeCatalog";

const BRAND_ACCENT: Record<string, string> = {
  iphone: "from-amber-500/25 to-zinc-900",
  samsung: "from-sky-500/25 to-zinc-900",
  vivo: "from-cyan-500/25 to-zinc-900",
  oppo: "from-emerald-500/25 to-zinc-900",
  xiaomi: "from-orange-500/25 to-zinc-900",
  huawei: "from-violet-500/20 to-zinc-900",
};

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="hero-section relative min-h-[78svh] overflow-hidden bg-zinc-950 md:min-h-[85svh]">
        <div className="hero-card z-0 overflow-hidden">
          <Image
            src="/hero-top-hd.webp"
            alt="Tech Tonic OLED screen hero"
            fill
            priority
            sizes="100vw"
            className="hero-image object-cover object-[center_28%] md:object-center"
          />
          <div className="hero-shine" aria-hidden />
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/45 via-black/30 to-zinc-950"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/65 via-black/20 to-transparent"
          aria-hidden
        />

        <div className="relative z-10 mx-auto flex min-h-[78svh] w-full max-w-7xl flex-col justify-end px-5 pb-12 pt-24 md:min-h-[85svh] md:justify-center md:px-8 md:pb-20 md:pt-28">
          <div className="home-fade-up max-w-sm">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-300 [text-shadow:0_1px_10px_rgba(0,0,0,0.7)]">
              Premium mobile displays
            </p>

            <h1 className="mt-2 font-extrabold uppercase leading-none tracking-[0.1em]">
              <span className="text-[1.65rem] text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.75)] sm:text-[1.9rem] md:text-[2.15rem]">
                Tech{" "}
              </span>
              <span className="text-[1.65rem] text-amber-300 [text-shadow:0_2px_20px_rgba(251,191,36,0.35)] sm:text-[1.9rem] md:text-[2.15rem]">
                Tonic
              </span>
            </h1>

            <p className="mt-3 text-[13px] leading-6 text-zinc-200/95 [text-shadow:0_1px_12px_rgba(0,0,0,0.8)] sm:text-sm">
              LCD &amp; OLED panels. Cash on delivery.
            </p>

            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:items-center">
              <Link
                href="/store"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 text-sm font-bold text-zinc-950 transition hover:bg-amber-300"
              >
                Explore store
                <svg
                  className="h-3.5 w-3.5 transition group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-black/25 px-5 py-2.5 text-sm font-medium text-zinc-100 transition hover:border-amber-400/40 hover:text-amber-200"
              >
                Create account
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-t border-zinc-800/80 bg-zinc-950 py-16 sm:py-20">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-amber-500/[0.06] to-transparent"
          aria-hidden
        />
        <div className="relative mx-auto w-full max-w-7xl px-4">
          <div className="max-w-xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-amber-400/90">
              Shop by brand
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Find your series fast
            </h2>
            <p className="mt-3 text-sm text-zinc-400 sm:text-base">
              Choose a brand and model.
            </p>
          </div>

          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
            {STORE_CATEGORIES.map((cat, i) => (
              <li
                key={cat.id}
                className="home-fade-up"
                style={{ animationDelay: `${80 + i * 60}ms` }}
              >
                <Link
                  href={brandStoreHref(cat.id)}
                  className={`group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-zinc-800/80 bg-gradient-to-br ${BRAND_ACCENT[cat.id] ?? "from-zinc-800 to-zinc-900"} p-4 shadow-lg shadow-black/20 ring-1 ring-white/[0.04] transition duration-300 hover:-translate-y-1 hover:border-amber-500/30 hover:shadow-amber-500/10 sm:p-5`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 group-hover:text-amber-300/90">
                    {cat.short}
                  </span>
                  <span className="mt-6 text-lg font-bold text-white sm:text-xl">
                    {cat.label}
                  </span>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-zinc-400 transition group-hover:text-amber-200">
                    View series
                    <svg
                      className="h-3.5 w-3.5 transition group-hover:translate-x-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-zinc-800/80 bg-zinc-950 pb-20 pt-4 sm:pb-28">
        <div className="mx-auto w-full max-w-7xl px-4">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="home-fade-up relative order-2 overflow-hidden rounded-[2rem] border border-zinc-800/80 bg-zinc-900/40 shadow-2xl shadow-black/40 ring-1 ring-amber-500/10 lg:order-1">
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber-500/15 blur-3xl"
                aria-hidden
              />
              <Image
                src="/featured-picks-v3.png"
                alt="Tech Tonic panel showcase"
                width={1148}
                height={1536}
                unoptimized
                className="relative z-10 h-auto w-full object-contain px-4 py-6 sm:px-8 sm:py-10"
              />
            </div>

            <div
              className="home-fade-up order-1 lg:order-2"
              style={{ animationDelay: "120ms" }}
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-amber-400/90">
                Why Tech Tonic
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Panels that look right
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-zinc-400">
                From OLED Pro to everyday LCD — matched colours, smooth touch,
                and cash on delivery.
              </p>

              <ul className="mt-8 space-y-4">
                {[
                  {
                    title: "OLED Pro",
                    body: "Deep blacks and rich contrast for flagship phones.",
                  },
                  {
                    title: "Original LCD",
                    body: "Bright, reliable touch for daily replacements.",
                  },
                  {
                    title: "Series-matched fit",
                    body: "Fits your exact model.",
                  },
                ].map((item) => (
                  <li
                    key={item.title}
                    className="flex gap-4 border-l-2 border-amber-500/40 pl-4"
                  >
                    <div>
                      <p className="font-semibold text-zinc-100">{item.title}</p>
                      <p className="mt-1 text-sm text-zinc-500">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/store"
                  className="inline-flex items-center gap-2 rounded-2xl bg-amber-400 px-6 py-3 text-sm font-bold text-zinc-950 transition hover:bg-amber-300"
                >
                  Browse store
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-2xl border border-zinc-600 px-6 py-3 text-sm font-semibold text-zinc-200 transition hover:border-amber-500/40 hover:text-amber-200"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

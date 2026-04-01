import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="hero-section relative min-h-[72svh] overflow-hidden bg-black md:min-h-[86svh]">
        <div className="pointer-events-none absolute -left-24 top-20 z-[2] h-72 w-72 rounded-full bg-amber-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-40 z-[2] h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl" />

        <div className="hero-card z-0 overflow-hidden">
          <Image
            src="/hero-top-hd.webp"
            alt="SUNLONG OLED screen hero"
            fill
            priority
            sizes="100vw"
            className="hero-image object-cover object-center"
          />
          <div className="hero-shine" aria-hidden />
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/92 via-black/55 to-black/20"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/75 via-transparent to-black/35"
          aria-hidden
        />

        <div className="relative z-10 mx-auto flex min-h-[72svh] w-full max-w-7xl flex-col justify-center px-4 py-12 md:min-h-[86svh] md:py-16">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.38em] text-amber-400 drop-shadow-sm">
              SUNLONG x Tech Tonic
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-white drop-shadow-md sm:text-5xl md:text-6xl">
              Original Color
              <span className="block text-amber-300">Screen Experience</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-200 drop-shadow sm:text-base">
              Premium display panels for brighter colors, deeper contrast, and
              smooth touch response. Designed for people who want both quality
              and style.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/store"
                className="inline-flex w-full items-center justify-center rounded-xl bg-amber-400 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-amber-300 sm:w-auto"
              >
                Explore Store
              </Link>
              <Link
                href="/checkout"
                className="inline-flex w-full items-center justify-center rounded-xl border border-white/20 bg-zinc-950/50 px-5 py-2.5 text-sm font-medium text-zinc-100 backdrop-blur-sm transition hover:border-white/35 sm:w-auto"
              >
                Checkout
              </Link>
            </div>
            <div className="mt-7 grid w-full max-w-md grid-cols-3 gap-2 text-center sm:gap-3">
              {[
                { label: "Active Models", value: "120+" },
                { label: "Happy Clients", value: "5k+" },
                { label: "Avg Rating", value: "4.9" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-white/10 bg-zinc-950/55 p-2.5 backdrop-blur-md sm:p-3"
                >
                  <p className="text-base font-bold text-white sm:text-lg">{s.value}</p>
                  <p className="text-[10px] uppercase tracking-wide text-zinc-400 sm:text-[11px]">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-950 py-12 sm:py-16">
        <div className="mx-auto w-full max-w-7xl px-4">
          <div className="mb-7 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end sm:gap-4">
            <h2 className="text-2xl font-semibold text-zinc-100 md:text-3xl">
              Premium Showcase
            </h2>
            <Link
              href="/store"
              className="text-sm font-medium text-amber-400 hover:text-amber-300"
            >
              View full store →
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div className="featured-card relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-100 to-zinc-300 shadow-2xl shadow-black/30">
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-zinc-900/25 to-transparent" />
              <div className="pointer-events-none absolute bottom-4 left-1/2 h-8 w-3/4 -translate-x-1/2 rounded-full bg-black/25 blur-2xl" />
              <div className="featured-shine" aria-hidden />
              <Image
                src="/featured-picks-v3.png"
                alt="SUNLONG featured picks product image"
                width={1148}
                height={1536}
                unoptimized
                className="featured-image relative z-10 h-auto w-full object-contain px-2 py-2 saturate-110 contrast-110 hue-rotate-[8deg] sm:px-3 sm:py-3"
              />
              <div className="absolute inset-x-0 bottom-0 z-20 p-3 sm:p-4">
                <div className="rounded-2xl border border-zinc-700/70 bg-zinc-950/80 p-3 backdrop-blur-sm sm:p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-400 sm:text-xs">
                    Mobile Accessories
                  </p>
                  <p className="mt-1 text-sm text-zinc-200 sm:text-base">
                    Original color screens, guards, and replacement essentials.
                  </p>
                  <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                    <Link
                      href="/store"
                      className="inline-flex w-full items-center justify-center rounded-xl bg-amber-400 px-4 py-2 text-xs font-semibold text-zinc-950 transition hover:bg-amber-300 sm:w-auto sm:text-sm"
                    >
                      Shop Accessories
                    </Link>
                    <Link
                      href="/checkout"
                      className="inline-flex w-full items-center justify-center rounded-xl border border-zinc-600 bg-zinc-900/70 px-4 py-2 text-xs font-medium text-zinc-100 transition hover:border-zinc-400 sm:w-auto sm:text-sm"
                    >
                      Buy Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              {[
                {
                  title: "OLED Pro Line",
                  price: "Rs 8,900",
                  body: "Deep black, richer color contrast, flagship visual quality.",
                },
                {
                  title: "Original LCD Line",
                  price: "Rs 5,500",
                  body: "Balanced brightness and reliable touch for daily use.",
                },
                {
                  title: "Value Screen Line",
                  price: "Rs 3,900",
                  body: "Budget-friendly option with clean output and fast response.",
                },
              ].map((card) => (
                <article
                  key={card.title}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 sm:p-5"
                >
                  <p className="text-xs uppercase tracking-[0.22em] text-amber-400">
                    SUNLONG
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-zinc-100">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-2xl font-bold text-white">{card.price}</p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {card.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

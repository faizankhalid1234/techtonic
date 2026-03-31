import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="relative overflow-hidden bg-black">
        <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-40 h-80 w-80 rounded-full bg-fuchsia-500/15 blur-3xl" />
        <div className="mx-auto grid min-h-[72svh] w-full max-w-7xl gap-8 px-4 py-8 sm:py-10 md:min-h-[86svh] md:grid-cols-2 md:items-center md:gap-10 md:py-14">
          <div className="z-10">
            <p className="text-xs font-semibold uppercase tracking-[0.38em] text-amber-400">
              SUNLONG x Tech Tonic
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
              Original Color
              <span className="block text-amber-300">Screen Experience</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-300 sm:text-base">
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
                className="inline-flex w-full items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900/60 px-5 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-zinc-500 sm:w-auto"
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
                  className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-2.5 sm:p-3"
                >
                  <p className="text-base font-bold text-white sm:text-lg">{s.value}</p>
                  <p className="text-[10px] uppercase tracking-wide text-zinc-400 sm:text-[11px]">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/70 shadow-2xl shadow-black/40">
              <Image
                src="/hero-top-hd.webp"
                alt="SUNLONG OLED screen hero"
                width={1920}
                height={1080}
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 hidden max-w-xs rounded-2xl border border-zinc-700 bg-zinc-950/90 p-4 shadow-xl md:block">
              <p className="text-xs uppercase tracking-[0.25em] text-amber-400">
                Featured Quality
              </p>
              <p className="mt-2 text-sm text-zinc-300">
                Premium OLED clarity with durable panel finish for long-term
                performance.
              </p>
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
            <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-100 to-zinc-300 shadow-2xl shadow-black/30">
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-zinc-900/25 to-transparent" />
              <div className="pointer-events-none absolute bottom-4 left-1/2 h-8 w-3/4 -translate-x-1/2 rounded-full bg-black/25 blur-2xl" />
              <Image
                src="/featured-picks-v3.png"
                alt="SUNLONG featured picks product image"
                width={1148}
                height={1536}
                unoptimized
                className="relative z-10 h-auto w-full object-contain px-2 py-2 saturate-110 contrast-110 hue-rotate-[8deg] sm:px-3 sm:py-3"
              />
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

import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/lib/products";

export default function Home() {
  const featured = PRODUCTS.slice(0, 3);

  return (
    <div className="flex flex-1 flex-col">
      <section className="relative min-h-[85svh] w-full overflow-hidden bg-black">
        <Image
          src="/hero-top-hd.webp"
          alt="SUNLONG OLED screen hero"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"
          aria-hidden
        />
        <div className="absolute bottom-0 left-0 z-10 max-w-2xl p-5 pb-8 sm:p-8 sm:pb-10 md:p-10">
          <div className="rounded-2xl border border-amber-500/30 bg-zinc-950/75 p-6 backdrop-blur-md">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-400">
              SUNLONG x Tech Tonic
            </p>
            <h1 className="mt-2 text-3xl font-bold leading-tight text-white sm:text-4xl">
              Premium Mobile Screens
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-zinc-200 sm:text-base">
              Browse original color screen options with clear details and updated
              prices. Tap Store to view the full lineup and add items to cart.
            </p>
            <Link
              href="/store"
              className="mt-5 inline-flex rounded-xl bg-amber-400 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-amber-300"
            >
              Open Store
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-950 py-14">
        <div className="mx-auto w-full max-w-7xl px-4">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold text-zinc-100 md:text-3xl">
              Featured Picks
            </h2>
            <Link
              href="/store"
              className="text-sm font-medium text-amber-400 hover:text-amber-300"
            >
              View full store →
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {featured.map((p) => (
              <article
                key={p.id}
                className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-zinc-100">{p.name}</h3>
                  <p className="mt-1 text-sm text-zinc-400">{p.tagline}</p>
                  <p className="mt-3 text-xl font-bold text-white">
                    Rs {p.price.toLocaleString("en-PK")}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

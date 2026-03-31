import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="relative min-h-[100svh] w-full overflow-hidden bg-black">
        <Image
          src="/sunlong-hero-hd.webp"
          alt="SUNLONG — original color screen, phones on display with brand showcase"
          fill
          priority
          unoptimized
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/55 via-transparent to-transparent"
          aria-hidden
        />
        <div className="absolute bottom-0 left-0 z-10 max-w-lg p-5 pb-8 sm:max-w-xl sm:p-8 sm:pb-10 md:max-w-2xl md:p-10">
          <div className="rounded-2xl border border-amber-500/20 bg-zinc-950/75 p-5 shadow-2xl backdrop-blur-md sm:p-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-amber-400">
              SUNLONG
            </p>
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
              True-to-life displays
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-zinc-200 sm:text-base">
              Select original color technology — wide color, deep blacks, and
              coverage that pops. Tech Tonic brings screens and mobiles built
              for clarity, not compromise.
            </p>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="border-t border-zinc-800 bg-zinc-900/30 py-16"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-3">
          {[
            {
              title: "Secure session",
              body: "Accounts use hashed passwords and HTTP-only cookies.",
            },
            {
              title: "COD checkout",
              body: "Complete orders with Cash on Delivery — pay the rider on delivery.",
            },
            {
              title: "MongoDB orders",
              body: "Your profile and orders persist in MongoDB Atlas.",
            },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-zinc-800 p-6">
              <h3 className="font-semibold text-zinc-100">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-auto border-t border-zinc-800 py-10 text-center text-xs text-zinc-600">
        © {new Date().getFullYear()} Tech Tonic. Mobile &amp; tech storefront —
        Node API + MongoDB.
      </footer>
    </div>
  );
}

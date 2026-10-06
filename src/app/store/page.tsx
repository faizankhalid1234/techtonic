import Image from "next/image";
import Link from "next/link";
import { StoreCartBar } from "@/components/StoreCartBar";
import { copy } from "@/lib/copy";
import {
  STORE_CATEGORIES,
  STORE_PRODUCT_LINES,
  brandStoreHref,
  modelCountForCategory,
  seriesCountForCategory,
  type StoreCategory,
} from "@/lib/storeCatalog";

function brandThumb(categoryId: StoreCategory) {
  return (
    STORE_PRODUCT_LINES.find((l) => l.category === categoryId)?.image ??
    "/featured-picks-v3.png"
  );
}

export default function StorePage() {
  return (
    <main className="relative mx-auto w-full max-w-5xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <header className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-zinc-500">
            {copy.brand} · Shop
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            {copy.shop.title}
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-500">
            {copy.shop.subtitle}
          </p>
        </div>
        <StoreCartBar />
      </header>

      <section className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 md:grid-cols-3">
        {STORE_CATEGORIES.map((cat) => {
          const count = modelCountForCategory(cat.id);
          const seriesCount = seriesCountForCategory(cat.id);
          const thumb = brandThumb(cat.id);
          return (
            <Link
              key={cat.id}
              href={brandStoreHref(cat.id)}
              className="group flex flex-col"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-900/80 transition duration-500 group-hover:bg-zinc-900">
                <Image
                  src={thumb}
                  alt={cat.label}
                  fill
                  className="object-contain object-center p-8 transition duration-700 ease-out group-hover:scale-[1.04] sm:p-10"
                  sizes="(max-width: 640px) 50vw, 33vw"
                  unoptimized
                />
              </div>
              <div className="mt-3.5 px-0.5">
                <p className="text-[13px] font-normal tracking-tight text-zinc-200 sm:text-sm">
                  {cat.label}
                </p>
                <p className="mt-1 text-[15px] font-medium tracking-tight text-white sm:text-base">
                  {seriesCount} series
                </p>
                <p className="mt-0.5 text-xs text-zinc-500">
                  {copy.shop.modelsAvailable(count)}
                </p>
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
}

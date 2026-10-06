import Image from "next/image";
import Link from "next/link";
import { StoreCartBar } from "@/components/StoreCartBar";
import { copy } from "@/lib/copy";
import {
  STORE_CATEGORIES,
  STORE_PRODUCT_LINES,
  brandStoreHref,
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
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
      <header className="mb-6 flex items-end justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          {copy.shop.title}
        </h1>
        <StoreCartBar />
      </header>

      <section className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">
        {STORE_CATEGORIES.map((cat) => {
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
              <div className="mt-2.5">
                <p className="text-sm font-medium text-zinc-100">
                  {cat.label}
                </p>
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
}

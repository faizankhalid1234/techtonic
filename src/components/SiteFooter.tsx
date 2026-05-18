import Link from "next/link";
import { copy } from "@/lib/copy";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-zinc-800/80 bg-zinc-950/90">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-lg font-bold tracking-[0.2em] text-zinc-100">
              {copy.brand.toUpperCase()}
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-zinc-500">
              {copy.tagline}
            </p>
          </div>
          <nav
            className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-zinc-400"
            aria-label="Footer"
          >
            <Link href="/" className="transition hover:text-amber-300">
              Home
            </Link>
            <Link href="/store" className="transition hover:text-amber-300">
              Shop
            </Link>
            <Link href="/login" className="transition hover:text-amber-300">
              Sign in
            </Link>
            <Link href="/checkout" className="transition hover:text-amber-300">
              Checkout
            </Link>
          </nav>
        </div>
        <p className="mt-8 border-t border-zinc-800/60 pt-6 text-center text-xs text-zinc-600">
          © {new Date().getFullYear()} {copy.brand}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

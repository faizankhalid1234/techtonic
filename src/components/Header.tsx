"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

type User = { email: string; name: string } | null;

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { items } = useCart();
  const [user, setUser] = useState<User>(null);
  const count = items.reduce((s, i) => s + i.qty, 0);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled) setUser(d.user ?? null);
      })
      .catch(() => {
        if (!cancelled) setUser(null);
      });
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.refresh();
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-50 min-h-[5rem] border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md sm:min-h-[5.75rem]">
      <div className="mx-auto flex h-full min-h-[inherit] max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:gap-6 sm:px-6 sm:py-5">
        <Link
          href="/"
          className="shrink-0 text-2xl font-extrabold tracking-[0.22em] text-zinc-50 sm:text-3xl md:text-4xl lg:text-[2.75rem] lg:tracking-[0.26em]"
        >
          TECH TONIC
        </Link>

        <nav className="flex flex-1 items-center justify-center">
          <Link
            href="/store"
            className="text-lg font-semibold text-zinc-300 transition hover:text-white sm:text-xl md:text-2xl"
          >
            Store
          </Link>
        </nav>

        <div className="flex shrink-0 items-center gap-2 text-sm text-zinc-400 sm:gap-3 md:gap-4 md:text-base">
          <span className="hidden lg:inline whitespace-nowrap">
            United States (USD $)
          </span>
          <span className="hidden lg:inline">English</span>
          {user ? (
            <span className="hidden max-w-[140px] truncate text-zinc-300 xl:inline">
              {user.name}
            </span>
          ) : null}
          {user ? (
            <button
              type="button"
              onClick={() => void logout()}
              className="hidden rounded-lg border border-zinc-700 px-3 py-2 text-sm font-medium text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-900 sm:inline"
            >
              Log out
            </button>
          ) : (
            <Link
              href="/login"
              className="hidden rounded-lg border border-zinc-700 px-3 py-2 text-sm font-medium text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-900 sm:inline"
            >
              Sign in
            </Link>
          )}
          <Link
            href="/checkout"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-600 text-zinc-200 transition hover:border-rose-500/60 hover:bg-zinc-900 sm:h-12 sm:w-12"
            aria-label="Cart"
          >
            <svg
              className="h-5 w-5 sm:h-6 sm:w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-rose-500 px-1 text-[11px] font-semibold text-white sm:h-6 sm:min-w-[1.5rem] sm:text-xs">
              {count}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}

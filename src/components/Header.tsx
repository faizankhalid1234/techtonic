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
      <div className="mx-auto flex h-full min-h-[inherit] max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:gap-6 sm:px-6 sm:py-4">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-3 sm:gap-4"
        >
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-400/35 bg-gradient-to-br from-amber-400/25 via-fuchsia-500/15 to-zinc-900 shadow-lg shadow-black/40 ring-1 ring-white/10 transition group-hover:border-amber-400/55 sm:h-14 sm:w-14 md:h-16 md:w-16"
            aria-hidden
          >
            <svg
              className="h-6 w-6 text-amber-300 sm:h-7 sm:w-7 md:h-8 md:w-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.35}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="7" y="3" width="10" height="18" rx="2.2" />
              <path d="M10 6.5h4M10 17h4" />
            </svg>
          </span>
          <span className="min-w-0 truncate text-xl font-extrabold uppercase tracking-[0.22em] text-zinc-50 sm:text-2xl md:text-3xl lg:text-[2rem] lg:tracking-[0.24em]">
            TECH TONIC
          </span>
        </Link>

        <div className="flex min-w-0 shrink-0 items-center justify-end gap-2 text-sm text-zinc-400 sm:gap-3 md:gap-4 md:text-base">
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

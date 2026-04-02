"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/context/CartContext";

type User = { email: string; name: string } | null;

function NavPill({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`relative rounded-xl px-3 py-2 text-sm font-semibold transition sm:px-3.5 sm:text-[0.9375rem] ${
        active
          ? "text-amber-300"
          : "text-zinc-400 hover:bg-zinc-800/80 hover:text-zinc-100"
      }`}
    >
      <span className="relative z-10">{children}</span>
      {active ? (
        <span
          className="absolute inset-x-1 bottom-1 h-[3px] rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 shadow-[0_0_12px_rgba(251,191,36,0.45)]"
          aria-hidden
        />
      ) : null}
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { items } = useCart();
  const [user, setUser] = useState<User>(null);
  const [scrolled, setScrolled] = useState(false);
  const count = items.reduce((s, i) => s + i.qty, 0);

  const whatsappUrl = useMemo(() => {
    const raw = process.env.NEXT_PUBLIC_WHATSAPP_PHONE?.replace(/\D/g, "");
    if (!raw) return null;
    const text = encodeURIComponent("Hi Tech Tonic! I want to place an order.");
    return `https://wa.me/${raw}?text=${text}`;
  }, []);

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.refresh();
    router.push("/");
  }

  const homeActive = pathname === "/";
  const storeActive = pathname.startsWith("/store");
  const checkoutActive = pathname.startsWith("/checkout");

  return (
    <header
      className={`sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md transition-[box-shadow,min-height,padding] duration-300 ${
        scrolled ? "shadow-[0_12px_40px_rgba(0,0,0,0.45)]" : ""
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 sm:gap-4 sm:px-6 ${
          scrolled ? "min-h-[3.5rem] py-2 sm:min-h-[4rem] sm:py-2.5" : "min-h-[4.25rem] py-3 sm:min-h-[5rem] sm:py-3.5"
        }`}
      >
        <Link
          href="/"
          className="group flex min-w-0 shrink items-center gap-2 sm:gap-3 md:gap-4"
        >
          <span
            className={`flex shrink-0 items-center justify-center rounded-2xl border border-amber-400/35 bg-gradient-to-br from-amber-400/25 via-fuchsia-500/15 to-zinc-900 shadow-lg shadow-black/40 ring-1 ring-white/10 transition group-hover:border-amber-400/55 ${
              scrolled
                ? "h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12"
                : "h-11 w-11 sm:h-12 sm:w-12 md:h-14 md:w-14"
            }`}
            aria-hidden
          >
            <svg
              className={`text-amber-300 ${scrolled ? "h-5 w-5 sm:h-6 sm:w-6" : "h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7"}`}
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
          <span
            className={`min-w-0 truncate font-extrabold uppercase tracking-[0.18em] text-zinc-50 transition-[font-size] sm:tracking-[0.2em] ${
              scrolled
                ? "text-base sm:text-lg md:text-xl"
                : "text-lg sm:text-xl md:text-2xl lg:text-[1.65rem]"
            }`}
          >
            TECH TONIC
          </span>
        </Link>

        <nav
          className="hidden items-center gap-0.5 md:flex"
          aria-label="Primary"
        >
          <NavPill href="/" active={homeActive}>
            Home
          </NavPill>
          <NavPill href="/store" active={storeActive}>
            Shop
          </NavPill>
        </nav>

        <div className="flex min-w-0 shrink-0 items-center gap-1.5 sm:gap-2 md:gap-3">
          <nav className="flex items-center gap-0.5 md:hidden" aria-label="Mobile nav">
            <NavPill href="/" active={homeActive}>
              Home
            </NavPill>
            <NavPill href="/store" active={storeActive}>
              Shop
            </NavPill>
          </nav>

          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-emerald-600/50 bg-emerald-950/50 px-2.5 text-[11px] font-semibold text-emerald-100 shadow-sm transition hover:border-emerald-500/70 hover:bg-emerald-900/40 sm:h-11 sm:gap-2 sm:px-3 sm:text-xs"
            >
              <svg
                className="h-4 w-4 shrink-0 sm:h-[18px] sm:w-[18px]"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span className="hidden min-[380px]:inline">WhatsApp</span>
            </a>
          ) : null}

          <span
            className="hidden rounded-lg border border-amber-500/35 bg-amber-500/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-200/95 lg:inline"
            title="Pay when your order arrives"
          >
            COD
          </span>

          {user ? (
            <span className="hidden max-w-[120px] truncate text-sm text-zinc-300 xl:inline">
              {user.name}
            </span>
          ) : null}
          {user ? (
            <button
              type="button"
              onClick={() => void logout()}
              className="hidden rounded-lg border border-zinc-700 px-2.5 py-2 text-xs font-medium text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-900 sm:inline sm:px-3 sm:text-sm"
            >
              Log out
            </button>
          ) : (
            <Link
              href="/login"
              className="hidden rounded-lg border border-zinc-700 px-2.5 py-2 text-xs font-medium text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-900 sm:inline sm:px-3 sm:text-sm"
            >
              Sign in
            </Link>
          )}

          <Link
            href="/checkout"
            className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full border text-zinc-200 transition hover:bg-zinc-900 sm:h-11 sm:w-11 ${
              checkoutActive
                ? "border-amber-400/70 bg-amber-500/10 text-amber-200 shadow-[0_0_16px_rgba(251,191,36,0.2)]"
                : "border-zinc-600 hover:border-rose-500/60"
            }`}
            aria-label="Cart"
            aria-current={checkoutActive ? "page" : undefined}
          >
            <svg
              className="h-[1.15rem] w-[1.15rem] sm:h-5 sm:w-5"
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
            <span className="absolute -right-0.5 -top-0.5 flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-rose-500 px-0.5 text-[10px] font-semibold text-white sm:h-5 sm:min-w-[1.25rem] sm:text-[11px]">
              {count}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}

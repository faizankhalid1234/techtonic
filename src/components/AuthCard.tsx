import type { ReactNode } from "react";

export function AuthCard({ children }: { children: ReactNode }) {
  return (
    <main className="relative flex flex-1 flex-col items-center justify-center px-4 py-14 sm:py-20">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(251,191,36,0.12),transparent)]"
        aria-hidden
      />
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-900/60 p-8 shadow-2xl shadow-black/40 ring-1 ring-amber-500/10 backdrop-blur-sm sm:p-10">
        {children}
      </div>
    </main>
  );
}

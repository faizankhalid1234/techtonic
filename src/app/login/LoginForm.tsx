"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { authErrorMessage, parseJsonResponse } from "@/lib/api";
import { copy } from "@/lib/copy";

type AuthResponse = { user?: { name: string; email: string }; error?: string };

export function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const from = search.get("from") ?? "";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await parseJsonResponse<AuthResponse>(res);
      if (!res.ok) {
        setError(authErrorMessage(res, data, "Could not sign in. Try again."));
        return;
      }
      router.push(from === "checkout" ? "/checkout" : "/");
      router.refresh();
    } catch {
      setError("Connection failed. Please start the backend server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight text-white">
        {copy.auth.signIn}
      </h1>
      <p className="mt-2 text-sm text-zinc-400">{copy.auth.welcome}</p>
      <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="text-zinc-400">Email</span>
          <input
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-xl border border-zinc-700 bg-zinc-950/80 px-4 py-3 text-zinc-100 outline-none transition focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="text-zinc-400">Password</span>
          <input
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-xl border border-zinc-700 bg-zinc-950/80 px-4 py-3 text-zinc-100 outline-none transition focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
          />
        </label>
        {error ? (
          <p className="text-sm text-rose-400" role="alert">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 py-3.5 text-sm font-bold text-zinc-950 shadow-lg shadow-amber-500/20 transition hover:brightness-105 disabled:opacity-60"
        >
          {loading ? "Signing in…" : copy.auth.signIn}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-zinc-500">
        {copy.auth.noAccount}{" "}
        <Link href="/signup" className="font-semibold text-amber-400 hover:text-amber-300">
          {copy.auth.signUp}
        </Link>
      </p>
    </>
  );
}

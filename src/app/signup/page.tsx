"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthCard } from "@/components/AuthCard";
import { authErrorMessage, parseJsonResponse } from "@/lib/api";
import { copy } from "@/lib/copy";

type AuthResponse = { user?: { name: string; email: string }; error?: string };

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
        }),
      });
      const data = await parseJsonResponse<AuthResponse>(res);
      if (!res.ok) {
        setError(authErrorMessage(res, data, "Could not create account."));
        return;
      }
      router.push("/");
      router.refresh();
    } catch {
      setError("Connection failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard>
      <h1 className="text-2xl font-bold tracking-tight text-white">
        {copy.auth.signUp}
      </h1>
      <p className="mt-2 text-sm text-zinc-400">{copy.auth.join}</p>
      <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="text-zinc-400">Full name</span>
          <input
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-xl border border-zinc-700 bg-zinc-950/80 px-4 py-3 text-zinc-100 outline-none transition focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
          />
        </label>
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
          <span className="text-zinc-400">Password (minimum 8 characters)</span>
          <input
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
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
          {loading ? "Creating account…" : copy.auth.signUp}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-zinc-500">
        {copy.auth.hasAccount}{" "}
        <Link href="/login" className="font-semibold text-amber-400 hover:text-amber-300">
          {copy.auth.signIn}
        </Link>
      </p>
    </AuthCard>
  );
}

import Link from "next/link";

export default function ProductNotFound() {
  return (
    <main className="mx-auto flex max-w-lg flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="text-xl font-semibold text-zinc-100">Product not found</h1>
      <p className="mt-2 text-sm text-zinc-500">
        This display listing does not exist or was removed.
      </p>
      <Link
        href="/store"
        className="mt-8 rounded-2xl bg-amber-400 px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-amber-300"
      >
        Back to store
      </Link>
    </main>
  );
}

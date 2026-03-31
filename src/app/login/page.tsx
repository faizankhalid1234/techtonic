import { Suspense } from "react";
import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-16">
      <Suspense
        fallback={
          <p className="text-center text-sm text-zinc-500">Loading…</p>
        }
      >
        <LoginForm />
      </Suspense>
    </main>
  );
}

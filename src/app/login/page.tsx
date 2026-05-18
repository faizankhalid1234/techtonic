import { Suspense } from "react";
import { AuthCard } from "@/components/AuthCard";
import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <AuthCard>
      <Suspense
        fallback={
          <p className="text-center text-sm text-zinc-500">Loading…</p>
        }
      >
        <LoginForm />
      </Suspense>
    </AuthCard>
  );
}

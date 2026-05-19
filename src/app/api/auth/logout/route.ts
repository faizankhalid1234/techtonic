import { handleLogout } from "@/lib/server/auth-handlers";

export async function POST() {
  return handleLogout();
}

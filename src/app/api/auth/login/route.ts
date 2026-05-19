import { NextRequest } from "next/server";
import { handleLogin } from "@/lib/server/auth-handlers";

export async function POST(req: NextRequest) {
  return handleLogin(req);
}

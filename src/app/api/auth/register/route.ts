import { NextRequest } from "next/server";
import { proxyToBackend } from "@/lib/backend-proxy";

export async function POST(req: NextRequest) {
  const body = await req.text();
  return proxyToBackend(req, "/api/auth/register", {
    method: "POST",
    body,
  });
}

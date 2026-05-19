import { NextRequest } from "next/server";
import { handleMe } from "@/lib/server/auth-handlers";

export async function GET(req: NextRequest) {
  return handleMe(req);
}

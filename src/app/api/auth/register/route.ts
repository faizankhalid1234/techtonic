import { NextRequest } from "next/server";
import { handleRegister } from "@/lib/server/auth-handlers";

export async function POST(req: NextRequest) {
  return handleRegister(req);
}

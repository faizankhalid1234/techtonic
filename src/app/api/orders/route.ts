import { NextRequest } from "next/server";
import { handleCreateOrder } from "@/lib/server/order-handlers";

export async function POST(req: NextRequest) {
  return handleCreateOrder(req);
}

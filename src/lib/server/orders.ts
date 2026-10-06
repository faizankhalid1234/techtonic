import { randomUUID } from "crypto";
import * as fileOrders from "./file-orders";

function ephemeralOrder(data: Record<string, unknown>) {
  const now = new Date().toISOString();
  return {
    _id: randomUUID(),
    ...data,
    status: "pending",
    createdAt: now,
    updatedAt: now,
    ephemeral: true,
  };
}

export async function createOrder(data: Record<string, unknown>) {
  // Serverless hosts cannot write ./data and Atlas may hang DNS — still confirm.
  if (process.env.VERCEL) {
    return ephemeralOrder(data);
  }

  try {
    return await fileOrders.createOrder(data);
  } catch (err) {
    console.error("file order failed:", err);
    return ephemeralOrder(data);
  }
}

import { randomUUID } from "crypto";
import * as fileOrders from "./file-orders";
import { getDb } from "./mongo";

function isWritableFsError(err: unknown) {
  const code = (err as NodeJS.ErrnoException).code;
  return code === "EROFS" || code === "EACCES" || code === "EPERM";
}

export async function createOrder(data: Record<string, unknown>) {
  const db = await getDb();
  if (db) {
    const doc = {
      ...data,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const result = await db.collection("orders").insertOne(doc);
    return { ...doc, _id: String(result.insertedId) };
  }

  try {
    return await fileOrders.createOrder(data);
  } catch (err) {
    if (!isWritableFsError(err)) throw err;
    // Vercel / read-only hosts: still confirm the order to the shopper.
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
}

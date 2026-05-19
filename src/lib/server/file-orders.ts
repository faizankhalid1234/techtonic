import { randomUUID } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

const ORDERS_FILE = path.join(process.cwd(), "data", "orders.json");

export async function createOrder(data: Record<string, unknown>) {
  let orders: Record<string, unknown>[] = [];
  try {
    const raw = await readFile(ORDERS_FILE, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    orders = Array.isArray(parsed) ? (parsed as Record<string, unknown>[]) : [];
  } catch {
    orders = [];
  }
  const order = {
    _id: randomUUID(),
    ...data,
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  orders.push(order);
  await mkdir(path.dirname(ORDERS_FILE), { recursive: true });
  await writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf8");
  return order;
}

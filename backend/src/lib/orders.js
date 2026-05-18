import { isDbReady } from "../db.js";
import { Order } from "../models/Order.js";
import * as fileOrders from "../store/fileOrders.js";

export async function createOrder(data) {
  if (isDbReady()) {
    return Order.create(data);
  }
  return fileOrders.fileCreateOrder(data);
}

import { Router } from "express";
import { Order } from "../models/Order.js";
import { requireAuth } from "../middleware/requireAuth.js";

export const ordersRouter = Router();

ordersRouter.post("/", requireAuth, async (req, res) => {
  try {
    const {
      items,
      shippingAddress,
      shippingMethod,
      shippingCost,
      paymentMethod,
      billingSameAsShipping,
    } = req.body ?? {};

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Cart is empty." });
    }
    if (!shippingAddress?.fullName || !shippingAddress?.line1) {
      return res.status(400).json({ error: "Shipping address is incomplete." });
    }

    const subtotal = items.reduce(
      (sum, i) => sum + Number(i.price) * Number(i.qty),
      0,
    );
    const ship = Number(shippingCost) || 0;
    const total = subtotal + ship;

    const order = await Order.create({
      userId: req.user._id,
      items: items.map((i) => ({
        productId: i.productId,
        name: i.name,
        price: Number(i.price),
        qty: Number(i.qty),
      })),
      shippingAddress,
      shippingMethod: shippingMethod ?? "Standard",
      shippingCost: ship,
      paymentMethod: paymentMethod ?? "cod",
      billingSameAsShipping: Boolean(billingSameAsShipping),
      subtotal,
      total,
    });

    const shortId = String(order._id).slice(-8).toUpperCase();
    return res.status(201).json({ orderId: `TT-${shortId}` });
  } catch (err) {
    console.error("orders", err);
    return res.status(500).json({ error: "Could not place order." });
  }
});

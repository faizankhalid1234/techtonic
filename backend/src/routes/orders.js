import { Router } from "express";
import { createOrder } from "../lib/orders.js";
import { requireAuth } from "../middleware/requireAuth.js";

export const ordersRouter = Router();

const DELIVERY_FEE = 250;

ordersRouter.post("/", requireAuth, async (req, res) => {
  try {
    const {
      items,
      shippingAddress,
      shippingMethod,
      shippingCost,
      paymentMethod,
      billingSameAsShipping,
      deliveryType,
      cardLast4,
    } = req.body ?? {};

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Cart is empty." });
    }

    const fulfilment =
      deliveryType === "pickup" ? "pickup" : "delivery";

    if (!shippingAddress?.fullName?.trim()) {
      return res.status(400).json({ error: "Full name is required." });
    }
    if (!shippingAddress?.phone?.trim()) {
      return res.status(400).json({ error: "Mobile number is required." });
    }

    if (fulfilment === "delivery") {
      if (!shippingAddress?.line1?.trim() || !shippingAddress?.city?.trim()) {
        return res
          .status(400)
          .json({ error: "Complete your delivery address." });
      }
    }

    const method = paymentMethod === "card" ? "card" : "cod";
    if (method === "card") {
      const last4 = String(cardLast4 ?? "").replace(/\D/g, "");
      if (last4.length !== 4) {
        return res.status(400).json({
          error: "Enter a valid card number (last 4 digits could not be read).",
        });
      }
    }

    const subtotal = items.reduce(
      (sum, i) => sum + Number(i.price) * Number(i.qty),
      0,
    );
    const ship =
      fulfilment === "pickup"
        ? 0
        : Number(shippingCost) >= 0
          ? Number(shippingCost)
          : DELIVERY_FEE;
    const total = subtotal + ship;

    const order = await createOrder({
      userId: String(req.user._id),
      items: items.map((i) => ({
        productId: i.productId,
        name: i.name,
        price: Number(i.price),
        qty: Number(i.qty),
      })),
      shippingAddress: {
        fullName: shippingAddress.fullName.trim(),
        line1: (shippingAddress.line1 ?? "").trim(),
        city: (shippingAddress.city ?? "").trim(),
        postalCode: (shippingAddress.postalCode ?? "").trim(),
        phone: shippingAddress.phone.trim(),
      },
      deliveryType: fulfilment,
      shippingMethod:
        shippingMethod ??
        (fulfilment === "pickup" ? "Store pickup" : "Standard delivery"),
      shippingCost: ship,
      paymentMethod: method,
      cardLast4: method === "card" ? String(cardLast4).replace(/\D/g, "").slice(-4) : undefined,
      paymentStatus: method === "card" ? "pending" : "cod",
      billingSameAsShipping: Boolean(billingSameAsShipping),
      subtotal,
      total,
    });

    const id = String(order._id);
    const shortId = id.replace(/-/g, "").slice(-8).toUpperCase();
    return res.status(201).json({
      orderId: `TT-${shortId}`,
      paymentMethod: method,
      deliveryType: fulfilment,
    });
  } catch (err) {
    console.error("orders", err);
    return res.status(500).json({ error: "Could not place order." });
  }
});

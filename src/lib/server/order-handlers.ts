import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "./auth-handlers";
import { createOrder } from "./file-orders";

const DELIVERY_FEE = 250;

export async function handleCreateOrder(req: NextRequest) {
  const user = await requireUser(req);
  if (!user) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  try {
    const body = (await req.json()) as Record<string, unknown>;
    const items = body.items as
      | { productId: string; name: string; price: number; qty: number }[]
      | undefined;
    const shippingAddress = body.shippingAddress as
      | {
          fullName?: string;
          line1?: string;
          city?: string;
          postalCode?: string;
          phone?: string;
        }
      | undefined;

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
    }

    const fulfilment =
      body.deliveryType === "pickup" ? "pickup" : "delivery";

    if (!shippingAddress?.fullName?.trim()) {
      return NextResponse.json({ error: "Full name is required." }, { status: 400 });
    }
    if (!shippingAddress?.phone?.trim()) {
      return NextResponse.json({ error: "Mobile number is required." }, { status: 400 });
    }

    if (fulfilment === "delivery") {
      if (!shippingAddress?.line1?.trim() || !shippingAddress?.city?.trim()) {
        return NextResponse.json(
          { error: "Complete your delivery address." },
          { status: 400 },
        );
      }
    }

    const method = body.paymentMethod === "card" ? "card" : "cod";
    if (method === "card") {
      const last4 = String(body.cardLast4 ?? "").replace(/\D/g, "");
      if (last4.length !== 4) {
        return NextResponse.json(
          {
            error:
              "Enter a valid card number (last 4 digits could not be read).",
          },
          { status: 400 },
        );
      }
    }

    const subtotal = items.reduce(
      (sum, i) => sum + Number(i.price) * Number(i.qty),
      0,
    );
    const ship =
      fulfilment === "pickup"
        ? 0
        : Number(body.shippingCost) >= 0
          ? Number(body.shippingCost)
          : DELIVERY_FEE;
    const total = subtotal + ship;

    const order = await createOrder({
      userId: user._id,
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
        (body.shippingMethod as string) ??
        (fulfilment === "pickup" ? "Store pickup" : "Standard delivery"),
      shippingCost: ship,
      paymentMethod: method,
      cardLast4:
        method === "card"
          ? String(body.cardLast4).replace(/\D/g, "").slice(-4)
          : undefined,
      paymentStatus: method === "card" ? "pending" : "cod",
      billingSameAsShipping: Boolean(body.billingSameAsShipping),
      subtotal,
      total,
    });

    const id = String(order._id);
    const shortId = id.replace(/-/g, "").slice(-8).toUpperCase();
    return NextResponse.json(
      {
        orderId: `TT-${shortId}`,
        paymentMethod: method,
        deliveryType: fulfilment,
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("orders", err);
    return NextResponse.json(
      { error: "Could not place order." },
      { status: 500 },
    );
  }
}

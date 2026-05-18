"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/context/CartContext";
import { copy } from "@/lib/copy";
import {
  DELIVERY_FEE,
  digitsOnly,
  formatCardNumber,
  formatExpiry,
  validateCardInputs,
  type DeliveryType,
  type PaymentMethod,
} from "@/lib/checkout";

const INPUT =
  "rounded-xl border border-zinc-700 bg-zinc-950/80 px-4 py-3 text-zinc-100 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20";

function formatPkr(n: number) {
  return n.toLocaleString("en-PK");
}

type SuccessInfo = {
  orderId: string;
  paymentMethod: PaymentMethod;
  deliveryType: DeliveryType;
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clear } = useCart();

  const [deliveryType, setDeliveryType] = useState<DeliveryType>("delivery");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");

  const [fullName, setFullName] = useState("");
  const [line1, setLine1] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState<SuccessInfo | null>(null);

  const subtotal = useMemo(
    () => items.reduce((s, i) => s + i.price * i.qty, 0),
    [items],
  );
  const shipping =
    deliveryType === "pickup" ? 0 : DELIVERY_FEE;
  const total = subtotal + shipping;
  const itemCount = items.reduce((s, i) => s + i.qty, 0);

  useEffect(() => {
    if (items.length === 0 && !success) {
      router.replace("/store");
    }
  }, [items.length, router, success]);

  async function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    if (items.length === 0) {
      setMsg("Your cart is empty.");
      return;
    }

    if (paymentMethod === "card") {
      const cardErr = validateCardInputs(
        cardNumber,
        cardName,
        cardExpiry,
        cardCvv,
      );
      if (cardErr) {
        setMsg(cardErr);
        return;
      }
    }

    const num = digitsOnly(cardNumber);
    const cardLast4 = num.slice(-4);

    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          items,
          deliveryType,
          shippingAddress: {
            fullName,
            line1: deliveryType === "pickup" ? "Store pickup" : line1,
            city: deliveryType === "pickup" ? "Pickup" : city,
            postalCode: deliveryType === "pickup" ? "—" : postalCode,
            phone,
          },
          shippingMethod:
            deliveryType === "pickup" ? "Store pickup" : "Standard delivery",
          shippingCost: shipping,
          paymentMethod,
          cardLast4: paymentMethod === "card" ? cardLast4 : undefined,
          billingSameAsShipping: true,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg(
          typeof data.error === "string"
            ? data.error
            : res.status === 401
              ? "Please sign in to place an order."
              : "Could not place order. Please try again.",
        );
        return;
      }
      setSuccess({
        orderId: data.orderId as string,
        paymentMethod: (data.paymentMethod as PaymentMethod) ?? paymentMethod,
        deliveryType: (data.deliveryType as DeliveryType) ?? deliveryType,
      });
      clear();
      router.refresh();
    } catch {
      setMsg(
        "Cannot reach the server. Check backend-techtonic.vercel.app",
      );
    } finally {
      setSubmitting(false);
    }
  }

  function successMessage(info: SuccessInfo) {
    if (info.deliveryType === "pickup") return copy.checkout.successPickup;
    if (info.paymentMethod === "card") return copy.checkout.successCard;
    return copy.checkout.successCod;
  }

  function placeOrderLabel() {
    if (deliveryType === "pickup") return copy.checkout.placeOrderPickup;
    if (paymentMethod === "card") return copy.checkout.placeOrderCard;
    return copy.checkout.placeOrderCod;
  }

  if (success) {
    return (
      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center px-4 py-20">
        <div className="rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-emerald-950/40 to-zinc-900/80 p-10 text-center shadow-xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-2xl text-emerald-400">
            ✓
          </div>
          <h1 className="mt-5 text-2xl font-bold text-white">Order confirmed</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Reference{" "}
            <span className="font-mono font-semibold text-zinc-200">
              {success.orderId}
            </span>
          </p>
          <p className="mt-5 text-sm leading-relaxed text-zinc-400">
            {successMessage(success)}
          </p>
          <Link
            href="/store"
            className="mt-8 inline-flex rounded-xl bg-amber-400 px-6 py-3 text-sm font-bold text-zinc-950 transition hover:bg-amber-300"
          >
            Continue shopping
          </Link>
        </div>
      </main>
    );
  }

  if (items.length === 0) return null;

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:py-14">
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-400">
          Checkout
        </p>
        <h1 className="mt-2 text-3xl font-bold text-white">Complete your order</h1>
        <p className="mt-2 text-sm text-zinc-400">{copy.checkout.subtitle}</p>
      </header>

      <form
        onSubmit={placeOrder}
        className="grid gap-8 lg:grid-cols-[1fr_340px] lg:items-start"
      >
        <div className="space-y-6">
          <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6">
            <h2 className="text-lg font-semibold text-white">
              {copy.checkout.deliveryTitle}
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <OptionTile
                name="deliveryType"
                value="delivery"
                checked={deliveryType === "delivery"}
                onChange={() => setDeliveryType("delivery")}
                title={copy.checkout.deliveryHome}
                description={copy.checkout.deliveryHomeDesc}
                icon="🚚"
              />
              <OptionTile
                name="deliveryType"
                value="pickup"
                checked={deliveryType === "pickup"}
                onChange={() => setDeliveryType("pickup")}
                title={copy.checkout.deliveryPickup}
                description={copy.checkout.deliveryPickupDesc}
                icon="🏪"
              />
            </div>
          </section>

          <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6">
            <h2 className="text-lg font-semibold text-white">
              {deliveryType === "pickup" ? "Contact details" : "Delivery address"}
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
                <span className="text-zinc-400">Full name</span>
                <input
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={INPUT}
                />
              </label>
              {deliveryType === "delivery" ? (
                <>
                  <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
                    <span className="text-zinc-400">Street address</span>
                    <input
                      required
                      value={line1}
                      onChange={(e) => setLine1(e.target.value)}
                      className={INPUT}
                    />
                  </label>
                  <label className="flex flex-col gap-1.5 text-sm">
                    <span className="text-zinc-400">City</span>
                    <input
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className={INPUT}
                    />
                  </label>
                  <label className="flex flex-col gap-1.5 text-sm">
                    <span className="text-zinc-400">Postal code</span>
                    <input
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className={INPUT}
                    />
                  </label>
                </>
              ) : null}
              <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
                <span className="text-zinc-400">Mobile number</span>
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="03XX XXXXXXX"
                  className={INPUT}
                />
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6">
            <h2 className="text-lg font-semibold text-white">
              {copy.checkout.paymentTitle}
            </h2>
            <div className="mt-4 space-y-3">
              <OptionTile
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
                title={copy.checkout.codTitle}
                description={copy.checkout.codDesc}
                icon="💵"
                recommended
              />
              <OptionTile
                name="paymentMethod"
                value="card"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
                title={copy.checkout.cardTitle}
                description={copy.checkout.cardDesc}
                icon="💳"
              />
            </div>

            {paymentMethod === "card" ? (
              <div className="mt-5 space-y-4 rounded-xl border border-zinc-700/80 bg-zinc-950/60 p-4">
                <p className="text-xs text-zinc-500">
                  {copy.checkout.cardSecureNote}
                </p>
                <label className="flex flex-col gap-1.5 text-sm">
                  <span className="text-zinc-400">Card number</span>
                  <input
                    required
                    inputMode="numeric"
                    autoComplete="cc-number"
                    value={cardNumber}
                    onChange={(e) =>
                      setCardNumber(formatCardNumber(e.target.value))
                    }
                    placeholder="1234 5678 9012 3456"
                    className={`${INPUT} font-mono`}
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm">
                  <span className="text-zinc-400">Name on card</span>
                  <input
                    required
                    autoComplete="cc-name"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className={INPUT}
                  />
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex flex-col gap-1.5 text-sm">
                    <span className="text-zinc-400">Expiry (MM/YY)</span>
                    <input
                      required
                      inputMode="numeric"
                      autoComplete="cc-exp"
                      value={cardExpiry}
                      onChange={(e) =>
                        setCardExpiry(formatExpiry(e.target.value))
                      }
                      placeholder="MM/YY"
                      className={`${INPUT} font-mono`}
                    />
                  </label>
                  <label className="flex flex-col gap-1.5 text-sm">
                    <span className="text-zinc-400">CVV</span>
                    <input
                      required
                      type="password"
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      maxLength={4}
                      value={cardCvv}
                      onChange={(e) =>
                        setCardCvv(digitsOnly(e.target.value).slice(0, 4))
                      }
                      placeholder="•••"
                      className={`${INPUT} font-mono`}
                    />
                  </label>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {["Visa", "Mastercard", "PayPak"].map((brand) => (
                    <span
                      key={brand}
                      className="rounded-md border border-zinc-700 bg-zinc-900 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-zinc-400"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </section>
        </div>

        <aside className="lg:sticky lg:top-28">
          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-6">
            <h2 className="text-lg font-semibold text-white">Order summary</h2>
            <ul className="mt-4 max-h-48 space-y-3 overflow-y-auto">
              {items.map((item) => (
                <li
                  key={item.productId}
                  className="flex justify-between gap-3 border-b border-zinc-800/60 pb-3 text-sm last:border-0 last:pb-0"
                >
                  <span className="min-w-0 text-zinc-300">
                    {item.name}
                    <span className="text-zinc-500"> × {item.qty}</span>
                  </span>
                  <span className="shrink-0 font-medium tabular-nums text-zinc-100">
                    {formatPkr(item.price * item.qty)}
                  </span>
                </li>
              ))}
            </ul>
            <dl className="mt-5 space-y-2 border-t border-zinc-800 pt-5 text-sm">
              <SummaryRow label="Subtotal" value={formatPkr(subtotal)} />
              <SummaryRow
                label={
                  deliveryType === "pickup" ? "Pickup" : "Delivery"
                }
                value={
                  shipping === 0 ? "Free" : formatPkr(shipping)
                }
              />
              <SummaryRow
                label={`Total (${itemCount} items)`}
                value={formatPkr(total)}
                bold
              />
            </dl>
            {msg ? (
              <p className="mt-4 text-sm text-rose-400" role="alert">
                {msg}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={submitting}
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 py-4 text-sm font-bold text-zinc-950 shadow-lg shadow-amber-500/20 transition hover:brightness-105 disabled:opacity-60"
            >
              {submitting ? "Placing order…" : placeOrderLabel()}
            </button>
            <p className="mt-3 text-center text-xs text-zinc-500">
              {paymentMethod === "cod"
                ? copy.delivery.note
                : "Card payment is verified before dispatch."}
            </p>
          </div>
        </aside>
      </form>
    </main>
  );
}

function OptionTile({
  name,
  value,
  checked,
  onChange,
  title,
  description,
  icon,
  recommended,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  title: string;
  description: string;
  icon: string;
  recommended?: boolean;
}) {
  return (
    <label
      className={`relative flex cursor-pointer gap-3 rounded-xl border p-4 transition ${
        checked
          ? "border-amber-500/60 bg-amber-500/10 ring-1 ring-amber-500/30"
          : "border-zinc-700/80 bg-zinc-950/40 hover:border-zinc-600"
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span className="text-2xl" aria-hidden>
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-zinc-100">{title}</span>
          {recommended ? (
            <span className="rounded-full bg-amber-400/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-300">
              Popular
            </span>
          ) : null}
        </span>
        <span className="mt-1 block text-xs leading-relaxed text-zinc-400">
          {description}
        </span>
      </span>
      <span
        className={`mt-1 h-4 w-4 shrink-0 rounded-full border-2 ${
          checked ? "border-amber-400 bg-amber-400" : "border-zinc-600"
        }`}
        aria-hidden
      />
    </label>
  );
}

function SummaryRow({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div
      className={`flex justify-between gap-2 ${bold ? "text-base font-semibold text-white" : "text-zinc-400"}`}
    >
      <dt>{label}</dt>
      <dd className="tabular-nums text-zinc-100">
        {value === "Free" ? value : `PKR ${value}`}
      </dd>
    </div>
  );
}

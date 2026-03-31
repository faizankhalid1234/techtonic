"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/context/CartContext";

const SHIPPING_STANDARD = 250;

type PayMethod = "cod" | "card";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clear } = useCart();
  const [pay, setPay] = useState<PayMethod>("cod");
  const [billingSame, setBillingSame] = useState(true);
  const [fullName, setFullName] = useState("");
  const [line1, setLine1] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [doneId, setDoneId] = useState<string | null>(null);

  const subtotal = useMemo(
    () => items.reduce((s, i) => s + i.price * i.qty, 0),
    [items],
  );
  const total = subtotal + SHIPPING_STANDARD;
  const tax = 0;
  const itemCount = items.reduce((s, i) => s + i.qty, 0);

  useEffect(() => {
    if (items.length === 0 && !doneId) {
      router.replace("/");
    }
  }, [items.length, router, doneId]);

  async function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (items.length === 0) {
      setMsg("Add items to your cart first.");
      return;
    }
    if (pay !== "cod") {
      setMsg(
        "Orders are fulfilled with Cash on Delivery. Pay the rider when your parcel arrives — select COD to place your order.",
      );
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          shippingAddress: {
            fullName,
            line1,
            city,
            postalCode,
            phone,
          },
          shippingMethod: "Standard",
          shippingCost: SHIPPING_STANDARD,
          paymentMethod: "cod",
          billingSameAsShipping: billingSame,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg(
          typeof data.error === "string"
            ? data.error
            : "Could not place order. Sign in if your session expired.",
        );
        return;
      }
      setDoneId(data.orderId as string);
      clear();
      router.refresh();
    } catch {
      setMsg("Network error.");
    } finally {
      setSubmitting(false);
    }
  }

  if (doneId) {
    return (
      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center px-4 py-20">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 text-center">
          <p className="text-sm font-medium text-emerald-400">Order placed</p>
          <h1 className="mt-2 text-2xl font-semibold">Thank you</h1>
          <p className="mt-2 text-sm text-zinc-500">
            Reference <span className="font-mono text-zinc-300">{doneId}</span>
          </p>
          <p className="mt-4 text-sm text-zinc-400">
            Pay cash to the rider on delivery. We never ask for advance payment
            on COD orders.
          </p>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-12 md:py-16">
      <h1 className="text-2xl font-semibold tracking-tight">Checkout</h1>

      <form onSubmit={placeOrder} className="mt-10 flex flex-col gap-10">
          <section>
            <h2 className="text-2xl font-semibold">Shipping method</h2>
            <label className="mt-4 flex cursor-pointer items-center justify-between rounded-xl border border-zinc-700 bg-zinc-900/40 px-4 py-4">
              <span className="font-medium">Standard</span>
              <span className="text-zinc-300">
                Rs {SHIPPING_STANDARD.toFixed(2)}
              </span>
            </label>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Shipping address</h2>
            <div className="mt-4 grid gap-4">
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-zinc-400">Full name</span>
                <input
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-zinc-100 outline-none focus:border-rose-500/50 focus:ring-2 focus:ring-rose-500/30"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-zinc-400">Address line</span>
                <input
                  required
                  value={line1}
                  onChange={(e) => setLine1(e.target.value)}
                  className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-zinc-100 outline-none focus:border-rose-500/50 focus:ring-2 focus:ring-rose-500/30"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1 text-sm">
                  <span className="text-zinc-400">City</span>
                  <input
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-zinc-100 outline-none focus:border-rose-500/50 focus:ring-2 focus:ring-rose-500/30"
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm">
                  <span className="text-zinc-400">Postal code</span>
                  <input
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-zinc-100 outline-none focus:border-rose-500/50 focus:ring-2 focus:ring-rose-500/30"
                  />
                </label>
              </div>
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-zinc-400">Phone</span>
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-zinc-100 outline-none focus:border-rose-500/50 focus:ring-2 focus:ring-rose-500/30"
                />
              </label>
            </div>
          </section>

          <section>
            <div className="flex flex-wrap items-baseline gap-2">
              <h2 className="text-2xl font-semibold">Payment</h2>
              <span className="text-sm text-zinc-500">
                All transactions are secure and encrypted.
              </span>
            </div>
            <div className="mt-4 flex flex-col gap-3">
              <label
                className={`flex cursor-pointer items-center justify-between rounded-xl border px-4 py-4 ${
                  pay === "card"
                    ? "border-rose-500/50 bg-zinc-950"
                    : "border-zinc-700 bg-zinc-900/40"
                }`}
              >
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="pay"
                    checked={pay === "card"}
                    onChange={() => setPay("card")}
                    className="accent-rose-500"
                  />
                  Debit / Credit card
                </span>
                <span className="flex gap-1 text-xs text-zinc-500">
                  Visa · Mastercard
                </span>
              </label>
              <label
                className={`flex cursor-pointer items-center justify-between rounded-xl border px-4 py-4 ${
                  pay === "cod"
                    ? "border-rose-500/50 bg-zinc-900/40"
                    : "border-zinc-700 bg-zinc-900/40"
                }`}
              >
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="pay"
                    checked={pay === "cod"}
                    onChange={() => setPay("cod")}
                    className="accent-rose-500"
                  />
                  Cash on Delivery (COD)
                </span>
                <span className="text-xs font-medium text-emerald-400/90">
                  Default
                </span>
              </label>
            </div>

            {pay === "card" ? (
              <div className="mt-4 grid gap-4 rounded-xl border border-zinc-700 bg-zinc-950/90 p-4">
                <p className="text-sm text-zinc-500">
                  Card fields are for preview only. Tech Tonic completes orders
                  with Cash on Delivery — pay the rider at delivery.
                </p>
                <label className="flex flex-col gap-1 text-sm">
                  <span className="text-zinc-400">Name on card</span>
                  <input
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    autoComplete="cc-name"
                    className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100"
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm">
                  <span className="text-zinc-400">Card number</span>
                  <input
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    inputMode="numeric"
                    placeholder="•••• •••• •••• ••••"
                    className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100"
                  />
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex flex-col gap-1 text-sm">
                    <span className="text-zinc-400">Expiry</span>
                    <input
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM / YY"
                      className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100"
                    />
                  </label>
                  <label className="flex flex-col gap-1 text-sm">
                    <span className="text-zinc-400">CVC</span>
                    <input
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100"
                    />
                  </label>
                </div>
              </div>
            ) : (
              <div className="mt-4 flex gap-3 rounded-xl border border-amber-500/30 bg-amber-950/40 p-4 text-sm text-amber-100/90">
                <span className="text-lg" aria-hidden>
                  🚨
                </span>
                <p>
                  <strong className="text-amber-200">Beware of fraud!</strong> We
                  never ask for advance payment on COD orders. Pay only to the
                  rider at the time of delivery.
                </p>
              </div>
            )}
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Billing address</h2>
            <div className="mt-4 flex flex-col gap-3">
              <label
                className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-4 ${
                  billingSame
                    ? "border-rose-500/50 bg-zinc-900/40"
                    : "border-zinc-700 bg-zinc-900/40"
                }`}
              >
                <input
                  type="radio"
                  name="bill"
                  checked={billingSame}
                  onChange={() => setBillingSame(true)}
                  className="accent-rose-500"
                />
                Same as shipping address
              </label>
              <label
                className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-4 ${
                  !billingSame
                    ? "border-rose-500/50 bg-zinc-900/40"
                    : "border-zinc-700 bg-zinc-900/40"
                }`}
              >
                <input
                  type="radio"
                  name="bill"
                  checked={!billingSame}
                  onChange={() => setBillingSame(false)}
                  className="accent-rose-500"
                />
                Use a different billing address
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-400">
                <span aria-hidden>🏷</span> Add discount
              </button>
              <div className="flex items-center justify-end gap-3">
                <div className="text-right">
                  <p className="text-xs uppercase tracking-wide text-zinc-500">
                    Total · {itemCount} item{itemCount !== 1 ? "s" : ""}
                  </p>
                  <p className="text-2xl font-semibold text-zinc-100">
                    PKR{" "}
                    <span className="tabular-nums">
                      Rs {total.toLocaleString("en-PK")}
                    </span>
                  </p>
                  <p className="text-xs text-zinc-500">
                    Including Rs {tax.toFixed(2)} in taxes
                  </p>
                </div>
              </div>
            </div>
            {msg ? (
              <p className="mt-4 text-sm text-rose-400" role="alert">
                {msg}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={submitting || pay !== "cod"}
              className="mt-6 w-full rounded-xl bg-rose-500 py-4 text-sm font-semibold text-white shadow-lg shadow-rose-900/30 hover:bg-rose-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting
                ? "Placing order…"
                : pay === "cod"
                  ? "Place order (COD)"
                  : "Select COD to place order"}
            </button>
          </section>
      </form>
    </main>
  );
}

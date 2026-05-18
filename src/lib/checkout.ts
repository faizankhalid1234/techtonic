export type DeliveryType = "delivery" | "pickup";
export type PaymentMethod = "cod" | "card";

export const DELIVERY_FEE = 250;

export function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

export function formatCardNumber(value: string) {
  const d = digitsOnly(value).slice(0, 16);
  return d.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

export function formatExpiry(value: string) {
  const d = digitsOnly(value).slice(0, 4);
  if (d.length <= 2) return d;
  return `${d.slice(0, 2)}/${d.slice(2)}`;
}

export function validateCardInputs(
  cardNumber: string,
  cardName: string,
  expiry: string,
  cvv: string,
): string | null {
  const num = digitsOnly(cardNumber);
  if (num.length < 13 || num.length > 19) {
    return "Enter a valid debit or credit card number.";
  }
  if (!cardName.trim()) {
    return "Name on card is required.";
  }
  const exp = digitsOnly(expiry);
  if (exp.length !== 4) {
    return "Enter expiry as MM/YY.";
  }
  const month = Number(exp.slice(0, 2));
  if (month < 1 || month > 12) {
    return "Invalid expiry month.";
  }
  if (digitsOnly(cvv).length < 3) {
    return "Enter the 3-digit CVV on your card.";
  }
  return null;
}

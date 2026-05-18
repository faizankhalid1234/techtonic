/** Site-wide UI copy — standard English only. */
export const copy = {
  brand: "Tech Tonic",
  tagline: "Premium mobile displays · Cash on delivery",
  shop: {
    title: "Choose your brand",
    subtitle:
      "Select a phone brand, pick your model, then add to cart or buy now.",
    viewModels: "View models",
    modelsAvailable: (n: number) =>
      `${n} model${n === 1 ? "" : "s"} available`,
    backToBrands: "All brands",
    searchPlaceholder: (brand: string) => `Search ${brand} models…`,
    modelHint: "View details · Add to cart or buy now",
    selectModel: "Select your model to see price and checkout options.",
  },
  cart: {
    title: "Your cart",
    empty: "Your cart is empty",
    emptyHint: "Choose a display from the shop to get started.",
    browse: "Go to shop",
    subtotal: "Subtotal",
    checkout: "Proceed to checkout",
    items: (n: number) => `${n} item${n === 1 ? "" : "s"}`,
    bag: (n: number) => (n === 0 ? "Cart" : `${n} in cart`),
    codNote: "Cash on delivery · Pay when your order arrives",
  },
  auth: {
    signIn: "Sign in",
    signUp: "Create account",
    signOut: "Sign out",
    welcome: "Welcome back.",
    join: "Create an account to checkout faster and track orders.",
    noAccount: "Need an account?",
    hasAccount: "Already have an account?",
  },
  delivery: {
    short: "Cash on delivery",
    note: "Pay the delivery rider when your order arrives. No advance payment required.",
  },
  checkout: {
    subtitle: "Choose delivery, payment method, and confirm your order.",
    deliveryTitle: "How do you want your order?",
    deliveryHome: "Home delivery",
    deliveryHomeDesc: "Nationwide courier · PKR 250 delivery fee",
    deliveryPickup: "Store pickup",
    deliveryPickupDesc: "Collect from Tech Tonic · No delivery fee",
    paymentTitle: "Payment method",
    codTitle: "Cash on delivery",
    codDesc: "Pay when you receive your order. Most customers use this.",
    cardTitle: "Debit / credit card",
    cardDesc: "Pay online with your bank card (Visa, Mastercard, etc.).",
    cardSecureNote:
      "Card details are used to place your order. Full card numbers are never stored on our servers.",
    placeOrderCod: "Place order · Cash on delivery",
    placeOrderCard: "Place order · Pay by card",
    placeOrderPickup: "Place order · Store pickup",
    successCod:
      "We will call you to confirm delivery. Keep your phone on and have cash ready for the rider.",
    successCard:
      "Your card payment will be verified and we will call you to confirm dispatch.",
    successPickup:
      "We will call you when your order is ready for pickup at our store.",
  },
  ticker: [
    "Nationwide delivery available",
    "Original-color display panels",
    "Cash on delivery at checkout",
    "Genuine quality · Fair prices",
  ],
} as const;

import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    productId: String,
    name: String,
    price: Number,
    qty: Number,
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    items: [orderItemSchema],
    shippingAddress: {
      fullName: String,
      line1: String,
      city: String,
      postalCode: String,
      phone: String,
    },
    shippingMethod: String,
    shippingCost: Number,
    paymentMethod: String,
    billingSameAsShipping: Boolean,
    subtotal: Number,
    total: Number,
    status: { type: String, default: "pending" },
  },
  { timestamps: true },
);

export const Order = mongoose.model("Order", orderSchema);

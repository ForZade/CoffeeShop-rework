import mongoose from "mongoose";
import { CartItemInterface, cartItemSchema } from "./cartModel";

const transactionSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    user_id: {
      type: Number,
      required: true,
    },
    order_details: [cartItemSchema],
    total: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },
    subtotal: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },
    discount: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },
    percentage: {
      type: Number,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Transaction", transactionSchema);

export interface TransactionInterface extends mongoose.Document {
  id: string;
  user_id: number;
  order_details: CartItemInterface[];
  total: mongoose.Types.Decimal128;
  createdAt?: Date;
  updatedAt?: Date;
}

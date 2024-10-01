import mongoose from "mongoose";
import { CartInterface, cartItemSchema } from "./cartModel";

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
  },
  { timestamps: true },
);

export default mongoose.model("Transaction", transactionSchema);

export interface TransactionInterface extends mongoose.Document {
  id: string;
  user_id: number;
  order_details: CartInterface[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CardDataInterface {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  name: string;
}

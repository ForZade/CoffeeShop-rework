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
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    order_details: [cartItemSchema],
  },
  { timestamps: true },
);

export default mongoose.model("Transaction", transactionSchema);

export interface TransactionInterface extends mongoose.Document {
  id: string;
  user_id: string;
  order_details: CartInterface[];
  createdAt?: Date;
  updatedAt?: Date;
}

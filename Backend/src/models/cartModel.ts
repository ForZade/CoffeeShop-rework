import mongoose from "mongoose";

export const cartItemSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  total: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
});

export interface CartItemInterface {
  product: string;
  quantity: number;
  total: mongoose.Types.Decimal128;
}

export interface CartInterface extends mongoose.Document {
  items: CartItemInterface[];
  total: mongoose.Types.Decimal128;
}

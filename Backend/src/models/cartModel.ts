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
    type: Number,
    required: true,
  },
});

export interface CartItemInterface extends mongoose.Document {
  product: string;
  quantity: number;
  total: number;
}

export interface CartInterface {
  items: CartItemInterface[];
  total: number;
}

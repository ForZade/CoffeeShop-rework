import mongoose from "mongoose";

export const cartItemSchema = new mongoose.Schema({
  productId: {
    type: Number,
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

export interface CartItemInterface {
  productId: number;
  quantity: number;
  total: number;
}

export interface CartInterface extends mongoose.Document{
  items: CartItemInterface[];
  total: number;
}
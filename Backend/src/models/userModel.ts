import mongoose from "mongoose";
import { cartItemSchema, CartInterface } from "./cartModel";

const userSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, //Unsure how this works -Dev Danielis
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    roles: {
      type: [String],
      default: ["user"],
    },
    wallet: {
      type: Number,
      default: 0,
    },
    cart: [cartItemSchema],
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);

export interface UserInterface extends mongoose.Document {
  _id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  isVerified: boolean;
  isAdmin: boolean;
  roles: string[];
  wallet?: number;
  cart?: CartInterface[];
  createdAt?: Date;
  updatedAt?: Date;
}

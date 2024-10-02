import mongoose from "mongoose";
import bcrypt from "bcrypt";
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
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    lock: {
      attempts: {
        type: Number,
        default: 0,
      },
      until: {
        type: Date,
        default: Date.now(),
      },
      count: {
        type: Number,
        default: 0,
      },
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
    cart: {
      items: {
        type: [cartItemSchema],
      },
      total: {
        type: Number,
      },
    },
    favorite: {
      type: [Number],
      default: [],
    },
  },
  { timestamps: true },
);

userSchema.methods.verifyPassword = async function (
  password: string,
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model("User", userSchema);

export interface LockInterface {
  attempts: number;
  until: Date;
  count: number;
}

export interface UserInterface extends mongoose.Document {
  _id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  lock: LockInterface;
  isVerified: boolean;
  isAdmin: boolean;
  roles: string[];
  wallet?: number;
  cart?: CartInterface;
  createdAt?: Date;
  updatedAt?: Date;
  verifyPassword(password: string): Promise<boolean>;
}
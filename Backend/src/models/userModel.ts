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
    image: {
      type: String,
      default: "",
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
    address: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    zip: {
      type: Number,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    roles: {
      type: [String],
      default: [],
    },
    cart: {
      items: {
        type: [cartItemSchema],
      },
      code: {
        type: String,
      },
      count: {
        type: Number,
      },
      total: {
        type: mongoose.Schema.Types.Decimal128,
      },
      subtotal: {
        type: mongoose.Schema.Types.Decimal128,
      },
      discount: {
        type: mongoose.Schema.Types.Decimal128,
      },
      percentage: {
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

export default mongoose.model<UserInterface>("User", userSchema);

export interface LockInterface {
  attempts: number;
  until: Date;
  count: number;
}

export interface UserInterface extends mongoose.Document {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  lock: LockInterface;
  address?: string;
  city?: string;
  zip?: number;
  phone?: string;
  roles: string[];
  cart?: CartInterface;
  favorite?: number[];
  createdAt?: Date;
  updatedAt?: Date;
  verifyPassword(password: string): Promise<boolean>;
}

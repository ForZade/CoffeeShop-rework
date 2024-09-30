import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
    liked: {
      type: Number,
      default: 0,
    },
    options: [],
  },
  { timestamps: true },
);

export default mongoose.model("Product", productSchema);

export interface ProductInterface extends mongoose.Document {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  options?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

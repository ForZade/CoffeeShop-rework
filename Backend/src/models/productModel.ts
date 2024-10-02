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
      type: mongoose.Schema.Types.Decimal128,
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
  price: mongoose.Types.Decimal128;
  image: string;
  options?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

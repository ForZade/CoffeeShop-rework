import mongoose from "mongoose";

export default function toDecimal(num: number) {
  return mongoose.Types.Decimal128.fromString(num.toString());
}

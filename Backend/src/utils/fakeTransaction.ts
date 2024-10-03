import mongoose from "mongoose";
import toDecimal from "./toDecimal";

function getRandomNumber(
  min: number = 1,
  max: number = 1500,
  decimals: number = 2,
): number {
  const random = Math.random() * (max - min) + min;
  return parseFloat(random.toFixed(decimals));
}

export async function fakeTransaction(
  total: mongoose.Types.Decimal128,
): Promise<boolean> {
  let currentAmount: number | mongoose.Types.Decimal128 = getRandomNumber(); // 1 - 1500
  currentAmount = toDecimal(currentAmount);
  console.log(currentAmount, total);
  return currentAmount > total ? true : false;
}

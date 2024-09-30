import User from "../models/userModel";
import Product from "../models/productModel";
import { uuid } from "uuidv4";
import Transaction from "../models/transactionModel";

export async function generateUserId() {
  const id = Math.floor(10000000 + Math.random() * 90000000).toString();

  const existingUser = await User.findOne({ id: id });

  if (existingUser) {
    return generateUserId();
  }

  return id;
}

export async function generateProductId() {
  const id = Math.floor(Math.random() * 100000);

  const matchingProduct = await Product.findOne({ id });
  console.log(matchingProduct);
  if (matchingProduct) {
    return generateProductId();
  }

  return id;
}

export default async function generateTransactionId() {
  const id = uuid();

  const matchingTransaction = await Transaction.findOne({ id });
  console.log(matchingTransaction);
  if (matchingTransaction) {
    return generateProductId();
  }

  return id;
}
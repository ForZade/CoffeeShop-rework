import User, { UserInterface } from "../models/userModel";
import Product, { ProductInterface } from "../models/productModel";
import { v4 as uuidv4 } from "uuid";
import Transaction, { TransactionInterface } from "../models/transactionModel";
import discount from "../models/discountModel";
export async function generateUserId() {
  const id = Math.floor(10000000 + Math.random() * 90000000).toString();

  const existingUser: UserInterface = await User.findOne({ id: id });

  if (existingUser) {
    return generateUserId();
  }

  return parseInt(id);
}

export async function generateProductId() {
  const id: number = Math.floor(Math.random() * 100000);

  const matchingProduct: ProductInterface = await Product.findOne({ id });
  
  if (matchingProduct) {
    return generateProductId();
  }

  return id;
}

export default async function generateTransactionId() {
  const id = uuidv4();

  const matchingTransaction: TransactionInterface = await Transaction.findOne({ id });

  if (matchingTransaction) {
    return generateProductId();
  }

  return id;
}

export async function rCode(length = 8) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  if(await discount.findOne({ code: result })) {
    return rCode();
  }
  return result;
}

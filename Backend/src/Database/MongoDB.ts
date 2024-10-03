import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri: string = `mongodb+srv://project:${process.env.MONGO_PASSWORD}@coffeeshop.jtr6k.mongodb.net/?retryWrites=true&w=majority&appName=coffeeShop`;

export default async function run() {
  try {
    await mongoose.connect(uri);
    console.log("[mongoose] Database started successfully");
  } catch (err: unknown) {
    console.log("[mongoose] Error: ", err);
  }
}

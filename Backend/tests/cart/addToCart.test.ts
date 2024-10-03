import request from "supertest";
import express from "express";
import { describe, it, before, after } from "node:test";
import assert from "node:assert";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import cartController from "../../src/controllers/cartController";
import User from "../../src/models/userModel";
import Product from "../../src/models/productModel";

const app = express();
app.use(express.json());
app.use("/test/cart/add", cartController.addToCart);

let mongoServer: MongoMemoryServer;
let token: string;

before(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  // Create a mock user and product
  const user = new User({
    id: 1,
    first_name: "John",
    last_name: "Doe",
    email: "test@example.com",
    password: "Password123.",
    cart: { items: [], total: 0 },
  });
  await user.save();

  const product = new Product({
    id: 101,
    name: "Product 101",
    price: 50.0,
  });
  await product.save();
});

after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Add to Cart", () => {
  it("should add an item to the cart", async () => {
    const response = await request(app)
      .post("/test/cart/add")
      .set("Cookie", [`jwt=${token}`])
      .send({ productId: 101 });

    assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(response.body.message, "item added to cart");
  });

  it("should return 400 if product is not found", async () => {
    const response = await request(app)
      .post("/test/cart/add")
      .set("Cookie", [`jwt=${token}`])
      .send({ productId: 999 });

    assert.strictEqual(response.statusCode, 400);
    assert.strictEqual(response.body.message, "Product not found");
  });
});

import request from "supertest";
import express from "express";
import { describe, it, before, after } from "node:test";
import assert from "node:assert";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import cartController from "../../src/controllers/cartController";
import User from "../../src/models/userModel";
import Product from "../../src/models/productModel";
import { signToken } from "../../src/utils/token";

const app = express();
app.use(express.json());
app.use("/test/cart/remove", cartController.removeFromCart);

let mongoServer: MongoMemoryServer;
let token: string;

before(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

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

  token = signToken({ id: 1 });
});

after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Remove from Cart", () => {
  it("should remove an item from the cart", async () => {
    const response = await request(app)
      .post("/test/cart/remove")
      .set("Cookie", [`jwt=${token}`])
      .send({ productId: 101 });

    assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(response.body.message, "item removed");
  });

  it("should return 400 if product is not found", async () => {
    const response = await request(app)
      .post("/test/cart/remove")
      .set("Cookie", [`jwt=${token}`])
      .send({ productId: 999 });

    assert.strictEqual(response.statusCode, 400);
    assert.strictEqual(response.body.message, "Product not found");
  });
});

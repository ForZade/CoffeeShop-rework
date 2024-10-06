import request from "supertest";
import express from "express";
import { describe, it, before, after } from "node:test";
import assert from "node:assert";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import cartController from "../../src/controllers/cartController";
import User from "../../src/models/userModel";
import Product from "../../src/models/productModel";
import { generateToken } from "../../src/utils/token";

const app = express();
app.use(express.json());
app.use("/test/cart/add", cartController.addToCart);

let mongoServer: MongoMemoryServer;
let token: string;


before(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  // Create a test user
  const user = new User({
    id: 1,
    first_name: "John",
    last_name: "Doe",
    email: "test@example.com",
    password: "Password123.",
    cart: {
      items: [],
      total: mongoose.Types.Decimal128.fromString("0"), // Initialize total as Decimal128
    },
    roles: ["user"],
  });
  await user.save();

  // Create a test product with all required fields
  const product = new Product({
    id: 101,
    name: "Product 101",
    price: mongoose.Types.Decimal128.fromString("50.00"), // Ensure price is Decimal128
    description: "A great product to test adding to cart.", // Provide a description
  });
  await product.save();

  // Generate token for the mock user
  token = generateToken("test@example.com", 1, ["user"]);
});

after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Add to Cart", () => {
  it("should add an item to the cart", async () => {
    const response = await request(app)
      .post("/test/cart/add")
      .set("Cookie", [`jwt=${token}`]) // Sending the token via cookie
      .send({ productId: 101 });

    // Assert the response
    assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(response.body.message, "Item added to cart");

    // Check that the item was added to the cart
    const updatedUser = await User.findOne({ email: "test@example.com" });
    assert.strictEqual(updatedUser.cart.items.length, 1);
    assert.strictEqual(updatedUser.cart.items[0].productId, 101);
    assert.strictEqual(updatedUser.cart.items[0].quantity, 1);
    assert.strictEqual(updatedUser.cart.total.toString(), "50.00");
  });

  it("should return 400 if product is not found", async () => {
    const response = await request(app)
      .post("/test/cart/add")
      .set("Cookie", [`jwt=${token}`]) // Sending the token via cookie
      .send({ productId: 999 }); // Invalid productId

    // Assert the response
    assert.strictEqual(response.statusCode, 400);
    assert.strictEqual(response.body.message, "Product not found");
  });
});


// before(async () => {
//   mongoServer = await MongoMemoryServer.create();
//   const uri = mongoServer.getUri();
//   await mongoose.connect(uri);

//   const user = new User({
//     id: 1,
//     first_name: "John",
//     last_name: "Doe",
//     email: "test@example.com",
//     password: "Password123.",
//     cart: { items: [], total: 0 },
//     roles: ["user"],
//   });
//   await user.save();

//   const product = new Product({
//     id: 101,
//     name: "Product 101",
//     price: 50.0,
//   });
//   await product.save();

//   // Generate token for the mock user
//   token = generateToken("test@example.com", 1, ["user"]);
// });

// after(async () => {
//   await mongoose.disconnect();
//   await mongoServer.stop();
// });

// describe("Add to Cart", () => {
//   it("should add an item to the cart", async () => {
//     const response = await request(app)
//       .post("/test/cart/add")
//       .set("Cookie", [`jwt=${token}`])
//       .send({ productId: 101 });

//     assert.strictEqual(response.statusCode, 200);
//     assert.strictEqual(response.body.message, "item added to cart");
//   });

//   it("should return 400 if product is not found", async () => {
//     const response = await request(app)
//       .post("/test/cart/add")
//       .set("Cookie", [`jwt=${token}`])
//       .send({ productId: 999 });

//     assert.strictEqual(response.statusCode, 400);
//     assert.strictEqual(response.body.message, "Product not found");
//   });
// });

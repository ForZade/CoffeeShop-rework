import request from "supertest";
import express from "express";
import { describe, it, before, after } from "node:test";
import assert from "node:assert";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

import productControllers from "../../src/controllers/productControllers";

import Products, { ProductInterface } from "../../src/models/productModel";
import cookieParser from "cookie-parser";
import toDecimal from "../../src/utils/toDecimal";
import { generateToken } from "../../src/utils/token";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/test/products", productControllers.review);

let mongoServer: MongoMemoryServer;

before(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri);
});

after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Like the product", () => {
  let token: string;
  let cookie: string
  before(async () => {

    const products = new Products ({
      id: 5345,
      liked: 1
    })

    token = generateToken("test@example.com", 1, ["user"]);
    cookie = `jwt=${token}`;
  });

  it("should return 200 if review posted", async () => {
    const response = await request(app).get("/test/products").set("Cookie", cookie).send({
        id: "5345"
    })
    assert.strictEqual(response.statusCode, 200); // Using assert
    assert.strictEqual(response.body.message, "Product favorited."); // Using assert
  });

  it("should return 200 if review unposted", async () => {
    const response = await request(app).get("/test/products").set("Cookie", cookie)
    assert.strictEqual(response.statusCode, 200); // Using assert
    assert.strictEqual(response.body.message, "Product unfavorited."); // Using assert
  });

  // it("should return 401 if email is not registered", async () => {
  //   const response = await request(app).post("/test/auth/login").send({
  //     email: "wrong@example.com",
  //     password: "Password123.",
  //   });
  //   assert.strictEqual(response.statusCode, 401);
  //   assert.strictEqual(
  //     response.body.message,
  //     "Invalid credentials: Provided email is not registered",
  //   );
  // });

  // it("should return 401 if password is incorrect", async () => {
  //   const response = await request(app).post("/test/auth/login").send({
  //     email: "test@example.com",
  //     password: "wrongpassword",
  //   });
  //   assert.strictEqual(response.statusCode, 401);
  //   assert.strictEqual(
  //     response.body.message,
  //     "Invalid credentials: Provided password is incorrect",
  //   );
  // });

//   it("should lock user if too many login attempts", async () => {
//     const maxAttempts = 3;

//     for (let i = 0; i < maxAttempts; i++) {
//       await request(app).post("/test/auth/login").send({
//         email: "test@example.com",
//         password: "wrongpassword",
//       });
//     }

//     const response = await request(app).post("/test/auth/login").send({
//       email: "test@example.com",
//       password: "wrongpassword",
//     });

//     assert.strictEqual(response.statusCode, 401);
//     assert.strictEqual(response.body.message, "Account is locked");
//   });
 });

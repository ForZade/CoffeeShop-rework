// import request from "supertest";
// import express from "express";
// import { describe, it, before, after } from "node:test";
// import assert from "node:assert";
// import mongoose from "mongoose";
// import { MongoMemoryServer } from "mongodb-memory-server";

// import authControllers from "../src/controllers/authControllers";

// const app = express();
// app.use(express.json());
// app.use("/test/auth/register", authControllers.register);

// let mongoServer: MongoMemoryServer;

// before(async () => {
//   mongoServer = await MongoMemoryServer.create();
//   const uri = mongoServer.getUri();

//   await mongoose.connect(uri);
// });

// after(async () => {
//   await mongoose.disconnect();
//   await mongoServer.stop();
// });

// describe("Register", () => {
//   it("should return 200 if user is registered", async () => {
//     const response = await request(app).post("/test/auth/register").send({
//       first_name: "John",
//       last_name: "Doe",
//       email: "XxJqK@example.com",
//       password: "Password123.",
//     });

//     assert.strictEqual(response.statusCode, 200); // Using assert
//     assert.strictEqual(
//       response.body.message,
//       "Registration successful. Please verify your email.",
//     ); // Using assert
//   });

//   it("should return 400 if user already exists", async () => {
//     const response = await request(app).post("/test/auth/register").send({
//       first_name: "John",
//       last_name: "Doe",
//       email: "XxJqK@example.com",
//       password: "password123",
//     });

//     assert.strictEqual(response.statusCode, 400); // Using assert
//     assert.strictEqual(
//       response.body.message,
//       "User with this email already exists.",
//     ); // Using assert
//   });

//   it("should return 400 if password is missing", async () => {
//     const response = await request(app).post("/test/auth/register").send({
//       first_name: "John",
//       last_name: "Doe",
//       email: "XxJqK@example.com",
//     });

//     assert.strictEqual(response.statusCode, 400); // Using assert
//     assert.strictEqual(response.body.message, "Password is required."); // Using assert
//   });
// });

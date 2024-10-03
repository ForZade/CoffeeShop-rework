import request from "supertest";
import express from "express";
import { describe, it, before, after } from "node:test";
import assert from "node:assert";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

import authControllers from "../src/controllers/authControllers";

import User, { UserInterface } from "../src/models/userModel";

const app = express();
app.use(express.json());
app.use("/test/auth/register", authControllers.register);

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

describe("Login", () => {
  before(async () => {
    const user = new User({
      first_name: "John",
      last_name: "Doe",
      email: "test@example.com",
      password: "Password123.", // Use a hashed password in a real scenario
      lock: { attempts: 0, count: 0, until: new Date() }, // Initial lock state
    });
    await user.save();
  });

  it("should return 200 if user is logged in", async () => {
    const response = await request(app).post("/test/auth/login").send({
      email: "test@example.com",
      password: "Password123.",
    });

    assert.strictEqual(response.statusCode, 200); // Using assert
    assert.strictEqual(response.body.message, "Login successful"); // Using assert
  });

  it("should return 401 if email is not registered", async () => {
    const response = await request(app).post("/test/auth/login").send({
      email: "wrong@example.com",
      password: "Password123.",
    });
    assert.strictEqual(response.statusCode, 401);
    assert.strictEqual(
      response.body.message,
      "Invalid credentials: Provided email is not registered",
    );
  });

  it("should return 401 if password is incorrect", async () => {
    const response = await request(app).post("/test/auth/login").send({
      email: "test@example.com",
      password: "wrongpassword",
    });
    assert.strictEqual(response.statusCode, 401);
    assert.strictEqual(
      response.body.message,
      "Invalid credentials: Provided password is incorrect",
    );
  });

  it("should lock user if too many login attempts", async () => {
    const maxAttempts = 3;

    for (let i = 0; i < maxAttempts; i++) {
      await request(app).post("/test/auth/login").send({
        email: "test@example.com",
        password: "wrongpassword",
      });
    }

    const response = await request(app).post("/test/auth/login").send({
      email: "test@example.com",
      password: "wrongpassword",
    });

    assert.strictEqual(response.statusCode, 401);
    assert.strictEqual(response.body.message, "Account is locked");
  });
});

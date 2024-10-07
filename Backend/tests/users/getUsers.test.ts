// getUsers.test.ts
import request from "supertest";
import express from "express";
import { describe, it, before, after } from "node:test";
import assert from "node:assert";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import userControllers from "../../src/controllers/userControllers";
import User from "../../src/models/userModel";

const app = express();
app.use(express.json());
app.use("/test/users", userControllers.getUsers);

let mongoServer;

before(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

// Adding initial user data for testing
before(async () => {
  const users = [
    {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      email: "john@example.com",
      password: "Password123.",
      lock: { attempts: 0, until: new Date(), count: 0 },
      isVerified: true,
      isAdmin: false,
      roles: ["User"],
    },
    {
      id: 2,
      first_name: "Jane",
      last_name: "Doe",
      email: "jane@example.com",
      password: "Password123.",
      lock: { attempts: 0, until: new Date(), count: 0 },
      isVerified: true,
      isAdmin: false,
      roles: ["User"],
    },
  ];

  // Save users to the in-memory database
  await User.insertMany(users);
});

describe("Get Users", () => {
  it("should return all users successfully", async () => {
    const response = await request(app).get("/test/users");

    assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(response.body.status, "success");
    assert.strictEqual(response.body.message, "All Users successfully retrieved");
    assert.strictEqual(response.body.data.length, 2); // We have added 2 users
  });

  it("should return an empty array if no users exist", async () => {
    await User.deleteMany({}); // Clear the users
    const response = await request(app).get("/test/users");

    assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(response.body.status, "success");
    assert.strictEqual(response.body.message, "All Users successfully retrieved");
    assert.deepStrictEqual(response.body.data, []); // Expecting empty array
  });
});

import request from "supertest";
import express from "express";
import { describe, it, before, after } from "node:test";
import assert from "node:assert";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import adminController from "../../src/controllers/userControllers";

import User, { UserInterface } from "../../src/models/userModel"; // Import the User model

const app = express();
app.use(express.json());
app.use("/test/admin", adminController.removeAdmin);

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

// Adding initial user data for testing
before(async () => {
  // Creating some users for the tests
  const users = [
    {
      id: 123456,
      first_name: "Jane",
      last_name: "Doe",
      email: "adminuser@example.com",
      password: "Password123.", // In practice, you should store hashed passwords
      isVerified: true,
      roles: ["Admin"], // This user should be an admin
  },
    {
      id: 789012,
      first_name: "Unverified",
      last_name: "User",
      email: "unverifiedadmin@example.com",
      password: "Password123.",
      isVerified: false,
      roles: ["Admin"],
    },
    {
      id: 654321,
      first_name: "Regular",
      last_name: "User",
      email: "regularuser@example.com",
      password: "Password123.",
      isVerified: true,
      roles: ["User"], // Not an admin
    },
  ];

  // Saving users to the in-memory database
  await User.insertMany(users);

  // Logging to verify users in the database
  const allUsers = await User.find();
  console.log("Initial Users:", allUsers);
});

describe("Remove Admin", () => {
  it("should return 200 if user is successfully removed from admin role", async () => {
    const response = await request(app).post("/test/admin").send({
      identifier: "123456", // A user who is an admin
    });

    assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(response.body.message, "User removed from administrator role successfully");

    // Verifying that the user no longer has the "Admin" role
    const updatedUser = await User.findOne({ id: 123456 });
    assert.ok(!updatedUser?.roles.includes("Admin"));
  });

  it("should return 404 if user is not found", async () => {
    const response = await request(app).post("/test/admin").send({
      identifier: "nonexistentuser@example.com",
    });

    assert.strictEqual(response.statusCode, 404);
    assert.strictEqual(response.body.error, "User not found");
  });

  it("should return 400 if user is not an admin", async () => {
    const response = await request(app).post("/test/admin").send({
      identifier: "654321", // A user that is not an admin
    });

    assert.strictEqual(response.statusCode, 400);
    assert.strictEqual(response.body.message, "User is not an admin");
  });

  it("should return 400 if user is not verified", async () => {
    const response = await request(app).post("/test/admin").send({
      identifier: "unverifiedadmin@example.com", // An unverified admin user
    });

    assert.strictEqual(response.statusCode, 400);
    assert.strictEqual(response.body.message, "User is not verified");
  });

  it("should remove user as admin using email identifier", async () => {
    const response = await request(app).post("/test/admin").send({
      identifier: "adminuser@example.com", // Valid email identifier for admin user
    });

    console.log("Response Status:", response.statusCode);
    console.log("Response Body:", response.body);

    assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(response.body.message, "User removed from administrator role successfully");

    // Verifying the user is no longer an admin
    const updatedUser = await User.findOne({ email: "adminuser@example.com" });
    assert.ok(!updatedUser?.roles.includes("Admin"));
  });
});

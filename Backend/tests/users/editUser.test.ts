// getUserById.test.ts
import request from "supertest";
import express from "express";
import { describe, it, before, after, beforeEach} from "node:test";
import assert from "node:assert";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import userControllers from "../../src/controllers/userControllers";
import User from "../../src/models/userModel";
import { generateToken } from "../../src/utils/token";
import cookieParser from 'cookie-parser'; // Import cookie-parser

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/test/users", userControllers.updateUser);

let mongoServer;

before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });
  let token: string;
  let cookie: string
  beforeEach(async () => {
    await User.deleteMany({}); // Clear users collection
    const user = new User ({
        id: 1,
        first_name: "John",
        last_name: "Doe",
        email: "john@example.com",
        password: "Password123.",
        roles: ["User"],
      })
        await user.save()
        token = generateToken(user.email, user.id, user.roles, false);
        cookie = `jwt=${token}`;
    })

  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });
  
  describe("update user", () => {
      it("should retund updated user", async () => {
        const edituser = {
            first_name: "John",
            last_name: "Doe",
            email: "john@example.com",
            address: "Radiatoriskiu 1",
            city: "Vilnius",
            country: "Lithuania",
            zip: 12345,
            phone: "+37012345678",
            roles: ["User"],
          }
        const response = await request(app).patch(`/test/users`).set("Cookie", cookie).send(edituser); // Use the correct user ID
    
        assert.strictEqual(response.statusCode, 200);
        assert.strictEqual(response.body.status, "success");
        console.log(response.body); // Check that the ID matches
      });
      it("should return that password cannot be changed", async () => {
        const edituser = {
            first_name: "John",
            last_name: "Doe",
            password: "Password123.",
            email: "john@example.com",
            address: "Radiatoriskiu 1",
            city: "Vilnius",
            country: "Lithuania",
            zip: 12345,
            phone: "+37012345678",
            roles: ["User"],
          }
        const response = await request(app).patch(`/test/users`).set("Cookie", cookie).send(edituser); // Use the correct user ID
    
        assert.strictEqual(response.statusCode, 400);
        assert.strictEqual(response.body.status, "error");
        console.log(response.body); // Check that the ID matches
      });
      
    
//       it("should return 404 if the user is not found", async () => {
//         const response = await request(app).get("/test/users/id/999"); // Request a non-existent user ID
    
//         assert.strictEqual(response.statusCode, 404);
//         assert.strictEqual(response.body.status, "error");
//         assert.strictEqual(response.body.message, "User ID not found");
//       });
    
//       it("should return 400 for invalid user ID", async () => {
//         const response = await request(app).get("/test/users/id/invalidID"); // Use an invalid ID
//         assert.strictEqual(response.statusCode, 400);
//         assert.strictEqual(response.body.status, "error");
//         assert.strictEqual(response.body.message, "Invalid user ID");
//       });
  });
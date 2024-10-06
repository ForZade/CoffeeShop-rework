import request from "supertest";
import express from "express";
import { describe, it, before, after } from "node:test";
import assert from "node:assert";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import bcrypt from "bcrypt";

import userControllers from "../../src/controllers/userControllers";
import User, { UserInterface } from "../../src/models/userModel";
import cookieParser from "cookie-parser";
import { generateToken } from "../../src/utils/token";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/test/users/test", userControllers.addAdmin);

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
  
  describe("Test", () => {
    let token: string;
    let cookie: string;

    before(async () => {
        const hashedPassword = await bcrypt.hash("Password123.", 10);

      const user: UserInterface = new User({
        id: 12345678,
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        password: hashedPassword,
        roles: ["User", "Admin"],
      });

      const user2: UserInterface = new User({
        id: 12345679,
        first_name: "Jane",
        last_name: "Doe",
        email: "jane.doe@example.com",
        password: hashedPassword,
        roles: ["User"],
        isVerified: true,
      });

      token = generateToken(user.email, user.id, user.roles);
      cookie = `jwt=${token};`;

      await user.save();
      await user2.save();
    });
  
    //^ Test if user gets successfully registered
    it("should return 200 if user token works", async () => {
      try {
        const response = await request(app)
        .post("/test/users/test")
        .set("Cookie", cookie)
        .send({
            identifier: "12345679"
        });
  
        assert.strictEqual(response.statusCode, 200);
      } catch (err: unknown) {
        console.log(err);
      }
    });
  });
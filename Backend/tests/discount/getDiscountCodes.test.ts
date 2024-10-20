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
import Discount from "../../src/models/discountModel";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/test/users/admin/discounts", userControllers.getDiscountCodes);

let mongoServer;

before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });
  let token: string;
  let cookie: string
  beforeEach(async () => {
    await Discount.deleteMany({}); 
    const discount = new Discount({
        code: "onfifth",
        percentage: 20,
        expires: '2024-11-21',
      },)
    const discount2 = new Discount({
        code: "Freeweekend",
        percentage: 5,
        expires: '2024-11-21',
    })
      await discount.save()
      await discount2.save()
    })

  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });
  describe("get", () => {
    
      it("Recieve all discount codes", async () => {
        const response = await request(app).get(`/test/users/admin/discounts`)
    
        assert.strictEqual(response.statusCode, 200);
        assert.strictEqual(response.body.status, "success");
        console.log(response.body); 
      });
      
    //   it("Cant recieve, no codes available", async () => {
    //     const response = await request(app).get(`/test/users/admin/discounts`)
    
    //     assert.strictEqual(response.statusCode, 400);
    //     assert.strictEqual(response.body.status, "No discounts found");
    //     console.log(response.body); 
    //   });
  });
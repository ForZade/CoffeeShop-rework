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
app.use("/test/users/admin/discount/:code", userControllers.addDiscount);

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
      })
      await discount.save()
    })

  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });
  
  describe("create discount code", () => {
      it("should created discount code", async () => {
        const discount  = {
            percentage: 100,
            expires: '2024-11-21',
          }
        const response = await request(app).post(`/test/users/admin/discount/Freeweekend`).send(discount); 
    
        assert.strictEqual(response.statusCode, 200);
        assert.strictEqual(response.body.status, "success");
        console.log(response.body.discount); 
      });

      it("should not create discount code returning `Discount code already in Use`", async () => {
        const discount  = {
            percentage: 100,
            expires: '2024-11-21',
          }
        const response = await request(app).post(`/test/users/admin/discount/onfifth`).send(discount); 
    
        assert.strictEqual(response.statusCode, 400);
        assert.strictEqual(response.body.status, "Discount code already in Use");
        console.log(response.body); 
      });

      it("`Percentage discount is required`", async () => {
        const discount  = {
            expires: '2024-11-20',
          }
        const response = await request(app).post(`/test/users/admin/discount/noPercentage`).send(discount); 
        assert.strictEqual(response.statusCode, 400);
        assert.strictEqual(response.body.status, "Percentage discount is required");
        console.log(response.body); 
      });
      it("`Expiry date is required`", async () => {
        const discount  = {
            percentage: 100,
          }
        const response = await request(app).post(`/test/users/admin/discount/noPercentage`).send(discount); 
        assert.strictEqual(response.statusCode, 400);
        assert.strictEqual(response.body.status, "Expiry date is required");
        console.log(response.body); 
      });
  });
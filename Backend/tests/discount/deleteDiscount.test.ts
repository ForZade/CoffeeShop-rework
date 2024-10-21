// getUserById.test.ts
import request from "supertest";
import express from "express";
import { describe, it, before, after, beforeEach} from "node:test";
import assert from "node:assert";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import userControllers from "../../src/controllers/userControllers";
import Discount from "../../src/models/discountModel";

const app = express();
app.use(express.json());
app.use("/test/users/admin/discount/:code", userControllers.deleteDiscount);

let mongoServer;

before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });
  beforeEach(async () => {
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
  
  describe("delete discount code", () => {
      it("should delete discount code", async () => {
        const response = await request(app).delete(`/test/users/admin/discount/onfifth`).send({ })
        assert.strictEqual(response.statusCode, 200);
        assert.strictEqual(response.body.status, "success");
        console.log(response.body); 
      });
  });
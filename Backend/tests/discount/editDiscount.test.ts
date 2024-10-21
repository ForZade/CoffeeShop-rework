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
app.use("/test/users/admin/discount/:code", userControllers.editDiscount);

let mongoServer;

before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });
  beforeEach(async () => {
    await Discount.deleteMany({});
    const discount = new Discount({
      code: "onfifth",
      percentage: 20,
      expires: '2024-11-21',
    },)
    await discount.save()
    })

  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });
  
  describe("edit discount", () => {
      it("should edit discount", async () => {
        const discount2 = {
            percentage: 5,
            expires: '2024-11-21',
        }
        const response = await request(app).patch(`/test/users/admin/discount/onfifth`).send(discount2)
        assert.strictEqual(response.statusCode, 200);
        assert.strictEqual(response.body.status, "success");
      });
      it("should not edit discount, returning `Precentage discount is required`", async () => {
        const discount2 = {
            expires: '2024-11-21',
        }
        const response = await request(app).patch(`/test/users/admin/discount/onfifth`).send(discount2)
        assert.strictEqual(response.statusCode, 403);
        assert.strictEqual(response.body.status, "Precentage discount is required");
      });
      it("should not edit discount, returning `expiry date is required`", async () => {
        const discount2 = {
            percentage: 5,
        }
        const response = await request(app).patch(`/test/users/admin/discount/onfifth`).send(discount2)
        assert.strictEqual(response.statusCode, 402);
        assert.strictEqual(response.body.status, "expiry date is required");
      });
      it("should not edit discount, returning `Discount code not found`", async () => {
        const discount2 = {
            expires: '2024-11-21',
            percentage: 5,
        }
        const response = await request(app).patch(`/test/users/admin/discount/onfifthhh`).send(discount2)
        assert.strictEqual(response.statusCode, 401);
        assert.strictEqual(response.body.status, "Discount code not found");
      });
  });
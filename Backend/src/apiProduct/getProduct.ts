import express from "express";
const router = express.Router();
import mongoose from "mongoose";
// logger.**(ERR) LOGS UNWANTED ACTIVITY
import logger from "../logger/logger";

// GET ALL PRODUCTS AVAILABLE ON DB
router.get("/getProduct", (req, res) => {
  try {
    // const databaseRes = await db.product.find();
    res.send(/*databaseRes*/);
  } catch (error) {
    logger.error(error);
    res.send(error);
  }
});

// GET PRODUCT BY ID AVAILABLE ON DB
router.get("/getProductById", (req, res) => {
  try {
    // const databaseRes = await db.product.findOne({id: ${req.body.id}})
    res.send(/*databaseRes*/);
  } catch (error) {
    logger.error(error);
    res.send(error);
  }
});

export default router;

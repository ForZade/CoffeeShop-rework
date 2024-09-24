import express from "express";
const router = express.Router();

// logger.**(ERR) LOGS UNWANTED ACTIVITY
import logger from "../../logger/logger";

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

// GET SPECIFIC PRODUCT BY ID AVAILABLE ON DB
router.get("/getProductById", (req, res) => {
  try {
    // const databaseRes = await db.product.findOne({id: ${req.body.id}})
    res.send(/*databaseRes*/);
  } catch (error) {
    logger.error(error);
    res.send(error);
  }
});

interface ProductInterface {
  _id: Number | string;
  name: string;
  description: string;
  price: number;
  image: string;
}

// GET ALL PRODUCTS AVAILABLE ON DB
import productModel from "../../models/productModel";

router.post("/postProduct", async (req, res) => {
  const {_id, name, description, price, image}:ProductInterface = req.body;
  try {
    const newProduct = new productModel({ _id, name, description, price, image });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
} catch (error) {
    logger.error(error)
    res.status(400).json({ message: 'Error adding user', error });
}
});

export default router;

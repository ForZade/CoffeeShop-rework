import express, { Request, Response } from "express";
import productModel from "../../models/productModel";
import User from "../../models/userModel";
import { generateProductId } from "../../utils/idgen";
const router = express.Router();

// logger.**(ERR) LOGS UNWANTED ACTIVITY
import logger from "../../logger/logger";

// GET ALL PRODUCTS AVAILABLE ON DB
router.get("/getProduct", async (req: Request, res: Response) => {
  const { id } = req.body;
  const user: any = User.findOne({ id });

  if (user.admin) {
    try {
      const databaseRes = await productModel.find({});
      res.json({ message: "Success", databaseRes }); // SUBJECT TO CHANGE
    } catch (error) {
      logger.error(error);
      res.send({ message: "Failure", error }); // SUBJECT TO CHANGE
    }
  } else {
    res.json({ message: "User is not permitted to commit this action" });
  }
});

// GET SPECIFIC PRODUCT BY ID AVAILABLE ON DB
router.get("/getProductById", async (req: Request, res: Response) => {
  const { id } = req.body;
  const user: any = User.findOne({ id });

  if (user.admin) {
    try {
      const databaseRes = await productModel.findOne({ id: req.body.id });
      res.send({ message: "Success", databaseRes }); // SUBJECT TO CHANGE
    } catch (error) {
      logger.error(error);
      res.send({ message: "Failure", error }); // SUBJECT TO CHANGE
    }
  } else {
    res.json({ message: "User is not permitted to commit this action" });
  }
});

//typescript interface
interface ProductInterface {
  id: Number | string;
  name: string;
  description: string;
  price: number;
  image: string;
}

// ADD PRODUCTS TO DATABASE
router.post("/postProduct", async (req, res) => {
  const { id } = req.body;
  const user: any = User.findOne({ id });

  if (user.admin) {
    const { name, description, price, image }: ProductInterface = req.body;
    const id = await generateProductId();
    try {
      const newProduct = new productModel({
        id,
        name,
        description,
        price,
        image,
      });
      const savedProduct = await newProduct.save();
      res.status(201).json({ message: "Success", savedProduct }); // SUBJECT TO CHANGE
    } catch (error) {
      logger.error(error);
      res.status(400).json({ message: "Failure", error }); // SUBJECT TO CHANGE
    }
  } else {
    res.json({ message: "User is not permitted to commit this action" });
  }
});
// EDIT PRODUCTS
router.patch("/patchProduct", async (req, res) => {
  const { id } = req.body;
  const user: any = User.findOne({ id });
  const fieldsToUpdate = {};

  if (user.admin) {
    Object.keys(req.body).forEach((key) => { // Technicly useless, subject to change
      if (req.body[key] !== undefined && req.body[key] !== null) {
        fieldsToUpdate[key] = req.body[key];
      }
    });
    try {
      const result = await productModel.updateOne(
        { id: req.body.id },
        { $set: fieldsToUpdate }
      );
      res.send({ message: "Success", result });
    } catch (err) {
      res.send({ message: "Failure", err });
    }
  } else {
    res.json({ message: "User is not permitted to commit this action" });
  }
});
// DELETE PRODUCT
router.delete("/deleteProductById", async (req, res) => {
  const { id } = req.body;
  const user: any = User.findOne({ id });

  if (user.admin) {
    try {
      const deletedProduct = await productModel.findOneAndDelete({
        id: req.body.id,
      });
      res.json({ message: "Success", deletedProduct });
    } catch (err) {
      res.json({ message: "Failure", err });
    }
  } else {
    res.json({ message: "User is not permitted to commit this action" });
  }
});

export default router;

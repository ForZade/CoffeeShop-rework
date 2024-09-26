import express, { Request, Response } from "express";
import Product from "../../models/productModel";
import User from "../../models/userModel";
import { generateProductId } from "../../utils/idgen";
import { isAdmin } from "../../utils/isAdmin";
const router = express.Router();

// logger.**(ERR) LOGS UNWANTED ACTIVITY
import logger from "../../logger/logger";

// GET ALL PRODUCTS AVAILABLE ON DB
router.get("/getProduct", async (req: Request, res: Response) => {
//  const { id } = req.body Currently not necessery
//  const Admin = isAdmin(id);

//  if (Admin) {
    try {
      const databaseRes = await Product.find({});
      res.json({ message: "Success", databaseRes }); // SUBJECT TO CHANGE
    } catch (error) {
      logger.error(error);
      res.send({ message: "Failure", error }); // SUBJECT TO CHANGE
    }
//  } else {
//    res.json({ message: "User is not permitted to commit this action" });
//  }
});

// GET SPECIFIC PRODUCT BY ID AVAILABLE ON DB
router.get("/getProductById", async (req: Request, res: Response) => {
 // const { id } = req.body;   // Currently not necessery
 // const Admin = isAdmin(id);

 // if (Admin) {
    try {
      const databaseRes = await Product.findOne({ id: req.body.id });
      res.send({ message: "Success", databaseRes }); // SUBJECT TO CHANGE
    } catch (error) {
      logger.error(error);
      res.send({ message: "Failure", error }); // SUBJECT TO CHANGE
    }
 // } else {
 //   res.json({ message: "User is not permitted to commit this action" });
 // }
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
router.post("/postProduct", async (req: Request, res: Response) => {
  const { id } = req.body;
  const Admin = isAdmin(id);

  if (Admin) {
    const { name, description, price, image }: ProductInterface = req.body;
    const id = await generateProductId();
    try {
      const newProduct = new Product({
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
router.patch("/patchProduct", async (req: Request, res: Response) => {
  const { id } = req.body;
  const Admin = isAdmin(id);
  const fieldsToUpdate = {};

  if (Admin) {
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== undefined && req.body[key] !== null) {  // Technicly useless, subject to change
        fieldsToUpdate[key] = req.body[key];
      }
    });
    try {
      const result = await Product.updateOne(
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
router.delete("/deleteProductById", async (req: Request, res: Response) => {
  const { id } = req.body;
  const Admin = isAdmin(id);

  if (Admin) {
    try {
      const deletedProduct = await Product.findOneAndDelete({
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

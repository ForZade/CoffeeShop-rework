import express, { Request, Response } from "express";
import Product from "../models/productModel";
import { generateProductId } from "../utils/idgen";

interface ProductInterface {
  id: Number | string;
  name: string;
  description: string;
  price: number;
  image: string;
}

const  productControllers = {
  createProduct: async (req: Request, res: Response) => {
    const { name, description, price, image }: ProductInterface = req.body; // product json
    try {
      const id = await generateProductId();
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
      res.status(400).json({ message: "Failure", error }); // SUBJECT TO CHANGE
    }
  },
  getAllProducts: async (req: Request, res: Response) => {
    try {
      const databaseRes = await Product.find({});
      res.json({ message: "Success", databaseRes }); // SUBJECT TO CHANGE
    } catch (error) {
      res.send({ message: "Failure", error }); // SUBJECT TO CHANGE
    }
  },
  getProductById: async (req: Request, res: Response) => {
    try {
      const databaseRes = await Product.findOne({ id: req.body.id });
      res.send({ message: "Success", databaseRes }); // SUBJECT TO CHANGE
    } catch (error) {
      res.send({ message: "Failure", error }); // SUBJECT TO CHANGE
    }
  },
  patchProduct: async (req: Request, res: Response) => {
    const fieldsToUpdate = {};

    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== undefined && req.body[key] !== null) {
        // Technicly useless, subject to change
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
  },
  deleteProduct: async (req: Request, res: Response) => {
    try {
        const deletedProduct = await Product.findOneAndDelete({
          id: req.body.id,
        });
        res.json({ message: "Success", deletedProduct });
      } catch (err) {
        res.json({ message: "Failure", err });
      }
  }
};


export default productControllers;
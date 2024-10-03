import { NextFunction, Request, Response } from "express";
import User, { UserInterface } from "../models/userModel";
import { TokenInterface, verifyToken } from "../utils/token";
import Product, { ProductInterface } from "../models/productModel";

const reviewControllers = {
  review: async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;
    const { productId } = req.body;

    try {
      const decoded: TokenInterface = verifyToken(token);
      const user: UserInterface = await User.findOne({ id: decoded.id });

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const product: ProductInterface = await Product.findOne({
        id: productId,
      });
      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      if (user.favorite.includes(productId)) {
        user.favorite = user.favorite.filter((id) => id !== productId);
        product.liked--;

        await user.save(); // Await the save
        await product.save(); // Await the save

        return res.status(200).json({
          message: "Product unfavorited.",
        });
      }

      user.favorite.push(productId);
      product.liked++;

      await user.save(); // Await the save
      await product.save(); // Await the save

      res.status(200).json({
        message: "Product favorited.",
      });
    } catch (err: unknown) {
      next(err);
    }
  },
};

export default reviewControllers;

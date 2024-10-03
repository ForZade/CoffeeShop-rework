import { NextFunction, Request, Response } from "express";
import User, { UserInterface } from "../models/userModel";
import Product, { ProductInterface } from "../models/productModel";
import { verifyToken, TokenInterface } from "../utils/token";

const userControllers = {
  getUsers: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users: UserInterface[] = await User.find();
      res.status(200).json({
        status: "success",
        message: "All Users successfully retrieved",
        data: users,
      });
    } catch (err: unknown) {
      next(err);
    }
  },
  getUserById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.findOne({ id: parseInt(req.params.id) });

      if (!user) {
        return res.status(404).json({
          status: "error",
          message: "User ID not found",
        });
      }

      res.status(200).json({
        status: "success",
        message: "User retrieved by ID successfully",
        data: user,
      });
    } catch (err: unknown) {
      next(err);
    }
  },
  getUserByEmail: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.findOne({ email: req.params.email });

      if (!user) {
        return res.status(404).json({
          status: "error",
          message: "User email not found",
        });
      }

      res.status(200).json({
        status: "success",
        message: "User retrieved by email successfully",
        data: user,
      });
    } catch (err: unknown) {
      next(err);
    }
  },

  review: async (req: Request, res: Response, next: NextFunction) => {
    const token: string = req.cookies.jwt;
    const { productId }: { productId: number } = req.body;

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

        await user.save();
        await product.save();

        return res.status(200).json({
          message: "Product unfavorited.",
        });
      }

      user.favorite.push(productId);
      product.liked++;

      await user.save();
      await product.save();

      res.status(200).json({
        message: "Product favorited.",
      });
    } catch (err: unknown) {
      next(err);
    }
  },
};

export default userControllers;

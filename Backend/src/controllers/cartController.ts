import { NextFunction, Request, Response } from "express";
import User, { UserInterface } from "../models/userModel";
import Product, { ProductInterface } from "../models/productModel";
import { TokenInterface, verifyToken } from "../utils/token";
import toDecimal, { addDecimals, removeDecimals } from "../utils/toDecimal";

const cartController = {
  getCart: async (req: Request, res: Response, next: NextFunction) => {
    const token: string = req.cookies.jwt;

    try {
      const decoded: TokenInterface = await verifyToken(token);

      const user: UserInterface = await User.findOne({
        id: decoded.id,
      });

      if (!user) {
        return res.status(400).json({
          message: "User not found",
        });
      }

      res.status(200).json({
        message: "Succsefull",
        data: user.cart,
      });
    } catch (err) {
      next(err);
    }
  },

  addToCart: async (req: Request, res: Response, next: NextFunction) => {
    const token: string = req.cookies.jwt;
    const { productId }: { productId: number } = req.body;

    try {
      const decoded: TokenInterface = await verifyToken(token);

      const user: UserInterface = await User.findOne({
        id: decoded.id,
      });

      if (!user) {
        return res.status(400).json({
          message: "User not found",
        });
      }

      const product: ProductInterface = await Product.findOne({
        id: productId,
      });

      if (!product) {
        return res.status(400).json({
          message: "Product not found",
        });
      }

      const existingItem = user.cart.items.find(
        (item) => item.productId === productId,
      );

      if (existingItem) {
        existingItem.quantity++;
        existingItem.total = addDecimals(existingItem.total, product.price);
      } else {
        user.cart.items.push({
          productId,
          quantity: 1,
          total: product.price,
        });
      }
      user.cart.total = addDecimals(user.cart.total, product.price);

      await user.save();

      res.status(200).json({
        message: "item added to cart",
      });
    } catch (err) {
      next(err);
    }
  },

  removeFromCart: async (req: Request, res: Response, next: NextFunction) => {
    const token: string = req.cookies.jwt;
    const { productId } = req.body;

    try {
      const decoded: TokenInterface = await verifyToken(token);

      const user: UserInterface = await User.findOne({
        id: decoded.id,
      });

      if (!user) {
        return res.status(400).json({
          message: "User not found",
        });
      }

      const product: ProductInterface = await Product.findOne({
        id: productId,
      });

      if (!product) {
        return res.status(400).json({
          message: "Product not found",
        });
      }

      const existingItem = user.cart.items.find(
        (item) => item.productId === productId,
      );

      if (existingItem.quantity > 1) {
        existingItem.quantity--;
        existingItem.total = removeDecimals(existingItem.total, product.price);
      }

      user.cart.items.filter((item) => item.productId !== productId);
      user.cart.total = removeDecimals(user.cart.total, product.price);

      await user.save();

      res.status(200).json({
        message: "item removed",
      });
    } catch (err) {
      next(err);
    }
  },

  clearCart: async (req: Request, res: Response, next: NextFunction) => {
    const token: string = req.cookies.jwt;

    try {
      const decoded: TokenInterface = await verifyToken(token);

      const user: UserInterface = await User.findOne({
        id: decoded.id,
      });

      if (!user) {
        return res.status(400).json({
          message: "User not found",
        });
      }

      user.cart.items = [];

      user.cart.total = toDecimal(0);

      await user.save();
      res.status(200).json({
        message: "Cart cleared",
      });
    } catch (err) {
      next(err);
    }
  },
};

export default cartController;

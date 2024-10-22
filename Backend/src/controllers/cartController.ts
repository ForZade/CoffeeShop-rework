import { Request, Response, NextFunction } from "express";
import User, { UserInterface } from "../models/userModel";
import { TokenInterface, verifyToken } from "../utils/token";
import toDecimal, { addDecimals, divideDecimals, multiplyDecimals, subtractDecimals } from "../utils/toDecimal";
import Product, { ProductInterface } from "../models/productModel";
import calculateCart from "../utils/cart";

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

          await calculateCart(decoded.id);
    
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
        const productId: number = parseInt(req.params.productId);
    
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
          } else {
            user.cart.items.push({
              productId,
              quantity: 1,
              total: product.price,
            });
          }
    
          if(!user.cart.total) {
            user.cart.total = toDecimal(0);
          }
    
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
        const productId: number = parseInt(req.params.productId);
    
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
    
          if (!existingItem) {
            return res.status(400).json({
              message: "Item not found in cart",
            });
          }
    
          if (existingItem.quantity > 1) {
            existingItem.quantity--;
          }
          else if (existingItem.quantity === 1) {
            user.cart.items = user.cart.items.filter((item) => item.productId !== productId);
          }
    
          user.cart.items.filter((item) => item.productId !== productId);
    
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
          user.cart.subtotal = toDecimal(0);
          user.cart.discount = toDecimal(0);
          user.cart.count = 0;
          user.cart.percentage = 0;
          user.cart.code = "";
    
          await user.save();
          res.status(200).json({
            message: "Cart cleared",
          });
        } catch (err) {
          next(err);
        }
      },
}

export default cartController;

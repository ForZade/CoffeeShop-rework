import { NextFunction, Request, Response } from "express";
import User, { UserInterface } from "../models/userModel";
import Product, { ProductInterface } from "../models/productModel";
import { TokenInterface, verifyToken } from "../utils/token";
import toDecimal, { addDecimals, divideDecimals, multiplyDecimals, subtractDecimals } from "../utils/toDecimal";
import { sendContactEmail } from "../utils/email";
import mongoose from "mongoose";
import Discount, { DiscountInterface } from "../models/discountModel";
import { generateDiscountCode } from "../utils/idgen"; // r stands for random

// Delete after review (discounts task) -> Discount system will be on line (398)-(484)
// Delete after review (discounts task) -> Discount system will be on line (398)-(484)
// Delete after review (discounts task) -> Discount system will be on line (398)-(484)
// Delete after review (discounts task) -> IMPORTS ON LINE 8, 9
// Delete after review (discounts task) -> READ COMMENTS DROPPED ON LINE 406, 410, 411
/* Delete after review (discounts task) -> CHECK VALIDATOR OF DISCOUNT */ import { DISCOUNT_VALIDATOR } from "../validations/discountValidator" // <- i left easy access, this is useless import
// Delete after review (discounts task)-> LUKAI BLET

// Delete after review (patchUser task) -> patchUser system will be on lie (72 - 94)

interface CartTotalInterface {
  total: mongoose.Types.Decimal128;
  subtotal: mongoose.Types.Decimal128;
  discount: mongoose.Types.Decimal128;
  percentage: number;
}

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
  getUser: async (req: Request, res: Response, next: NextFunction) => {
    const param: string | number = req.params.identifier;
    let user: UserInterface;

    try {
      if (param.includes("@")) {
        user = await User.findOne({ email: param });
      }
      else {
        user = await User.findOne({ id: param });
      }

      if (!user) {
        return res.status(404).json({
          status: "error",
          message: "User not found",
        });
      }

      res.status(200).json({
        status: "success",
        message: "User retrieved successfully",
        data: user,
      });
    } catch (err: unknown) {
      next(err);
    }
  },

  updateUser: async (req: Request, res: Response, next: NextFunction) => {
    const token:string = req.cookies.jwt; 
    const body = req.body;
    try {
      const decoded = verifyToken(token);
      
      if(body.password){
        return res.status(400).json({
          status: "error",
          message: "You cannot change your password using this route",
        })
      }

      const user: UserInterface = await User.findOneAndUpdate({ id: decoded.id }, body);
      
      res.status(200).json({
        status: "success",
        message: "User updated successfully",
        data: body, 
      })
      }
    catch (err: unknown) {
      next(err);
    }
  },
  
  addAdmin: async (req: Request, res: Response, next: NextFunction) => {
    const params: string | number = req.params.identifier;

    try {
      let user: UserInterface;

      if (params.includes("@")) {
        user = await User.findOne({ email: params });
      } else {
        user = await User.findOne({ id: params });
      }

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (!user.roles.includes("User")) {
        return res.status(400).json({
          message: "User is not verified",
        });
      }

      if (user.roles.includes("Admin")) {
        return res.status(400).json({
          message: "User is already an admin",
        });
      }

      user.roles.push("Admin");
      await user.save();

      res.status(200).json({
        message: "User added to administrator role successfully"
      });
    } catch (err) {
      next(err);
    }
  },

  removeAdmin: async (req: Request, res: Response, next: NextFunction) => {
    const params: string | number = req.params.identifier;

    try {
      let user: UserInterface;

      if (params.includes("@")) {
        user = await User.findOne({ email: params });
      } else {
        user = await User.findOne({ id: params });
      }

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (!user.roles.includes("Admin")) {
        return res.status(400).json({
          message: "User is not an admin",
        });
      }

      if (!user.roles.includes("User")) {
        return res.status(400).json({
          message: "User is not verified",
        });
      }

      user.roles = user.roles.filter((role: string) => role !== "Admin");
      await user.save();

      res.json({
        message: "User removed from administrator role successfully",
      });
    } catch (err) {
      next(err);
    }
  },

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
        existingItem.total = addDecimals(existingItem.total, product.price);
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
        existingItem.total = subtractDecimals(existingItem.total, product.price);
      }
      else if (existingItem.quantity === 1) {
        user.cart.items = user.cart.items.filter((item) => item.productId !== productId);
      }

      user.cart.items.filter((item) => item.productId !== productId);
      user.cart.total = subtractDecimals(user.cart.total, product.price);

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

  contact: async (req: Request, res: Response, next: NextFunction) => {
    const token: string = req.cookies.jwt;
    const { subject, message } = req.body;
    try {
      let email: string;
      let decoded: TokenInterface = {} as TokenInterface;

      if(!token){
        email = req.body.email;
      }
      else {
        decoded = verifyToken(token);
        email = decoded.email;
      }

      if (!email || !subject || !message) {
        return res.status(400).json({
          message: "All fields are required",
        });
      }

      await sendContactEmail(email, subject, message);

      res.status(200).json({
        message: "Succesfull",
      });
    } catch (err: unknown) {
      next(err);
    }
  },
  getAdmins: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users: UserInterface[] = await User.find({
        roles: { $in: ["Admin"] }
      });

      console.log(typeof users);
    
      if(!users.length) {
        return res.status(400).json({
          message: "No admins found",
        });
      }
      
      res.status(200).json({
        status: "success",
        message: "All Admins successfully retrieved",
        data: users,
      });
    } catch (err: unknown) {
      next(err);
    }
  },

  addDiscount: async (req: Request, res: Response, next: NextFunction) => {
    let code: any = req.body.code
    let {percentage, expires} = req.body;

    try{
      if(!code){
        code = (await generateDiscountCode()).toString();
      }

      const existingCode = await Discount.findOne({ code });

      if(existingCode) {
        return res.status(400).json({
          status: "Discount code already in Use",
        });
      }

      if(!percentage){
        return res.status(400).json({
          status: "Discount percentage is required",
        });
      }

      if(!expires){
        expires = new Date(Date.now() + 7 *24 * 60 * 60 * 1000);
      }

      const discount = new Discount({
        code: code.toUpperCase(),
        percentage,
        expires,
      });

      await discount.save();
      res.status(200).json({
        status: "Discount added successfully",
        discount: discount
      });
    }
    catch (err: unknown) {
      next(err);
    }
  },
  deleteDiscount: async (req: Request, res: Response, next: NextFunction) => {
    const code = req.params.code.toUpperCase()

    try{
      const discount = await Discount.deleteOne({ code });

      if(discount.deletedCount === 0) {
        return res.status(400).json({
          status: "Discount code not found",
        });
      }
      res.status(200).json({
        status: "Discount code deleted successfully",
      });
    }
    catch (err: unknown) {
      next(err);
    }
  },
  editDiscount: async (req: Request, res: Response, next: NextFunction) => {
    const code = req.params.code.toUpperCase()
    const {new_code, percentage, expires} = req.body;

    try{
      const discount = await Discount.findOne({ code });

      if (!discount) {
        return res.status(400).json({
          status: "Discount code not found",
        });
      }

      if(new_code){
        discount.code = new_code.toUpperCase();
      }
      if(percentage){
        discount.percentage = percentage;
      }
      if(expires){
        discount.expires = expires;
      }

      await discount.save();

      res.status(200).json({
        status: "success",
        discount: discount
      });
  }
    catch (err: unknown) {
      next(err);
    }
  },
  getDiscountCodes: async function ( _req: Request, res: Response, next: NextFunction) {
    try {
      const discounts: DiscountInterface[] = await Discount.find({});

      if(!discounts) {
        return res.status(400).json({
          status: "No discounts found",
        });
      }

      res.status(200).json({
        message: "All discounts successfully retrieved",
        discounts: discounts,
      });
    } catch (err: unknown) {
      next(err);
    }
  },

  checkDiscount: async (req: Request, res: Response, next: NextFunction) => {
    const discountCode = req.params.code.toUpperCase();

    try {
      const discount = await Discount.findOne({ code: discountCode });
      if(!discount) {
        return res.status(400).json({
          status: "Discount code not found",
        });
      }
      res.status(200).json({
        status: "Discount code exists!",
        discounts: discount
      });
    }
    catch (err: unknown) {
      next(err);
    }
  }
};

export default userControllers;

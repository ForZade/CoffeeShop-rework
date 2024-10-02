import { NextFunction, Request, Response } from "express";
import Users, { UserInterface } from "../models/userModel";

import Product, { ProductInterface } from "../models/productModel";
import { verifyToken } from "../utils/token";

const userControllers = {
  getUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await Users.find();
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
      const getUserId = await Users.findOne({ id: parseInt(req.params.id) });

      if (!getUserId) {
        return res.status(404).json({
          status: "error",
          message: "User ID not found",
        });
      }

      res.status(200).json({
        status: "success",
        message: "User retrieved by ID successfully",
        data: getUserId,
      });
    } catch (err: unknown) {
      next(err);
    }
  },
  getUserByEmail: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getUserEmail = await Users.findOne({ email: req.params.email });

      if (!getUserEmail) {
        return res.status(404).json({
          status: "error",
          message: "User email not found",
        });
      }

      res.status(200).json({
        status: "success",
        message: "User retrieved by email successfully",
        data: getUserEmail,
      });
    } catch (err: unknown) {
      next(err);
    }
  },

};

export default userControllers;

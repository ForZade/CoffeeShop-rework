import { NextFunction, Request, Response } from "express";
import User, { UserInterface } from "../models/userModel";

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
  
  addAdmin: async (req: Request, res: Response, next: NextFunction) => {
    const { identifier }: { identifier: string } = req.body;

    try {
      let user: UserInterface;

      if (identifier.includes("@")) {
        user = await User.findOne({ email: identifier });
      } else {
        user = await User.findOne({ id: identifier });
      }

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (!user.isVerified) {
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
    const { identifier }: { identifier: string } = req.body;

    try {
      let user: UserInterface;

      if (identifier.includes("@")) {
        user = await User.findOne({ email: identifier });
      } else {
        user = await User.findOne({ id: identifier });
      }

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (!user.roles.includes("Admin")) {
        return res.status(400).json({
          message: "User is not an admin",
        });
      }

      if (user.isVerified === false) {
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
};

export default userControllers;

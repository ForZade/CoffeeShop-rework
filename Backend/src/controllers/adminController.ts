import { NextFunction, Request, Response } from "express";
import User, { UserInterface } from "../models/userModel";

const adminController = {
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

export default adminController;

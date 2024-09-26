import express, { Request, Response, NextFunction } from "express";
import User from "../../models/userModel"; 
import mongoose from "mongoose";

const router = express.Router();

// Middleware to check if the user is an administrator
const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !('admin' in req.user) || !req.user.admin) {
      return res.status(403).json({ error: "Only administrators can access this route" });
    }
    next();
  };

// POST /admin/ route to promote a user to administrator
router.post("/admin", isAdmin, async (req: Request, res: Response) => {
  try {
    console.log("1");
    const { identifier } = req.body; // 123456 ; hello@mail.com

    let user;

    if (identifier.includes("@")) {
      user = await User.findOne({ email: identifier });
    } else {
      user = await User.findOne({ id: identifier });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.isAdmin = true;
    await user.save();

    res.json({ message: "User promoted to administrator successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE /admin/ route to remove a user from administrator role
router.delete("/admin", isAdmin, async (req: Request, res: Response) => {
  try {
    const { identifier } = req.body; // 123456 ; hello@mail.com

    let user;

    if (identifier.includes("@")) {
      user = await User.findOne({ email: identifier });
    } else {
      user = await User.findOne({ id: identifier });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.isAdmin = false;
    await user.save();

    res.json({ message: "User removed from administrator role successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
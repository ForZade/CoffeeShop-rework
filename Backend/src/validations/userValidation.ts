import express, { Request, Response } from "express";
import User from "../models/userModel";
import { registerValidation } from "./registerValidation";
const router = express.Router();

//will be deleted in the future potentially

// Route for validating email in the body param
router.post(
  "/register",
  registerValidation,
  async (req: Request, res: Response) => {
    try {
      const { email, password, first_name, last_name, age } = req.body;

      const existingUser = await User.findOne({ email }); // Check if email is already in use

      if (existingUser) {
        return res.status(400).json({
          status: "error",
          message: "Email is already in use",
        });
      }

      // Create a new user after validation???
      const newUser = await User.create({
        email,
        password,
        first_name,
        last_name,
        age,
      });

      res.status(201).json({
        status: "success",
        message: "User registered successfully",
        data: newUser,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
);

export default router;

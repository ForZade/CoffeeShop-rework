import express, { Request, Response } from "express";
import User from "../../models/userModel"; // Importing the User model
import mongoose from "mongoose";

const router = express.Router();

// Middleware to check if the user is an administrator
const checkAdmin = async (req: Request, res: Response, next: any) => {
    

    try {
        const {identifier} = req.body; // 123456 ; hello@mail.com

        let user;

        if (identifier.includes("@")) {
            User.findOne({
                email: identifier
            })
        } else {
            user = await User.findById(identifier);
        }

    } catch (error) {

    }
};

export default router;

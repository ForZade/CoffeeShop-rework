import bcrypt from "bcrypt";
import express, {Request, Response } from "express";
import { generateToken } from "../../utils/token";
import { sendVerificationEmail } from "../../utils/email";
import User from "../../models/userModel";
import { generateUserId } from "../../utils/idgen";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
    try {
        const { first_name, last_name, email, password,  } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        console.log(first_name, last_name, email, password)
        
        const id = await generateUserId();
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            id,
            first_name,
            last_name,
            email,
            password: hashedPassword
        });

        newUser.save();

        const token = await generateToken(email);
        await sendVerificationEmail(email, token);

        res.status(200).json({
            message: "Registration successful. Please verify your email."
        });
    }
    catch (err: any) {
        console.log(err);
    }
})

export default router;
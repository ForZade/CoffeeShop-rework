import express, { Request, Response } from "express";

import User from "../../models/userModel";
import { generateResetToken } from "../../utils/token";
import { sendPasswordResetEmail } from "../../utils/email";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if(!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const token = await generateResetToken(email, user.id);
        sendPasswordResetEmail(email, token);

        res.status(200).json({
            message: "Password reset email sent"
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Internal server error",
            error: err
        })
    }
})

export default router;
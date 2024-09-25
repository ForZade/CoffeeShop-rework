import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import { verifyResetToken } from "../../utils/token";
import User from "../../models/userModel";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
    const { token, password } = req.body;

    try {
        const decoded: any = await verifyResetToken(token);

        const user = await User.findOne({ email: decoded.email });

        if(!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        await user.save();

        res.status(200).json({
            message: "Password reset successful"
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Internal server error",
            error: err
        })
    }
});

export default router;
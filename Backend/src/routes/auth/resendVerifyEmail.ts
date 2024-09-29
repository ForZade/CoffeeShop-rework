import express, { Request, Response } from "express";
import { generateToken } from "../../utils/token";
import { sendVerificationEmail } from "../../utils/email";
import User from "../../models/userModel";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        message: "Email is already verified",
      });
    }

    const token = await generateToken(email, user.id, user.roles);
    await sendVerificationEmail(email, token);

    res.status(200).json({
      message: "Verification email sent",
    });
  } catch (err: unknown) {
    console.log(err);
  }
});

export default router;

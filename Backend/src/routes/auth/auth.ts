import express from "express";

// Routes
import registerRoute from "./register";
import verifyEmailRoute from "./verifyEmail";
import resendVerifyRoute from "./resendVerifyEmail"

const router = express.Router();

router.use("/register", registerRoute);
router.use("/verify-email", verifyEmailRoute);
router.use("/resend-verify", resendVerifyRoute);

export default router;
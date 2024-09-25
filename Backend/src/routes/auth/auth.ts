import express from "express";

// Routes
import registerRoute from "./register";
import verifyEmailRoute from "./verifyEmail";
import resendVerifyRoute from "./resendVerifyEmail";
import requestPasswordResetRoute from "./requestPasswordReset";
import passwordResetRoute from "./passwordReset";

const router = express.Router();

router.use("/register", registerRoute);
router.use("/verify-email", verifyEmailRoute);
router.use("/resend-verify", resendVerifyRoute);
router.use("/request-password-reset", requestPasswordResetRoute);
router.use("/password-reset", passwordResetRoute);

export default router;
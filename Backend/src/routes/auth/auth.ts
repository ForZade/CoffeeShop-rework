import express from "express";
import authControllers from "../../controllers/authControllers";

const router = express.Router();

router.post("/register", authControllers.register);
router.post("/verify-email", authControllers.verifyEmail);
router.post("/resend-verify", authControllers.resendVerifyEmail);
router.post("/request-password-reset", authControllers.requestPasswordReset);
router.post("/password-reset", authControllers.passwordReset);

export default router;

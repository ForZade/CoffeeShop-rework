import express from "express";
import authControllers from "../../controllers/authControllers";
import requireAuth from "../../middlewares/authMiddleware";
import authValidator from "../../validations/authValidator";
import rateLimiters from "../../middlewares/rateLimiters";

const router = express.Router();

router.post("/register", authValidator.register, authControllers.register);
router.post("/login", authValidator.login, authControllers.login);
router.post("/verify-email", authControllers.verifyEmail);
router.post("/resend-verify", rateLimiters.resendVerificationLimiter, authControllers.resendVerifyEmail);
router.post("/request-password-reset", rateLimiters.requestPasswordLimiter, authControllers.requestPasswordReset);
router.post("/password-reset", authControllers.passwordReset);
router.post("/change-password", requireAuth, requireAuth, authControllers.changePassword);

export default router;

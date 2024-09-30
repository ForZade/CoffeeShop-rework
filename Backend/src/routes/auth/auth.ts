import express from "express";
import authControllers from "../../controllers/authControllers";
import requireAuth from "../../middlewares/authMiddleware";

const router = express.Router();

router.post("/register", authControllers.register);
router.post("/login", authControllers.login);
router.post("/verify-email", authControllers.verifyEmail);
router.post("/resend-verify", authControllers.resendVerifyEmail);
router.post("/request-password-reset", authControllers.requestPasswordReset);
router.post("/password-reset", authControllers.passwordReset);
router.post("/change-password", requireAuth, authControllers.changePassword);

export default router;

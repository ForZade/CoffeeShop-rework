import express from "express";

// Routes
import registerRoute from "./register";
import verifyEmailRoute from "./verifyEmail";

const router = express.Router();

router.use("/register", registerRoute);
router.use("/verify-email", verifyEmailRoute);

export default router;
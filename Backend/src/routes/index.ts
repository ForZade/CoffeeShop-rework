import express from "express";

// Routes
import authRoutes from "./auth/auth";
import userRouter from "./users/users";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRouter);

export default router;
import express from "express";

// Routes
import authRoutes from "./auth/auth";

const router = express.Router();

router.use("/auth", authRoutes);

export default router;
import express from "express";

// Routes
import authRoutes from "./auth/auth";
import userRoutes from "./users/users";
import adminRoutes from "./admin/admins";
 
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/admin", adminRoutes);

export default router;
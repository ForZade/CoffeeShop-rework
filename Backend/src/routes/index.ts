import express from "express";

// Routes
import authRoutes from "./auth/auth";
import userRoutes from "./users/users";
import adminRoutes from "./admin/admins";
import cartRoutes from "./cart/cart";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/admin", adminRoutes);
router.use("/cart", cartRoutes);

export default router;

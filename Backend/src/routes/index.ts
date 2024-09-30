import express from "express";

// Routes
import authRoutes from "./auth/auth";
import userRoutes from "./users/users";
import adminRoutes from "./admin/admins";
import transactionsRoutes from "./transactions/transactions";
import productRoutes from "./product/products";
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/admin", adminRoutes);
// Recently added, testing required ▼
router.use("/products", productRoutes);
router.use("/transactions", transactionsRoutes);

export default router;

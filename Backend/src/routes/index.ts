import express from "express";

// Routes
import authRoutes from "./auth/auth";
import userRoutes from "./users/users";
import transactionsRoutes from "./transactions/transactions";
import productRoutes from "./product/products";
import cartRoutes from "./cart/cart";

const router = express.Router();

router.use("/cart", cartRoutes);
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/transactions", transactionsRoutes);

export default router;

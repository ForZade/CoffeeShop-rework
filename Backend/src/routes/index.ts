import express from "express";

// Routes
import authRoutes from "./auth/auth";
import userRoutes from "./users/users";
import transactionsRoutes from "./transactions/transactions";
import productRoutes from "./product/products";
import requireAuth from "../middlewares/authMiddleware";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/", requireAuth, transactionsRoutes); // Transactions / Purchase

export default router;

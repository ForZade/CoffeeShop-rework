import express from "express";

// Routes
import authRoutes from "./auth/auth";
import userRoutes from "./users/users";
import adminRoutes from "./admin/admins";
import validations from "../validations/userValidation";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/admin", adminRoutes);
router.use("/validate", validations);

export default router;

import express from "express";
import adminRoutes from "./admin/admins"; // Import the Admins route file

const router = express.Router();

router.use("/admin" ,adminRoutes); // Use admin-related routes

export default router;

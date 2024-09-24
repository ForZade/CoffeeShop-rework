import express from "express";
import adminRoutes from "./admin/Admins"; // Import the Admins route file

const router = express.Router();

router.use(adminRoutes); // Use admin-related routes

export default router;

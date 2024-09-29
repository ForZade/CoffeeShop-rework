import express, { Request, Response } from "express";
import adminController from "../../controllers/adminController"

const router = express.Router();

router.post("/", adminController.addAdmin);
router.delete("/", adminController.removeAdmin);

export default router;
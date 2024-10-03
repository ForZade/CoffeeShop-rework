import express from "express";
import reviewControllers from "../../controllers/reviewControllers";
const router = express.Router();

router.post("/", reviewControllers.review);

export default router;

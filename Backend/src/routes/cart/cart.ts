import express from "express";
import cartController from "../../controllers/cartController";
import requireAuth from "../../middlewares/authMiddleware";

const router = express.Router();

router.get("/", requireAuth, cartController.getCart);
router.post("/", requireAuth, cartController.addToCart);
router.delete("/", requireAuth, cartController.removeFromCart);
router.delete("/clear", requireAuth, cartController.clearCart);

export default router;

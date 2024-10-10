import express from "express";
import userControllers from "../../controllers/userControllers";
import { isAdmin } from "../../middlewares/checkRoles";
import requireAuth from "../../middlewares/authMiddleware";

const router = express.Router();

router.get("/", userControllers.getUsers); //retrieves the entire user list
router.get("/:identifier", userControllers.getUser); //retrieves a user by id or email
router.post("/admin/:identifier", isAdmin, userControllers.addAdmin);
router.delete("/admin/:identifier", isAdmin, userControllers.removeAdmin);

router.get("/cart", requireAuth, userControllers.getCart);
router.post("/cart/:productId", requireAuth, userControllers.addToCart);
router.delete("/cart/:productId", requireAuth, userControllers.removeFromCart);
router.delete("/cart/clear", requireAuth, userControllers.clearCart);
router.post("/contact", userControllers.contact);

export default router;

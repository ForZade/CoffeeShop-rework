import express from "express";
import userControllers from "../../controllers/userControllers";
import { isAdmin } from "../../middlewares/checkRoles";
import requireAuth from "../../middlewares/authMiddleware";
import { DISCOUNT_VALIDATOR } from "../../validations/discountValidator";
import "./users.docs";

const router = express.Router();

router.get("/cart", requireAuth, userControllers.getCart);
router.post("/cart/:productId", requireAuth, userControllers.addToCart);
router.delete("/cart/:productId", requireAuth, userControllers.removeFromCart);
router.delete("/cart/clear", requireAuth, userControllers.clearCart);

router.post("/contacts", userControllers.contact);

router.post("/admins/:identifier", isAdmin, userControllers.addAdmin);
router.delete("/admins/:identifier", isAdmin, userControllers.removeAdmin);
router.get(`/admins`, isAdmin, userControllers.getAdmins);// Untested, dont have cookie - Jaunius

router.get(`/discounts`,isAdmin, userControllers.getDiscountCodes);
router.post(`/discounts`, isAdmin , DISCOUNT_VALIDATOR, userControllers.addDiscount);
router.delete(`/discounts/:code`, isAdmin , userControllers.deleteDiscount);
router.patch(`/discounts/:code`, isAdmin, DISCOUNT_VALIDATOR, userControllers.editDiscount);
router.get(`/discounts/:code`, requireAuth, userControllers.checkDiscount);

router.get("/", userControllers.getUsers);
router.get("/:identifier", userControllers.getUser);
router.patch("/:identifier", requireAuth, userControllers.updateUser);

export default router;

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

router.post("/contact", userControllers.contact);

router.get(`/admin/discounts`,isAdmin, userControllers.getDiscountCodes);
router.post("/admin/:identifier", isAdmin, userControllers.addAdmin);
router.delete("/admin/:identifier", isAdmin, userControllers.removeAdmin);
router.get(`/admins`, isAdmin, userControllers.getAdmins);
router.post(`/admin/discount/:code`, isAdmin , DISCOUNT_VALIDATOR, userControllers.addDiscount);
router.delete(`/admin/discount/:code`, isAdmin , userControllers.deleteDiscount);
router.patch(`/admin/discount/:code`, isAdmin, DISCOUNT_VALIDATOR, userControllers.editDiscount);

router.get("/", userControllers.getUsers); //retrieves the entire user list
router.get("/:identifier", userControllers.getUser); //retrieves a user by id or email
router.patch("/:identifier", requireAuth, userControllers.updateUser);



export default router;

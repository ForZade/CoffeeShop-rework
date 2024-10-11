import express from "express";
import productController from "../../controllers/productControllers";
import requireAuth from "../../middlewares/authMiddleware";
import { isAdmin } from "../../middlewares/checkRoles";

const router = express.Router();

router.post("/", productController.createProduct);
router.delete("/", isAdmin, productController.deleteProduct);
router.get("/all", requireAuth, productController.getAllProducts);
router.get("/", requireAuth, productController.getProductById);
router.patch("/", isAdmin, productController.patchProduct);
router.post("/review", requireAuth, productController.review);

export default router;

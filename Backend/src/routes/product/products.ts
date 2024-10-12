import express from "express";
import productController from "../../controllers/productControllers";
import requireAuth from "../../middlewares/authMiddleware";
import { isAdmin } from "../../middlewares/checkRoles";

const router = express.Router();

router.post("/", productController.createProduct);
router.delete("/", isAdmin, productController.deleteProduct);
router.get("/all", productController.getAllProducts);
router.get("/", productController.getProductById);
router.patch("/", isAdmin, productController.patchProduct);
router.post("/review", requireAuth, productController.review);

export default router;

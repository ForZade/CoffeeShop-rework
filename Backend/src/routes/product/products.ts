import express from "express";
import productController from "../../controllers/productControllers";
import requireAuth from "../../middlewares/authMiddleware";
import { isAdmin } from "../../middlewares/checkRoles";
import productValidator from "../../validations/productValidator";
import { imageHandler, uploadMiddleware } from "../../middlewares/imageHandler";
import "./products.docs";

const router = express.Router();

router.post("/", uploadMiddleware, imageHandler, productValidator, productController.createProduct);
router.get("/", productController.getAllProducts);
router.delete("/:id", isAdmin, productController.deleteProduct);
router.get("/id/:id", productController.getProduct);
router.get("/:category", productController.getProductByCategory);
router.patch("/:id", uploadMiddleware, imageHandler, productValidator, isAdmin, productController.patchProduct);
router.post("/review", requireAuth, productController.review);

export default router;

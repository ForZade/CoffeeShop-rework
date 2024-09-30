import express from "express";
import productController from "../../controllers/productControllers";

const router = express.Router();

router.post("/", productController.createProduct);
router.delete("/", productController.deleteProduct);
router.get("/", productController.getAllProducts);
router.get("/product", productController.getProductById);
router.patch("/", productController.patchProduct);

export default router;

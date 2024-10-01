import express from 'express';
import { getCart, addToCart, removeFromCart, clearCart } from '../../controllers/cartController';

const router = express.Router();

// View cart - GET /cart
router.get('/', getCart);

// Add product to cart - POST /cart/add
router.post('/add', addToCart);

// Remove a product from the cart by ID - DELETE /cart/remove/:productId
router.delete('/remove/:productId', removeFromCart);

// Clear all items from the cart - DELETE /cart/clear
router.delete('/clear', clearCart);

export default router;

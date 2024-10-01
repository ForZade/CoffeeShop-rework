import { Request, Response } from 'express';
import { CartInterface, cartItemSchema } from '../models/cartModel';
import { model } from 'mongoose';

const Cart = model('Cart', cartItemSchema);

// Get all items in the user's cart
export const getCart = async (req: Request, res: Response) => {
    try {
        const cart = await Cart.find();
        if (cart.length === 0) {
            return res.status(200).json({ message: 'Your cart is empty.' });
        }
        return res.status(200).json({ cart });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to retrieve cart.', error });
    }
};

// Add a product to the user's cart
export const addToCart = async (req: Request, res: Response) => {
    try {
        const { product, quantity, total } = req.body;

        if (!product || !quantity || !total) {
            return res.status(400).json({ message: 'Product, quantity, and total are required.' });
        }

        const newCartItem = new Cart({
            product,
            quantity,
            total
        });

        await newCartItem.save();
        return res.status(201).json({ message: 'Product added to cart.' });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to add product to cart.', error });
    }
};

// Remove a product from the user's cart
export const removeFromCart = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;

        await Cart.findOneAndDelete({ product: productId });
        return res.status(200).json({ message: 'Product removed from cart.' });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to remove product from cart.', error });
    }
};

// Clear all items in the cart
export const clearCart = async (req: Request, res: Response) => {
    try {
        await Cart.deleteMany({});
        return res.status(200).json({ message: 'Cart cleared successfully.' });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to clear cart.', error });
    }
};


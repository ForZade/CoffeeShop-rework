import { createContext, useContext, useState } from "react";
import axios from "axios";

interface CartDetails {
    total: number | string;
    subtotal: number | string;
    discountAmount: number | string;
    discountPercentage: number;
    count: number;
}

interface CartContextProps {
    cartDetails: CartDetails;
    calculateTotals: () => void;
}

const defaultContextValue: CartContextProps = {
    cartDetails: {
        total: 0,
        subtotal: 0,
        discountAmount: 0,
        discountPercentage: 0,
        count: 0,
    },
    calculateTotals: () => {},
};

export const CartContext = createContext<CartContextProps>(defaultContextValue);

const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartDetails, setCartDetails] = useState<CartDetails>({
        total: 0,
        subtotal: 0,
        discountAmount: 0,
        discountPercentage: 0,
        count: 0,
    });

    const calculateTotals = async () => {
        try {
            const response = await axios.get('http://localhost:7000/api/v1/users/cart', { withCredentials: true });
            const { items, total } = response.data.data;

            const discountAmt = (parseFloat(total.$numberDecimal) * cartDetails.discountPercentage) / 100;
            const finalTotal = parseFloat(total.$numberDecimal) - discountAmt;

            const itemCount = items.reduce((acc: number, item: { quantity: number }) => acc + item.quantity, 0);

            setCartDetails({
                ...cartDetails,
                count: itemCount,
                subtotal: parseFloat(total.$numberDecimal).toFixed(2),
                discountAmount: discountAmt.toFixed(2),
                total: finalTotal.toFixed(2),
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <CartContext.Provider
            value={{
                cartDetails,
                calculateTotals,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };

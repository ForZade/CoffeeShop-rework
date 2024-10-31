import { createContext, useContext, useState } from "react";
import axios from "axios";

interface CartDetails {
    items: {
        productId: number;
        quantity: number;
        price: { $numberDecimal: string };
    }[]
    code: string;
    total: string;
    subtotal: string;
    discount: string;
    percentage: number;
    count: number;
}

interface CartContextProps {
    cart: CartDetails;
    getCart: () => Promise<void>;
}

const defaultContextValue: CartContextProps = {
    cart: {
        items: [],
        code: "",
        total: "0",
        subtotal: "0",
        discount: "0",
        percentage: 0,
        count: 0,
    },
    getCart: async () => {},
};

export const CartContext = createContext<CartContextProps>(defaultContextValue);

const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartDetails>(defaultContextValue.cart);

    const getCart = async () => {
        try {
            const response = await axios.get('http://localhost:7000/api/v1/users/cart', { withCredentials: true });
            setCart({
                ...cart,
                code: response.data.data.code,
                items: response.data.data.items,
                total: response.data.data.total.$numberDecimal,
                subtotal: response.data.data.subtotal.$numberDecimal ,
                discount: response.data.data.discount.$numberDecimal,
                percentage: response.data.data.percentage,
                count: response.data.data.count
            });
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <CartContext.Provider
            value={{
                cart,
                getCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };

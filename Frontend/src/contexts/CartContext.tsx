import { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

interface CartContextProps {
    total: number
    subtotal: number
    discount: number
    percentage: number
    count: number

    setTotal?: () => void
    setSubtotal?: () => void
    setDiscount?: () => void
    setPercentage?: () => void
    setCount?: () => void
}

const defaultContextValue: CartContextProps = {
    total: 0,
    subtotal: 0,
    discount: 0,
    percentage: 0,
    count: 0,

    setTotal: () => {},
    setSubtotal: () => {},
    setDiscount: () => {},
    setPercentage: () => {},
    setCount: () => {},
};

export const CartContext = createContext<CartContextProps>(defaultContextValue);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [count, setCount] = useState<number>(0); // number of items in cart
    const [total, setTotal] = useState<number>(0); // total - total after adjustments
    const [subtotal, setSubtotal] = useState<number>(0); // subtotal - total before adjustments
    const [discount, setDiscount] = useState<number>(0); // discount amount
    const [percentage, setPercentage] = useState<number>(0); // discount percentage

    const cart = {
        get: useCallback(async () => {
            try {
                const response = await axios.get('http://localhost:7000/api/v1/users/cart/total', { withCredentials: true });
                setTotal(response.data.data.total);
                setCount(response.data.data.items.length);
                setSubtotal(response.data.data.total);
                setDiscount(0);
                setPercentage(0);
            }
            catch (err) {
                console.log(err);
            }
        }, []),

        add: useCallback(async (productId: number) => {
            try {
                await axios.post(`http://localhost:7000/api/v1/users/cart/${productId}`, { withCredentials: true });
                cart.get()
            }
            catch (err) {
                console.log(err);
            }
        }, []),

        remove: useCallback(async (productId: number) => {
            try {
                await axios.delete(`http://localhost:7000/api/v1/users/cart/${productId}`, { withCredentials: true });
                cart.get()
            }
            catch (err) {
                console.log(err);
            }
        }, []),

        clear: useCallback(async () => {
            try {
                await axios.delete('http://localhost:7000/api/v1/users/cart/clear', { withCredentials: true });
                setTotal(0);
                setCount(0);
                setSubtotal(0);
                setDiscount(0);
                setPercentage(0);
            }
            catch (err) {
                console.log(err);
            }
        }, []),
    };

    const discounts = {
        add: useCallback(async () => {
            try {
                await axios.post(`http://localhost:7000/api/v1/users/discount/`, {}, { withCredentials: true });
            }
            catch (err) {
                console.log(err);
            }
        }, []),

        remove: useCallback(async () => {
            try {
                await axios.delete(`http://localhost:7000/api/v1/users/discount/`, { withCredentials: true });
            }
            catch (err) {
                console.log(err);
            }
        }, []),

        
    };

    return (
        <CartContext.Provider value={{ total, subtotal, discount, percentage, count }}>
            {children}
        </CartContext.Provider>
    );
};

const useAuth = () => useContext(CartContext);

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };

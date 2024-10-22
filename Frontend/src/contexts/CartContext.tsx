import { createContext, useContext, useState, useCallback } from "react";
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
    cart: {
        get: () => void;
        add: (productId: number) => void;
        remove: (productId: number) => void;
        clear: () => void;
    };
    discounts: {
        add: () => void;
        remove: () => void;
        get: () => Promise<number | undefined>;
        check: (code: string) => void;
    };
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
    cart: {
        get: () => {},
        add: () => {},
        remove: () => {},
        clear: () => {},
    },
    discounts: {
        add: () => {},
        remove: () => {},
        get: async () => undefined,
        check: () => {},
    },
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

    const cart = {
        get: useCallback(async () => {
            try {
                const response = await axios.get('http://localhost:7000/api/v1/users/cart', { withCredentials: true });
                console.log(response.data.data);

                let total: number | string = 0;

                if(response.data.data.total) {
                    total = parseFloat(response.data.data.total.$numberDecimal).toFixed(2)
                }

                const itemCount = response.data.data.items.reduce(
                    (acc: number, item: { quantity: number }) => acc + item.quantity,
                    0
                );

                setCartDetails((prevDetails) => ({
                    ...prevDetails,
                    total,
                    count: itemCount,
                }));
                calculateTotals();

                return response.data.data;
            } catch (err) {
                console.log(err);
            }
        }, []),

        add: useCallback(async (productId: number) => {
            try {
                await axios.post(`http://localhost:7000/api/v1/users/cart/${productId}`, {}, { withCredentials: true });
                calculateTotals();
            } catch (err) {
                console.log(err);
            }
        }, []),

        remove: useCallback(async (productId: number) => {
            try {
                await axios.delete(`http://localhost:7000/api/v1/users/cart/${productId}`, { withCredentials: true });
                calculateTotals();
            } catch (err) {
                console.log(err);
            }
        }, []),

        clear: useCallback(async () => {
            try {
                await axios.delete('http://localhost:7000/api/v1/users/cart/clear', { withCredentials: true });
                setCartDetails({
                    total: 0,
                    subtotal: 0,
                    discountAmount: 0,
                    discountPercentage: 0,
                    count: 0,
                });
            } catch (err) {
                console.log(err);
            }
        }, []),
    };

    const discounts = {
        add: useCallback(async () => {
            try {
                await axios.post('http://localhost:7000/api/v1/users/discounts', {}, { withCredentials: true });
            } catch (err) {
                console.log(err);
            }
        }, []),

        remove: useCallback(async () => {
            try {
                await axios.delete('http://localhost:7000/api/v1/users/discounts', { withCredentials: true });
            } catch (err) {
                console.log(err);
            }
        }, []),

        get: useCallback(async () => {
            try {
                const response = await axios.get('http://localhost:7000/api/v1/users/discounts', { withCredentials: true });
                return response.data.discounts;
            } catch (err) {
                console.log(err);
            }
        }, []),

        check: useCallback(async (code: string) => {
            try {
                const response = await axios.get(`http://localhost:7000/api/v1/users/discounts/${code}`, { withCredentials: true });
                setCartDetails((prevDetails) => ({
                    ...prevDetails,
                    discountPercentage: response.data.discount.percentage,
                }));
                calculateTotals();
            } catch (err) {
                console.log(err);
            }
        }, []),
    };

    return (
        <CartContext.Provider
            value={{
                cartDetails,
                calculateTotals,
                cart,
                discounts,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };

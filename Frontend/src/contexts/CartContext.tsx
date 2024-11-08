// import { createContext, useContext, useState } from "react";
// import axios from "axios";

// interface CartDetails {
//     items: {
//         productId: number;
//         quantity: number;
//         price: { $numberDecimal: string };
//     }[];
//     code: string;
//     total: string;
//     subtotal: string;
//     discount: string;
//     percentage: number;
//     count: number;
// }

// interface CartContextProps {
//     cart: CartDetails;
//     getCart: () => Promise<void>;
//     addItemToCart: (productId: number, quantity: number) => Promise<void>;
// }

// const defaultContextValue: CartContextProps = {
//     cart: {
//         items: [],
//         code: "",
//         total: "0",
//         subtotal: "0",
//         discount: "0",
//         percentage: 0,
//         count: 0,
//     },
//     getCart: async () => {},
//     addItemToCart: async () => {},
// };

// export const CartContext = createContext<CartContextProps>(defaultContextValue);

// const CartProvider = ({ children }: { children: React.ReactNode }) => {
//     const [cart, setCart] = useState<CartDetails>(defaultContextValue.cart);

//     // Fetch cart from API
//     const getCart = async () => {
//         try {
//             const response = await axios.get('http://localhost:7000/api/v1/users/cart', { withCredentials: true });
//             setCart({
//                 ...cart,
//                 code: response.data.data.code,
//                 items: response.data.data.items,
//                 total: response.data.data.total.$numberDecimal,
//                 subtotal: response.data.data.subtotal.$numberDecimal,
//                 discount: response.data.data.discount.$numberDecimal,
//                 percentage: response.data.data.percentage,
//                 count: response.data.data.count,
//             });
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     // Add item to cart and update cart state
//     const addItemToCart = async (productId: number, quantity: number) => {
//         try {
//             const response = await axios.post(
//                 'http://localhost:7000/api/v1/users/cart',
//                 { productId, quantity },
//                 { withCredentials: true }
//             );

//             // Assuming the response returns the updated cart details
//             setCart((prevCart) => ({
//                 ...prevCart,
//                 items: response.data.data.items,
//                 count: response.data.data.count, // Update item count
//                 total: response.data.data.total.$numberDecimal,
//                 subtotal: response.data.data.subtotal.$numberDecimal,
//             }));
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     return (
//         <CartContext.Provider
//             value={{
//                 cart,
//                 getCart,
//                 addItemToCart, // Provide the new function
//             }}
//         >
//             {children}
//         </CartContext.Provider>
//     );
// };

// const useCart = () => useContext(CartContext);

// export { CartProvider, useCart };





// CartContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";

// Define CartDetails type
interface CartDetails {
    items: {
        productId: number;
        quantity: number;
        price: { $numberDecimal: string };
    }[];
    code: string;
    total: string;
    subtotal: string;
    discount: string;
    percentage: number;
    count: number;
}

// Define CartContextProps type
interface CartContextProps {
    cart: CartDetails;
    getCart: () => Promise<void>;
    addItemToCart: (productId: number, quantity: number) => Promise<void>;
    updateItemQuantity: (productId: number, quantity: number) => Promise<void>;
    removeItemFromCart: (productId: number) => Promise<void>;
}

// Default context value
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
    addItemToCart: async () => {},
    updateItemQuantity: async () => {},
    removeItemFromCart: async () => {},
};

// Create CartContext
export const CartContext = createContext<CartContextProps>(defaultContextValue);

// CartProvider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartDetails>(defaultContextValue.cart);

    // Fetch cart from API
    const getCart = async () => {
        try {
            const response = await axios.get("http://localhost:7000/api/v1/users/cart", { withCredentials: true });
            setCart({
                code: response.data.data.code,
                items: response.data.data.items,
                total: response.data.data.total.$numberDecimal,
                subtotal: response.data.data.subtotal.$numberDecimal,
                discount: response.data.data.discount.$numberDecimal,
                percentage: response.data.data.percentage,
                count: response.data.data.count,
            });
        } catch (err) {
            console.log("Error fetching cart:", err);
        }
    };

    // Add item to cart
    const addItemToCart = async (productId: number, quantity: number) => {
        try {
            const response = await axios.post(
                "http://localhost:7000/api/v1/users/cart",
                { productId, quantity },
                { withCredentials: true }
            );
            setCart(response.data.data);
        } catch (err) {
            console.log("Error adding item to cart:", err);
        }
    };

    // Update item quantity
    const updateItemQuantity = async (productId: number, quantity: number) => {
        try {
            const response = await axios.patch(
                `http://localhost:7000/api/v1/users/cart/${productId}`,
                { quantity },
                { withCredentials: true }
            );
            setCart(response.data.data);
        } catch (err) {
            console.log("Error updating item quantity:", err);
        }
    };

    // Remove item from cart
    // const removeItemFromCart = async (productId: number) => {
    //     try {
    //         const response = await axios.delete(`http://localhost:7000/api/v1/users/cart/${productId}`, {
    //             withCredentials: true,
    //         });
    //         setCart(response.data.data);
    //     } catch (err) {
    //         console.log("Error removing item from cart:", err);
    //     }
    // };
    const removeItemFromCart = async (productId: number) => {
        try {
            // Make the DELETE request to remove the item from the cart
            await axios.delete(`http://localhost:7000/api/v1/users/cart/${productId}`, {
                withCredentials: true,
            });
            
            // Reload the cart to reflect the changes
            await getCart(); // This will refresh the cart and update the state with the new cart data
        } catch (err) {
            console.log("Error removing item from cart:", err);
        }
    };
    
    
    

    return (
        <CartContext.Provider
            value={{
                cart,
                getCart,
                addItemToCart,
                updateItemQuantity,
                removeItemFromCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// useCart hook
export const useCart = () => useContext(CartContext);

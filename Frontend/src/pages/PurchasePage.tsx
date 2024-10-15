// import React, { useState } from 'react';

// // Define a type for the cart items
// type CartItem = {
//   id: number;
//   name: string;
//   image: string; // Assuming we will have image URLs
//   quantity: number;
//   price: number; // Price in Euros
// };

// const PurchasePage = () => {
//   // Sample cart items
//   const [cartItems, setCartItems] = useState<CartItem[]>([
//     { id: 1, name: 'Product 1', image: 'link_to_image1', quantity: 1, price: 10 },
//     { id: 2, name: 'Product 2', image: 'link_to_image2', quantity: 2, price: 15 },
//     // ... add more items as needed
//   ]);

//   // State for the discount code, validation message, and discount amount
//   const [discountCode, setDiscountCode] = useState('');
//   const [validCode, setValidCode] = useState(true);
//   const [discountAmount, setDiscountAmount] = useState(0); // New state for discount

//   // Function to calculate the total price
//   const calculateTotalPrice = () => {
//     return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   // Function to handle quantity change
//   const handleQuantityChange = (id: number, newQuantity: number) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id ? { ...item, quantity: newQuantity } : item
//       )
//     );
//   };

//   // Function to remove all items from the cart
//   const clearCart = () => {
//     setCartItems([]);
//     setDiscountCode('');
//     setValidCode(true);
//     setDiscountAmount(0);
//   };

//   // Function to remove an item from the cart
//   const removeItem = (id: number) => {
//     setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
//   };

//   // Function to apply discount code
//   const applyDiscount = () => {
//     // Assuming "SAVE10" gives a 10% discount
//     if (discountCode === 'SAVE10') {
//       setValidCode(true);
//       setDiscountAmount(calculateTotalPrice() * 0.1); // 10% discount
//     } else {
//       setValidCode(false);
//       setDiscountAmount(0); // Reset discount amount if invalid code
//     }
//   };

//   const totalPrice = calculateTotalPrice();
//   const discountedPrice = totalPrice - discountAmount; // Apply discount to total price

//   return (
//     <div className="bg-white shadow-lg rounded-lg p-8 w-full min-h-screen flex">
//       {/* Left Section: Products and Clear Cart */}
//       <div className="w-3/5 pr-4 flex flex-col border rounded-lg bg-white p-6">
//         {/* Product List */}
//         <div className="mb-6 space-y-4 flex-grow flex flex-col">
//           {cartItems.length === 0 ? (
//             <div className="text-center text-gray-500">
//               Your cart is empty. <a href="/products" className="text-blue-500">Continue Shopping</a>
//             </div>
//           ) : (
//             cartItems.map((item) => (
//               <div key={item.id} className="border rounded-lg p-4 flex items-center">
//                 <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-4" />
//                 <div className="flex-grow">
//                   <h3 className="font-semibold">{item.name}</h3>
//                   <div className="flex items-center">
//                     <input
//                       type="number"
//                       value={item.quantity}
//                       min="1"
//                       className="border rounded-lg p-1 w-16 text-center"
//                       onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
//                     />
//                     <span className="ml-4">€{item.price.toFixed(2)} each</span>
//                     <span className="ml-2">Total: €{(item.price * item.quantity).toFixed(2)}</span>
//                   </div>
//                 </div>
//                 <button
//                   className="ml-4 text-red-500"
//                   onClick={() => removeItem(item.id)}
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Total Price */}
//         {cartItems.length > 0 && (
//           <div className="font-bold text-lg mt-4">
//             Total Price: €{totalPrice.toFixed(2)} <br />
//             {discountAmount > 0 && (
//               <span className="text-green-600">
//                 Discount: -€{discountAmount.toFixed(2)}
//               </span>
//             )}
//             <div className="font-bold mt-2">
//               Final Price: €{discountedPrice.toFixed(2)}
//             </div>
//           </div>
//         )}

//         {/* Clear Cart Button */}
//         <div className="flex justify-end">
//           <button
//             className="text-red-500 border border-red-500 rounded-lg py-2 px-4 hover:bg-red-100"
//             onClick={clearCart} // Updated to clear the cart
//           >
//             Clear Cart
//           </button>
//         </div>
//       </div>

//       {/* Right Section: Discount Code and Checkout Button */}
//       <div className="w-2/5 pl-4 flex flex-col">
//         <div className="flex-grow flex flex-col justify-end border rounded-lg p-6 bg-gray-50 space-y-4">
//           {/* Discount Code */}
//           <input
//             type="text"
//             placeholder="Discount code"
//             className={`border rounded-lg p-2 w-full text-center ${!validCode ? 'border-red-500' : ''}`}
//             value={discountCode}
//             onChange={(e) => setDiscountCode(e.target.value)}
//           />
//           <button
//             className="bg-blue-500 text-white rounded-lg py-2 w-full hover:bg-blue-600"
//             onClick={applyDiscount}
//           >
//             Apply Discount
//           </button>
//           {!validCode && <div className="text-red-500 text-center">Invalid discount code</div>}

//           {/* Proceed to Checkout Button */}
//           <button className="bg-green-500 text-white rounded-lg py-2 w-full hover:bg-green-600">
//             Proceed to Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PurchasePage;





// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// // Define a type for the cart items
// type CartItem = {
//   productId: number;
//   name: string;
//   image: string; 
//   quantity: number;
//   price: number; 
// };

// const PurchasePage = () => {
//   // State for the cart items
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [discountCode, setDiscountCode] = useState('');
//   const [validCode, setValidCode] = useState(true);
//   const [totalPrice, setTotalPrice] = useState(0);

//   // Function to fetch cart items from the backend
//   const fetchCartItems = async () => {
//     try {
//       const response = await axios.get('/api/users/cart', { withCredentials: true });
//       setCartItems(response.data.data.items);
//     } catch (error) {
//       console.error('Error fetching cart items:', error);
//     }
//   };

//   // Function to handle quantity change
//   const handleQuantityChange = async (id: number, newQuantity: number) => {// change
//     try {
//       await axios.put(`/api/users/cart/${id}`, { quantity: newQuantity }, { withCredentials: true });//perziureti
//       const updatedItems = cartItems.map(item =>
//         item.productId === id ? { ...item, quantity: newQuantity } : item
//       );
//       setCartItems(updatedItems);
//     } catch (error) {
//       console.error('Error updating quantity:', error);
//     }
//   };

//   // Function to remove an item from the cart
//   const removeItem = async (id: number) => {
//     try {
//       await axios.delete(`/api/users/cart/${id}`, { withCredentials: true });
//       const updatedItems = cartItems.filter(item => item.productId !== id);
//       setCartItems(updatedItems);
//     } catch (error) {
//       console.error('Error removing item:', error);
//     }
//   };

//   // Function to clear the cart
//   const clearCart = async () => {
//     try {
//       await axios.delete('/api/users/cart/clear', { withCredentials: true });
//       setCartItems([]);
//       setTotalPrice(0);
//     } catch (error) {
//       console.error('Error clearing cart:', error);
//     }
//   };

//   // Function to apply a discount code
//   const applyDiscount = async () => {
//     try {
//       const response = await axios.post('/api/users/apply-discount', { code: discountCode }, { withCredentials: true });
//       if (response.data.valid) {
//         setValidCode(true);
//         // Handle the discount logic (if any) here
//       } else {
//         setValidCode(false);
//       }
//     } catch (error) {
//       console.error('Error applying discount code:', error);
//       setValidCode(false);
//     }
//   };

//   // Fetch cart items when the component mounts
//   useEffect(() => {
//     fetchCartItems();
//   }, []);

//   return ( //padaryti reusible components 
//     <div className="bg-white shadow-lg rounded-lg p-8 w-full min-h-screen flex">
//       {/* Left Section: Products and Clear Cart */}
//       <div className="w-3/5 pr-4 flex flex-col border rounded-lg bg-white p-6">
//         {/* Product List */}
//         <div className="mb-6 space-y-4 flex-grow flex flex-col">
//           {cartItems.length === 0 ? (
//             <div className="text-center text-gray-500">
//               Your cart is empty. <a href="/products" className="text-blue-500">Continue Shopping</a>
//             </div>
//           ) : (
//             cartItems.map((item) => (
//               <div key={item.productId} className="border rounded-lg p-4 flex items-center">
//                 <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-4" />
//                 <div className="flex-grow">
//                   <h3 className="font-semibold">{item.name}</h3>
//                   <div className="flex items-center">
//                     <input
//                       type="number"
//                       value={item.quantity}
//                       min="1"
//                       className="border rounded-lg p-1 w-16 text-center"
//                       onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value) || 1)}
//                     />
//                     <span className="ml-4">€{item.price.toFixed(2)} each</span>
//                     <span className="ml-2">Total: €{(item.price * item.quantity).toFixed(2)}</span>
//                   </div>
//                 </div>
//                 <button
//                   className="ml-4 text-red-500"
//                   onClick={() => removeItem(item.productId)}
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Total Price */}
//         {cartItems.length > 0 && (
//           <div className="font-bold text-lg mt-4">
//             Total Price: €{totalPrice.toFixed(2)}
//           </div>
//         )}

//         {/* Clear Cart Button */}
//         <div className="flex justify-end">
//           <button
//             className="text-red-500 border border-red-500 rounded-lg py-2 px-4 hover:bg-red-100"
//             onClick={clearCart}
//           >
//             Clear Cart
//           </button>
//         </div>
//       </div>

//       {/* Right Section: Discount Code and Checkout Button */}
//       <div className="w-2/5 pl-4 flex flex-col">
//         <div className="flex-grow flex flex-col justify-end border rounded-lg p-6 bg-gray-50 space-y-4">
//           {/* Discount Code */}
//           <input
//             type="text"
//             placeholder="Discount code"
//             className={`border rounded-lg p-2 w-full text-center ${!validCode ? 'border-red-500' : ''}`}
//             value={discountCode}
//             onChange={(e) => setDiscountCode(e.target.value)}
//           />
//           <button
//             className="bg-blue-500 text-white rounded-lg py-2 w-full hover:bg-blue-600"
//             onClick={applyDiscount}
//           >
//             Apply Discount
//           </button>
//           {!validCode && <div className="text-red-500 text-center">Invalid discount code</div>}

//           {/* Proceed to Checkout Button */}
//           <button className="bg-green-500 text-white rounded-lg py-2 w-full hover:bg-green-600">
//             Proceed to Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PurchasePage;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth hook
import CartItemComponent from '../components/PurchasePage/CartItemComponent'; // Import the CartItemComponent
import CartSummary from '../components/PurchasePage/CartSummary'; // Import the CartSummary

// Define and export the CartItem type
export type CartItem = {
  productId: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
};

const PurchasePage = () => {
  const { checkAuth, auth } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [discountCode, setDiscountCode] = useState('');
  const [validCode, setValidCode] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0); // State to store the discount amount

  useEffect(() => {
    const authenticateUser = async () => {
      checkAuth?.(); // Check if user is authenticated
      if (!auth) {
        window.location.href = '/'; // Redirect to main page if not authenticated
      } else {
        fetchCartItems(); // Fetch cart items only if authenticated
      }
    };
    
    authenticateUser(); // Call the authentication function
  }, [checkAuth, auth]);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('/api/users/cart', { withCredentials: true });
      setCartItems(response.data.data.items);
      calculateTotalPrice(response.data.data.items);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const handleQuantityChange = async (id: number, newQuantity: number) => {
    try {
      await axios.put(`/api/users/cart/${id}`, { quantity: newQuantity }, { withCredentials: true });

      fetchCartItems(); 
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeItem = async (id: number) => {
    try {
      await axios.delete(`/api/users/cart/${id}`, { withCredentials: true });
      const updatedItems = cartItems.filter(item => item.productId !== id);
      setCartItems(updatedItems);
      calculateTotalPrice(updatedItems);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete('/api/users/cart/clear', { withCredentials: true });
      setCartItems([]);
      setTotalPrice(0);
      setDiscountAmount(0); // Reset the discount amount when cart is cleared
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const applyDiscount = async () => {
    try {
      const response = await axios.post('/api/users/apply-discount', { code: discountCode }, { withCredentials: true });
      if (response.data.valid) {
        setValidCode(true);
        setDiscountAmount(response.data.discountAmount); // Set discount amount from the server response
      } else {
        setValidCode(false);
      }
    } catch (error) {
      console.error('Error applying discount code:', error);
      setValidCode(false);
    }
  };

  const calculateTotalPrice = (items: CartItem[]) => {
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  // useEffect(() => {
  //   fetchCartItems();
  // }, []);

  // Calculate final total after discount
  const finalTotal = totalPrice - discountAmount;

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 w-full min-h-screen flex">
      {/* Left Section: Products and Clear Cart */}
      <div className="w-3/5 pr-4 flex flex-col border rounded-lg bg-white p-6">
        <div className="mb-6 space-y-4 flex-grow flex flex-col">
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-500">
              Your cart is empty. <a href="/products" className="text-blue-500">Continue Shopping</a>
            </div>
          ) : (
            cartItems.map(item => (
              <CartItemComponent
                key={item.productId}
                item={item}
                handleQuantityChange={handleQuantityChange}
                removeItem={removeItem}
              />
            ))
          )}
        </div>

        {/* Clear Cart Button */}
        <div className="flex justify-end">
          <button
            className="text-red-500 border border-red-500 rounded-lg py-2 px-4 hover:bg-red-100"
            onClick={clearCart}
          >
            Clear Cart
          </button>
        </div>
      </div>

      {/* Right Section: Discount Code and Checkout */}
      <CartSummary
        discountCode={discountCode}
        setDiscountCode={setDiscountCode}
        applyDiscount={applyDiscount}
        validCode={validCode}
        totalPrice={totalPrice}
        discountAmount={discountAmount} // Pass the discount amount to CartSummary
        finalTotal={finalTotal.toFixed(2)} // Pass the final total to CartSummary
      />
    </div>
  );
};

export default PurchasePage;

import { useEffect, useState } from "react"
import { useCart } from "../contexts/CartContext"
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import CartItem, { CartItemProps }from "../components/Cart/CartItem";

export default function PurchasePage() {
  const { cartDetails } = useCart();
  const { checkAuth } = useAuth();
  // const [items, setItems] = useState(undefined);
  const [items, setItems] = useState<CartItemProps[]>([]); // Initialize as an empty array


  useEffect(() => {
    const loadPage = async () => {
      try {
        await checkAuth();
        const response = await axios.get('http://localhost:7000/api/v1/users/cart', { withCredentials: true });
        setItems(response.data.data.items);
      }
      catch (error) {
        console.error('Error:', error);
      }
    }

    loadPage();
  }, [])

  return (
    <div className="flex space-x-8 p-8 h-full">
      {/* Left Section (Cart Items) */}
      <div className="w-3/5 h-full p-4 border rounded-lg bg-white shadow flex flex-col">
        <h2 className="text-xl font-semibold mb-4">Your Cart Items</h2>
        <div className="flex-grow space-y-4 overflow-auto">
          {items.length > 0 ? (
            items.map((item: CartItemProps) => (
              <CartItem
                key={item.id}
                productName={item.productName}
                productImage={item.productImage}
                quantity={item.quantity}
                pricePerItem={item.price?.$numberDecimal ? parseFloat(item.price.$numberDecimal) : 0}
                totalPrice={item.totalPrice?.$numberDecimal ? parseFloat(item.totalPrice.$numberDecimal) : 0}
              />
            ))
          ) : (
            <p>No items in the cart</p>
          )}
        </div>
        <button className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 w-full">
          Clear Cart
        </button>
      </div>

      {/* Right Section (Cart Summary) */}
      <div className="w-2/5 h-full p-4 border rounded-lg bg-gray-50 shadow flex flex-col">
        <h2 className="text-xl font-semibold mb-4">Summary</h2>
        <div className="space-y-2 flex-grow">
          <div className="flex justify-between">
            <p>Subtotal:</p>
            <p>€{cartDetails.subtotal}</p>
          </div>
          <div className="flex justify-between">
            <p>Discount:</p>
            <p>-€{cartDetails.discountAmount}</p>
          </div>
          <div className="flex justify-between font-bold">
            <p>Total:</p>
            <p>€{cartDetails.total}</p>
          </div>
          <div className="flex justify-between">
            <p>Discount Percentage:</p>
            <p>{cartDetails.discountPercentage}%</p>
          </div>
          <div className="flex justify-between">
            <p>Item Count:</p>
            <p>{cartDetails.count}</p>
          </div>
        </div>

        {/* Discount Code Input */}
        <div className="mt-6">
          <input
            type="text"
            placeholder="Discount code"
            className="border rounded-lg p-2 w-full text-center"
          />
          <button className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 w-full">
            Apply Discount
          </button>
        </div>

        {/* Proceed to Checkout Button */}
        <button className="mt-6 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 w-full">
          Next
        </button>
      </div>
    </div>
  );
}


//     <div>
//       <h1>Total: {cartDetails.total}</h1>  /
//       <h1>Subtotal: {cartDetails.subtotal}</h1>   /
//       <h1>Discount: {cartDetails.discountAmount}</h1> /
//       <h1>Discount Percentage: {cartDetails.discountPercentage}</h1>
//       <h1>Count: {cartDetails.count}</h1>
//     </div>
//   )
// }
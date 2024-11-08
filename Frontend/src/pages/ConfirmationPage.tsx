import { useLocation, Link } from "react-router-dom";
import CartItem from "../components/Cart/CartItem";

export default function ConfirmationPage() {
  const location = useLocation();
  const { orderNumber, cartItems, total, shippingCost } = location.state || {}; // Accessing passed data

  return (
    <div className="flex flex-col items-center p-8 h-full bg-slate-200 dark:bg-zinc-800 dark:text-white shadow">
      <h1 className="text-2xl font-bold mb-4">Order Confirmation</h1>
      <p className="mb-6">Thank you for your purchase! Your order has been successfully placed.</p>

      {/* Display order number */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Order Number:</h2>
        <p>{orderNumber}</p>
      </div>

      {/* Display order summary */}
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      <div className="w-full max-w-lg space-y-4">
        {cartItems.map((item: any) => (
          <CartItem
            key={item.productId}
            productId={item.productId}
            quantity={item.quantity}
            pricePerItem={parseFloat(item.total.$numberDecimal)}
            totalPrice={parseFloat(item.total.$numberDecimal) * item.quantity}
          />
        ))}
      </div>

      {/* Total and shipping summary */}
      <div className="mt-6 w-full max-w-lg">
        <div className="flex justify-between mb-2">
          <p>Shipping Cost:</p>
          <p>{shippingCost}€</p>
        </div>
        <div className="flex justify-between font-bold">
          <p>Total:</p>
          <p>{total}€</p>
        </div>
      </div>

      {/* Navigation back to products */}
      <Link to="/products" className="mt-8 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
        Continue Shopping
      </Link>
    </div>
  );
}

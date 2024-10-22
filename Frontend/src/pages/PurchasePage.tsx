import { useEffect } from "react"
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

export default function PurchasePage() { 
  const { checkAuth } = useAuth();
  const { getCart, cart } = useCart();

  useEffect(() => {
    const loadPage = async () => {
      try {
        await checkAuth();
        await getCart();
      }
      catch (error) {
        console.error('Error:', error);
      }
    }

    loadPage();
  }, [])

  return (
    <div>
      <h1>Total: {cart.total}</h1>
      <h1>Subtotal: {cart.subtotal}</h1>
      <h1>Discount: {cart.discount}</h1>
      <h1>Discount Percentage: {cart.percentage}</h1>
      <h1>Count: {cart.count}</h1>
    </div>
  )
}
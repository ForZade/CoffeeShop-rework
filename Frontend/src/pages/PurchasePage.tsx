import { useEffect, useState } from "react"
import { useCart } from "../contexts/CartContext"
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

export default function PurchasePage() {
  const { cartDetails } = useCart();
  const { checkAuth } = useAuth();
  const [items, setItems] = useState(undefined);

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
    <div>
      <h1>Total: {cart.total}</h1>
      <h1>Subtotal: {cart.subtotal}</h1>
      <h1>Discount: {cart.discount}</h1>
      <h1>Discount Percentage: {cart.percentage}</h1>
      <h1>Count: {cart.count}</h1>
    </div>
  )
}
import { useEffect, useState } from "react"
import { useCart } from "../contexts/CartContext"
import { useAuth } from "../contexts/AuthContext";

export default function PurchasePage() {
  const { cartDetails, cart, discounts} = useCart();
  const { checkAuth } = useAuth();
  const [ items, setItems ] = useState(undefined);

  const loadPage = async () => {
    try {
      await checkAuth();
      const newCart = cart.get();
      setItems(newCart);
    }
    catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    loadPage();
  }, [])

  return (
    <div>
      <h1>Total: {cartDetails.total}</h1>
      <h1>Subtotal: {cartDetails.subtotal}</h1>
      <h1>Discount: {cartDetails.discountAmount}</h1>
      <h1>Discount Percentage: {cartDetails.discountPercentage}</h1>
      <h1>Count: {cartDetails.count}</h1>
    </div>
  )
}
import axios from "axios";
import { useCart } from "../../contexts/CartContext";

export default function AddToCart({productId}: {productId: number}) {
    const { getCart } = useCart();

    const addToCart = async (event: React.MouseEvent<HTMLButtonElement>) => {
        try {
            event.preventDefault();
            event.stopPropagation();
            console.log("clicked", productId);
            await axios.post(`http://localhost:7000/api/v1/users/cart/${productId}`, {}, {withCredentials: true});
            await getCart();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <button className="bg-blue-500 text-white rounded-lg py-2 w-full hover:bg-blue-600" onClick={addToCart}>
          Add to Cart
        </button>
    )
}
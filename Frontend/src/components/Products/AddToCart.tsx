import axios from "axios";

export default function AddToCart({productId}: {productId: number}) {
   
    const addToCart = async () => {
        try {
            await axios.post("http://localhost:7000/api/v1/cart", {productId}, {withCredentials: true});
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <h1 className="text-xl font-bold bg-green-500 h-9 w-48 rounded-2xl flex justify-center items-center" onClick={addToCart}>
            ADD TO CART
        </h1>
    )
}
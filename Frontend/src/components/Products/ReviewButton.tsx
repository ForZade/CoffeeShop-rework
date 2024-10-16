import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { useState, useEffect } from "react";
interface ReviewProps {
    liked: number
    productId: number
}
export default function ReviewButton({ liked, productId }: ReviewProps) {
    
    const [patiktukas, setPatiktukas] = useState(liked);
    const { auth } = useAuth();

    async function postReview(event: React.MouseEvent<HTMLButtonElement>) {
        try {
        event.stopPropagation();
          await axios.post("http://localhost:7000/api/v1/products/review", { productId } ,{
            withCredentials: true,
          });
          setPatiktukas(patiktukas + 1);
          console.log("Review successful");
        } catch (err) {
          console.log(err);
        }
      }
      useEffect(() => {
        setPatiktukas(liked);
      }, [liked]);

    return (
        auth && (
            <button className="w-5 h-5 bg-yellow-300 flex justify-center hover:bg-blue-700 cursor-pointer" onClick={postReview}>
              {patiktukas}
            </button>
        )
    );
}
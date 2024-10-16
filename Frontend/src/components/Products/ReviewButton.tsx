import React, { useState } from "react";
import axios from "axios";

export default function AddToCart() {
    
      const [Liked, setLiked] = useState(product.liked);    
    
    async function postReview() {
        try {
          const reviewStatus = await axios.post("http://localhost:7000/api/v1/products/review", {
            withCredentials: true,
          });
        } catch (err) {
          console.log(err);
        } finally {
        }
      }
    
    return (
        <div className="w-5 h-5 bg-yellow-300 flex justify-center hover:bg-blue-700 cursor-pointer">
        {" "}
        {/* conver to componet */}
        <p onClick={handleClick}>{Liked}</p>
      </div>
    )
}
import React, { useState } from "react";
import AddToCart from "./AddToCart";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import ReviewButton from "./ReviewButton";
import { Link } from "react-router-dom";
export interface ProductProps {
  name: string;
  image: string;
  price: { $numberDecimal: string };
  description: string;
  id: number;
  liked: number;
}

export interface CardInterface {
  product: ProductProps;
  loading: boolean;
}

export default function ProductCard({ product }: CardInterface) {
  const { auth} = useAuth();
 

 

  return (
    <Link
      to={`/products/${product.id}`}
      key={product.id}
      className="
            bg-red-500 h-[40vh] w-[15vw]
            rounded-3xl
            "
    >
      <div className="w-[100%] h-[33%] flex items-center flex-col">
      <ReviewButton  liked={product.liked} productId={product.id} />
        <img
          src="https://picsum.photos/200/300 "
          className="h-[90%] w-[66%] m-4 rounded-xl"
        />
      </div>
      <div className="w-[100%] h-[44%] flex justify-center">
        <p>{product.name}</p>
      </div>
      <div className="w-[100%] h-[10%] flex items-center flex-col">
        <p className="p-2">{product.price.$numberDecimal}€</p>
        {auth && <AddToCart productId={product.id}/>}
      </div>
    </Link>
  );
}

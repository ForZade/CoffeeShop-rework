import { useEffect, useState } from "react";
import ProductCard, { ProductProps} from "./ProductCard";
import axios from "axios";

export default function AuthHomePage() {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ProductProps[]>([]);

  async function getProducts() {
        try{
            setLoading(true);
            const response = await axios.get("http://localhost:7000/api/v1/products/all");
            console.log(response.data.data);
            setData(response.data.data);
        }
        catch(err){
            console.log(err);
        }
        finally{
            setLoading(false);
        }
    }

  useEffect(() => {
    getProducts();
  }, [])
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  2xl:grid-cols-5gap-4 auto-rows-auto place-items-center py-4 ">
      {data.map((product: ProductProps) => (
        <ProductCard
          key={product.id}  
          product={product}
          loading={loading}
        />
      ))}
    </main>
  );
}

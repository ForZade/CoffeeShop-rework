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
    <main>
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

import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard, { ProductProps } from "../components/Products/ProductCard";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ShopPage() {
    const { checkAuth, user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<ProductProps[]>([]);
    const navigate = useNavigate();
  
    useEffect(() => {
        async function getProducts() {
            try{
                await checkAuth();
                const response = await axios.get("http://localhost:7000/api/v1/products");
                setData(response.data.data);
            }
            catch(err){
                console.log(err);
            }
            finally{
                if (user?.email && !user?.roles.includes("user")) {
                    navigate("/verify");
                }
                setLoading(false);
            }
        }
        getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <main className="h-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 auto-rows-auto place-items-center py-4 px-8 ">
            {data.map((product: ProductProps) => (
                <ProductCard
                key={product.id}  
                product={product}
                loading={loading}
                />
            ))}
        </main>
    )
}
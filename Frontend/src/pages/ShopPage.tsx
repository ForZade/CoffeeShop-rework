import axios from "axios";
import { useLoaderData } from "react-router-dom";
import ProductCard, { ProductProps } from "../components/Products/ProductCard";

export default function ShopPage() {
    const products = useLoaderData() as ProductProps[];

    return (
        <main className="h-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 auto-rows-auto place-items-center py-4 px-8 ">
            {products.map((product: ProductProps) => (
                <ProductCard
                key={product.id}  
                product={product}
                />
            ))}
        </main>
    )
}

export const ProductsLoader = async () => {
    try {
        const response = await axios.get("http://localhost:7000/api/v1/products");
        return response.data.data;
    } catch (err) {
        console.log(err);
    }
}
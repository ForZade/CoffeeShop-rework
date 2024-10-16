import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";

export default function ProductPage() { 
    const { id } = useParams();
    const {auth, checkAuth } = useAuth();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState();
    useEffect(() => {
        const fetchData = async () => {
            try {
                await checkAuth();
                const response = await axios.get(`http://localhost:7000/api/v1/products/${id}`, {withCredentials: true});
                console.log(response.data.data);
                setProduct(response.data.data);
            } catch (err) {
                console.log(err);
            }
            finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [])
   
    return (
        <h1 className="text-3xl font-bold underline text-black">
            {product.name}
        </h1>
    )
}
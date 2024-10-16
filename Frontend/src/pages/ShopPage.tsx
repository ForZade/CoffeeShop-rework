
import { useAuth } from "../contexts/AuthContext";
 import { useEffect, useState } from "react";
export default function ShopPage() {
const [loading, setLoading] = useState(true);
    const { auth, checkAuth } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await checkAuth();
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [checkAuth]);

    return (
        loading ? <p>Loading...</p> : ( 
            auth ? <p>Shop</p> : <p>shop but not logged in</p>
        )
    )
}
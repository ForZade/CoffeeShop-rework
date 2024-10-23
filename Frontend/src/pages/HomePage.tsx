import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const { checkAuth, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const loadPage = async () => {
            try {
                await checkAuth();
            }
            catch (error) {
                console.error('Error:', error);
            }
            finally {
                if (user?.email && !user?.roles.includes("user")) {
                    navigate("/verify");
                }
            }
        }

        loadPage();
    }, []);

    return (
        <h1 className="text-3xl font-bold underline text-black">
            Home
        </h1>
    );
}
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();
    const { checkAuth } = useAuth();

    useEffect(() => {
        const loadPage = async () => {
            try {
                await checkAuth();
            }
            catch (error) {
                console.error('Error:', error);
            }
        }

        loadPage();
    }, []);

    return (
        <main
            className="w-full h-min flex flex-col items-center justify-start gap-2 p-8"
        >
            <div className="w-full h-[720px] rounded-xl overflow-hidden relative">
                <div className="w-full h-full backdrop-blur-sm absolute top-0 left-0 flex flex-col justify-center items-center gap-8">
                    <h1 className="text-5xl font-bold text-white text-center">Geriausia kava laukia jūsų!</h1>
                    <Button icon="tabler:arrow-right" onClick={() => navigate("/produktai")}>Išsirinkti kavą</Button> 
                </div>
                <img src="/shop.webp" className="w-full h-full object-cover"/>
            </div>
        </main>
    );
}
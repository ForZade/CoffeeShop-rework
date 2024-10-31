import { Outlet, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navigation/Navbar";
import { usePopup } from "../contexts/PopupContext";
import AdminPopup from "../components/AdminPopup/AdminPopup";
import DiscountPopup from "../components/DiscountPopup/DiscountPopup";

export default function MainLayout() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { theme } = useTheme();
    const { adminOpen, discountOpen } = usePopup();

    if (user && !user?.roles.includes('user')) {
        navigate('/verify');
    }

    return (
        <div className={`w-screen min-h-screen ${theme} flex`}>
            {
                adminOpen && <AdminPopup />
            }
            {
                discountOpen && <DiscountPopup />
            }
            <main className={`w-full h-auto bg-slate-100 dark:bg-zinc-700 flex flex-col`}>
                <Navbar />
                <main className="w-full grow flex flex-col">
                    <Outlet />
                </main>
            </main>
        </div>
    )
}
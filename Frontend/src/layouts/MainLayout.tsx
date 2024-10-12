import { Outlet } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import Navbar from "../components/Navbar";

export default function MainLayout() {
    const { theme } = useTheme();

    return (
        <main className={theme}>
            <Navbar />
            <Outlet />
        </main>
    )
}
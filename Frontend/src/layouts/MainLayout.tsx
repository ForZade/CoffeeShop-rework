import { Outlet } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

export default function MainLayout() {
    const { theme } = useTheme();

    return (
        <main className={theme}>
            <Outlet />
        </main>
    )
}
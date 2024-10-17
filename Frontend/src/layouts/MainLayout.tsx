import { Outlet } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import Navbar from "../components/Navbar";

export default function MainLayout() {
    const { theme } = useTheme();

    return (
        <div className={`${theme}`}>
            <main className="w-screen h-screen bg-slate-100 dark:bg-zinc-700 flex flex-col">
                <Navbar />
                <main className="w-full grow">
                    <Outlet />
                </main>
            </main>
        </div>
    )
}
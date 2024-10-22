import { Outlet } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import Navbar from "../components/Navigation/Navbar";

export default function MainLayout() {
    const { theme } = useTheme();

    return (
        <div className={`w-screen min-h-screen ${theme} flex`}>
            <main className={`w-full h-auto bg-slate-100 dark:bg-zinc-700 flex flex-col`}>
                <Navbar />
                <main className="w-full grow flex flex-col">
                    <Outlet />
                </main>
            </main>
        </div>
    )
}
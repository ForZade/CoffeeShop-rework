import { Outlet } from "react-router-dom";
import SettingsSidebar from "../components/Sidebar/Sidebar";

export default function SettingsLayout() {
    return (
        <main className="w-full h-full flex flex-col items-center lg:flex-row">
            <SettingsSidebar />
            <div className="grow grid place-items-center">
                <Outlet />
            </div>
        </main>
    )
}
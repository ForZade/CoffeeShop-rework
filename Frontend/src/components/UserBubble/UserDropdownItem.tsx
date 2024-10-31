import axios from "axios";
import { usePopup } from "../../contexts/PopupContext";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

interface UserDropdownItemProps {
    type?: string
    link?: string
    Side?: React.ComponentType<unknown>;
    click?: () => void
    text?: string
    roleRequired?: string
    roles?: string[]
}


export default function UserDropdownItem({ type = "button", link = "", Side, click, text }: UserDropdownItemProps) {
    const { toggleAdmin, toggleDiscount } = usePopup();
    async function logout() {
        try {
            await axios.post(`http://localhost:7000/api/v1/auth/logout`, {}, { withCredentials: true });
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            window.location.reload();
        }
    }

        if (type.toLowerCase() === "link" || link) {
            return (
                <Link to={link} className="dark:hover:bg-zinc-700 hover:bg-slate-100 px-2 py-1 rounded-md flex items-center gap-2 transition-colors cursor-pointer">
                    <div className="w-6 h-6 grid place-items-center">
                        {Side && <Side/>}
                    </div>
                    {text}
                </Link>
            )
        }
        else if (type.toLowerCase() === "logout") {
            return (
                <div className="dark:hover:bg-zinc-700 hover:bg-slate-100 dark:text-red-500 text-red-300 dark:hover:text-red-400 hover:text-red-400 px-2 py-1 rounded-md flex items-center gap-1 transition-colors cursor-pointer" onClick={() => logout()}>
                    <Icon icon="tabler:logout" className="w-6 h-6"/>
                    {text}
                </div>
            )
        }
        else if (type.toLowerCase() === 'admin') {
            return (
                <div className="dark:hover:bg-zinc-700 hover:bg-slate-100 px-2 py-1 rounded-md flex items-center gap-2 transition-colors cursor-pointer" onClick={toggleAdmin}>
                    <div className="w-6 h-6 grid place-items-center">
                        {Side && <Side/>}
                    </div>
                    {text}
                </div>
            )
        }
        else if (type.toLowerCase() === 'discounts') {
            return (
                <div className="dark:hover:bg-zinc-700 hover:bg-slate-100 px-2 py-1 rounded-md flex items-center gap-2 transition-colors cursor-pointer" onClick={toggleDiscount}>
                    <div className="w-6 h-6 grid place-items-center">
                        {Side && <Side/>}
                    </div>
                    {text}
                </div>
            )
        }
        else {
            return (
                <div className="dark:hover:bg-zinc-700 hover:bg-slate-100 px-2 py-1 rounded-md flex items-center gap-1 transition-colors cursor-pointer" onClick={() => click && click()}>
                    <div className="w-6 h-6 grid place-items-center">
                        {Side && <Side/>}
                    </div>
                    {text}
                </div>
            )
        }
}
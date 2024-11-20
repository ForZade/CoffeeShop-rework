import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "../Button";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useAlert } from "../../contexts/AlertContext";

const settingsData = [
    {
        title: "Vartotojas",
        icon: "tabler:user",
        href: "/nustatymai"
    },
    {
        title: "Slaptažodis",
        icon: "tabler:lock",
        href: "/nustatymai/slaptazodis"
    },
    {
        title: "Pirkimų istorija",
        icon: "tabler:history",
        href: "/nustatymai/pirkimai"
    }
]

export default function SettingsSidebar() {
    const { logout } = useAuth();
    const { passwordModal } = useAlert();

    return (
        <aside className="px-8 pb-6">
                <section
                    className="
                        w-min h-full rounded-xl
                        bg-gradient-to-tr from-[#C29469] via-[#ccc5c3] to-[#C29469]
                    "
                >
                    <div
                        className="
                            w-full h-full p-0.5 rounded-xl
                            bg-gradient-to-bl from-transparent via-30% via-[#523428] to-[#523428]
                        "
                    >
                        <div
                            className="
                                w-full h-full bg-[#523428] rounded-tr-xl p-2 flex flex-col justify-between gap-2 px-6 py-4
                            "
                        >
                            <section className="w-full h-full flex flex-col gap-4">
                                <h1 
                                    className="
                                        w-full text-center text-2xl font-bold bg-clip-text text-transparent
                                        bg-gradient-to-tr from-[#C29469] via-[#ccc5c3] to-[#C29469]
                                    "
                                >
                                    Nustatymai
                                </h1>
                                <ul className="w-full h-full flex flex-col gap-2">
                                {
                                    settingsData.map(route => (
                                        <Link to={route.href} className="w-full h-min flex items-center gap-2 cursor-pointer select-none dark:hover:bg-[#66564c] hover:bg-[#F2CEA9] rounded-lg px-4">
                                            <div className="w-10 h-10 grid place-items-center">
                                                <Icon icon={route.icon} className="w-8 h-8 text-[#ccc5c3]"/>
                                            </div>

                                            <span 
                                                className="
                                                    text-lg font-semibold bg-clip-text text-transparent whitespace-nowrap
                                                    bg-gradient-to-tr from-[#C29469] via-[#ccc5c3] to-[#C29469]
                                                "
                                            >
                                                {route.title}
                                            </span>
                                        </Link>
                                    ))
                                }
                                </ul>
                            </section>

                            <section className="w-full flex flex-col gap-2">
                                <Button type="width" icon="tabler:logout" onClick={logout}>Atsijungti</Button>
                                <Button type="width" icon="tabler:trash" onClick={passwordModal}>Ištrinti paskytą</Button>
                            </section>  
                        </div>
                    </div>
                </section>
        </aside>
    )
}
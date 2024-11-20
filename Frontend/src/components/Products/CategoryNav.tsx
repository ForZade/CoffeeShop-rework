import { useAlert } from "../../contexts/AlertContext";
import { useAuth } from "../../contexts/AuthContext";
import { useRef, useState } from "react";
import Button from "../Button";
import Dropdown from "../Dropdown/Dropdown";
import CategoryItem from "./CategoryItem";
import DropdownItem from "../Dropdown/DropdownItem";

export default function CategoryNav() {
    const [open, setOpen] = useState<boolean>(false);
    const { productModal } = useAlert();
    const { auth, user } = useAuth();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const categories = [
        {
            name: "Visos kavos",
            icon: "tabler:cup",
            link: "/produktai"
        },
        {
            name: "Kavos pupelės",
            icon: "game-icons:coffee-beans",
            link: "/produktai/kavos-pupeles"
        },
        {
            name: "Aromatizuota kava",
            icon: "tabler:coffee",
            link: "/produktai/aromatizuota-kava"
        },
        {
            name: "Kavos be kafeino",
            icon: "tabler:cup-off",
            link: "/produktai/kavos-be-kafeino"
        },
        {
            name: "Šalta kava",
            icon: "game-icons:soda-can",
            link: "/produktai/salta-kava"
        },
        {
            name: "Specijalios kavos",
            icon: "tabler:gift",
            link: "/produktai/specijalios-kavos"
        },
        {
            name: "Kitos kavos",
            icon: "game-icons:coffee-pot",
            link: "/produktai/kitos-kavos"
        }
    ]

    return (
        <div className="flex flex-col gap-4">
            
            <section className="w-full h-min hidden lg:flex items-center gap-12 justify-center flex-wrap">
                {categories.map((category) => (
                    <CategoryItem
                        key={category.name}
                        category={category.name}
                        icon={category.icon}
                    />
                ))}
            </section>

            <hr className="w-full h-1 rounded-full bg-gradient-to-tr dark:from-[#C29469] dark:via-[#ccc5c3] dark:to-[#C29469] from-[#3b2d2b] via-[#66564c] to-[#3b2d2b]"/>

            {/* For mobile create filter dropdown (and move add button here) */}

            <section className="w-full h-min lg:hidden flex gap-4 justify-end relative">
                {
                    auth && user?.roles.includes("admin") &&
                    <Button
                        icon="tabler:plus"
                        type="icon"
                        onClick={() => productModal("add")}
                    />
                }
                <div className="w-min h-min relative z-20" ref={dropdownRef}>
                    <Button
                        icon="tabler:adjustments-horizontal"
                        type="icon"
                        onClick={() => setOpen(!open)}
                    />
                    
                    {
                        open && <Dropdown>
                            {
                                categories && categories.map((category) => (
                                    <DropdownItem
                                        key={category.name}
                                        icon={category.icon}
                                        link={category.link}
                                    >
                                        {category.name}
                                    </DropdownItem>
                                ))
                            }
                        </Dropdown>
                    }
                </div>
            </section>
        </div>
    )
}
import { useEffect, useState } from "react"
import axios from "axios"
import { Icon } from "@iconify/react/dist/iconify.js"

interface DiscountProps {
    code: string
    percentage: number
    expires: Date
}

export default function AdminList() {
    const [discounts, setDiscounts] = useState([]);

    useEffect(() => {
        const getDiscounts = async () => {
            try {
                const response = await axios.get("http://localhost:7000/api/v1/users/discounts", { withCredentials: true });
                setDiscounts(response.data.discounts);
            } 
            catch (error) {
                console.error('Error:', error);
            }
        }

        getDiscounts();
    }, [])

    return (
        <ul className="w-full h-min max-h-[400px] overflow-y-scroll p-4 divide-y divide-slate-200 dark:divide-zinc-800">
            {
            discounts
            ?
            (
                discounts.map((discount: DiscountProps) => (
                    <li key={discount.code} className="flex items-center justify-between text-black dark:text-white py-2 select-none">
                        <section className="flex items-center gap-4">
                            <div className="w-12 h-10 overflow-hidden flex items-center justify-center">
                                <h1 className="text-xl font-bold">1{discount.percentage}%</h1>
                            </div>
                            <header className="flex flex-col">
                                <h1 className="text-base font-bold leading-5">{discount.code}</h1>
                                <h2 className="text-sm leading-4">{discount.expires.toString()}</h2>
                            </header>
                        </section>

                        <section className="flex items-center gap-1">
                            <button className="w-8 h-8 bg-slate-200 dark:bg-zinc-800 hover:bg-slate-300 dark:hover:bg-zinc-900 rounded-md text-white grid place-items-center">
                                <Icon icon="tabler:edit" className="w-5 h-5"/>
                            </button>
                            
                            <button className="w-8 h-8 bg-red-500 dark:bg-red-400 rounded-md text-white grid place-items-center">
                                <Icon icon="tabler:trash" className="w-5 h-5"/>
                            </button>
                        </section>
                    </li>
                ))
            )
            :
            <p>No admins found</p>
            }
        </ul>

    )
}
import axios from "axios";
import { Icon } from "@iconify/react"

export default function DiscountItem({ code, getCodes, editDiscount }: { code: any, getCodes: any, editDiscount?: any }) {
    const deleteDiscount = async () => {
        try {
            await axios.delete(`http://localhost:7000/api/v1/users/discounts/${code.code}`, { withCredentials: true });
            getCodes()
        }
        catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <li className="flex items-center justify-between text-black dark:text-white py-2 select-none">
            <section className="flex items-center gap-4">
                <div className="w-16 h-10 rounded-full overflow-hidden grid place-items-center">
                    <h1 className="text-2xl font-bold">{code.percentage}%</h1>
                </div>
                <header className="flex flex-col">
                    <h1 className="text-base font-bold leading-5">{code.code}</h1>
                    <h2 className="text-sm leading-4">{code.expires}</h2>
                </header>
            </section>

            <section className="flex items-center gap-1">
            <button 
                    className="w-8 h-8 bg-zinc-500 dark:bg-zinc-400 rounded-md text-white grid place-items-center"
                    onClick={() => editDiscount(code.code)}
                >
                    <Icon icon="tabler:edit" className="w-5 h-5"/>
                </button>

                <button 
                    className="w-8 h-8 bg-red-500 dark:bg-red-400 rounded-md text-white grid place-items-center"
                    onClick={deleteDiscount}
                >
                    <Icon icon="tabler:trash" className="w-5 h-5"/>
                </button>
            </section>
        </li>
    )
}
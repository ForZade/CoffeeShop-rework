import { Link, useLoaderData } from "react-router-dom"

export default function TransactionListPage () {
    const data = useLoaderData() as any;

    return (
        <main className="w-full h-full grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 auto-rows-auto gap-4 pr-4">
            {
                data.length ? data.map((transaction: any, index: number) => (
                    <Link to={`/nustatymai/pirkimai/${transaction.id}`} 
                        className="
                            w-full h-min rounded-xl shadow-lg shadow-opacity-50 shadow-[#52342871] dark:shadow-[#ccc5c31e]
                            dark:bg-gradient-to-tr bg-gradient-to-br from-[#C29469] via-[#ccc5c3] to-[#C29469]
                        "
                    >
                        <div
                            className="
                            w-full h-full rounded-xl shadow-lg shadow-opacity-50 shadow-[#52342871] dark:shadow-[#ccc5c31e]
                            bg-gradient-to-br from-transparent via-30% via-[#523428] to-[#523428]  p-0.5
                            "
                        >
                            <div 
                            className="
                                w-full h-full rounded-xl p-8 flex flex-col text-center
                                bg-[#523428]
                            "
                            >
                                <h1 
                                    className="
                                        bg-clip-text text-transparent font-bold text-2xl
                                        bg-gradient-to-tr from-[#C29469] via-[#ccc5c3] to-[#C29469]
                                    "
                                >
                                    Pirkimas #{index + 1}
                                </h1>

                                <h1 
                                    className="
                                        bg-clip-text text-transparent font-bold
                                        bg-gradient-to-tr from-[#C29469] via-[#ccc5c3] to-[#C29469]
                                    "
                                >
                                    Prekės: <span className="text-white font-normal">{transaction.count}</span>
                                </h1>

                                <h1 
                                    className="
                                        bg-clip-text text-transparent font-bold
                                        bg-gradient-to-tr from-[#C29469] via-[#ccc5c3] to-[#C29469]
                                    "
                                >
                                    Suma: <span className="text-white font-normal">{transaction.total.$numberDecimal}€</span>
                                </h1>
                            </div>
                        </div>
                    </Link>
                ))
                :
                <h1 className="text-2xl font-bold">No transactions found</h1>
            }
        </main>
    )
}
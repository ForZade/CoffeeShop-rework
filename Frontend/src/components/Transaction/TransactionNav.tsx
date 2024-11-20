interface TransactionProps {
    total: { $numberDecimal: string },
    subtotal: { $numberDecimal: string },
    discount: { $numberDecimal: string },
    percentage: number
    count: number
    code: string
}

export default function TransactionNav({ transaction }: { transaction: TransactionProps }) {
    return transaction && (
        <nav className="w-full h-min flex gap-4">
                <label className="w-full h-full flex flex-col gap-1 dark:text-white">
                    <span className="ml-2 font-bold">Prieš akcijas</span>
                    <div className="grow max-h-12 min-h-12 bg-slate-200 dark:bg-[#221518] rounded-full grid place-items-center">
                        <p>{transaction.subtotal.$numberDecimal}€</p>
                    </div>
                </label>

                <label className="w-full h-full flex flex-col gap-1 dark:text-white">
                    <span className="ml-2 font-bold">Suma</span>
                    <div className="grow max-h-12 min-h-12 bg-slate-200 dark:bg-[#221518] rounded-full grid place-items-center">
                        <p>{transaction.total.$numberDecimal}€</p>
                    </div>
                </label>

                <label className="w-full h-full flex flex-col gap-1 dark:text-white">
                    <span className="ml-2 font-bold">Nuolaida €</span>
                    <div className="grow max-h-12 min-h-12 bg-slate-200 dark:bg-[#221518] rounded-full grid place-items-center">
                        <p>{transaction.discount.$numberDecimal}€</p>
                    </div>
                </label>

                <label className="w-full h-full flex flex-col gap-1 dark:text-white">
                    <span className="ml-2 font-bold">Nuolaida %</span>
                    <div className="grow max-h-12 min-h-12 bg-slate-200 dark:bg-[#221518] rounded-full grid place-items-center">
                        <p>{transaction.percentage}%</p>
                    </div>
                </label>

                <label className="w-full h-full flex flex-col gap-1 dark:text-white">
                    <span className="ml-2 font-bold">Kodas</span>
                    <div className="grow max-h-12 min-h-12 bg-slate-200 dark:bg-[#221518] rounded-full grid place-items-center">
                        <p>{transaction.code}</p>
                    </div>
                </label>

                <label className="w-full h-full flex flex-col gap-1 dark:text-white">
                    <span className="ml-2 font-bold">Prekių kiekis</span>
                    <div className="grow max-h-12 bg-slate-200 dark:bg-[#221518] rounded-full grid place-items-center">
                        <p>{transaction.count}</p>
                    </div>
                </label>
            </nav>
    )
}
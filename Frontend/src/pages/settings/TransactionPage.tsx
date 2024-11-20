import { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom"
import TransactionNav from "../../components/Transaction/TransactionNav";
import TransactionItem from "../../components/Transaction/TransactionItem";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../../components/Button";

export default function TransactionPage() {
    const navigate = useNavigate();
    const transaction = useLoaderData() as any;
    const { user, checkAuth } = useAuth();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return (
        <main className="w-full h-full flex flex-col px-16 pb-8 gap-4">
            <TransactionNav transaction={transaction} />

            <div className="w-full grow flex">
                <section className="grow flex flex-col gap-2">
                    {
                        transaction.order_details.length && transaction.order_details.map((item: any) => <TransactionItem key={item.productId} id={item.productId} quantity={item.quantity} />) 
                    }
                </section>

                <aside className="max-w-[420px] min-w-[420px] h-full bg-gradient-to-br from-[#C29469] via-[#ccc5c3] to-[#C29469] rounded-xl">
                    <div
                        className="
                            w-full h-full rounded-xl bg-gradient-to-br from-transparent via-30% dark:via-[#523428] via-slate-100 dark:to-[#523428] to-[#f1e2d2] p-0.5
                        "
                    >
                        <div
                            className="
                                w-full h-full bg-gradient-to-br from-slate-100 to-[#f1e2d2] dark:from-[#523428] dark:to-[#523428] rounded-xl p-4 flex flex-col justify-between gap-4
                            "
                        >
                            <section className="w-full flex flex-col gap-4">
                                <div className="w-full h-auto">
                                    <h1 
                                        className="
                                            font-bold bg-clip-text text-transparent
                                            bg-gradient-to-tr dark:from-[#C29469] dark:via-[#ccc5c3] dark:to-[#C29469] from-[#3b2d2b] via-[#66564c] to-[#3b2d2b]
                                        "
                                    >
                                        Vardas:
                                    </h1>
                                    <div className="w-full px-4 py-2 bg-slate-200 dark:bg-[#3d292e] dark:text-white rounded-full">
                                        <p>{user?.first_name}</p>
                                    </div>
                                </div>

                                <div className="w-full h-auto">
                                    <h1 
                                        className="
                                            font-bold bg-clip-text text-transparent
                                            bg-gradient-to-tr dark:from-[#C29469] dark:via-[#ccc5c3] dark:to-[#C29469] from-[#3b2d2b] via-[#66564c] to-[#3b2d2b]
                                        "
                                    >
                                        Pavardė:
                                    </h1>
                                    <div className="w-full px-4 py-2 bg-slate-200 dark:bg-[#3d292e] dark:text-white rounded-full">
                                        <p>{user?.last_name}</p>
                                    </div>
                                </div>

                                <div className="w-full h-auto">
                                    <h1 
                                        className="
                                            font-bold bg-clip-text text-transparent
                                            bg-gradient-to-tr dark:from-[#C29469] dark:via-[#ccc5c3] dark:to-[#C29469] from-[#3b2d2b] via-[#66564c] to-[#3b2d2b]
                                        "
                                    >
                                        El.paštas:
                                    </h1>
                                    <div className="w-full px-4 py-2 bg-slate-200 dark:bg-[#3d292e] dark:text-white rounded-full">
                                        <p>{user?.email}</p>
                                    </div>
                                </div>

                                <div className="w-full h-auto">
                                    <h1 
                                        className="
                                            font-bold bg-clip-text text-transparent
                                            bg-gradient-to-tr dark:from-[#C29469] dark:via-[#ccc5c3] dark:to-[#C29469] from-[#3b2d2b] via-[#66564c] to-[#3b2d2b]
                                        "
                                    >
                                        Adresas:
                                    </h1>
                                    <div className="w-full px-4 py-2 bg-slate-200 dark:bg-[#3d292e] dark:text-white rounded-full">
                                        <p>{transaction.address}</p>
                                    </div>
                                </div>

                                <div className="w-full h-auto">
                                    <h1 
                                        className="
                                            font-bold bg-clip-text text-transparent
                                            bg-gradient-to-tr dark:from-[#C29469] dark:via-[#ccc5c3] dark:to-[#C29469] from-[#3b2d2b] via-[#66564c] to-[#3b2d2b]
                                        "
                                    >
                                        Miestas:
                                    </h1>
                                    <div className="w-full px-4 py-2 bg-slate-200 dark:bg-[#3d292e] dark:text-white rounded-full">
                                        <p>{transaction.city}</p>
                                    </div>
                                </div>

                                <div className="w-full h-auto">
                                    <h1 
                                        className="
                                            font-bold bg-clip-text text-transparent
                                            bg-gradient-to-tr dark:from-[#C29469] dark:via-[#ccc5c3] dark:to-[#C29469] from-[#3b2d2b] via-[#66564c] to-[#3b2d2b]
                                        "
                                    >
                                        Zip kodas:
                                    </h1>
                                    <div className="w-full px-4 py-2 bg-slate-200 dark:bg-[#3d292e] dark:text-white rounded-full">
                                        <p>{transaction.zip}</p>
                                    </div>
                                </div>
                            </section>

                            <Button type="width" icon="tabler:arrow-left" onClick={() => navigate(-1)}>Atgal</Button>
                        </div>
                    </div>
                </aside>
            </div>
        </main>
    )
}
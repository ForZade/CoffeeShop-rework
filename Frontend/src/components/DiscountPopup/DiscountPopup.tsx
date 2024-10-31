import { useState } from "react";
import DiscountList from "./DiscountList";

export default function AdminPopup() {
    const [edit, setEdit] = useState(false);

    return (
        <main className="w-screen h-screen bg-zinc-950 bg-opacity-40 grid place-items-center absolute top-0 left-0 px-8 py-24 z-20">
            <div className="w-full sm:w-[520px] h-full sm:max-h-[720px] bg-slate-100 dark:bg-zinc-700 rounded-3xl shadow-lg flex flex-col px-4 py-4">
                {
                    edit
                    ?
                    <h1>Editing</h1>
                    :
                    <DiscountList />
                }
            </div>
        </main>
    )
}
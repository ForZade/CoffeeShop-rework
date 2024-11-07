import { useEffect, useState } from "react";
import axios from "axios";


export default function DiscountPopup() {
    const [codes, setCodes] = useState([]);

    // useEffect(() => {
    //     const getCodes = async () => {
    //         try {
    //             const res = 
    //     }

    //     getCodes();
    // }, [])

    return (
            <div 
                className="w-full sm:w-[520px] h-full sm:max-h-[720px] bg-slate-100 dark:bg-zinc-700 rounded-3xl shadow-lg flex flex-col px-4 py-4"
                onClick={(e) => e.stopPropagation()}
            >
                <section>
                    
                </section>
            </div>
    )
}
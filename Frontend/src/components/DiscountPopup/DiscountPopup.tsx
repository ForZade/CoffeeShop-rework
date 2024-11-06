import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";

import { usePopup } from "../../contexts/PopupContext";
import { useDiscount } from "../../contexts/DiscountContext";
import DiscountItem from "./DiscountItem";
import DiscountCodeForm from "./DiscountForm";
import { a } from "framer-motion/client";

export default function DiscountPopup() {
    const { discountOpen, toggleDiscount } = usePopup();
    const { action, currentCode, addDiscount, editDiscount, finishAction } = useDiscount();
    const [codes, setCodes] = useState([]);
    const discountRef = useRef<HTMLDivElement>(null);

    const getDiscounts = async () => {
        try {
            const response = await axios.get("http://localhost:7000/api/v1/users/discounts", { withCredentials: true });
            console.log(response.data.discounts);
            setCodes(response.data.discounts);
        } 
        catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        getDiscounts();
    }, [action])


    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (discountRef.current && !discountRef.current.contains(event.target as Node)) {
                console.log("Clicked outside dropdown");
                toggleDiscount();
            }
        }

        if (discountOpen) {
            document.addEventListener("pointerdown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("pointerdown", handleClickOutside);
        };
    }, [discountOpen, toggleDiscount]);

    return (
        <main className="w-screen h-screen bg-zinc-950 bg-opacity-40 grid place-items-center absolute top-0 left-0 px-8 py-24 z-20">
            <div className="w-full sm:w-[520px] h-full sm:max-h-[720px] bg-slate-100 dark:bg-zinc-700 rounded-3xl shadow-lg flex flex-col px-4 py-4 relative" ref={discountRef}>
                {
                    action === 'add' || action === 'edit' ?
                    <DiscountCodeForm/>
                    :
                    <section className="w-full h-full flex flex-col">
                    {
                        codes.map((code: any) => {
                            return <DiscountItem key={code.code} code={code} getCodes={getDiscounts} editDiscount={editDiscount} />
                        })
                    }
                    </section>
                }

                <button
                    className="w-full h-12 bg-blue-500 dark:bg-blue-400 rounded-lg text-white grid place-items-center"
                    onClick={addDiscount}
                >
                    Add Discount Code
                </button>
            </div>
        </main>
    )
}
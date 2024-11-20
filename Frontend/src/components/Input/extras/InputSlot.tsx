import { ReactNode, useState } from "react";
import InputDropdown from "../InputDropdown";

interface InputSlotProps {
    side: 'start' | 'end';
    selectable?: boolean;
    children: ReactNode;
    options?: string[]
}

export default function InputSlot({ side, selectable, children, options }: InputSlotProps) {
    const [open, setOpen] = useState(false);
    const [option, setOption] = useState('')

    const selectOption = (option: string) => {
        setOption(option);
        setOpen(false);
    }

    const handleClick = () => {
        if (selectable) {
            setOpen(!open);
            return
        }

        return;
    }

    return (
        <main className="w-min h-full relative">
            <div
                onClick={handleClick}
                className={`
                    relative grid py-2 place-items-center dark:text-white
                    w-12 h-full dark:bg-[#3b2d2b] dark:hover:bg-[#66564c] hover:bg-[#F2CEA9] bg-[#EFD8BF]
                    ${side === 'start' ? "rounded-l-full" : "rounded-r-full"}
                `}
            >
                {
                    open ? option : children
                }
            </div>

            {
                selectable && open && <InputDropdown data={options} click={selectOption}/>
            }
        </main>
    )
}
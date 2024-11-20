import { Icon } from "@iconify/react/dist/iconify.js";

export default function InputEye({ visibility, onClick }: { visibility: boolean, onClick: () => void }) {
    const icon = visibility ? "tabler:eye" : "tabler:eye-closed";

    return (
        <main className="w-min h-full relative">
            <div
                onClick={onClick}
                className={`
                    relative grid py-2 place-items-center dark:text-white
                    w-12 h-full dark:bg-[#3b2d2b] dark:hover:bg-[#66564c] hover:bg-[#F2CEA9] bg-[#EFD8BF]
                    rounded-r-full
                `}
            >
                <button onClick={onClick}>
                    <Icon icon={icon} className="w-6 h-6 active:scale-75 transition-[transform,color] dark:text-white" />
                </button>
            </div>
        </main>
    )
}
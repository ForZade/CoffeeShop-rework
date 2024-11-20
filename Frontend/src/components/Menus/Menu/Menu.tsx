import { motion, AnimatePresence } from "framer-motion"
import { useMenu } from "../../../contexts/MenuContext"
import ThemeButton from "../../Navigation/ThemeButton";
import CartButton from "../../Navigation/Cart/CartButton";
import UserBubble from "../../Navigation/User/UserBubble";
import { Link } from "react-router-dom";
import Button from "../../Button";

export default function Menu() {
    const { open, toggle } = useMenu();

    return (
        <AnimatePresence mode="wait">
            {
                open && (
                    <motion.main 
                        className="lg:hidden w-screen h-screen fixed top-0 left-0 z-40 flex justify-start items-end pointer-events-none"
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        onClick={toggle}
                    >
                        <section className="w-screen h-screen bg-zinc-800 bg-opacity-60 px-4 py-10 pointer-events-auto flex flex-col">
                            <section className="w-full flex items-center gap-4 justify-between">
                                <Button icon="tabler:x" type="icon" onClick={toggle} />

                                <div className=" sm:hidden w-min h-min flex items-center gap-4">
                                    <ThemeButton />
                                    <CartButton />
                                    <UserBubble />
                                </div>
                            </section>

                            <section className="w-full grow flex flex-col items-center justify-center gap-10">
                                <Link 
                                    to="/produktai"
                                    className="text-3xl font-black tracking-widest uppercase text-white"
                                    onClick={toggle}
                                >
                                    Mūsų kava
                                </Link>

                                <Link 
                                    to="/kontaktai"
                                    className="text-3xl font-black tracking-widest uppercase text-white"
                                    onClick={toggle}
                                >
                                    Kontaktai
                                </Link>
                            </section>
                        </section>
                    </motion.main>
                )
            }
        </AnimatePresence>
    )
}
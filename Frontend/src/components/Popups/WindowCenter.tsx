import { AnimatePresence, motion } from "framer-motion";
import { useAlert } from "../../contexts/AlertContext";
import AdminPopup from "./windows/Admin/AdminPopup";

export default function WindowCenter() {
    const { window, closeWindow } = useAlert();

    return window && (
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <main 
                        className="w-screen h-screen bg-zinc-950 bg-opacity-40 grid place-items-center absolute top-0 left-0 px-8 py-24 z-20"
                        onClick={closeWindow}
                    >
                        {
                            window === 'admin' &&
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key="admin"
                                    initial={{ scaleY: 0 }}
                                    animate={{ scaleY: 1 }}
                                    exit={{ scaleY: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="h-full"
                                >
                                    <AdminPopup/>
                                </motion.div>
                            </AnimatePresence>
                        }
                        {
                            window === 'discount' &&
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key="admin"
                                    initial={{ scaleY: 0 }}
                                    animate={{ scaleY: 1 }}
                                    exit={{ scaleY: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="h-full"
                                >
                                    
                                </motion.div>
                            </AnimatePresence>
                        }
                    </main>
                </motion.div>
            </AnimatePresence>
    )
}
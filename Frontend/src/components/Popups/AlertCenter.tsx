import { motion, AnimatePresence } from "framer-motion"
import { useAlert } from "../../contexts/AlertContext"
import Alert from "./Alerts/Alert";

export default function AlertCenter() {
    const { alert } = useAlert();

    return (
        <main className="w-screen h-screen fixed top-0 left-0 z-50 pointer-events-none flex justify-end py-20">
            <AnimatePresence mode="wait">
                {
                    (alert.success || alert.error) && (
                        <>
                            <motion.div
                                key={alert.success ? `success-${alert.success.message}` : `error-${alert.error?.message}`} 
                                initial={{ x: "100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "100%" }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="hidden lg:block"
                            >
                                <Alert type={alert.success ? "success" : "error"} message={alert.success ? alert.success.message : alert.error?.message ? alert.error.message : "An error has occurred"}/>
                            </motion.div>

                            <motion.div
                                key={alert.success ? `success-${alert.success.message}` : `error-${alert.error?.message}`} 
                                initial={{ y: "-50%" }}
                                animate={{ y: -50 }}
                                exit={{ y: "-50%" }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="lg:hidden"
                            >
                                <Alert type={alert.success ? "success" : "error"} message={alert.success ? alert.success.message : alert.error?.message ? alert.error.message : "An error has occurred"}/>
                            </motion.div>
                        </>
                    )
                }
            </AnimatePresence>
        </main>
    )
}
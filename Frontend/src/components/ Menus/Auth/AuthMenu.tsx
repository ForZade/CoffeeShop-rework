import { motion } from "framer-motion";
import { useAuth } from "../../../contexts/AuthContext";
import AuthFormSelector from "./AuthFormSelector";
import CloseButton from "../CloseButton";
import LoginForm from "../../Forms/LoginForm";
import RegistrationForm from "../../Forms/RegisterForm";

export default function AuthMenu() {
    const { open, form } = useAuth();

    return (
        <motion.main 
        className="h-screen w-80 bg-slate-100 dark:bg-zinc-800 bg-opacity-75 dark:bg-opacity-75 backdrop-blur-sm rounded-l-lg origin-right fixed top-0 right-0 z-30 p-4 flex flex-col items-end gap-4"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: open ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            <CloseButton/>
            <AuthFormSelector />

            {
                form === 'login' ?
                    <LoginForm/>
                    :
                    <RegistrationForm/>
            }
        </motion.main>
    )
}
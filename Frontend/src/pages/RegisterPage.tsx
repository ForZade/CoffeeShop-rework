import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import RegistrationForm from "../components/Forms/RegisterForm";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const navigate = useNavigate();
    const { checkAuth, auth } = useAuth();

    useEffect(() => {
        const loadPage = async () => {
            try {
                await checkAuth()

                if (auth) {
                    navigate('/');
                }
            }
            catch (error) {
                console.error('Error:', error);
            }
        }

        loadPage();
    }, [auth]);

    return (
        <RegistrationForm />
    )
}
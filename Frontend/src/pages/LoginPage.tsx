import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import LoginForm from "../components/Forms/LoginForm";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();
    const { checkAuth, auth } = useAuth();

    useEffect(() => {
        const loadPage = async () => {
            try {
                await checkAuth()

                console.log(auth)
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
        <LoginForm />
    )
}
import { useEffect } from "react";
import ContactsForm from "../components/Forms/ContactsForm";
import { useAuth } from "../contexts/AuthContext";

export default function ContactsPage () {
    const { checkAuth } = useAuth();

    useEffect(() => {
        const loadPage = async () => {
            try {
                await checkAuth();
            } catch (error) {
                console.error('Error:', error);
            } finally {
                if (!user) {
                    navigate("/login");
                } else if (user?.email && !user?.roles.includes("user")) {
                    navigate("/verify");
                }
            }
        };

        loadPage();
    }, [user, checkAuth, navigate]);

    return <ContactsForm />;
}

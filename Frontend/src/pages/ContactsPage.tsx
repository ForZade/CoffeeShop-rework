import { useEffect } from "react";
import ContactsForm from "../components/Forms/ContactsForm";
import { useAuth } from "../contexts/AuthContext";

export default function ContactsPage () {
    const { checkAuth } = useAuth();

    useEffect(() => {
        const loadPage = async () => {
            try {
                await checkAuth();
            }
            catch (error) {
                console.error('Error:', error);
            }
        }

        loadPage();
    })


    return(
        <ContactsForm/>
    )
}
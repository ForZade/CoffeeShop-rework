import { useEffect } from "react";
import UserForm from "../../components/Forms/UserForm";
import { useAuth } from "../../contexts/AuthContext";

export default function UserSettingsPage () {
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
        <UserForm/>
    )
}
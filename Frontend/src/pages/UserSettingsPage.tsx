import { useEffect } from "react";
import UserSettingsForm from "../components/Forms/UserSettingsForm";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function UserSettingsPage () {
    const { checkAuth, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const loadPage = async () => {
            try {
                await checkAuth();
            }
            catch (error) {
                console.error('Error:', error);
            }
            finally {
                if (user?.email && !user?.roles.includes("user")) {
                    navigate("/UserSettingsForm");
                }
            }
        }

        loadPage();
    })


    return(
        <UserSettingsForm/>
    )
}
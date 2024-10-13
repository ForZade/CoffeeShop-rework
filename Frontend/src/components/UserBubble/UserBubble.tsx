import UserDropdown from "./UserDropdown";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function UserBubble({ roles }: { roles: string[] }) {
    const [open, setOpen] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // State to manage loading

    async function checkStatus() {
        try {
            const response = await axios.get(`http://localhost:7000/api/v1/auth/status`, { withCredentials: true });
            if (response.data.authorized) {
                setAuthenticated(true);
            } else {
                setAuthenticated(false);
            }
        } catch (err) {
            console.log(err);
            setAuthenticated(false); // Set authenticated to false in case of an error
        } finally {
            setLoading(false); // Set loading to false after check is done
        }
    }

    useEffect(() => {
        checkStatus();
    }, []);

    function handleClickOutside() {
        setTimeout(() => setOpen(false), 150);
    }

    // Render loading state, login button, or user dropdown
    return (
        <main className="relative w-min h-min">
            {loading ? (
                <div>Loading...</div> // Optionally display a loading indicator
            ) : authenticated ? (
                <>
                    <div className="w-12 h-12 rounded-full border bg-blue-500" onClick={() => setOpen(!open)}>
                        <img
                            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
                            alt="User Avatar"
                            className="w-full h-full rounded-full aspect-square"
                        />
                    </div>
                    <UserDropdown open={open} toggle={handleClickOutside} roles={roles} />
                </>
            ) : (
                <Link to="/login" className="px-3 py-1 text-base font-semibold text-white bg-blue-500 rounded-full">
                    Login
                </Link>
            )}
        </main>
    );
}

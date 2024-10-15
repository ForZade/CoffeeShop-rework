import UserDropdown from "./UserDropdown";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function UserBubble({ roles }: { roles: string[] }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const { auth, checkAuth} = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await checkAuth();
            }
            catch (err) {
                console.log(err);
            }
            finally {
                setLoading(false);
            }
        }

        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleClickOutside() {
        setTimeout(() => setOpen(false), 150);
    }

    // Render loading state, login button, or user dropdown
    return (
        <main className="relative w-min h-min">
            {loading ? (
                <div>Loading...</div> // Optionally display a loading indicator
            ) : auth ? (
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

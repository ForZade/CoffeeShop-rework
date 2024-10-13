import UserDropdown from "./UserDropdown";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function UserBubble({ roles }: { roles: string[] }) {
    const [open, setOpen] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);

    async function checkStatus() {
        let response;

        try {
            response = await axios.get(`http://localhost:7000/api/v1/auth/status`, { withCredentials: true });
            if (response.data.authorized) {
                console.log(response.data.authorized);
                setAuthenticated(true);
            }
            else {
                setAuthenticated(false);
            }
        }
        catch(err: unknown) {
            console.log(err);
        }   
    }

    useEffect(() => {
        checkStatus();
    }, []);

    function handleClickOutside() {
        setTimeout(() => setOpen(false), 150);
    }

    return (
        <main className="relative w-min h-min">
            {
                authenticated 
                ?
                <div className="w-12 h-12 rounded-full border bg-blue-500" onClick={() => setOpen(!open)}>
                    <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" alt="LG" className="w-full h-full rounded-full aspect-square"/>
                </div>
                :
                <Link to="/login" className="px-3 py-1 text-base font-semibold text-white bg-blue-500 rounded-full">
                    Login
                </Link>
            }

            <UserDropdown open={open} toggle={handleClickOutside} roles={roles}/>
        </main>
    )
}
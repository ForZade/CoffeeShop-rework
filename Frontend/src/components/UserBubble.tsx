import UserDropdown from "./UserDropdown";
import { useState } from "react";

export default function UserBubble({ roles }: { roles: string[] }) {
    const [open, setOpen] = useState(false);

    function handleClickOutside() {
        setTimeout(() => setOpen(false), 150);
    }

    return (
        <main className="relative w-min h-min">
            <div className="w-12 h-12 rounded-full border bg-blue-500" onClick={() => setOpen(!open)}>
                <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" alt="LG" className="w-full h-full rounded-full aspect-square"/>
            </div>

            <UserDropdown open={open} toggle={handleClickOutside} roles={roles}/>
        </main>
    )
}
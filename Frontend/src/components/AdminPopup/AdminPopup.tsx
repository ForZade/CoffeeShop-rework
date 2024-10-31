import { useState, useEffect, useRef } from "react";
import axios from "axios";

import { usePopup } from "../../contexts/PopupContext";

import AdminList from "./AdminList";
import AdminSearch from "./AdminSearch";


export default function AdminPopup() {
    const { adminOpen, toggleAdmin } = usePopup();
    const [admins, setAdmins] = useState([]);
    const adminRef = useRef<HTMLDivElement>(null);

    const getAdmins = async () => {
        try {
            const response = await axios.get("http://localhost:7000/api/v1/users/admins", { withCredentials: true });
            setAdmins(response.data.data);
        } 
        catch (error) {
            console.error('Error:', error);
        }
    }

    const addAdmin = async (id: number) => {
        try {
            await axios.post(`http://localhost:7000/api/v1/users/admins/${id}`, {}, { withCredentials: true });
            await getAdmins();
        }
        catch (err) {
            console.log(err);
        }
    }

    const removeAdmin = async (id: number) => {
        try {
            await axios.delete(`http://localhost:7000/api/v1/users/admins/${id}`, { withCredentials: true });
            await getAdmins();
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (adminRef.current && !adminRef.current.contains(event.target as Node)) {
                console.log("Clicked outside dropdown");
                toggleAdmin();
            }
        }

        if (adminOpen) {
            document.addEventListener("pointerdown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("pointerdown", handleClickOutside);
        };
    }, [adminOpen, toggleAdmin]);

    return (
        <main className="w-screen h-screen bg-zinc-950 bg-opacity-40 grid place-items-center absolute top-0 left-0 px-8 py-24 z-20">
            <div className="w-full sm:w-[520px] h-full sm:max-h-[720px] bg-slate-100 dark:bg-zinc-700 rounded-3xl shadow-lg flex flex-col px-4 py-4" ref={adminRef}>
                <AdminSearch addAdmin={addAdmin}/>

                <AdminList getAdmins={getAdmins} admins={admins} removeAdmin={removeAdmin}/>
            </div>
        </main>
    )
}
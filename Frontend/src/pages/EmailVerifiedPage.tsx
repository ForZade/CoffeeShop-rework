import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';



export default function EmailVerified() {
    const { token } = useParams();
    const [verify, setVerify] = useState(false);

    async function getEmail() {
        try {
        const response = await axios.post(`http://localhost:7000/api/v1/auth/verify/${token}`, { withCredentials: true });

        if(response.status == 200){
            setVerify(true)
        }
        } catch (error) {
        console.error('Error fetching user status:', error);
        }
    }

    useEffect(() => {
        getEmail()
    }, [])


    return (
        verify &&
        <h1 className="text-3xl font-bold underline text-black">
            Email verified.
        </h1>
    )
} 
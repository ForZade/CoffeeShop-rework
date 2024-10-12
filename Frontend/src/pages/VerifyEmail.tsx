import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import axios from 'axios';

export default function VerifyEmail() {
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    const token = Cookies.get('jwt');
    if (token) {
      try {
        const decodedToken: { email: string } = jwtDecode(token);
        setEmail(decodedToken.email);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:7000/api/v1/auth/resend-verify', { email });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold underline text-black">Email verification sent.</h1>
      <form onSubmit={handleSubmit}>
        <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
          Click here to resend email.
        </button>
      </form>
    </>
  );
}
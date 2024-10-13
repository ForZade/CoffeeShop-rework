import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function VerifyEmail() {
  const [email, setEmail] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const navigate = useNavigate();

  async function getEmail() {
    try {
      const response = await axios.get('http://localhost:7000/api/v1/auth/status', {
        withCredentials: true
      });

      if (response.data.authorized) {
        setEmail(response.data.data.email);
        setRole(response.data.data.roles);
        console.log(response.data.data.email);
      }
    } catch (error) {
      console.error('Error fetching user status:', error);
    }
  }

  useEffect(() => {
    if (role === 'user') {
      navigate('/verified');
    }
  }, [role, navigate]);

  useEffect(() => {
    getEmail();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:7000/api/v1/auth/resend-verify', { email }, { withCredentials: true });
    } catch (error) {
      console.error('Error resending verification email:', error);
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
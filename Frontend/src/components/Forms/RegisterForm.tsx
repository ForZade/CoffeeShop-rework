import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegistrationForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeat_password, setCPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
  const [first_name, setFirsName] = useState("");
  const [last_name, setLastName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post("http://localhost:7000/api/v1/auth/register", { 
        email, 
        password, 
        repeat_password, 
        first_name, 
        last_name 
      });

      navigate("/login");
    } catch (err: any) {
      if (err.response?.data?.errors) {
        const errorMessages = err.response.data.errors.map((error: any) => error.msg).join(", ");
        setError(errorMessages);
        console.log(err.response.data);
      } else {
        setError("An error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-zinc-700">
      <div className="w-full max-w-md p-8 space-y-6 bg-slate-200 dark:bg-zinc-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-black dark:text-white">Register</h2>

        {/* Display error message */}
        {error && <div className="text-red-500 text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black dark:text-white">First Name:</label>
            <input
              type="text"
              name="first_name"
              value={first_name}
              onChange={(event) => setFirsName(event.target.value)}
              className="mt-1 block w-full p-2 border border-slate-300 dark:border-zinc-950 bg-slate-50 dark:bg-zinc-900 text-black dark:text-white rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black dark:text-white">Last Name:</label>
            <input
              type="text"
              name="last_name"
              value={last_name}
              onChange={(event) => setLastName(event.target.value)}
              className="mt-1 block w-full p-2 border border-slate-300 dark:border-zinc-950 bg-slate-50 dark:bg-zinc-900 text-black dark:text-white rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black dark:text-white">Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 block w-full p-2 border border-slate-300 dark:border-zinc-950 bg-slate-50 dark:bg-zinc-900 text-black dark:text-white rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black dark:text-white">Password:</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-1 block w-full p-2 border border-slate-300 dark:border-zinc-950 bg-slate-50 dark:bg-zinc-900 text-black dark:text-white rounded-md focus:ring focus:ring-blue-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-600 hover:text-gray-800" // Change here
                style={{ textDecoration: "none" }} // Remove underline
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-black dark:text-white">Confirm Password:</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={repeat_password}
                onChange={(event) => setCPassword(event.target.value)}
                className="mt-1 block w-full p-2 border border-slate-300 dark:border-zinc-950 bg-slate-50 dark:bg-zinc-900 text-black dark:text-white rounded-md focus:ring focus:ring-blue-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-600 hover:text-gray-800" // Change here
                style={{ textDecoration: "none" }} // Remove underline
              >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          
          {/* Disable button and show loading text when submitting */}
          <button type="submit" disabled={loading} className="w-full py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}

import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate(); // temp

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post("http://localhost:7000/api/v1/auth/login", { email, password }, { withCredentials: true });
            console.log("Login successful!", response.data);
        } catch (err: any) {
            if (err.response) {
                console.error("Response error:", err.response.data);
                if (err.response.data.errors) {
                    const errorMessages = err.response.data.errors.map((err: any) => err.msg).join(", ");
                    setError(errorMessages);
                } else {
                    setError(err.response.data.message || "An error occurred.");
                }
            } else {
                console.error("Error message:", err.message);
                setError("An error occurred.");
            }
        } finally {
            setLoading(false);
            navigate("/");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <form onSubmit={handleSubmit} className="w-1/3 p-6 shadow-lg rounded bg-white">
                <h2 className="text-2xl font-bold mb-4">Login</h2>

                {error && <div className="text-red-500 mb-4">{error}</div>}

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 w-full"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 w-full"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prevState) => !prevState)}
                            className="absolute inset-y-0 right-0 px-3 py-2 text-gray-600"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded w-full"
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <div className="text-right mt-4">
                    <Link to="/reset-password" className="text-blue-500 hover:underline">
                        Forgot Password?
                    </Link>
                </div>
            </form>
        </div>
    );
}

import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:7000/api/v1/auth/login",
        {
          email,
          password,
          remember: rememberMe,
        },
        { withCredentials: true }
      );

      console.log("Login successful!", response.data);
      navigate("/");
    } catch (err: any) {
      if (err.response) {
        console.error("Response error:", err.response.data);
        if (err.response.data.errors) {
          const errorMessages = err.response.data.errors
            .map((err: any) => err.msg)
            .join(", ");
          setError(errorMessages);
        } else {
          setError(err.response.data.message || "An error occurred.");
        }
      } else {
        console.error("Error message:", err.message);
        setError("An error occurred.");
      }

      // clears the input field if it's incorrect
      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  return (
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-2"
      >
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="">
          <label htmlFor="email" className="block text-black dark:text-white">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border-b-2 border-white bg-transparent w-full outline-none dark:text-white"
            required
          />
        </div>

        <div className="">
          <label htmlFor="password" className="block text-black dark:text-white">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border-b-2 border-white bg-transparent w-full outline-none dark:text-white"
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

        <div className="text-center mt-4">
          <Link to="/reset-password" className="text-blue-500 hover:underline">
            Forgot Password?
          </Link>
        </div>

        <div className="mb-4 flex items-center justify-center">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="rememberMe" className="text-gray-700">
            Remember Me
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded w-full"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
  );
}

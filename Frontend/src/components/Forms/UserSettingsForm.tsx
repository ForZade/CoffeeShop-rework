import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserSettingsForm() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:7000/api/v1/auth/status", { withCredentials: true });
        
        if (response.data.authorized) {
          setUser({
            first_name: response.data.data.first_name,
            last_name: response.data.data.last_name,
            email: response.data.data.email,
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
          setIsLoggedIn(true);
        } else {
          navigate("/");
        }
      } catch (err) {
        setError("Failed to load user data. Please try again.");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:7000/api/v1/auth/logout", {}, { withCredentials: true });
      setUser({
        first_name: "",
        last_name: "",
        email: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setIsLoggedIn(false);
      setLogoutMessage("Logout successful... redirecting");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setError("Failed to log out. Please try again.");
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    const { currentPassword: password, newPassword, confirmPassword } = user; 

    // Basic client-side validation
    if (newPassword !== confirmPassword) {
      return setError("New password and confirm password do not match.");
    }

    setLoading(true); // Set loading state to true
    try {
      await axios.post(
        "http://localhost:7000/api/v1/auth/password/settings-change",
        { password, newPassword, confirmPassword },
        { withCredentials: true }
      );
      setPasswordMessage("Password changed successfully");
      // Clear password fields
      setUser((prevUser) => ({
        ...prevUser,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
      setError(""); // Clear any previous error messages
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to change password. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-100 dark:bg-zinc-700">
      {error && <p className="text-red-500">{error}</p>}
      {logoutMessage && <p className="text-green-500">{logoutMessage}</p>}
      {passwordMessage && <p className="text-green-500">{passwordMessage}</p>}

      <form className="w-1/3 p-6 shadow-lg rounded bg-slate-200 dark:bg-zinc-800" onSubmit={changePassword}>
        <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">User Settings</h2>

        {/* First Name */}
        <div className="mb-4">
          <label className="block mb-2 text-black dark:text-white">First Name</label>
          <input
            type="text"
            name="first_name"
            value={user.first_name}
            onChange={handleChange}
            className="mt-1 p-2 border border-slate-300 dark:border-zinc-900 bg-slate-100 dark:bg-zinc-900 w-full"
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label className="block mb-2 text-black dark:text-white">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={user.last_name}
            onChange={handleChange}
            className="mt-1 p-2 border border-slate-300 dark:border-zinc-900 bg-slate-100 dark:bg-zinc-900 w-full"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-2 text-black dark:text-white">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="mt-1 p-2 border border-slate-300 dark:border-zinc-900 bg-slate-100 dark:bg-zinc-900 w-full"
          />
        </div>

        {/* Change Password Section */}
        <div className="space-y-3 mb-4">
          <label className="text-lg font-semibold text-black dark:text-white">Change Password</label>

          {/* Current Password */}
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              name="currentPassword"
              value={user.currentPassword}
              onChange={handleChange}
              placeholder="Current Password"
              className="block w-full p-2 border border-slate-300 dark:border-zinc-900 bg-slate-100 dark:bg-zinc-900"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prevState) => !prevState)}
              className="absolute inset-y-0 right-0 px-3 py-2 text-gray-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* New Password */}
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              value={user.newPassword}
              onChange={handleChange}
              placeholder="New Password"
              className="block w-full p-2 border border-slate-300 dark:border-zinc-900 bg-slate-100 dark:bg-zinc-900"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prevState) => !prevState)}
              className="absolute inset-y-0 right-0 px-3 py-2 text-gray-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm New Password"
              className="block w-full p-2 border border-slate-300 dark:border-zinc-900 bg-slate-100 dark:bg-zinc-900"
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

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full p-2 bg-blue-500 text-white rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Settings"}
        </button>
      </form>

      <div className="flex justify-center mt-4 space-x-4">
        <button onClick={handleLogout} className="p-2 text-blue-600">Logout</button>
      </div>
    </div>
  );
}

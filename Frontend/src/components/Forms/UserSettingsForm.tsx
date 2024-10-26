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

  const [initialUserData, setInitialUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [nameMessage, setNameMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
    const [lastNameChangeTime, setLastNameChangeTime] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:7000/api/v1/auth/status", { withCredentials: true });

        if (response.data.authorized) {
          const { first_name, last_name, email } = response.data.data;
          setUser({
            first_name,
            last_name,
            email,
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
          setInitialUserData({ first_name, last_name, email });
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

    // Validate name fields to allow only letters
    if (name === "first_name" || name === "last_name") {
      const isValid = /^[A-Za-z]+$/.test(value);
      if (!isValid && value !== "") {
        setError("Names should contain letters only.");
        return;
      } else {
        setError(""); // Clear error if the input is valid
      }
    }

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

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        await axios.delete("http://localhost:7000/api/v1/auth/delete", { withCredentials: true });
        setLogoutMessage("Account deleted successfully... redirecting");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (err) {
        setError("Failed to delete account. Please try again.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const { first_name, last_name, currentPassword, newPassword, confirmPassword } = user;
    
    const FIVE_MINUTES = 5 * 60 * 1000;
    const currentTime = new Date().getTime();

    try {
      let nameChanged = false;

      if (first_name !== initialUserData.first_name || last_name !== initialUserData.last_name) {
        if (lastNameChangeTime && currentTime - lastNameChangeTime < FIVE_MINUTES) {
          setError("Name change allowed once every 5 minutes. Please wait.");
          setLoading(false);
          return;
        }
        
        await axios.post(
          "http://localhost:7000/api/v1/auth/change-name",
          { first_name, last_name },
          { withCredentials: true }
        );
        setNameMessage("Name changed successfully");
        nameChanged = true;
        
        setLastNameChangeTime(currentTime);
      } else {
        setNameMessage("New name is the same as the current name. No changes made.");
      }

      // Handle password change
      if (newPassword) {
        if (newPassword !== confirmPassword) {
          return setError("New password and confirm password do not match.");
        }
        await axios.post(
          "http://localhost:7000/api/v1/auth/password/settings-change",
          { password: currentPassword, newPassword, confirmPassword },
          { withCredentials: true }
        );
        setPasswordMessage("Password changed successfully");
        setUser((prevUser) => ({
          ...prevUser,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }));
      }

      if (nameChanged || (newPassword && newPassword === confirmPassword)) {
        setError("");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to update settings. Please try again.");
      setNameMessage("");
      setPasswordMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p className="text-red-500 flex justify-center">{error}</p>}
      {logoutMessage && <p className="text-green-500 flex justify-center">{logoutMessage}</p>}
      {passwordMessage && <p className="text-green-500 flex justify-center">{passwordMessage}</p>}
      {nameMessage && <p className="text-green-500 flex justify-center">{nameMessage}</p>}
      
      {/* Flex container for centering the form */}
      <div className="flex justify-center mt-4">
        <form className="w-1/3 max-w-sm p-6 shadow-lg rounded bg-slate-200 dark:bg-zinc-800" onSubmit={handleSubmit}>
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
              readOnly
              className="mt-1 p-2 border border-slate-300 dark:border-zinc-900 bg-slate-100 dark:bg-zinc-900 w-full cursor-not-allowed"
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
  
          {/* Submit Button for Password and Name Change */}
          <button
            type="submit"
            className={`w-full p-2 bg-blue-500 text-white rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? "Updating..." : "Apply Changes"}
          </button>
        </form>
      </div>
  
      <div className="flex justify-center mt-4 space-x-4">
        <button onClick={handleLogout} className="p-2 text-blue-600">Logout</button>
        <button onClick={handleDeleteAccount} className="p-2 text-red-600">Delete Account</button>
      </div>
    </div>
  );
}

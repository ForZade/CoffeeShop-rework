import { Route, RouterProvider, createRoutesFromElements, createBrowserRouter } from "react-router-dom";

// Layouts
import MainLayout from "./layouts/MainLayout";

// Pages
import HomePage from "./pages/HomePage";
import LoginForm from "./components/Forms/LoginForm";
import ResertPassword from "./pages/ResetPasswordPage";
import ContactsForm from "./pages/ContactsPage";
import EmailVerified from "./pages/EmailVerifiedPage";
import VerifyEmail from "./pages/VerifyEmailPage";
import RegisterForm from "./components/Forms/RegisterForm";

import { ThemeProvider } from "./contexts/ThemeContext";

const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/reset-password" element={<ResertPassword />} />
            <Route path="/contacts" element={<ContactsForm/>} />
            <Route path="/verified" element={<EmailVerified/>} />
            <Route path="/verify" element={<VerifyEmail/>} />

        </Route>
    )
)

export default function app() {
    return (
        <ThemeProvider>
            <RouterProvider router={routes} />
        </ThemeProvider>
    )
}
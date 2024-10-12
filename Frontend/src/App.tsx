import { Route, RouterProvider, createRoutesFromElements, createBrowserRouter } from "react-router-dom";

// Layouts
import MainLayout from "./layouts/MainLayout";

// Pages
import HomePage from "./pages/HomePage";
import ContactsPage from "./pages/ContactsPage";
import EmailVerified from "./pages/EmailVerified";
import VerifyEmail from "./pages/VerifyEmail";
import { ThemeProvider } from "./contexts/ThemeContext";

const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/contacts" element={<ContactsPage/>} />
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
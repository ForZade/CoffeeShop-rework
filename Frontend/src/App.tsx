import { Route, RouterProvider, createRoutesFromElements, createBrowserRouter } from "react-router-dom";

// Layouts
import MainLayout from "./layouts/MainLayout";

// Pages
import HomePage from "./pages/HomePage";
import LoginForm from "./components/LoginForm";
import { ThemeProvider } from "./contexts/ThemeContext";

const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginForm />} />
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
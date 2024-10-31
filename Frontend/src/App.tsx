import { Route, RouterProvider, createRoutesFromElements, createBrowserRouter } from "react-router-dom";

// Layouts
import MainLayout from "./layouts/MainLayout";

// Pages
import HomePage from "./pages/HomePage";
import ResetPassword from "./pages/ResetPasswordPage";
import ContactsPage from "./pages/ContactsPage";
import EmailVerified from "./pages/EmailVerifiedPage";
import VerifyEmail from "./pages/VerifyEmailPage";
import ProductPage, { ProductLoader } from "./pages/ProductPage";
import PurchasePage from "./pages/PurchasePage";
import PageNotFound from "./pages/PageNotFound";
import ShopPage, { ProductsLoader } from "./pages/ShopPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";


import { ThemeProvider } from "./contexts/ThemeContext";
import CheckoutPage from "./pages/CheckoutPage";
import ProtectedLayout from "./layouts/ProtectedLayout";
import ProductLayout from "./layouts/ProductLayout";


const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />

            <Route element={<ProtectedLayout />}>
                <Route path="/purchase" element={<PurchasePage/>}/>
                <Route path="/checkout" element={<CheckoutPage/>}/>
            </Route>

            <Route path="/products" element={<ProductLayout />}> {/* Will show additional recomended products */}
                <Route index element={<ShopPage />} loader={ProductsLoader}/>
                <Route path=":id" element={<ProductPage />} loader={ProductLoader}/>
            </Route>

            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/verify/:token" element={<EmailVerified/>} />
            <Route path="/verify" element={<VerifyEmail/>} />

            <Route path="/contacts" element={<ContactsPage/>} />

            <Route path="*" element={<PageNotFound />} />

            <Route path="/register" element={<RegisterPage/>} />
            <Route path="/login" element={<LoginPage />} />
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
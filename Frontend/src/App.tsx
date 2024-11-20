import { Route, RouterProvider, createRoutesFromElements, createBrowserRouter } from "react-router-dom";

// Context
import { ThemeProvider } from "./contexts/ThemeContext";


// Loaders
import productsLoader from "./loaders/products/ProductsLoader";
import productLoader from "./loaders/products/ProductLoader";
import cartLoader from "./loaders/cart/CartLoader";
import transactionsLoader from "./loaders/settings/TransactionsLoader";
import transactionLoader from "./loaders/TransactionLoader";

// Layouts
import MainLayout from "./layouts/MainLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import ProductLayout from "./layouts/ProductLayout";
import SettingsLayout from "./layouts/SettingsLayout";
import CartLayout from "./layouts/CartLayout";

// Pages
import HomePage from "./pages/HomePage";
import CartPage from "./pages/cart/CartPage";
import CheckoutPage from "./pages/cart/CheckoutPage";
import ProductsPage from "./pages/products/ProductsPage";
import ProductPage from "./pages/products/ProductPage";
import VerifyPage from "./pages/verification/VerifyPage";
import VerifiedPage from "./pages/verification/VerifiedPage";
import ContactsPage from "./pages/ContactsPage";
import UserSettingsPage from "./pages/settings/UserSettingsPage";
import PasswordSettingsPage from "./pages/settings/PasswordSettingsPage";
import TransactionListPage from "./pages/settings/TransactionListPage";
import TransactionPage from "./pages/settings/TransactionPage";
import ResetPasswordPage from "./pages/password/ResetPasswordPage";

import PageNotFound from "./pages/PageNotFound";

const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />

            <Route element={<ProtectedLayout />}>
                <Route path="/krepselis" element={<CartLayout />} loader={cartLoader}>
                    <Route index element={<CartPage/>} />
                    <Route path="atsiskaitymas" element={<CheckoutPage />} />
                </Route>
            </Route>

            <Route path="/produktai" element={<ProductLayout />}> {/* Will show additional recomended products */}
                <Route index element={<ProductsPage />} loader={productsLoader}/>
                <Route path=":category" element={<ProductsPage />} loader={productsLoader}/>
                <Route path=":category/:id" element={<ProductPage />} loader={productLoader}/>
            </Route>

            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
            <Route path="/verify/:token" element={<VerifiedPage/>} />
            <Route path="/verify" element={<VerifyPage/>} />

            <Route path="/kontaktai" element={<ContactsPage/>} />
            
            <Route path="/nustatymai" element={<SettingsLayout />}>
                <Route index element={<UserSettingsPage />} />
                <Route path="slaptazodis" element={<PasswordSettingsPage />} />
                <Route path="pirkimai" element={<TransactionListPage />} loader={transactionsLoader}/>
            </Route>

            <Route path="/nustatymai/pirkimai/:id" element={<TransactionPage />} loader={transactionLoader}/>

            <Route path="*" element={<PageNotFound />} />
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
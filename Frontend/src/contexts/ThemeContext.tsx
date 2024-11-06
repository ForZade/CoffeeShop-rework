import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { AuthProvider } from "./AuthContext";
import { CartProvider } from "./CartContext";
import { PopupProvider } from "./PopupContext";
import { DiscountProvider } from "./DiscountContext";

interface ThemeContextProps {
    theme: string;
    setTheme?: (theme: string) => void;
    toggleTheme?: () => void;
}

const defaultContextValue: ThemeContextProps = {
    theme: 'light',
};

export const ThemeContext = createContext<ThemeContextProps>(defaultContextValue);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<string>("light");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
    }, []);

    const toggleTheme = useCallback(() => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <AuthProvider>
                <CartProvider>
                    <PopupProvider>
                        <DiscountProvider>
                            {children}
                        </DiscountProvider>
                    </PopupProvider>
                </CartProvider>
            </AuthProvider>
        </ThemeContext.Provider>
    );
};

const useTheme = () => useContext(ThemeContext);

// eslint-disable-next-line react-refresh/only-export-components
export { ThemeProvider, useTheme };

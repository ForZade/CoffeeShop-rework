import { createContext, useContext, useEffect, useState, useCallback } from "react";

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
    }, []); // Empty dependency array ensures it runs only once.

    // Use useCallback to memoize the toggleTheme function
    const toggleTheme = useCallback(() => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    }, [theme]); // Add theme as a dependency to recalculate when it changes.

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

const useTheme = () => useContext(ThemeContext);

export { ThemeProvider, useTheme };

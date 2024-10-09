import { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextProps {
    theme: string;
    setTheme?: () => void;
    toggleTheme?: () => void;
}

const defaultContextValue: ThemeContextProps = {
    theme: 'light',
    setTheme: () => {},
};

export const ThemeContext = createContext<ThemeContextProps>(defaultContextValue);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        setTheme(localStorage.getItem("theme") || "light");
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
                {children}
        </ThemeContext.Provider>
    )
}

const useTheme = () => useContext(ThemeContext);

export { ThemeProvider, useTheme }
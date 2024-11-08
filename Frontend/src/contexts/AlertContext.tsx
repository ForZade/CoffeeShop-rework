import { createContext, useContext, useState } from "react";

interface AlertContextProps {
    alert: {
        success?: {
            message: string;
        };
        error?: {
            message: string;
        };
    };

    window: string | null;

    successAlert: (message: string) => void;
    errorAlert: (message: string) => void;

    adminWindow: () => void;
    discountWindow: () => void;
    closeWindow: () => void;
}

const defaultContextValue: AlertContextProps = {
    alert: {},

    window: '',

    successAlert: async () => {},
    errorAlert: async () => {},

    adminWindow: async () => {},
    discountWindow: async () => {},
    closeWindow: async () => {},
};

export const AlertContext = createContext<AlertContextProps>(defaultContextValue);

const AlertProvider = ({ children }: { children: React.ReactNode }) => {
    const [alert, setAlert] = useState<AlertContextProps["alert"]>(defaultContextValue.alert);
    const [window, setWindow] = useState<AlertContextProps["window"]>(defaultContextValue.window);

    const successAlert = async (message: string) => {
        console.log('Success command ran')
        setAlert({
            success: { message },
        });

        const timer = setTimeout(() => {
            setAlert({});
        }, 5000)

        return () => clearTimeout(timer);
    };

    const errorAlert = async (message: string) => {
        setAlert({
            error: { message },
        });

        const timer = setTimeout(() => {
            setAlert({});
        }, 5000)

        return () => clearTimeout(timer);
    };

    const adminWindow = async () => {
        setWindow('admin');
    };

    const discountWindow = async () => {
        setWindow('discount');
    };

    const closeWindow = async () => {
        setWindow(null);
    };

    return (
        <AlertContext.Provider value={{ alert, window, successAlert, errorAlert, adminWindow, discountWindow, closeWindow }}>
            {children}
        </AlertContext.Provider>
    );
};

const useAlert = () => useContext(AlertContext);

export { AlertProvider, useAlert };

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

    modal: string | null;
    action: "" | "add" | "edit";
    product: {
        category: string;
        id: string | number;
    }

    successAlert: (message: string) => void;
    errorAlert: (message: string) => void;

    adminModal: () => void;
    discountModal: () => void;
    productModal: (action: "" | "add" | "edit", id?: string | number, category?: string) => void;

    passwordModal: () => void;

    closeModal: () => void;
}

const defaultContextValue: AlertContextProps = {
    alert: {},

    modal: '',
    action: '',
    product: {
        category: '',
        id: '',
    },

    successAlert: async () => {},
    errorAlert: async () => {},

    adminModal: async () => {},
    discountModal: async () => {},
    productModal: async () => {},

    passwordModal: async () => {},

    closeModal: async () => {},
};

export const AlertContext = createContext<AlertContextProps>(defaultContextValue);

const AlertProvider = ({ children }: { children: React.ReactNode }) => {
    const [alert, setAlert] = useState<AlertContextProps["alert"]>(defaultContextValue.alert);
    const [modal, setModal] = useState<AlertContextProps["modal"]>(defaultContextValue.modal);
    const [action, setAction] = useState<"" | "add" | "edit">('');
    const [product, setProduct] = useState<{ category: string; id: string | number; }>({
        category: '',
        id: '',
    });

    const successAlert = async (message: string) => {
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

    const adminModal = async () => {
        if (modal === 'admin') {
            return setModal(null);
        }
        console.log('admin modal');
        return setModal('admin');
    };

    const discountModal = async () => {
        if (modal === 'discount') {
            return setModal(null);
        }

        return setModal('discount');
    };

    const productModal = async (action: "" | "add" | "edit", id?: string | number, category?: string) => {
        if (modal === 'product') {
            setProduct({
                category: '',
                id: '',
            });
            setAction('');
            return setModal(null);
        }

        if (id && category) {
            setProduct({
                category,
                id,
            });
        }
        setAction(action);
        return setModal('product');
    };

    const passwordModal = async () => {
        if (modal === 'password') {
            return setModal(null);
        }

        return setModal('password');
    }

    const closeModal = async () => {
        setProduct({
            category: '',
            id: '',
        });
        setAction('');
        return setModal('');
    };

    return (
        <AlertContext.Provider value={{ alert, modal, successAlert, errorAlert, adminModal, discountModal, productModal, closeModal, action, passwordModal, product }}>
            {children}
        </AlertContext.Provider>
    );
};

const useAlert = () => useContext(AlertContext);

export { AlertProvider, useAlert };

import { createContext, useContext, useState, useCallback } from "react";

interface PopupContextProps {
    adminOpen: boolean;
    toggleAdmin: () => void;
    discountOpen: boolean;
    toggleDiscount: () => void;
}

const defaultContextValue: PopupContextProps = {
    adminOpen: false,
    toggleAdmin: async () => {},
    discountOpen: false,
    toggleDiscount: async () => {},
};

export const PopupContext = createContext<PopupContextProps>(defaultContextValue);

const PopupProvider = ({ children }: { children: React.ReactNode }) => {
    const [adminOpen, setAdminOpen] = useState<boolean>(false);
    const [discountOpen, setDiscountOpen] = useState<boolean>(false);

    const toggleAdmin = useCallback(() => {
        setAdminOpen(!adminOpen);
    }, [adminOpen]);

    const toggleDiscount = useCallback(() => {
        setDiscountOpen(!discountOpen);
    }, [discountOpen]);

    return (
        <PopupContext.Provider value={{ adminOpen, toggleAdmin, discountOpen, toggleDiscount }}>
            {children}
        </PopupContext.Provider>
    );
};

const usePopup = () => useContext(PopupContext);

// eslint-disable-next-line react-refresh/only-export-components
export { PopupProvider, usePopup };

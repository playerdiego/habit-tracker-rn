import { createContext, useState } from "react";

interface UIContextProps {
    loading: string | null,
    setLoading: React.Dispatch<React.SetStateAction<string | null>> 
};

export const UIContext = createContext<UIContextProps>({} as UIContextProps);

export const UIProvider = ({children}: {children: React.ReactNode}) => {

    const [loading, setLoading] = useState<string | null>(null);

    return (
        <UIContext.Provider value={{
            loading,
            setLoading
        }}>
            {children}
        </UIContext.Provider>
    )

}
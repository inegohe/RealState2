import { createContext, useContext, ReactNode, useState } from "react";
import { useAppwrite } from "@/lib/useAppwrite";
import { getCurrentUser } from '@/lib/appwrite';

interface User {
    $id: string;
    name: string;
    email: string;
    avatar: string;
}

interface GlobalContextType {
    isLoggedIn: boolean;
    user: User | null;
    loading: boolean;
    refetch: () => void;
    setLoading: any;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined)

export const GlobalProvider = ({children}: { children: ReactNode}) => {

    const {
        data: user,
        loading,
        refetch
    } = useAppwrite({
        fn: getCurrentUser,
    })

    // const refetch = () => {\

    // }

    // const [loading, setLoading] = useState(true);

    // const isLoggedIn = false;

    // const user = null;

    return (
        <GlobalContext.Provider 
        value={{
            isLoggedIn,
            user,
            loading,
            refetch,
            setLoading
        }}>
        {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = (): GlobalContextType => {
    const context = useContext(GlobalContext);

    if(!context) {
        throw new Error('useGlobalContext must be within a GlobalProvider');
    }

    return context
}

export default GlobalProvider;
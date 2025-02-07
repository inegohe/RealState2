import { createContext, useContext, ReactNode } from "react";
import { useAppwrite } from "./useAppwrite";
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
}

const defaultContextValue: GlobalContextType = {
    isLoggedIn: false,
    user: null,
    loading: false,
    refetch: () => {},
  };

const GlobalContext = createContext<GlobalContextType | undefined>
(defaultContextValue)

export const GlobalProvider = ({children}: { children: ReactNode}) => {

    const {
        data: user,
        loading,
        refetch
    } = useAppwrite({
        fn: getCurrentUser,
    })

    const isLoggedIn = !!user;

    console.log(JSON.stringify(user, null, 2))

    return (
        <GlobalContext.Provider 
        value={{
            isLoggedIn,
            user,
            loading,
            refetch
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
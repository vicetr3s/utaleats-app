import {createContext, useContext} from 'react';

interface AuthContextType {
    userId: string | null;
    setUserId: (id: string | null) => void;
    userCity: string | null;
    setUserCity: (city: string | null) => void;
    userName: string | null;
    setUserName: (name: string | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuthContext(): AuthContextType {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuthContext must be used within an AuthContext.Provider');
    }

    return context;
}
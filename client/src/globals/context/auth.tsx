import { useContext, createContext, useState, Dispatch } from "react";

interface AuthValue {
    users: string[];
    isAuthUser: boolean;
    registerUser: (email: string) => void;
    setIsAuthUser: Dispatch<React.SetStateAction<boolean>>;
}

const defaultAuthValue = {
    users: [],
    isAuthUser: false,
    registerUser: () => null,
    setIsAuthUser: () => null
}

const AuthContext = createContext<AuthValue>(defaultAuthValue);

const useAuthContext = () => useContext(AuthContext);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [users, saveUsers] = useState<string[]>([]);
    const [isAuthUser, setIsAuthUser] = useState(false);

    const registerUser = (email: string) => {
        const prevUsers = JSON.parse(localStorage.getItem('users') || '[]') as string[];
        saveUsers([...prevUsers, email])
    }

    return (
        <AuthContext.Provider value={{ users, registerUser, isAuthUser, setIsAuthUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContextProvider, useAuthContext }
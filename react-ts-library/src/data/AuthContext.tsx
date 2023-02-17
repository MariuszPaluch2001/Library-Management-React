import { createContext } from 'react';
import { UserLogin } from './Interfaces';

interface AuthContextI{
    user: UserLogin | null | undefined;
    setUser: (user: UserLogin | null | undefined ) => void;
}

export const AuthContext = createContext<AuthContextI>({
    user: null,
    setUser: (user: UserLogin | null | undefined) => {},
});
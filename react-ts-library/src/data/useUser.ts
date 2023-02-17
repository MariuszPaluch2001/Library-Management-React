import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { UserLogin } from './Interfaces';
import { useLocalStorage } from './useLocalStorage';

export const useUser = () => {
    const { user, setUser } = useContext(AuthContext);
    const { setItem } = useLocalStorage();

    const addUser = (user: UserLogin) => {
        setUser(user);
        setItem('user', JSON.stringify(user));
    };

    const removeUser = () => {
        setUser(null);
        setItem('user', '');
    };

    return { user, setUser, addUser, removeUser };
}
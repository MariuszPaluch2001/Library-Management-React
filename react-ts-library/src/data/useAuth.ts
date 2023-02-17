import { useEffect } from 'react';

import { useUser } from './useUser';
import { useLocalStorage } from './useLocalStorage';
import { UserLogin, UserRegister } from './Interfaces';
import { Requests } from '../requests/Requests';

export const useAuth = () => {
    const { user, setUser, addUser, removeUser } = useUser();
    const { getItem } = useLocalStorage();

    useEffect(() => {
        const user = getItem('user');
        if (user) {
            addUser(JSON.parse(user));
        } else{
            removeUser();
        }
    }, []);

    const serverLogin = (userData : UserLogin) => {
        Requests.login(userData).then(res => {
            if (res.res){
                if (res.res["isLogged"]){
                    userData.isSuperUser = res.res["isSuperUser"]
                    addUser(userData) 
                    setUser(userData)
                    alert("Login was successfull")
                }
            } else{
                alert("Login was unsuccessfull.")
            }
            })
        }


    const serverRegister = (userData : UserRegister) => {
        Requests.register(userData).then(res => {
            if (res.res){
                if (res.res["isCreated"]){
                    const new_user = {
                        Login: userData.Login,
                        Password: userData.Password1,
                        isSuperUser: false
                    }
                    addUser(new_user) 
                    setUser(new_user)
                    alert("Regsiter was successfull")
                }
            } else{
                alert("Register was unsuccessfull.")
            }
        })
    }

    const login = (user: UserLogin) => {
        serverLogin(user);
    }

    const register = (user: UserRegister) => {
        serverRegister(user);
    }

    const logout = () => {
        removeUser();
    }

    return { user, setUser, login, register, logout};
};
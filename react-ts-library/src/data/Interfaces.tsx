export interface User {
    userID: number;
    login: string;
    password: string;
    isSuperUser: boolean;
    books: Array< Book | null>;
}

export interface UserLogin {
    Login: string;
    Password: string;
    isSuperUser: boolean;
}

export interface UserRegister{
    Login: string;
    Password1: string;
    Password2: string;
}

export interface Book {
    bookId: number;
    author: string;
    title: string;
    date: number;
    publisher: string;
    user: User | null;
    reserved: string;
    leased: string;
    bookAddTimestamp: string;
    timeStamp: string
}

export interface FormValues {
    author: string;
    title: string;
    publisher: string;
    date: number;
}

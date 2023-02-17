import { Book, FormValues, UserLogin, UserRegister } from "../data/Interfaces";

export function fetchPost(body: any, url: string){
    return fetch(process.env.REACT_APP_API + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'application/json'
        },
        body: JSON.stringify(body)
    })
}

export function fetchPut( body: any, url: string) {
    return fetch(process.env.REACT_APP_API + url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'application/json'
        },
        body: JSON.stringify(body)
    })
}

export function fetchGet(url: string) {
    return fetch(process.env.REACT_APP_API + url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'application/json'
        }
    })
}

export function fetchDelete(body: any, url: string) {
    return fetch(process.env.REACT_APP_API + url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'application/json'
        },
        body: JSON.stringify(body)
    })
}

function setResponseOrError(response: any) {
    if (response.status && response.status !== 200)
        return {err: response};
    return {res: response};
}

export type ErrorResponse = {
    status : number
    message : string
    infoMessage : string
    timestamp : Date
}

export type RegisterResponse = {
    isCreated : boolean
}

export type LoginResponse = {
    isLogged : boolean
    isSuperUser : boolean
}

export interface ReserveRequest {
    login : string | undefined;
    timestamp: string;
}

class GenericResponse <T>{
    res?: T = undefined
    err?: ErrorResponse = undefined
}

export class Requests {
    static async getAllBooks(): Promise<GenericResponse<Book[]>> {
        const response = await fetchGet("Book/GetAllBooks")
            .then(res => res.json())
        return setResponseOrError(response);
    }

    static async getBooksToLease(): Promise<GenericResponse<Book[]>> {
        const response = await fetchGet("Book/GetBooksToLease")
            .then(res => res.json())
        return setResponseOrError(response);
    }
    static async getBooksToReserve(): Promise<GenericResponse<Book[]>> {
        const response = await fetchGet("Book/GetBooksToReserve")
            .then(res => res.json())
        return setResponseOrError(response);
    }
    static async getBooksToReturn(): Promise<GenericResponse<Book[]>> {
        const response = await fetchGet("Book/GetBooksToReturn")
            .then(res => res.json())
        return setResponseOrError(response);
    }

    static async getBooksReservedByUser(login : string | undefined): Promise<GenericResponse<Book[]>> {
        const response = await fetchGet(`Book/GetReservedBooks/${login}`)
            .then(res => res.json())
        return setResponseOrError(response);
    }

    static async getByName(title : string): Promise<GenericResponse<Book[]>> {
        const response = await fetchGet(`Book/Searching/${title}`)
            .then(res => res.json())
        return setResponseOrError(response);
    }
    static async addBook(book : FormValues): Promise<GenericResponse<Response>> {
        const response = await fetchPost(book, "book/AddBook")
        return setResponseOrError(response);
    }
    
    static async updateBook(bookEdited : FormValues, choosenBook : number): Promise<GenericResponse<Response>> {
        const response = await fetchPut(bookEdited, `Book/UpdateBook/${choosenBook}`)
        return setResponseOrError(response);
    }    

    static async deleteBook(bookid : number): Promise<GenericResponse<Response>> {
        const response = await fetchDelete("",`Book/${bookid}`)
        return setResponseOrError(response);
    }

    static async reserveBook(bookd_id : number, reserve : ReserveRequest) : Promise<GenericResponse<Response>>{
        const response = await fetchPut(reserve, `Book/ReserveBook/${bookd_id}`)
        return setResponseOrError(response);
    }

    static async returnBook(bookd_id : number) : Promise<GenericResponse<Response>>{
        const response = await fetchPut('', `Book/ReturnBook/${bookd_id}`)
        return setResponseOrError(response);
    }

    static async leaseBook(bookd_id : number, date : Date | null) : Promise<GenericResponse<Response>>{
        const response = await fetchPut(date, `Book/LeaseBook/${bookd_id}`)
        return setResponseOrError(response);
    }

    static async UndoReserveBook(bookd_id : number) : Promise<GenericResponse<Response>>{
        const response = await fetchPut("", `Book/UndoReserve/${bookd_id}`)
        return setResponseOrError(response);
    }

    static async getAllUsers(): Promise<GenericResponse<string[]>> {
        const response = await fetchGet("User/GetAllUsers")
            .then(res => res.json())
        return setResponseOrError(response);
    }

    static async deleteUser(user : any): Promise<GenericResponse<Response>> {
        const response = await fetchDelete(user, 'User/Delete')
        return setResponseOrError(response);
    }
    static async login(cred : UserLogin): Promise<GenericResponse<LoginResponse>> {
        const response = await fetchPost(cred, "User/Login")
            .then(res => res.json())
        return setResponseOrError(response);
    }
    static async register(cred : UserRegister): Promise<GenericResponse<RegisterResponse>> {
        const response = await fetchPost(cred, "User/Register")
            .then(res => res.json())
        return setResponseOrError(response);
    }
    

}
import { BookListTable } from '../components/BookListTable';
import { useEffect, useState } from "react";
import { Requests } from "../requests/Requests";
import { Book } from "../data/Interfaces";

export function BookList() {
    const [books, setBooks]= useState<Book[]>([]);

    const refreshList = async () => {
      Requests.getAllBooks().then(res => {
        if (res.err) { alert("Could not load boooks.")} 
        else if (res.res) { setBooks(res.res); }
      });
    }

    useEffect(() => {
        refreshList();
    }, []);
    
    return (
      <div className='Container'>
        <BookListTable books = {books}></BookListTable>
      </div>
    );
}
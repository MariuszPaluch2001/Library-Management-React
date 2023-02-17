import { Form, FormControl, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import { Book } from '../data/Interfaces'
import { BookListTable } from '../components/BookListTable';
import { Requests } from '../requests/Requests';

export function FindBook() {
  const [books, setBooks]= useState<Book[]>([]);
  const [searchTerm, setSearchTerm]= useState<string>("");


  const refreshList = async () => {
    Requests.getAllBooks().then(res => {
      if (res.err) { alert("Could not load boooks.")} 
      else if (res.res) { setBooks(res.res); }
    });
  }

  useEffect(() => { refreshList();}, []);

  const getByName = async () => {
    Requests.getByName(searchTerm).then(res => {
      if (res.res){
        setBooks(res.res)
      } else{
        alert("Couldn't get books by name.")
      }
    })

  }

  const handleSearchChange = (e: any) => { setSearchTerm(e.target.value); }

  return (
    <div>
      <br/>
      <Form className="mb-3">
          <FormControl type="text" placeholder="Search by title" className="mr-sm-2" onChange={(e) => handleSearchChange(e)} />
          <br/>
          <Button variant="outline-primary" onClick={getByName}>Search</Button>
      </Form>
      <BookListTable books={books}></BookListTable>
    </div>

  );
}
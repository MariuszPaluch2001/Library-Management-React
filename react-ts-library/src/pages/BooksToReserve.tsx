import { Table } from 'react-bootstrap';

import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Book } from '../data/Interfaces'
import { useAuth } from '../data/useAuth';
import { NotLoggedIn } from '../components/NotLoggedIn';
import { Requests, ReserveRequest } from '../requests/Requests';

export const BooksToReserve = () => {
  const {user} = useAuth();
  const [state, setState]= useState<Book[]>([]);


  const refreshList = async () => {
    Requests.getBooksToReserve().then(res => {
      if (res.err) { alert("Could not load boooks.")} 
      else if (res.res) { setState(res.res); }
    });
  }

  useEffect(() => { refreshList(); }, []);
  
  const reserveBook = (TimeStamp: string, id : number) => {    
    Requests.reserveBook(id, {login : user?.Login, timestamp : TimeStamp} as ReserveRequest).then(res =>{
      if (res.res){
        alert("Book reserved")
        refreshList()
      } else if (res.err?.status == 409){
        alert("Someone just reserve this book. :(")
        refreshList()
      }
      else {
        alert("Book couldn't be reserved.")
      }
    })
  }

  if (user){
  return (
      <Table className='mt-4' striped bordered hover size='sm'>
        <thead>
          <tr>
            <th>Author</th>
            <th>Title</th>
            <th>Date</th>
            <th>Publisher</th>
          </tr>
        </thead>
        <tbody>
          {state.map(item => (
            <tr key={item.bookId}>
              <td>{item.author}</td>
              <td>{item.title}</td>
              <td>{item.date}</td>
              <td>{item.publisher}</td>
              <td>
                <Button className="mr-2" variant="primary" onClick={() => reserveBook(item.timeStamp, item.bookId)}>Reserve</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  } else {
    return(
      <div className="Container">
        <NotLoggedIn></NotLoggedIn>
      </div>
    )
  }
}

export default BooksToReserve;
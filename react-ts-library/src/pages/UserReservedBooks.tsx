import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { NotAllowed } from '../components/NotAllowed';

import { Book } from '../data/Interfaces'
import { useAuth } from '../data/useAuth';
import { Requests } from '../requests/Requests';

export const UserReservedBooks = () => {
  const {user} = useAuth();
  const [state, setState]= useState<Book[]>([]);

  const refreshList = async () => {
    Requests.getBooksReservedByUser(user?.Login).then(res =>{
      if (res.res){
        setState(res.res)
      } else {
        alert("Could not get books reserved by user.")
      }
    })
  }
  const handleUndo = (bookId : number) =>{
    Requests.UndoReserveBook(bookId).then(res =>{
      if (res.res){
        alert("Book is unreserve")
        refreshList()
      } else {
        alert("Book couldn't be unreserved")
      }
    });
    refreshList();
  }
  useEffect(() => {
    refreshList();
  }, []);

  if(user){
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
                <td><Button variant="primary" onClick={() => {
                    handleUndo(item.bookId);
                  }}>Undo</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
    } else{
      return (
        <div className='container'>
            <NotAllowed></NotAllowed>
        </div>
      );
    }
}

export default UserReservedBooks;
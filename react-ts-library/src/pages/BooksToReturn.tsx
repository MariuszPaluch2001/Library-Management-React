import { Table, Button} from 'react-bootstrap';
import { useEffect, useState } from 'react';

import { Book } from '../data/Interfaces'
import { useAuth } from '../data/useAuth';
import { NotAllowed } from '../components/NotAllowed';
import { Requests } from '../requests/Requests';

export const BooksToReturn = () => {
  const {user} = useAuth();
  const [state, setState]= useState<Book[]>([]);


  const refreshList = async () => {
    Requests.getBooksToReturn().then(res => {
      if (res.err) { alert("Could not load boooks.")} 
      else if (res.res) { setState(res.res); }
    });
  }

  useEffect(() => {
    refreshList();
  }, []);

  const returnBook = (id : number) => {
    
    Requests.returnBook(id).then(res =>{
      if (res.res){
        alert("Book returned sucessfuly.")
        refreshList()
      } else {
        alert("Book couldn't be returned")
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
                <Button className="mr-2" variant="primary" onClick={() => returnBook(item.bookId)}>Return</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  } else {
    return(
      <div className="Container">
        <NotAllowed></NotAllowed>
      </div>
    )
  }
}

export default BooksToReturn;
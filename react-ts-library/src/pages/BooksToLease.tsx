import { Modal, Table } from 'react-bootstrap';
import { SetStateAction, useEffect, useState } from 'react';
import Calendar from 'react-calendar';

import { Button } from 'react-bootstrap';
import { Book } from '../data/Interfaces'
import { useAuth } from '../data/useAuth';
import { NotLoggedIn } from '../components/NotLoggedIn';
import { LeaseBookCalendar } from '../components/LeaseBookCalendar';
import { Requests } from '../requests/Requests';

export const BooksToLease = () => {
  const {user} = useAuth();
  const [books, setBooks]= useState<Book[]>([]);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<number>(0);

  const refreshList = async () => {
    Requests.getBooksToLease().then(res => {
      if (res.err) { alert("Could not load boooks.")} 
      else if (res.res) { setBooks(res.res); }
    });
  }

  useEffect(() => {
    refreshList();
  }, []);

  const handleCloseCalendar = () => setShowCalendar(false);
  const handleShowCalendar = () => setShowCalendar(true);
  
  if (user){
  return (
      <div>
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
            {books.map(item => (
              <tr key={item.bookId}>
                <td>{item.author}</td>
                <td>{item.title}</td>
                <td>{item.date}</td>
                <td>{item.publisher}</td>
                <td>
                  <Button className="mr-2" variant="primary" onClick={() => {
                    setSelectedBook(item.bookId);
                    handleShowCalendar();
                    }}>Lease</Button>
                </td>
              </tr>
                          
            ))}
          </tbody>
        </Table>
        <LeaseBookCalendar selectedBook={selectedBook}
          showCalendar={showCalendar}
          handleCloseCalendar={handleCloseCalendar}
          refreshList={refreshList}></LeaseBookCalendar>
      </div>
    );
  } else {
    return(
      <div className="Container">
        <NotLoggedIn></NotLoggedIn>
      </div>
    )
  }
}

export default BooksToLease;
import { Button, Table  } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Book } from '../data/Interfaces'
import { useAuth } from '../data/useAuth';
import { FormValues } from '../data/Interfaces';
import { NotAllowed } from '../components/NotAllowed';
import { Requests } from "../requests/Requests";
import { EditForm } from '../components/EditForm';
import { DeleteForm } from '../components/DeleteForm';

export const EditDeleteBook = () => {
  const {user} = useAuth();
  const [state, setState]= useState<Book[]>([]);
  const [editBook, setEditBook]= useState<FormValues>({
    author: "",
    title: "",
    publisher: "",
    date: 0,
  });
  
  const [choosenBook, setChoosenBook] = useState(0);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleCloseDelete = () => {refreshList(); setChoosenBook(0); setShowDelete(false);}
  const handleShowDelete = () => setShowDelete(true);
  const handleCloseEdit = () => {refreshList(); setShowEdit(false)};
  const handleShowEdit = () => setShowEdit(true);

  const refreshList = async () => {
    Requests.getAllBooks().then(res => {
      if (res.err) { alert("Could not load boooks.")} 
      else if (res.res) { setState(res.res); }
    });
  }

  useEffect(() => { refreshList(); }, []);

  if (user && user.isSuperUser){
    return (
        <div className='Container'>
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
                  <td> <Button className="mr-2" variant="danger" onClick={() => {
                    setChoosenBook(item.bookId);
                    handleShowDelete();
                  }}>Delete</Button>
                  
                  <Button className="myBtn" variant="primary" onClick={() => {
                    setEditBook(item);
                    setChoosenBook(item.bookId);
                    handleShowEdit();
                  }}>Edit</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <DeleteForm bookId={choosenBook} showDelete={showDelete} 
            handleCloseDelete={handleCloseDelete}></DeleteForm>
          <EditForm choosenBook={choosenBook} showEdit={showEdit} 
            editedBook={editBook} setEditedBook={(value : FormValues) => {setEditBook(value)}} 
            handleCloseEdit={handleCloseEdit}></EditForm>
        </div>
      );
    } else{
      return (
        <div className='container'>
          <NotAllowed></NotAllowed>
        </div>
      );
    }
}

export default EditDeleteBook;
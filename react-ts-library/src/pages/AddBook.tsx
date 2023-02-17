import { useAuth } from '../data/useAuth';
import { NotAllowed } from '../components/NotAllowed';
import { AddBookForm } from '../components/AddBookForm';

const AddBook = () => {
  const {user} = useAuth();

    if (user && user.isSuperUser){
      return (
        <div className='container'>
          <AddBookForm></AddBookForm>
        </div>
      );
    } else {
      return(
        <div className='container'>
            <NotAllowed></NotAllowed>
        </div>
      );
    }
}

export default AddBook;
import { Button, Modal } from "react-bootstrap";
import { Requests } from "../requests/Requests";


interface deleteProps {
    bookId : number;
    showDelete : boolean;
    handleCloseDelete : () => void;
}
export function DeleteForm({bookId, showDelete, handleCloseDelete} : deleteProps){
    const deleteBook = () =>{
        Requests.deleteBook(bookId).then(res =>{
            if (res.res){
                alert("Book deleted sucessfully")
                handleCloseDelete();
            } else{
                alert("Book couldn't be deleted")
            }
        })
    }
    return (
        <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Czy napewno chcesz usunąć książkę?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <br/>
              <Button variant="secondary" onClick={handleCloseDelete}>
                  Cancel
              </Button>
              <Button variant="danger" className="myBtn" onClick={deleteBook}>
                  Delete
              </Button>
        </Modal.Body>
    </Modal>
    )
}
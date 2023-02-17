import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FormValues } from "../data/Interfaces";
import { Requests } from "../requests/Requests";

interface EditFormProps {
    choosenBook : number;
    showEdit : boolean;
    editedBook : FormValues;
    setEditedBook : (value : FormValues) => void;
    handleCloseEdit : () => void;
}
export function EditForm({showEdit, editedBook, choosenBook, handleCloseEdit, setEditedBook} : EditFormProps) {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        Requests.updateBook(editedBook, choosenBook)
        .then((res)=>{
            if (res.res){
                alert("Book updated sucessfuly");
                handleCloseEdit();
                setEditedBook({
                    author: "",
                    title: "",
                    publisher: "",
                    date: 0,
                });
            }else if(res.err?.status == 409){
                alert("Book couldn't be updated because someone has just done this :(")
            } else{
                alert("Book couldn't be updated.")
            }
        })
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setEditedBook({...editedBook, [name]: value } as unknown as Pick<FormValues, keyof FormValues>);
      }
    return (         
    <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edycja książki</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <br/>
          <Form onSubmit={handleSubmit}>
              <Form.Group controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" name="title" value={editedBook.title} onChange={handleChange} />
              </Form.Group>
              <Form.Group controlId="author">
                  <Form.Label>Author</Form.Label>
                  <Form.Control type="text" name="author" value={editedBook.author} onChange={handleChange} />
              </Form.Group>
              <Form.Group controlId="publisher">
                  <Form.Label>Publisher</Form.Label>
                  <Form.Control type="text" name="publisher" value={editedBook.publisher} onChange={handleChange} />
              </Form.Group>
              <Form.Group controlId="date">
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="number" name="date" value={editedBook.date} onChange={handleChange} />
              </Form.Group>
              <br/>
              <Button variant="secondary" onClick={handleCloseEdit}>
                  Cancel
              </Button>
              <Button variant="primary" className="myBtn" type="submit">
                  Submit
              </Button>
          </Form>
        </Modal.Body>
      </Modal>)
}
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FormValues } from "../data/Interfaces";
import { Requests } from "../requests/Requests";

export function AddBookForm() {
    const [state, setState]= useState<FormValues>({
      author : "", 
      title : "",
      publisher : "", 
      date : 2020,
    });
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;

      setState({...state, [name]: value } as unknown as Pick<FormValues, keyof FormValues>);
    };
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      Requests.addBook(state).then(res => {
            if (res.res){ alert("Book added."); }
            else if (res.err) { alert("Book couldn't be added."); }
        });
    };
    return (
      <div className='Container'>
        <br/>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="author">
            <Form.Label>Author</Form.Label>
            <Form.Control type="text" name="author" value={state.author} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" name="title" value={state.title} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="publisher">
            <Form.Label>Publisher</Form.Label>
            <Form.Control type="text" name="publisher" value={state.publisher} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control name="date" value={state.date} onChange={handleChange} />
          </Form.Group>
          <br/>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
}
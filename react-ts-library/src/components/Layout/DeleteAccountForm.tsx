import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { isVoidExpression } from "typescript";
import { User, UserLogin } from "../../data/Interfaces";
import { Requests } from "../../requests/Requests";


interface deleteProps {
    user : UserLogin | null | undefined;
    showDelete : boolean;
    handleCloseDelete : () => void;
    logout : () => void;
}
export function DeleteaAccountForm({user, showDelete, handleCloseDelete, logout} : deleteProps){
    const [state, setState] = useState<string>("");

    const deleteUser = (password : string) => {
        const userToDelete = {
            Login: user?.Login,
            Password: password,
            isSuperUser: user?.isSuperUser,
        }
        Requests.deleteUser(userToDelete).then( res => {
            if (res.res){
                handleCloseDelete();
                setState("");
                logout();
            } else {
                alert("Account couldn't be deleted.")
            }
        }
        )
      }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        deleteUser(state)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setState(value);
    };
    return (
        <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Czy napewno chcesz usunąć konto?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <br/>
          <Form onSubmit={handleSubmit}>
              <Form.Group controlId="Password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="Password" value={state} onChange={handleChange} />
              </Form.Group>
              <br/>
              <Button variant="secondary" onClick={handleCloseDelete}>
                  Cancel
              </Button>
              <Button variant="primary" className="myBtn" type="submit">
                  Submit
              </Button>
          </Form>
        </Modal.Body>
      </Modal>
    )
}
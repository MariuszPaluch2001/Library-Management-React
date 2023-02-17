import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAuth } from "../data/useAuth";
import { useNavigate } from "react-router-dom";
import { UserRegister } from "../data/Interfaces";
import { NotAllowed } from "../components/NotAllowed";

const Register = () => {
    const {user, register} = useAuth();
    const [state, setState]= useState<UserRegister>({Login: "",Password1: "",Password2: ""});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setState({ ...state, [name]: value } as unknown as Pick<UserRegister, keyof UserRegister>);
    };

    let navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        register(state);
        navigate('/');
    }
    
    if(!user){
      return (
        <div className='container'>
            <br/>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="Login">
                  <Form.Label>Login</Form.Label>
                  <Form.Control type="text" name="Login" value={state.Login} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="Password1">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="Password1" value={state.Password1} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="Password2">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="Password2" value={state.Password2} onChange={handleChange} />
                </Form.Group>
                <br/>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
            </Form>
          </div>
        );
    } else{
      return(
        <div className='container'>
          <NotAllowed></NotAllowed>
        </div>
      );
    }
 
  };

export default Register;
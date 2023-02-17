import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserLogin } from "../data/Interfaces";
import { useAuth } from "../data/useAuth";


export function LoginForm() {
    const {login} = useAuth();
    const [state, setState]= useState<UserLogin>({Login: "",
      Password: "",
      isSuperUser: false});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setState({ ...state, [name]: value } as unknown as Pick<UserLogin, keyof UserLogin>);
    };

    const handleLogin = (user : UserLogin) => { login(user) };

    let navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        handleLogin(state);
        navigate('/');
    }

    return (
        <div className='container'>
            <br/>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="Login">
                  <Form.Label>Login</Form.Label>
                  <Form.Control type="text" name="Login" value={state.Login} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="Password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="Password" value={state.Password} onChange={handleChange} />
                </Form.Group>
                <br/>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
            </Form>
          </div>
        );
}
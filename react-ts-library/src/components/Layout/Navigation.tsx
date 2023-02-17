import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Modal, Button, Form } from 'react-bootstrap';
import { useAuth } from '../../data/useAuth';
import { DeleteaAccountForm } from './DeleteAccountForm';

const Navigation = () =>{
    const {user, logout} = useAuth();
    const [showDelete, setShowDelete] = useState(false);

    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);

    var nav_left = null;
    var nav_right = null;
    if(user){
        nav_left = <NavLink className="nav-link text-white font-weight-bold" to='/' onClick={logout}>Logout</NavLink>;
        nav_right = <Button className="btn-link btn-outline-secondary text-decoration-none btn-block text-white font-weight-bold" onClick={handleShowDelete}>DeleteAccount</Button>;
    } else{
        nav_left = <NavLink className="nav-link text-white font-weight-bold" to='/Login'>Login</NavLink>;
        nav_right = <NavLink className="nav-link text-white font-weight-bold" to='/Register'>Register</NavLink>;
    }
    return (
            <div className='Container'>
                <Navbar bg="dark" expand="lg">
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <NavLink className="nav-link text-white font-weight-bold" to="/">
                            Home
                        </NavLink>

                        <NavLink className="nav-link text-white font-weight-bold" to="/BookList">
                            BookList
                        </NavLink>
                    </Nav>
                    <Nav className="ms-auto">
                        {nav_left}
                        {nav_right}
                    </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <DeleteaAccountForm user={user} showDelete={showDelete} 
                handleCloseDelete={handleCloseDelete} logout={logout}></DeleteaAccountForm>
            </div>
        )
}

export default Navigation;
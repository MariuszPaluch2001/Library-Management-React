import { Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import { useAuth } from '../data/useAuth';
import { NotAllowed } from '../components/NotAllowed';
import { Requests } from '../requests/Requests';

export const Users = () =>{
  const {user} = useAuth();
  const [state, setState]= useState<string[]>([]);

  const refreshList = async () => {
    Requests.getAllUsers().then(res =>{
      if (res.res){
        setState(res.res)
      } else {
        alert("Could not get all users.")
      }
    })
  }

  useEffect(() => {
    refreshList();
  }, []);

  if (user && user.isSuperUser){
      return (
        <Table className='mt-4' striped bordered hover size='sm'>
          <thead>
            <tr>
              <th>User logins</th>
            </tr>
          </thead>
          <tbody>
            {state.map((item, i) => (
              <tr key={i}>
                <td>{item}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
    } else {
      return (
        <div className='container'>
            <NotAllowed></NotAllowed>
        </div>
      );
    }
}

export default Users;
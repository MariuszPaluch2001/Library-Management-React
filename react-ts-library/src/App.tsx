import { useState } from 'react';
import './style/App.css';

import { BookList } from './pages/BookList'
import Navigation from './components/Layout/Navigation';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddBook from './pages/AddBook';
import { BooksToLease } from './pages/BooksToLease';
import { BooksToReturn } from './pages/BooksToReturn';
import { BooksToReserve } from './pages/BooksToReserve';
import { EditDeleteBook } from './pages/EditDeleteBook';
import { FindBook } from './pages/FindBook';
import { UserReservedBooks } from './pages/UserReservedBooks';
import { Users } from './pages/Users';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthContext } from './data/AuthContext';
import { UserLogin } from './data/Interfaces';
import { Home } from './pages/Home';

const App = () => {
  const [ user , setUser ] = useState<UserLogin | null>();
  const value = { user, setUser };
  return (
      <BrowserRouter>
        <AuthContext.Provider value={value}>
        <Navigation/>
          <div className="container">

            <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/Login' element={<Login />}/>
              <Route path='/Register' element={<Register />}/>
              <Route path='/AddBook' element={<AddBook />}/>
              <Route path='/BookList' element={<BookList/>}/>
              <Route path='/BooksToLease' element={<BooksToLease/>}/>
              <Route path='/BooksToReserve' element={<BooksToReserve/>}/>
              <Route path='/BooksToReturn' element={<BooksToReturn/>}/>
              <Route path='/EditDeleteBook' element={<EditDeleteBook/>}/>
              <Route path='/FindBook' element={<FindBook/>}/>
              <Route path='/UserReservedBooks' element={<UserReservedBooks/>}/>
              <Route path='/Users' element={<Users/>}/>             
            </Routes>
          
          </div>
        </AuthContext.Provider>
      </BrowserRouter>
  );
}

export default App;

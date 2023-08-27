//import React from 'react';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
//import ItemsTable from './components/ItemsTable';

// import ForgotPasswordScreen from './components/screens/ForgotPasswordScreen';
// import ResetPasswordScreen from './components/screens/ResetPasswordScreen';
 
function App () {
  const {user} = useAuthContext()
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route path='/' element={user ? <Home/> : <Navigate to="/login"/>}/>
            <Route path='/login' element={!user ? <Login/> : <Navigate to="/"/>}/>
            <Route path='/register' element={!user ? <Register/> : <Navigate to="/"/>}/>
          </Routes>
        </div>
        </BrowserRouter>  
    </div> 
  ) 
};

export default App;

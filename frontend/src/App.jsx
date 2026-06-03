import React, { useState } from 'react';
import Register from "./pages/Register"
import Login from './pages/Login';
import Home from './pages/Home';

function App(){
  const[page,setPage]=useState('register');
  const[token,setToken]=useState(localStorage.getItem('token')||'');

    const handleLogout=()=>{
      localStorage.removeItem('token');
      setToken('');
      setPage('login');
    };

  return(
    <div>
      <h1>MERNOGRAM</h1>
      <hr />
      {page==='register' && <Register setPage={setPage}/>}
      {page==='login' && <Login setPage={setPage} setToken={setToken}/>}
      {page==='home' && <Home handleLogout={handleLogout} token={token}/>}
    </div>
  );
}

export default App;
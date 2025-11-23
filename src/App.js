import React from 'react'
import { createContext } from 'react'
import { useState } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import About from './components/About.jsx'
import Home from './components/Home.jsx'
import Manage from './components/Manage.jsx'
import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
import Footer from './components/Footer.jsx'
export const AuthContext = createContext();
function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const login = (username) => {
    setUser(username);
    navigate('/'); 
  };
  const logout = () => {
    setUser(null);
    navigate('/login');
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
    <div className=''>
     {user && <Navbar />}

      <Routes>
        {!user && (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
          <Route path="/login" element={<Login />} />
        {user && (
          <>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/manage' element={<Manage />} />
            <Route path='/register' element={<Register />} />
          </>
        )}
      </Routes>
      <Footer />
      

    </div>
    </AuthContext.Provider>
  )
}

export default App

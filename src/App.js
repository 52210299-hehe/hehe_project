import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import About from './components/About.jsx'
import Home from './components/Home.jsx'
import Manage from './components/Manage.jsx'
import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
import Footer from './components/Footer.jsx'
function App() {
  
  return (
    <div className=''>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/manage' element={<Manage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      <Footer />
      

    </div>
  )
}

export default App

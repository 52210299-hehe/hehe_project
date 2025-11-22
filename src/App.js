import React from 'react'
import Navbar from './components/Navbar'
import Students from './components/Students'
import About from './components/About'
import { Route,Routes } from 'react-router-dom'
import Nav2 from './components/Nav2'
import Product from './components/Product'
function App() {
  
  return (
    <div className=''>
      <Nav2 />
      <Routes>
        <Route path='/product' element={<Product/>} />
        <Route path='/about' element={<About/>} />
      </Routes>

    </div>
  )
}

export default App

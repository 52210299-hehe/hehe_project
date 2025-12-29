
import { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import About from './components/About.jsx'
import Home from './components/Home.jsx'
// import Manage from './components/Manage.jsx'
// import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
import Footer from './components/Footer.jsx'
import { UserContext } from './components/UserContext.js';

function App() {
   const { user } = useContext(UserContext);
   console.log("Current user in App.js:", user);
  

  return (
    
    <div className=''>
     {user && <Navbar />}

      <Routes>
        {!user && (
          <>
            <Route path="*" element={<Navigate to="/login" replace />} />
             <Route path="/login" element={<Login />} />

          </>
          )}
     
        {user && (
          <>
          
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            {/* <Route path='/manage' element={<Manage />} /> */}
            {/* <Route path='/register' element={<Register />} /> */}
          </>
        )}
      </Routes>
      <Footer />
      

    </div>
  
  )
}

export default App

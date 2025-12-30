
import { useContext } from 'react'
import { Routes, Route, } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import About from './components/About.jsx'
import Home from './components/Home.jsx'
import Manage from './components/Manage.jsx'
// import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
import Footer from './components/Footer.jsx'
import { UserContext } from './components/UserContext.js';
import ProtectedRoute from './ProtectedRoute.jsx';

function App() {
   const { user } = useContext(UserContext);
   console.log("Current user in App.js:", user);
  

  return (
    <>
      {user && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage"
          element={
            <ProtectedRoute>
              <Manage />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/register"
          element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
      <Footer />
    </>
  );
}
export default App

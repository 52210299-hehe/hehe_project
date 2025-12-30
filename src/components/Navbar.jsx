import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './UserContext.js';

function NavBar() {
  const { user } = useContext(UserContext);
  return (
    <nav className="w-full bg-gradient-to-r from-purple-600 via-black to-purple-900 py-4 shadow-md">
      <div className="max-w-4xl mx-auto flex justify-center gap-32">
        <Link to="/" className="text-white font-semibold px-3 py-2 rounded-lg hover:bg-purple-400 transition-colors duration-200">Home</Link>
        <Link to="/about" className="text-white font-semibold px-3 py-2 rounded-lg hover:bg-purple-400 transition-colors duration-200">About</Link>
        <Link to="/register" className={`text-white font-semibold px-3 py-2 rounded-lg hover:bg-purple-400 transition-colors duration-200 ${user.role === 1 ? 'hidden' : ''}`}>Register</Link>
        <Link to="/manage" className={`text-white font-semibold px-3 py-2 rounded-lg hover:bg-purple-400 transition-colors duration-200 ${user.role === 2 ? 'hidden' : ''}`}>Manage</Link>
      </div>
    </nav>
  );
}

export default NavBar

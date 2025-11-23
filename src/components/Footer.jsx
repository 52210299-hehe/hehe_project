
import React, { useContext } from 'react';
import { AuthContext } from '../App';

function Footer() {
  const { user, logout } = useContext(AuthContext);
  return (
    <footer className="w-full py-6 bg-gradient-to-r from-purple-600 via-black to-purple-900 mt-0">
      <div className="text-center text-white font-medium text-base flex flex-col items-center gap-2">
        <span>&copy; {new Date().getFullYear()} hehe travels 2. All rights reserved.</span>
        {user && (
          <button
            className="bg-purple-700 text-white font-bold py-2 px-6 rounded-lg hover:bg-purple-900 transition-colors"
            onClick={logout}
          >
            Logout
          </button>
        )}
      </div>
    </footer>
  );
}

export default Footer;

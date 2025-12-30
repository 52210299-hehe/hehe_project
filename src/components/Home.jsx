
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext.js';

function Home() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-purple-200 flex flex-col ">
     
        <section className="flex flex-col md:flex-row items-center justify-between px-6 max-w-5xl mx-auto w-full mt-5">
        <div className="flex-1 text-center md:text-left mb-4 md:mb-0">
          <h1 className="text-5xl font-extrabold text-purple-900 mb-2">hehe travels 2</h1>
          <p className="text-xl text-gray-700 mb-3">Book, manage, and explore flights with a modern, easy-to-use platform.</p>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="w-64 h-64 rounded-3xl bg-gradient-to-tr from-purple-400 via-purple-700 to-black shadow-2xl flex items-center justify-center">
            <span className="text-white text-2xl font-bold">✈️</span>
          </div>
        </div>
      </section>

    
          <section className="mx-auto px-8 grid grid-cols-1 gap-6 w-3/5 flex-1 mb-5 mt-3">
        
        <div className={`rounded-2xl shadow-lg p-6 border-t-4 border-purple-600 cursor-pointer hover:scale-105 transition-transform duration-200 flex flex-col items-center text-center ${user.role === 1 ? 'hidden' : ''}`} onClick={() => navigate('/register') }>
          <span className="text-purple-600 text-3xl mb-2">🛫</span>
          <h2 className="text-purple-800 font-bold text-xl mb-2">Register</h2>
          <p className="text-gray-700 text-base">register your next flight in seconds.</p>
        </div>
        <div className="rounded-2xl shadow-lg p-6 border-t-4 border-purple-700 cursor-pointer hover:scale-105 transition-transform duration-200 flex flex-col items-center text-center" onClick={() => navigate('/about') }>
          <span className="text-purple-700 text-3xl mb-2">💡</span>
          <h2 className="text-purple-700 font-bold text-xl mb-2">About</h2>
          <p className="text-gray-700 text-base">Learn more about hehe travels 2 and our mission.</p>
        </div>
        <div className={`rounded-2xl shadow-lg p-6 border-t-4 border-purple-700 cursor-pointer hover:scale-105 transition-transform duration-200 flex flex-col items-center text-center ${user.role === 2 ? 'hidden' : ''}`} onClick={() => navigate('/manage') }>
          <span className="text-purple-700 text-3xl mb-2">🗂️</span>
          <h2 className="text-purple-700 font-bold text-xl mb-2">Manage</h2>
          <p className="text-gray-700 text-base">Create, edit, or delete flights easily.</p>
        </div>
        
      </section>
      
    </div>
  );
}

export default Home;

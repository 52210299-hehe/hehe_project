import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { UserContext } from './UserContext.js';


export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      let  user = await res.json();

      if (res.ok) {
        console.log("Login successful:", user.data);
        login(user.data, user.token); 
        alert('Logged in!');
        navigate('/', { replace: true });

      } else {
        alert(user?.message);
      }
    } catch (err) {
      console.error('Login error', err);
      alert('Network error: ' + (err.message));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-purple-200 flex flex-col items-center justify-center px-4 py-10">
     {/* Welcome / Hero */}
<div className="flex-1 bg-gradient-to-br from-purple-200 via-purple-100 to-purple-300 rounded-3xl shadow-xl p-20 text-center flex flex-col items-center justify-center gap-6 mb-6 mt-0">
  <h1 className="text-5xl font-extrabold text-purple-900">Welcome to Hehe Travels 2 ✈️</h1>
  <h2 className="text-lg text-purple-800 max-w-md font-semibold">
    Sign in to continue<span className="font-semibold"></span><span className="font-semibold"></span>
  </h2>
  <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-purple-500 via-purple-700 to-purple-900 shadow-inner flex items-center justify-center">
    <span className="text-white text-5xl">🌍</span>
  </div>
  <p className="text-purple-700 italic mt-2">Your adventure starts here!</p>
</div>

      <form className="bg-gradient-to-br from-purple-100 via-white to-purple-200 rounded-xl shadow-lg flex flex-col w-1/2  mx-auto p-6 gap-4" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold text-purple-900 mb-4 text-center">Login</h1>
        <input
          type="text"
          name="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="border border-purple-300 rounded-lg p-3 text-lg"
          required
          placeholder="Username "
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border border-purple-300 rounded-lg p-3 text-lg"
          required
          placeholder="Password "
        />
       
        <button className="bg-purple-700 text-white font-bold py-3 rounded-lg hover:bg-purple-900 transition-colors w-32 mx-auto" type="submit">Login</button>
      </form>
    </div>
  );
}



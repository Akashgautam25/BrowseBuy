import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === 'akash@gmail.com' && password === 'Akash!Test@9876') {
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center pt-40 px-4">
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-black text-3xl font-bold mb-8 text-center">Sign In</h2>

        <div className="space-y-5">
          <input
            id="email"
            type="text"
            placeholder="Username / Email"
            className="w-full px-4 py-3 rounded-xl text-black bg-gray-100 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition"
          />
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl text-black bg-gray-100 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition"
          />
          <button
            onClick={handleLogin}
            className="w-full py-3 text-white font-semibold bg-black rounded-xl hover:bg-gray-800 transition"
          >
            Sign In
          </button>
        </div>

        <div className="mt-6 text-center text-gray-600 text-sm">
          Don't have an account?{' '}
          <a href="#" className="text-black font-medium hover:underline">
            Sign Up
          </a>
        </div>

        <div className="mt-4 text-xs p-3 rounded-lg text-center border-black border-2">
          <span>Demo Gmail:- akash@gmail.com</span>
          <br/>
          <span>Password:- Akash!Test@9876</span>
        </div>
      </div>
    </div>
  );
};

export default Login;

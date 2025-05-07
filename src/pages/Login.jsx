import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState('Sign In');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const mode = params.get('mode');
    setCurrentState(mode === 'signup' ? 'Sign Up' : 'Sign In');
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById('email')?.value;
    const password = document.getElementById('password')?.value;

    if (!email || !password) {
      alert("Please fill in all required fields.");
      return;
    }

    if (currentState === 'Sign In') {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        alert('Login successful!');
        navigate('/');
      } catch (error) {
        alert('Login failed: ' + error.message);
      }
    } else {
      const confirmPassword = document.getElementById('confirmPassword')?.value;
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Account created successfully!');
        navigate('/login?mode=signin');
      } catch (error) {
        alert('Signup failed: ' + error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-semibold text-center text-gray-800">{currentState}</h2>

        {currentState === 'Sign Up' && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring"
              required
            />
            <input
              type="tel"
              placeholder="Mobile Number"
              pattern="[0-9]{10}"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring"
              required
            />
          </>
        )}

        <input
          id="email"
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring"
          required
        />

        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring pr-10"
            required
          />
        </div>

        {currentState === 'Sign Up' && (
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring"
            required
          />
        )}

        {currentState === 'Sign In' && (
          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-black" />
              Remember Me
            </label>
            <button type="button" className="hover:underline">Forgot Password?</button>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition"
        >
          {currentState}
        </button>

        <div className="text-center text-sm text-gray-600">
          {currentState === 'Sign In' ? (
            <>
              Create a New account?{' '}
              <span
                onClick={() => navigate('/login?mode=signup')}
                className="text-black font-medium hover:underline cursor-pointer"
              >
                Sign Up
              </span>
            </>
          ) : (
            <>
              Already a user?{' '}
              <span
                onClick={() => navigate('/login?mode=signin')}
                className="text-black font-medium hover:underline cursor-pointer"
              >
                Sign In
              </span>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;

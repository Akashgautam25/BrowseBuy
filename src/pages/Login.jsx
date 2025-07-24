import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';

const Login = ({ setUser }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState('Sign In');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const mode = params.get('mode');
    setCurrentState(mode === 'signup' ? 'Sign Up' : 'Sign In');
    setErrors({});
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const email = document.getElementById('email')?.value.trim();
    const password = document.getElementById('password')?.value.trim();
    const confirmPassword = document.getElementById('confirmPassword')?.value?.trim();

    const newErrors = {};

    if (!email) newErrors.email = 'Email is required.';
    if (!password) newErrors.password = 'Password is required.';

    if (currentState === 'Sign Up') {
      if (!confirmPassword) {
        newErrors.confirmPassword = 'Confirm Password is required.';
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match.';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      let userCredential;

      if (currentState === 'Sign In') {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      }

      const user = userCredential.user;
      localStorage.setItem('firebaseUser', JSON.stringify(user));
      setUser(user);
      navigate('/');
    } catch (error) {
      setErrors({ email: error.message });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-4"
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

        <div>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {currentState === 'Sign Up' && (
          <div>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>
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

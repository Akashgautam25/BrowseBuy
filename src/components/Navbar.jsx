import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setShowMobileMenu((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium border-b border-gray-200 relative z-50">
      {/* Logo */}
      <NavLink to="/">
        <img src={assets.logo} alt="logo" className="w-36" />
      </NavLink>

      {/* Desktop Navigation Links */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>PRODUCTS</p>
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
        </NavLink>
      </ul>

      {/* Right Section: Sign In / Sign Up Buttons + Hamburger */}
      <div className="flex items-center gap-3 sm:gap-5 relative">
        <button
          onClick={() => navigate('/login?mode=signin')}
          className="px-4 py-2 text-sm border border-black text-black bg-white hover:bg-black hover:text-white transition duration-300 rounded-md"
        >
          Sign In
        </button>
        <button
          onClick={() => navigate('/login?mode=signup')}
          className="px-4 py-2 text-sm border border-black text-white bg-black hover:bg-white hover:text-black transition duration-300 rounded-md"
        >
          Sign Up
        </button>

        {/* Hamburger Menu (Mobile) */}
        <img
          src={assets.menu_icon}
          alt="menu"
          className="w-5 cursor-pointer sm:hidden"
          onClick={toggleMobileMenu}
        />
      </div>

      {/* Mobile Navigation Menu */}
      {showMobileMenu && (
        <div className="absolute top-16 left-0 w-full bg-white border-b border-gray-200 sm:hidden">
          <ul className="flex flex-col items-center py-4 text-sm text-gray-700">
            <NavLink to="/" className="py-2" onClick={toggleMobileMenu}>
              HOME
            </NavLink>
            <NavLink to="/collection" className="py-2" onClick={toggleMobileMenu}>
              PRODUCTS
            </NavLink>
            <NavLink to="/about" className="py-2" onClick={toggleMobileMenu}>
              ABOUT
            </NavLink>
            <NavLink to="/contact" className="py-2" onClick={toggleMobileMenu}>
              CONTACT
            </NavLink>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;

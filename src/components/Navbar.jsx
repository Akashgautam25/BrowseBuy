import React from 'react';
import { assets } from '../assets/assets';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="flex items-center justify-between py-5 font-medium border-b border-gray-200">
      <NavLink to="/">
        <img src={assets.logo} alt="logo" className="w-36" />
      </NavLink>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>PRODUCTS</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-4">
        <Link
          to="/login?mode=signin"
          className="px-4 py-2 text-sm font-medium text-black border border-black rounded-full hover:bg-black hover:text-white transition"
        >
          Sign In
        </Link>
        <Link
          to="/login?mode=signup"
          className="px-4 py-2 text-sm font-medium text-white bg-black border border-black rounded-full hover:bg-white hover:text-black transition"
        >
          Sign Up
        </Link>
        <img
          src={assets.menu_icon}
          alt="menu"
          className="w-5 cursor-pointer sm:hidden"
        />
      </div>
    </div>
  );
};

export default Navbar;

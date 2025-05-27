import { Link, NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="flex items-center justify-between py-5 font-medium px-4 sm:px-8 relative z-50 ">
      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} alt="logo" className="w-36" />
      </Link>

      {/* Desktop Navigation */}
      <ul className="hidden sm:flex gap-6 text-sm text-gray-700">
        <NavLink to="/" className="hover:text-black">HOME</NavLink>
        <NavLink to="/collection" className="hover:text-black">PRODUCTS</NavLink>
        <NavLink to="/about" className="hover:text-black">ABOUT</NavLink>
        <NavLink to="/contact" className="hover:text-black">CONTACT</NavLink>
      </ul>

      {/* Right-side Icons */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <img
          src={assets.search_icon}
          alt="Search"
          className="w-5 cursor-pointer"
          onClick={() => navigate('/collection')}
        />

        {/* Profile Icon navigates directly to Sign In */}
        <img
          src={assets.profile_icon}
          alt="Profile"
          className="w-5 cursor-pointer"
          onClick={() => navigate('/login?mode=signin')}
        />

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} alt="Cart" className="w-5" />
          {cartCount > 0 && (
            <p className="absolute -right-2 -bottom-2 w-4 h-4 bg-black text-white text-[10px] flex items-center justify-center rounded-full">
              {cartCount}
            </p>
          )}
        </Link>

        {/* Mobile Menu */}
        <img
          src={assets.menu_icon}
          alt="Menu"
          className="w-5 cursor-pointer sm:hidden"
          onClick={() => setVisible(!visible)}
        />
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg z-40 transition-all duration-300 ${
          visible ? 'w-64' : 'w-0 overflow-hidden'
        }`}
      >
        <div className="flex flex-col text-gray-600 pt-4">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img
              src={assets.dropdown_icon}
              alt="Back"
              className="h-4 rotate-180"
            />
            <p className="font-semibold">Back</p>
          </div>

          <NavLink onClick={() => setVisible(false)} className="py-3 pl-6 border-t" to="/">HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-3 pl-6 border-t" to="/collection">PRODUCTS</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-3 pl-6 border-t" to="/about">ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-3 pl-6 border-t" to="/contact">CONTACT</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

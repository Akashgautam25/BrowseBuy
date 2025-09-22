import { Link, NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [menuVisible, setMenuVisible] = useState(false); // mobile menu
  const [profileVisible, setProfileVisible] = useState(false); // profile dropdown
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { user, logout } = useAuth();

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-between py-5 px-4 sm:px-8 font-medium bg-white border-b border-gray-300 relative z-50">
      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} alt="logo" className="w-36" />
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden sm:flex gap-6 text-sm text-black">
        <NavLink to="/" className="hover:text-gray-700">HOME</NavLink>
        <NavLink to="/collection" className="hover:text-gray-700">PRODUCTS</NavLink>
        <NavLink to="/about" className="hover:text-gray-700">ABOUT</NavLink>
        <NavLink to="/contact" className="hover:text-gray-700">CONTACT</NavLink>
      </ul>

      {/* Right Icons */}
      <div className="flex items-center gap-6 relative">
        {/* Search */}
        <img
          src={assets.search_icon}
          alt="Search"
          className="w-5 cursor-pointer"
          onClick={() => navigate('/collection')}
        />

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} alt="Cart" className="w-5" />
          {cartCount > 0 && (
            <span className="absolute -right-2 -bottom-2 w-4 h-4 bg-black text-white text-[10px] flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </Link>

        {/* Profile */}
        {user && (
          <div className="relative">
            <img
              src={assets.profile_icon}
              alt="Profile"
              className="w-6 h-6 cursor-pointer"
              onClick={() => setProfileVisible(!profileVisible)}
            />

            {profileVisible && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-300 rounded-md text-black">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setProfileVisible(false)}
                >
                  My Profile
                </Link>
                <Link
                  to="/order-history"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setProfileVisible(false)}
                >
                  My Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        {/* Mobile Menu Icon */}
        <img
          src={assets.menu_icon}
          alt="Menu"
          className="w-6 cursor-pointer sm:hidden"
          onClick={() => setMenuVisible(!menuVisible)}
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full bg-white border-l border-gray-300 z-40 transition-all duration-300 ${
          menuVisible ? 'w-64' : 'w-0 overflow-hidden'
        }`}
      >
        <div className="flex flex-col pt-4 text-black">
          <div
            onClick={() => setMenuVisible(false)}
            className="flex items-center gap-2 px-4 py-3 cursor-pointer border-b border-gray-200"
          >
            ← Back
          </div>
          <NavLink onClick={() => setMenuVisible(false)} className="py-3 pl-6 border-b" to="/">HOME</NavLink>
          <NavLink onClick={() => setMenuVisible(false)} className="py-3 pl-6 border-b" to="/collection">PRODUCTS</NavLink>
          <NavLink onClick={() => setMenuVisible(false)} className="py-3 pl-6 border-b" to="/about">ABOUT</NavLink>
          <NavLink onClick={() => setMenuVisible(false)} className="py-3 pl-6 border-b" to="/contact">CONTACT</NavLink>
          {user && (
            <>
              <NavLink onClick={() => setMenuVisible(false)} className="py-3 pl-6 border-b" to="/profile">My Profile</NavLink>
              <NavLink onClick={() => setMenuVisible(false)} className="py-3 pl-6 border-b" to="/orders">My Orders</NavLink>
              <button onClick={handleLogout} className="text-left py-3 pl-6 border-b">Logout</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

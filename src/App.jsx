import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Using Router as the alias
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Collection from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/productdetail';  // Ensure this path is correct
import Login from './pages/Login';
import Orders from './pages/cart';  // Make sure this exists in the pages folder


const App = () => {
  return (
    <Router>
      <div className="px-4 sm:px-[5vw] flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
import React from 'react';
import { BrowserRouter as Akash, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Collection from './pages/collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';


const App = () => {
  return (
    <Akash>
      <div className="px-4 sm:px-[5vw] flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/login" element={<Login />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            {/* Removed /cart and /orders because files are deleted */}
          </Routes>
        </main>

      </div>
    </Akash>
  );
};

export default App;

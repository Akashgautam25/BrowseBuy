import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider } from './context/CartContext';
import { Toaster } from 'react-hot-toast'; // 🔥 Import this
import './index.css'; // or './main.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <App />
      <Toaster position="top-right" /> {/* ✅ Add this line for toast messages */}
    </CartProvider>
  </React.StrictMode>
);

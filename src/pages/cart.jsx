import React from 'react';
import { useCart } from '../context/CartContext';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center text-lg pt-20">🛒 Your cart is empty.</div>
        ) : (
          <>
            {cartItems.map((item, i) => (
              <div key={i} className="flex justify-between items-center border p-4 rounded">
                <div className="flex gap-4 items-center">
                  <img src={item.image} alt={item.title} className="w-20 h-20 object-contain" />
                  <div>
                    <h2 className="font-medium">{item.title}</h2>
                    <p className="text-sm">Size: {item.selectedSize}</p>
                    <p>₹{item.price} × {item.quantity}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id, item.selectedSize)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="flex justify-between items-center mt-6 gap-4">
              <p className="text-lg font-semibold">Total: ₹{total.toFixed(2)}</p>
              <div className="flex gap-3">
                <button
                  onClick={clearCart}
                  className="border border-black text-black bg-white px-4 py-2 rounded hover:bg-black hover:text-white transition"
                >
                  Clear Cart
                </button>
                <button
                  onClick={() => navigate('/checkout')}
                  className="bg-black text-white px-4 py-2 rounded hover:bg-white hover:text-black border border-black transition"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Orders;

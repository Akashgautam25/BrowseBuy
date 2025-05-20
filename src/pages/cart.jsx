import React from 'react';
import Footer from '../components/Footer';

const Orders = () => {
  return (
    <>
      <div className="min-h-screen px-6 py-10 bg-white text-gray-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Left: Your Cart */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-300 inline-block mb-6">
              <span className="text-gray-500">YOUR</span> <span className="font-bold text-gray-800">CART</span>
            </h2>
            {/* Placeholder for cart items */}
            <div className="text-gray-500">
              Your cart is currently empty.
            </div>
          </div>

          {/* Right: Cart Totals */}
          <div className="border p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-300 inline-block mb-6">
              <span className="text-gray-500">CART</span> <span className="font-bold text-gray-800">TOTALS</span>
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>$ 0.00</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span>$ 10.00</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>$ 0.00</span>
              </div>
            </div>

            <button className="mt-8 w-full bg-black text-white py-3 uppercase font-medium hover:bg-gray-800 transition-all">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Orders;

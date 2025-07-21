import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';
import { assets } from '../assets/assets';

const Checkout = () => {
  const { cartItems, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (value.trim() !== '') {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const validate = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) newErrors[key] = true;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 49 : 0;
  const total = subtotal + shipping;

  // Save order to localStorage
  const saveOrder = (status) => {
    const order = {
      id: Date.now(),
      date: new Date().toISOString(),
      items: cartItems.map(item => ({
        id: item.id,
        name: item.title || item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total,
      paymentMethod,
      shippingDetails: formData,
      status, // 'Completed' or 'Pending'
    };

    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.unshift(order);
    localStorage.setItem('orders', JSON.stringify(orders));
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    if (paymentMethod === 'cod') {
      saveOrder('Pending');
      toast.success('Order placed with Cash on Delivery!');
      clearCart();
      // Optionally reset form here
    } else {
      // Load Razorpay script
      const res = await loadRazorpayScript();
      if (!res) {
        toast.error('Razorpay SDK failed to load.');
        return;
      }

      const options = {
        key: 'rzp_test_DWKC9qA09TNjIF', // Your Razorpay test key
        amount: total * 100, // in paise
        currency: 'INR',
        name: 'BrowseBuy',
        description: 'Checkout Payment',
        image: assets.razorpay_logo,
        handler: function (response) {
          saveOrder('Completed');
          toast.success('Payment Successful!');
          clearCart();
          // Optionally reset form here
        },
        prefill: {
          name: formData.name,
          email: '', // Optional, can be added in form if needed
          contact: formData.phone,
        },
        notes: {
          address: formData.address,
        },
        theme: {
          color: '#000',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.getElementById('razorpay-script')) return resolve(true);
      const script = document.createElement('script');
      script.id = 'razorpay-script';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  return (
    <div className="min-h-screen text-black px-4 py-12 flex justify-center">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-10 p-8">

        {/* Address Form */}
        <form onSubmit={handlePayment} className="space-y-5">
          <h2 className="text-2xl font-semibold tracking-tight">Shipping Details</h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-black`}
          />

          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className={`w-full p-3 rounded-xl border ${errors.address ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-black`}
          />

          <div className="flex gap-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className={`w-full p-3 rounded-xl border ${errors.city ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-black`}
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className={`w-full p-3 rounded-xl border ${errors.state ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-black`}
            />
          </div>

          <div className="flex gap-4">
            <input
              type="text"
              name="zip"
              placeholder="ZIP Code"
              value={formData.zip}
              onChange={handleChange}
              className={`w-full p-3 rounded-xl border ${errors.zip ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-black`}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full p-3 rounded-xl border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-black`}
            />
          </div>

          {/* Payment Options */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium mt-6">Payment Method</h3>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="razorpay"
                checked={paymentMethod === 'razorpay'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>Razorpay (UPI / Card / Netbanking)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>Cash on Delivery</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-black text-white hover:bg-gray-900 transition mt-4"
          >
            Place Order
          </button>
        </form>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Product Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold pt-2 border-t">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t pt-4 text-center">
            <img src={assets.razorpay_logo} alt="Razorpay" className="h-8 mx-auto mb-1" />
            <p className="text-xs text-gray-500">Secured by Razorpay</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Checkout;

import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext"; // ✅ import user auth
import { toast } from "react-hot-toast";
import { assets } from "../assets/assets";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth(); // ✅ get logged-in user

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (value.trim() !== "") {
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

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 49 : 0;
  const total = subtotal + shipping;

  // ✅ updated saveOrder with userId, full name, phone
  const saveOrder = (status) => {
    if (!user) {
      toast.error("You must be logged in to place an order.");
      return;
    }

    const order = {
      id: Date.now(),
      userId: user.uid, // ✅ link to logged-in user
      name: user.displayName || formData.name,
      phone: localStorage.getItem(`${user.uid}_phone`) || formData.phone,
      date: new Date().toISOString(),
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.title || item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image || "",
      })),
      total,
      paymentMethod,
      shippingDetails: formData,
      status,
    };

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.unshift(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    clearCart(); // ✅ clear cart only after saving
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error("Your cart is empty! Cannot place order.");
      return;
    }

    if (!validate()) return;

    if (paymentMethod === "cod") {
      saveOrder("Pending");
      toast.success("Order placed with Cash on Delivery!");
    } else {
      const res = await loadRazorpayScript();
      if (!res) {
        toast.error("Razorpay SDK failed to load.");
        return;
      }

      const options = {
        key: "rzp_test_DWKC9qA09TNjIF",
        amount: total * 100,
        currency: "INR",
        name: "BrowseBuy",
        description: "Checkout Payment",
        image: assets.razorpay_logo,
        handler: function () {
          saveOrder("Completed");
          toast.success("Payment Successful!");
        },
        prefill: {
          name: user?.displayName || formData.name,
          email: user?.email || "",
          contact: localStorage.getItem(`${user?.uid}_phone`) || formData.phone,
        },
        notes: {
          address: formData.address,
        },
        theme: {
          color: "#000",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.getElementById("razorpay-script")) return resolve(true);
      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  return (
    <div className="min-h-screen text-black px-4 py-12 flex justify-center">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-10 p-8">
        <form onSubmit={handlePayment} className="space-y-5">
          <h2 className="text-2xl font-semibold tracking-tight">
            Shipping Details
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-3 rounded-xl border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:border-black`}
            disabled={cartItems.length === 0}
          />

          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className={`w-full p-3 rounded-xl border ${
              errors.address ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:border-black`}
            disabled={cartItems.length === 0}
          />

          <div className="flex gap-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className={`w-full p-3 rounded-xl border ${
                errors.city ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:border-black`}
              disabled={cartItems.length === 0}
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className={`w-full p-3 rounded-xl border ${
                errors.state ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:border-black`}
              disabled={cartItems.length === 0}
            />
          </div>

          <div className="flex gap-4">
            <input
              type="text"
              name="zip"
              placeholder="ZIP Code"
              value={formData.zip}
              onChange={handleChange}
              className={`w-full p-3 rounded-xl border ${
                errors.zip ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:border-black`}
              disabled={cartItems.length === 0}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full p-3 rounded-xl border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:border-black`}
              disabled={cartItems.length === 0}
            />
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium mt-6">Payment Method</h3>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="razorpay"
                checked={paymentMethod === "razorpay"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                disabled={cartItems.length === 0}
              />
              <span>Razorpay (UPI / Card / Netbanking)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                disabled={cartItems.length === 0}
              />
              <span>Cash on Delivery</span>
            </label>
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-xl ${
              cartItems.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-900"
            } transition mt-4`}
            disabled={cartItems.length === 0}
          >
            {cartItems.length === 0 ? "Cart is Empty" : "Place Order"}
          </button>
        </form>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              Order Summary
            </h2>
            <div className="space-y-3 text-sm">
              {cartItems.length === 0 && (
                <p className="text-red-500 text-center">No items in cart</p>
              )}
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    )}
                    <span>
                      {item.title || item.name} x {item.quantity}
                    </span>
                  </div>
                  <span>₹{item.price}</span>
                </div>
              ))}
              {cartItems.length > 0 && (
                <>
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
                </>
              )}
            </div>
          </div>

          <div className="mt-6 border-t pt-4 text-center">
            <img
              src={assets.razorpay_logo}
              alt="Razorpay"
              className="h-8 mx-auto mb-1"
            />
            <p className="text-xs text-gray-500">Secured by Razorpay</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

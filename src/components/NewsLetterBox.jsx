import React, { useState } from "react";

const NewsLetterBox = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!email.endsWith("@gmail.com")) {
        setError('')
        alert("Please enter a valid Gmail address.");
    } else {
      setError(""); 
      alert("Subscribed successfully!");
    }
  };

  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now & get 20% off
      </p>
      <p className="text-gray-500 mt-3">
        Be the first to know about new arrivals, sales & promos!
      </p>

      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3"
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full sm:flex-1 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-black text-white text-xs px-10 py-4"
        >
          Subscribe
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default NewsLetterBox;

// LatestCollection.jsx
import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom'; // Correct import for routing

const products = [
  {
    id: 1,
    name: 'Highlander Men Olive Checked Slim Fit Casual Shirts',
    price: 'Rs. 599',
    image: assets.product1,
  },
  {
    id: 2,
    name: 'Ketch Men Blue Faded Slim Fit Casual Shirts',
    price: 'Rs. 799',
    image: assets.product2,
  },
  {
    id: 3,
    name: 'Highlander Men Brown Self Design Oversized Fit T-Shirt',
    price: 'Rs. 840',
    image: assets.product3,
  },
  {
    id: 4,
    name: 'Highlander Men Green Straight Fit Solid Casual Trousers',
    price: 'Rs. 780',
    image: assets.product4,
  },
  {
    id: 5,
    name: 'Highlander Men Black Relaxed Fit Jeans',
    price: 'Rs. 960',
    image: assets.product5,
  },
];

const LatestCollection = () => {
  return (
    <div className="px-6 py-12 max-w-screen-xl mx-auto pb-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold">
          BEST <span className="text-gray-800">SELLERS</span>
        </h2>
        <p className="text-gray-500 mt-2">
          Discover our most popular styles loved by customers worldwide. These best sellers<br /> combine
          comfort, quality, and timeless design—perfect for elevating your everyday wardrobe.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((product) => (
          <div key={product.id} className="text-center">
            <Link to="/collection">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-80 object-cover rounded transform transition-transform duration-300 hover:scale-105"
              />
            </Link>
            <h3 className="mt-4 text-sm font-medium text-gray-800">{product.name}</h3>
            <p className="text-lg font-semibold mt-1">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;

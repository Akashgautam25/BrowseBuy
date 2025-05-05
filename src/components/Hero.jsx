import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between py-10 sm:py-16 px-4 sm:px-8 bg-white">
      {/* Hero Left Side */}
      <div className="w-full sm:w-1/2 flex flex-col gap-6 text-[#414141]">
        <div className="flex items-center gap-2">
          <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
          <p className="font-medium text-sm md:text-base">OUR BESTSELLERS</p>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-relaxed">
          <span className="text-red-500">Wear</span> Confidence,<br className="hidden sm:block" /> Every Day
        </h1>

        <p className="text-gray-600 text-sm md:text-base max-w-md">
          Discover outfits that make you feel bold, stylish, and comfortable. Shop the latest trends tailored for you.
        </p>
        <div className="flex items-center gap-2 pl-56">
            <p className="font-medium text-sm md:text-base">LATEST COLLECTIONS</p>
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
          </div>

        <Link to="/collection">
          <button className="mt-2 px-6 py-2 bg-gray-600 text-white rounded-full shadow transition-all duration-300 hover:shadow-2xl hover:scale-110">
            Shop Now
          </button>
          
        </Link>
      </div>

      {/* Hero Right Side */}
      <div className="w-full sm:w-1/2 mt-8 sm:mt-0 :">
        <img src={assets.hero_img} alt="Hero" className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105" />
      </div>
    </div>
  );
};

export default Hero;

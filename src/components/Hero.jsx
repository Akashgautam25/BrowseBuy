import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';


const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-400">
      {/* Hero Left Side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base">OUR BESTSELLERS</p>
          </div>
          <h1 className='text-3xl sm:py-3 lg:text-5xl leading_relaxed'>Latest Arrivals</h1>
        <div className='flex items-center gap-2'>
        <Link to="/collection">
            <p className="font-semibold text-sm md:text-base cursor-pointer hover:">
                SHOP NOW
            </p>
        </Link>

        <p className="w-8 md:w-11 h-[1px] bg-[#414141] transition-all duration-300 group-hover:ml-2 group-hover:w-14"></p>
        </div>
        </div>
      </div>
      {/* Hero right Side */}
      <img className="w-full sm:w-1/2"src={assets.hero_img}></img>
    </div>
  );
}

export default Hero;

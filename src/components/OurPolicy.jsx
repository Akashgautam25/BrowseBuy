import { assets } from '../assets/assets';

const OurPolicies = () => {
  return (
    <div className="text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      
      {/* Title with Icon */}
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold">What Makes Us Different</h2>
      </div>

      {/* Policies Section */}
      <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2">
        <div className="text-center">
          <img src={assets.exchange_icon} alt="Exchange Icon" className="w-12 m-auto mb-5" />
          <p className="font-semibold">Easy Exchange Policy</p>
          <p className="text-gray-400">We offer hassle free exchange policy</p>
        </div>

        <div className="text-center">
          <img src={assets.quality_icon} alt="Return Icon" className="w-12 m-auto mb-5" />
          <p className="font-semibold">7-Day Return Policy</p>
          <p className="text-gray-400">We provide 7-day return policy</p>
        </div>

        <div className="text-center">
          <img src={assets.support_img} alt="Support Icon" className="w-12 m-auto mb-5" />
          <p className="font-semibold">Best Customer Support</p>
          <p className="text-gray-400">We provide 24/7 customer support</p>
        </div>
      </div>
    </div>
  );
};

export default OurPolicies;

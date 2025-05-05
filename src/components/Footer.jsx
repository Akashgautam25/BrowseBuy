import { assets } from '../assets/assets';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className='pt-14'>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 text-sm ">
        {/* Logo and Description */}
        <div className="text-center sm:text-left">
          <img src={assets.logo} alt="Forever Logo" className="mb-5 w-32 mx-auto sm:mx-0" />
          <p className="w-full sm:w-2/3 text-gray-600 mx-auto sm:mx-0">
            At BrowseBuy, we believe in providing an exceptional shopping experience. From a wide selection of quality products to fast delivery and reliable customer support, we’re here to make your online shopping experience easy, enjoyable, and affordable.
          </p>
        </div>

        {/* Company Links */}
        <div className="text-center sm:text-left">
          <p className="text-xl font-semibold mb-5">Explore BrwoseBuy</p>
          <ul className="flex flex-col text-gray-600 cursor-pointer">
            <li onClick={scrollToTop} className="mb-2 hover:text-black transition duration-300">Home</li>
            <li onClick={scrollToTop} className="mb-2 hover:text-black transition duration-300">About Us</li>
            <li onClick={scrollToTop} className="mb-2 hover:text-black transition duration-300">Delivery Information</li>
            <li onClick={scrollToTop} className="mb-2 hover:text-black transition duration-300">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="text-center sm:text-left">
          <p className="text-xl font-semibold mb-5">Get in Touch</p>
          <ul className="flex flex-col text-gray-600">
            <li className="mb-2">📞 +91 8077554658</li>
            <li className="mb-2">akashgautamm22@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="mt-10">
        <hr className="border-t-1 border-gray-300" />
        <p className="py-5 text-sm text-center text-gray-500">
          &copy; 2024 BrowseBuy.com — All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;

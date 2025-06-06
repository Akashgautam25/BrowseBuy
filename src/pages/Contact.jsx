import { useState } from 'react';
import NewsLetterBox from '../components/NewsLetterBox';
import Title from '../components/Title';
import Footer from '../components/Footer';

const Contact = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted');
  };

  return (
    <div className="px-4 sm:px-6 lg:px-16">
      <div className="to-current text-2xl pt-10 font-medium text-center">
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start gap-10 my-10 mb-28">
        {/* Map */}
        <div className="w-full md:w-[48%] flex justify-center items-center relative min-h-[300px]">
          {!mapLoaded && (
            <div className="absolute inset-0 flex justify-center items-center bg-white z-10">
              <div className="border-4 border-t-4 border-gray-200 h-10 w-10 rounded-full animate-spin border-t-black"></div>
            </div>
          )}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3490.1503215831754!2d77.0875463761463!3d28.98291626808207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390db15c164f0a91%3A0xcab7be79bc1b3bac!2sNewton%20School%20of%20Technology%2C%20Delhi%20NCR!5e0!3m2!1sen!2sin!4v1746383558536!5m2!1sen!2sin"
            className="w-full h-[300px] sm:h-[400px] md:h-[580px]"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setMapLoaded(true)}
          />
        </div>

        {/* Form */}
        <div className="w-full md:w-[48%] p-4 sm:p-6 bg-white shadow-lg rounded-lg mb-10 text-center">
          <h3 className="text-2xl font-medium text-center mb-6">Send Us A Message</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 text-left mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-4 border border-gray-300 rounded-md"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-left mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-4 border border-gray-300 rounded-md"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 text-left mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full p-4 border border-gray-300 rounded-md"
                  rows="4"
                  placeholder="Write your message"
                  required
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 mt-4 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition duration-300"
                >
                  Send Message
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Store Info & Newsletter */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-10 my-10">
        <div className="w-full md:w-[48%]">
          <p className="font-semibold text-gray-600">Our Store</p>
          <p className="text-gray-500">
            NH44, Chowk, Bahalgarh, Sonipat, Haryana 131021
          </p>
          <p className="text-gray-800 mt-2">
            Tel: <span className="text-gray-500">+91 8077554658</span>
            <br />
            Email: <span className="text-gray-500">akashgautamm22@gmail.com</span>
          </p>
        </div>

        <div className="w-full md:w-[48%]">
          <NewsLetterBox />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;

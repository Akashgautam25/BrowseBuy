import Footer from '../components/Footer';
import NewsLetterBox from '../components/NewsLetterBox';
import Title from '../components/Title';

const Contact = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can add form submission logic here
    console.log('Form submitted');
  };

  return (
    <div>
      {/* Title Section */}
      <div className="to-current text-2xl pt-10 border-t font-medium">
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      {/* Content Section */}
      <div className="flex flex-col sm:flex-row justify-start items-center gap-10 my-10 mb-28">
        {/* Google Map Embed */}
        <div className="w-full sm:w-[48%] flex justify-start items-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3490.1503215831754!2d77.0875463761463!3d28.98291626808207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390db15c164f0a91%3A0xcab7be79bc1b3bac!2sNewton%20School%20of%20Technology%2C%20Delhi%20NCR!5e0!3m2!1sen!2sin!4v1746383558536!5m2!1sen!2sin"
            width="100%" // Make map responsive
            height="580"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Contact Form Box */}
        <div className="w-60 sm:w-[48%] p-6 bg-white shadow-lg rounded-lg mb-10 items-center text-center pt-2">
          <div>
            <h3 className="text-2xl font-medium text-center mb-6">Send Us A Message</h3>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6">
                {/* Name Input */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 text-start ml-32">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-80 p-4 border border-gray-300 rounded-md "
                    placeholder="Enter your name"
                    required
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-start ml-32 ">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-80 p-4 border border-gray-300 rounded-md "
                    placeholder="Enter your email"
                    required
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700  text-start ml-32">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="w-80 p-4 border border-gray-300 rounded-md "
                    rows="4"
                    placeholder="Write your message"
                    required
                  />
                </div>

                {/* Send Message Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    className="mt-4 px-8 py-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition duration-300"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Contact;

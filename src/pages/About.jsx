import { assets } from '../assets/assets';
import NewsLetterBox from '../components/NewsLetterBox';
import Title from '../components/Title';
import Footer from '../components/Footer'

const About = () => {
  return (
    <div className="px-6 md:px-20 pt-10 text-gray-800 bg-white">

      {/* Page Title */}
      <div className="text-center mb-12">
        <Title text1="ABOUT" text2="US" />
      </div>

      {/* About Content */}
      <div className="flex flex-col md:flex-row gap-14 mb-16">
        <img
          src={assets.about_img}
          alt="About BrowseBuy"
          className="w-full md:max-w-[460px] rounded-xl shadow-md object-cover"
        />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 text-base leading-relaxed">
          <p>
            BrowseBuy was born from a vision to reshape how people experience online shopping. Our journey started with a clear mission — to build a platform where discovery is easy, choices are abundant, and the shopping experience is seamless from start to finish.
          </p>
          <p>
            Since day one, we've worked tirelessly to curate a wide and thoughtful collection of high-quality products. From fashion and beauty to electronics and home essentials, our catalog reflects the latest trends and timeless essentials — all sourced from trusted brands and verified suppliers.
          </p>
          <div>
            <b className="text-gray-800 text-lg">Our Mission</b>
            <p className="mt-2">
              At BrowseBuy, we’re committed to empowering customers with choice, convenience, and confidence. Our goal is to deliver an intuitive shopping journey — from discovery and purchase to support and delivery — that not only meets expectations but redefines them.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-center mb-10">
        <Title text1="WHY" text2="CHOOSE US" />
      </div>

      <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600">
        <div className="border border-gray-200 px-8 py-10 rounded-xl shadow-sm hover:shadow-md transition">
          <b className="text-gray-900 block mb-3">Quality Assurance</b>
          <p>
            Every item we offer meets our strict standards for durability, performance, and value — because you deserve nothing less.
          </p>
        </div>
        <div className="border border-gray-200 px-8 py-10 rounded-xl shadow-sm hover:shadow-md transition">
          <b className="text-gray-900 block mb-3">Effortless Convenience</b>
          <p>
            Our intuitive website and app make it simple to browse, compare, and purchase — anytime, anywhere.
          </p>
        </div>
        <div className="border border-gray-200 px-8 py-10 rounded-xl shadow-sm hover:shadow-md transition">
          <b className="text-gray-900 block mb-3">Exceptional Support</b>
          <p>
            Our dedicated support team is here 24/7 — ensuring every question is answered and every concern is resolved promptly.
          </p>
        </div>
      </div>

      {/* Newsletter */}
      <div className="mt-20">
        <NewsLetterBox />
      </div>
      <Footer/>
    </div>
  );
};

export default About;

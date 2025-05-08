import { assets } from '../assets/assets';
import Footer from '../components/Footer';
import Title from '../components/Title';

const About = () => {
  return (
    <div className="px-6 md:px-20 pt-14 text-gray-800 bg-gradient-to-b from-white to-gray-50">

      {/* Header */}
      <div className="text-center mb-16">
        <Title text1={'GET TO KNOW'} text2={'BROWSEBUY'} />
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-gray-600">
          A bold step toward fairer e-commerce — where choice, quality, and community matter.
        </p>
      </div>

      {/* Image and Story */}
      <div className="flex flex-col-reverse md:flex-row items-center gap-12 mb-24">
        <div className="flex-1 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Our Story</h2>
          <p className="text-gray-700 leading-relaxed">
            BrowseBuy was created to break the monopoly in e-commerce and give power back to the people.
            We envisioned a platform where shoppers can explore a wide variety of products while supporting independent sellers.
          </p>
          <p className="text-gray-700 leading-relaxed">
            From fashion and tech to everyday essentials, we connect you with quality goods from trusted vendors — all in one place.
            We’re not just another marketplace — we’re a movement for fairness, freedom, and smarter shopping.
          </p>
        </div>
        <img
          src={assets.about_img}
          alt="About BrowseBuy"
          className="w-full md:max-w-md rounded-xl shadow-xl h-64 object-cover"
        />
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-10 mb-24">
        <div className=" shadow-md rounded-xl p-8  border-black border-2 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Our Mission</h2>
          <p className="text-gray-700 text-base leading-relaxed">
            To democratize online shopping by offering choice, fairness, and a seamless experience for both buyers and sellers.
            We strive to create a space where quality and trust guide every purchase.
          </p>
        </div>
        <div className=" shadow-md rounded-xl p-8  border-black border-2 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Our Vision</h2>
          <p className="text-gray-700 text-base leading-relaxed">
            To build a fair and inclusive e-commerce space where independent sellers thrive and customers shop with trust and freedom.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-center mb-12">
        <Title text1="WHY" text2="BROWSEBUY" />
      </div>
      <div className="grid md:grid-cols-3 gap-8 mb-24">
        <div className=" p-6 rounded-xl shadow hover:shadow-md transition border border-black">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Fair & Open Marketplace</h3>
          <p className="text-gray-600">
            Empowering small businesses and giving customers real choices in an open, inclusive shopping environment.
          </p>
        </div>
        <div className=" p-6 rounded-xl shadow hover:shadow-md transition border border-black">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Quality You Can Trust</h3>
          <p className="text-gray-600">
            Every product is handpicked to meet high standards of quality, ensuring durability, performance, and value.
          </p>
        </div>
        <div className=" p-6 rounded-xl shadow hover:shadow-md transition border border-black">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Support That Cares</h3>
          <p className="text-gray-600">
            Our dedicated team is always here to assist you — making your experience smooth and reliable at every step.
          </p>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default About;

import React from 'react'
import NewsLetterBox from '../components/NewsLetterBox';
import Title from '../components/Title';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className="flex flex-col md:flex-row gap-16 my-10">
        <img
          src={assets.about_img}
          alt=""
          className="w-full md:max-w-[450px] "
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            BrowseBuy was born from a bold vision: to break the monopoly in e-commerce
            and give power back to people. We set out to create a platform that supports
            both buyers and independent sellers through fairness, transparency, and choice.
          </p>
          <p>
            By connecting users with diverse, high-quality products from trusted vendors, BrowseBuy
            is building a more open and community-driven marketplace — where everyone has a chance to thrive.
          </p>
          <NewsLetterBox/>
      </div>
      </div>
    </div>
  )
}

export default About


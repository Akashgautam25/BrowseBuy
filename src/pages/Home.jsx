import React from 'react'
import Hero from '../components/Hero';
import OurPolicies from '../components/OurPolicy';
import NewsLetterBox from '../components/NewsLetterBox';
import LatestCollection from '../components/LatestCollection';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestCollection/>
      <OurPolicies/>
      <NewsLetterBox/>
      <Footer/>
    </div>
  )
}

export default Home

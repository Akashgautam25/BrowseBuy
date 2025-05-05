import React from 'react'
import Hero from '../components/Hero';
import OurPolicies from '../components/OurPolicy';
import NewsLetterBox from '../components/NewsLetterBox';
import LatestCollection from '../components/LatestCollection';

const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestCollection/>
      <OurPolicies/>
      <NewsLetterBox/>
    </div>
  )
}

export default Home

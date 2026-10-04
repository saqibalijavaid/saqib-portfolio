import React from 'react';
import Hero from '../components/sections/Hero';
import Technologies from '../components/sections/Technologies';
import FeaturedWork from '../components/sections/FeaturedWork';
import Experience from '../components/sections/Experience';
import CTA from '../components/sections/CTA';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Technologies /> {/* Adds credibility right after Hero */}
      <FeaturedWork />
      <Experience />
      <CTA /> {/* Final push to contact before footer */}
    </>
  );
};

export default Home;

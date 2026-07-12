import React from 'react';
import Hero from '../components/sections/Hero';
import Technologies from '../components/sections/Technologies';
import Features from '../components/sections/Features';
import Testimonials from '../components/sections/Testimonials';
import CTA from '../components/sections/CTA';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Technologies /> {/* Adds credibility right after Hero */}
      <Features />
      <Testimonials />
      <CTA /> {/* Final push to contact before footer */}
    </>
  );
};

export default Home;

import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import TestimonialsSection from '../components/TestimonialsSection';
import ProcessSection from '../components/ProcessSection';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <AboutSection/>
        <TestimonialsSection/>
        <ProcessSection/>
        <div id="contact-us">
            <ContactForm />
        </div>
        <Footer/>
    </div>
  );
};

export default Home;

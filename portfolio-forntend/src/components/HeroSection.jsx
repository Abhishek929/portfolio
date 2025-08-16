import React from 'react';
import './HeroSection.css';
import heroImage from '../assets/mv2.png';

const HeroSection = () => {
  return (
    <div
      className="hero"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="hero-content">
        <h1>Auto Care <br /> Experts</h1>
        <div className="hero-box">
          <p>
            Experience professional <span className="highlight">auto care services</span> tailored to meet your car’s
            specific needs. We are dedicated to delivering top-notch service with a focus on quality and reliability.
          </p>
          <button>Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

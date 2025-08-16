import React from 'react';
import './AboutSection.css';
import aboutImage from '../assets/about.png'; // Use the actual filename (e.g., car image)

const AboutSection = () => {
  return (
    <section className="about-section">
      <div className="about-content">
        <h2>About</h2>
        <p>
          At <strong>F. Aidoo & Attya</strong>, we are committed to providing comprehensive auto care solutions that go beyond repairs. Our team of experts ensures your vehicle receives the best treatment, enhancing its performance and longevity. We pride ourselves on our honest and transparent approach, setting us apart in the industry.
        </p>
        <button>Discover More</button>
      </div>
      <div className="about-image">
        <img src={aboutImage} alt="Car in service center" />
      </div>
    </section>
  );
};

export default AboutSection;

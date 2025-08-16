import React from 'react';
import './Services.css';
import workshopImage from '../assets/team.png';
import mechanicImage from '../assets/journey-banner.png';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <>
        <Navbar/>
        <section className="journey-section">
            <div className="journey-content">
                <h2>Our Journey <br /> So Far</h2>
                <p>
                    Since our inception, F. Aidoo & Attya has been dedicated to providing
                    top-notch auto care services, ranging from basic maintenance to
                    intricate repairs. Our commitment to quality, honesty, and
                    transparency sets us apart, with a special emphasis on delivering
                    exceptional customer service.
                </p>
                <img src={workshopImage} alt="Auto workshop" className="journey-image-small" />
            </div>
            <div className="journey-image-container">
                <img src={mechanicImage} alt="Mechanic working on part" className="journey-image-large" />
            </div>
        </section>
        <Footer/>
    </>
  );
};

export default About;
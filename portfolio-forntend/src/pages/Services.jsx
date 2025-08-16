import React from 'react';
import './About.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import oilChange from '../assets/Services-1.png';
import diagnostics from '../assets/Services-2.png';
import brakeService from '../assets/Services-3.png';

const services = [
  {
    title: 'Oil Changes',
    subtitle: 'Efficient Service',
    description:
      'Our oil change service is quick and reliable, ensuring your vehicle runs smoothly and efficiently. We use high-quality products and experienced technicians to provide top-notch service.',
    image: oilChange,
    imagePosition: 'left',
  },
  {
    title: 'Repairs',
    subtitle: 'Expert Solutions',
    description:
      'From minor fixes to major repairs, our skilled technicians are equipped with the latest tools and experience to deliver effective solutions to get you back on the road safely.',
    image: diagnostics,
    imagePosition: 'right',
  },
  {
    title: 'Brake Changes',
    subtitle: 'Safety First',
    description:
      'Ensure your braking system is in top condition for crucial stopping power. We offer brake checks, pad replacements, and fluid servicing to guarantee optimal brake performance.',
    image: brakeService,
    imagePosition: 'left',
  },
];

const Services = () => {
  return (
    <>
        <Navbar/>
        <section className="services-section">
            <h2 className="services-title">Quality Auto Care Services</h2>
            <div className="services-grid">
                {services.map((service, index) => (
                    <div className={`service-card ${service.imagePosition}`} key={index}>
                        <img src={service.image} alt={service.title} className="service-img" />
                        <div className="service-text">
                            <h3>{service.title}</h3>
                            <h4>{service.subtitle}</h4>
                            <p>{service.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
        <Footer/>
    </>
  );
};

export default Services;
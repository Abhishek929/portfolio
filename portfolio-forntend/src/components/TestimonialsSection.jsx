import React from 'react';
import './TestimonialsSection.css';

const testimonials = [
  {
    text: "Outstanding service! The team at F. Aidoo & Attya fixed my car quickly and efficiently, exceeding my expectations.",
    author: "Catherine M.",
    align: "left"
  },
  {
    text: "Fast, reliable, and trustworthy service. F. Aidoo & Attya is my go-to for all my car maintenance requirements.",
    author: "Rachel T.",
    align: "left"
  },
  {
    text: "I highly recommend F. Aidoo & Attya for any auto service needs. Their professionalism and attention to detail are unmatched.",
    author: "David L.",
    align: "right"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="testimonials-section">
      <h2>Testimonials</h2>
      <div className="testimonial-grid">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className={`testimonial ${item.align === 'right' ? 'align-right' : 'align-left'}`}
          >
            <p className="quote">”{item.text}”</p>
            <p className="author">{item.author}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;

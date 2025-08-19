import React, { useState } from 'react';
import './ContactForm.css';
import engineImage from "../assets/engine.jpg";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch("https://portfolio-rosy-five-54.vercel.app/api/contact/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to submit contact form");
      }

      await response.json();
      setSubmitted(true);

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (err) {
      setError(err.message);
    }
};

  return (
    <>
      <section className="contact-form" id="contact-us">
        <div className="form-left">
          <h1>Contact Us Now</h1>
          <h4>Get in Touch</h4>

          {submitted ? (
            <p className="success-message">Thank you! We’ll get back to you soon.</p>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && <p className="error-message">{error}</p>}
              <label>
                First name *
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Your first name"
                  required
                />
              </label>

              <label>
                Last name *
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Your last name"
                  required
                />
              </label>

              <label>
                Email *
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email address"
                  required
                />
              </label>

              <label>
                Phone
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone number"
                />
              </label>

              <label>
                Message
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message"
                />
              </label>

              <button type="submit">Submit</button>
            </form>
          )}
        </div>

        <div className="form-right">
          <p>
            Feel free to visit our location for a consultation or to discuss your car
            care needs with our expert team.
          </p>
        </div>
      </section>

      <div className="form-image">
        <img src={engineImage} alt="Engine maintenance" />
      </div>
    </>
  );
};

export default ContactForm;


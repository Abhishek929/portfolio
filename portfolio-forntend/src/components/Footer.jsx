import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer-container">
      {/* Font Awesome (include only once globally in index.html or Layout.jsx) */}
      <div className="footer-grid">
        {/* Company Info */}
        <div className="company-info">
          <div className="logo-title">
            <div className="logo-icon">
              <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm4 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="company-name">F. Aidoo & Attya</span>
          </div>
          <div className="contact-info">
            <p>123-456-7890</p>
            <p>info@myjsite.com</p>
            <p>500 Terry Francois St.</p>
            <p>San Francisco, CA 94158</p>
          </div>
          <div className="social-links">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>

        {/* Spacer */}
        <div className="spacer"></div>

        {/* Newsletter Form */}
        <div className="newsletter">
          <h3>Your Trusted Auto Care Partner</h3>
          <form>
            <label htmlFor="email">Email *</label>
            <input type="email" id="email" required />
            <div className="checkbox-group">
              <input type="checkbox" id="subscribe" />
              <label htmlFor="subscribe">Yes, subscribe me to your newsletter. *</label>
            </div>
            <button type="submit">Submit</button>
          </form>

          <div className="policy-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Accessibility Statement</a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>© 2035 by F. Aidoo & Attya. Powered and secured by Wix</p>
        <p className="windows-warning">Go to settings to activate Windows.</p>
      </div>
    </div>
  );
};

export default Footer;

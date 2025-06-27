import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-container">
        <h2>📬 Contact Us</h2>
        <p className="contact-intro">
          We're here to help you improve your resume and land your dream job. Reach out with any questions or feedback!
        </p>

        <div className="contact-details">
          <p><strong>Email:</strong> <a href="mailto:support@resumeanalyzer.ai">support@resumeanalyzer.ai</a></p>
          <p><strong>Phone:</strong> <a href="tel:+919876543210">+91-9876543210</a></p>
          <p><strong>Working Hours:</strong> Monday – Friday, 9:00 AM – 6:00 PM IST</p>
          <p><strong>Location:</strong> Hyderabad, Telangana, India</p>
        </div>

        <div className="social-media">
          <h3>🔗 Connect with us</h3>
          <a href="https://linkedin.com/company/resumeanalyzer" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://twitter.com/resumeanalyzer" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
        </div>

        <p className="response-note">⏱️ We aim to respond to all queries within 24 hours.</p>
      </div>
    </div>
  );
}

export default Contact;

import React from 'react';
import './About.css';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="about-page">
      <h2>About Resume Analyzer</h2>
      <p className="intro-text">
        Resume Analyzer is an AI-powered tool designed to help job seekers improve their resumes for better visibility, relevance, and performance in today’s competitive job market.
      </p>

      <div className="about-box">
        <h3>🎯 Our Mission</h3>
        <p>
          We aim to bridge the gap between applicants and recruiters by providing smart, personalized resume insights that boost your chances of landing interviews.
        </p>
      </div>

      <div className="about-box">
        <h3>🔍 How It Works</h3>
        <p>
          Using advanced Natural Language Processing (NLP) and Machine Learning algorithms, Resume Analyzer scans your uploaded resume, identifies key strengths and weaknesses, and provides actionable recommendations.
        </p>
      </div>

      <div className="about-box">
        <h3>✅ Key Features</h3>
        <ul>
          <li>AI-based Resume Parsing and Summarization</li>
          <li>Skill & Job Description Matching</li>
          <li>Grammar, Tone & Readability Feedback</li>
          <li>ATS (Applicant Tracking System) Optimization Tips</li>
        </ul>
      </div>

      <div className="about-box">
        <h3>💡 Why Use Resume Analyzer?</h3>
        <p>
          Whether you’re a fresh graduate or a seasoned professional, our analyzer helps you tailor your resume to the job you want — saving time, improving clarity, and maximizing your chances of getting noticed.
        </p>
      </div>

      <div className="about-box">
        <h3>👤 Meet the Creator</h3>
        <p>
          Resume Analyzer was created by <strong>Nirosha Sistu</strong>, a passionate developer committed to helping job seekers succeed using the power of AI and modern web technologies.
        </p>
      </div>

      <div className="cta-section">
        <Link to="/contact" className="cta-button">
          📩 Contact Us
        </Link>
      </div>
    </div>
  );
}

export default About;

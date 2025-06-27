import React from 'react';
import './Features.css';
import { FaFileAlt, FaBrain, FaCheckCircle, FaSpellCheck, FaLightbulb } from 'react-icons/fa';

function Features() {
  const features = [
    {
      icon: <FaFileAlt className="feature-icon" />,
      title: 'Resume Parsing',
      description:
        'Automatically extracts education, work experience, and skills to understand your resume structure.',
    },
    {
      icon: <FaBrain className="feature-icon" />,
      title: 'Skill Matching',
      description:
        'Compares your resume with job descriptions and highlights matching or missing skills.',
    },
    {
      icon: <FaCheckCircle className="feature-icon" />,
      title: 'ATS Optimization Tips',
      description:
        'Provides suggestions to make your resume compatible with Applicant Tracking Systems.',
    },
    {
      icon: <FaSpellCheck className="feature-icon" />,
      title: 'Grammar & Readability',
      description:
        'Detects grammatical errors, improves clarity, and ensures professional tone.',
    },
    {
      icon: <FaLightbulb className="feature-icon" />,
      title: 'Custom Recommendations',
      description:
        'Offers personalized tips based on industry trends and job roles.',
    },
  ];

  return (
    <div className="features-page">
      <h2 className="features-title">Key Features</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            {feature.icon}
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;

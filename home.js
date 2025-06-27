import React, { useState, useEffect } from 'react';
import './Home.css';

function Home() {
  const sections = [
    {
      id: 'what',
      title: '💡 What is Resume Analyzer?',
      points: [
        '🤖 AI Assistant: Powered by advanced language models to guide your resume improvements.',
        '⚡ Instant Feedback: Get real-time suggestions and corrections as soon as you upload.',
        '🎯 Personalized Advice: Tailored suggestions based on your job goals and skills.'
      ]
    },
    {
      id: 'why',
      title: '🔥 Why Use This Tool?',
      points: [
        '✅ Smart Tips: Receive grammar, formatting, and layout suggestions instantly.',
        '📊 Resume Scoring: Understand how your resume ranks with a job-readiness score.',
        '💬 Interactive Chatbot: Ask questions, get answers, and polish your resume with ease.',
        '🔒 Privacy First: Your resume data is encrypted and securely handled.'
      ]
    },
    {
      id: 'get-started',
      title: '🚀 Get Started',
      points: [
        '📤 Upload: Navigate to "Upload Resume" to begin analysis.',
        '🛠 Create: Need a resume? Use our built-in resume builder.',
        '🤝 Chat: Ask our AI chatbot anything about resumes, careers, or job interviews.'
      ]
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sections.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [sections.length]);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <h1> Welcome to Resume Analyzer</h1>
        <p>Upload your resume and let AI help you stand out with instant, actionable feedback.</p>
      </section>

      {/* About Home Page Section */}
      <section className="about-home">
        <div className="flow-box">
          <div className="flow-header">{sections[currentIndex].title}</div>
          <ul className="key-points">
            {sections[currentIndex].points.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Home;

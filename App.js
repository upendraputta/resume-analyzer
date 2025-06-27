import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Home from './pages/home';
import About from './pages/About';
import Features from './pages/Features';
import NotFound from './pages/NotFound';
import AnalyzeResult from './pages/AnalyzeResult';
import CreateResume from './pages/Createresume';
import Contact from './pages/Contact';
import UploadResume from './pages/UploadResume';



function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/analyze" element={<AnalyzeResult />} />
        <Route path="/create" element={<CreateResume />} />
        <Route path="/upload" element={<UploadResume />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Chatbot/>
    <Footer/>
    </Router>
  );
}

export default App;



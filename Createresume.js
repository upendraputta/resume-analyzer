import React, { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './CreateResume.css';

function CreateResume() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    summary: '',
    education: '',
    experience: '',
    skills: '',
    certifications: ''
  });

  const [photo, setPhoto] = useState(null);
  const [template, setTemplate] = useState('classic'); // Can be 'classic', 'modern', etc.
  const resumeRef = useRef();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = async () => {
    const input = resumeRef.current;
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
    pdf.save(`${formData.name.replace(/\s+/g, '_') || 'resume'}.pdf`);
  };

  return (
    <div className="create-resume-page">
      <h2>📝 Create Your Resume</h2>
      <div className="resume-container">
        <form className="resume-form">
          <label>Choose Template</label>
          <select value={template} onChange={(e) => setTemplate(e.target.value)}>
            <option value="classic">Classic</option>
            <option value="modern">Modern</option>
          </select>

          <label>Upload Profile Photo</label>
          <input type="file" accept="image/*" onChange={handlePhotoUpload} />

          <input name="name" placeholder="Full Name" onChange={handleChange} />
          <input name="email" placeholder="Email" onChange={handleChange} />
          <input name="phone" placeholder="Phone" onChange={handleChange} />
          <input name="linkedin" placeholder="LinkedIn URL" onChange={handleChange} />
          <input name="github" placeholder="GitHub URL" onChange={handleChange} />

          <textarea name="summary" placeholder="Professional Summary" onChange={handleChange} />
          <textarea name="education" placeholder="Education" onChange={handleChange} />
          <textarea name="experience" placeholder="Work Experience" onChange={handleChange} />
          <textarea name="skills" placeholder="Skills (comma-separated)" onChange={handleChange} />
          <textarea name="certifications" placeholder="Certifications" onChange={handleChange} />

          <button type="button" onClick={handleDownload}>⬇️ Download PDF</button>
        </form>

        <div className={`resume-preview ${template}`} ref={resumeRef}>
          <div className="header-section">
            {photo && <img src={photo} alt="Profile" className="profile-photo" />}
            <div className="name-block">
              <h1>{formData.name}</h1>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Phone:</strong> {formData.phone}</p>
              <p><strong>LinkedIn:</strong> {formData.linkedin}</p>
              <p><strong>GitHub:</strong> {formData.github}</p>
            </div>
          </div>

          <section>
            <h3>Summary</h3>
            <p>{formData.summary}</p>
          </section>

          <section>
            <h3>Education</h3>
            <p>{formData.education}</p>
          </section>

          <section>
            <h3>Experience</h3>
            <p>{formData.experience}</p>
          </section>

          <section>
            <h3>Skills</h3>
            <p>{formData.skills}</p>
          </section>

          <section>
            <h3>Certifications</h3>
            <p>{formData.certifications}</p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default CreateResume;

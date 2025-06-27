import React, { useState } from 'react';
import axios from 'axios';

const UploadResume = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert('Please select a file');

    const formData = new FormData();
    formData.append('resume', file);

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5000/api/resume/upload', formData);
      setResult(res.data.resume.text);
    } catch (err) {
      alert('Error uploading resume');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Upload Resume (PDF)</h2>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading} style={{ marginLeft: '10px' }}>
        {loading ? 'Uploading...' : 'Upload'}
      </button>

      {result && (
        <div style={{ marginTop: '20px', whiteSpace: 'pre-wrap', background: '#f0f0f0', padding: '10px' }}>
          <h3>Extracted Resume Text:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default UploadResume;
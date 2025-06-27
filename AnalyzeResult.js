
import React, { useState } from 'react';
import axios from 'axios';
import './AnalyzeResult.css';

function AnalyzeResult() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    if (!file) {
      setError('Please select a PDF file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', file);
    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/resume/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data?.resume) {
        setResult(response.data.resume);
      } else {
        setError('No analysis result received. Try again.');
      }
    } catch (err) {
      console.error('Error analyzing resume:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Failed to analyze resume.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="analyze-page">
      <div className="analyze-container">
        {/* Upload Section */}
        <div className="upload-section">
          <h2>📤 Upload Resume</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
              disabled={loading}
            />
            {file && <p className="file-name">Selected: {file.name}</p>}
            <button type="submit" disabled={loading}>
              {loading ? 'Analyzing...' : 'Analyze'}
            </button>
          </form>
          {error && <p className="error-text">{error}</p>}
        </div>

        {/* Result Section */}
        <div className="result-section">
          <h2>📊 Analysis Result</h2>
          {result ? (
            <div className="result-box">
              <p><strong>📄 File Name:</strong> {result.name}</p>
              <p><strong>📅 Uploaded:</strong> {new Date(result.createdAt).toLocaleString()}</p>

              <details>
                <summary><strong>📃 Extracted Resume Text</strong></summary>
                <pre>{result.text || 'No text extracted from PDF.'}</pre>
              </details>

              <details open>
                <summary><strong>🧠 AI Analysis</strong></summary>
                <pre>{result.analysis || 'No analysis result returned.'}</pre>
              </details>
            </div>
          ) : (
            <p className="placeholder-text">
              {loading ? 'Analyzing the uploaded resume...' : 'Upload a resume to see analysis results.'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnalyzeResult;

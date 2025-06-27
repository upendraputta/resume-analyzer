const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const axios = require('axios');
const Resume = require('../models/Resume');
const path = require('path');

const router = express.Router();

// === File Upload Setup ===
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    const dir = 'uploads/';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (_, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// === POST: Upload, Analyze & Save Resume ===
router.post('/upload', upload.single('resume'), async (req, res) => {
  try {
    console.log('➡ Upload received');

    const filePath = req.file?.path;
    if (!filePath) throw new Error('No file path found. File upload might have failed.');

    const fileBuffer = fs.readFileSync(filePath);
    console.log('📄 PDF read from disk');

    const pdfData = await pdfParse(fileBuffer);
    const extractedText = pdfData.text;
    console.log('✅ PDF text extracted');

    if (!extractedText || extractedText.trim().length < 30) {
      throw new Error('PDF has insufficient content or is not parseable.');
    }

    // === AI Resume Analysis ===
    console.log('🤖 Sending to OpenRouter...');
    const aiResponse = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model:'mistralai/mistral-small-3.2-24b-instruct:free',
        messages: [
          { role: 'system', content: 'You are a professional resume evaluator.' },
          { role: 'user', content: `Please analyze the following resume:\n\n${extractedText}` }
        ],
        temperature: 0.7
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const analysisResult = aiResponse.data.choices[0].message.content;
    console.log('✅ AI analysis complete');

    // === Save to MongoDB ===
    const resume = new Resume({
      name: req.file.originalname,
      text: extractedText,
      analysis: analysisResult
    });

    await resume.save();
    console.log('💾 Resume saved to DB');

    // Delete uploaded file
    fs.unlink(filePath, (err) => {
      if (err) console.error('⚠ Failed to delete uploaded file:', err);
    });

    res.json({ message: 'Resume uploaded, analyzed and saved', resume });

  } catch (err) {
    console.error('❌ Error in /upload:', {
      message: err.message,
      status: err?.response?.status,
      data: err?.response?.data,
    });
    
  }
});

// === GET: Fetch All Resumes ===
router.get('/all', async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ createdAt: -1 });
    res.json(resumes);
  } catch (err) {
    console.error('❌ Error in /all:', {
      message: err.message,
      stack: err.stack,
    });
    res.status(500).json({ error: 'Failed to fetch resumes' });
  }
});
// === Test Route ===
router.get('/test', (req, res) => {
  res.send('✅ Resume API is working!');
});

module.exports = router;

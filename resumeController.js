const path = require('path');
const analyzeResume = require('../services/analyzeResume');
const Resume = require('../models/Resume');

const analyzeResumeHandler = async (req, res) => {
  const filePath = path.join(__dirname, '..', req.file.path);

  try {
    const result = await analyzeResume(filePath);

    const savedResume = new Resume({
      filename: req.file.originalname,
      skills: result.skillsMatched,
      score: result.score,
      tips: result.tips
    });

    await savedResume.save();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to analyze resume' });
  }
};

module.exports = { analyzeResumeHandler };

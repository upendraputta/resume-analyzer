const analyzeResume = async (filePath) => {
  return {
    message: 'Analysis successful!',
    skillsMatched: ['JavaScript', 'React', 'Node.js'],
    score: 80,
    tips: [
      'Add measurable results',
      'Use active voice',
      'Tailor for the job role'
    ]
  };
};

module.exports = analyzeResume;

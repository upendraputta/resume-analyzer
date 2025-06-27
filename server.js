const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const axios = require('axios');
const resumeRoutes = require('./routes/resumeRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Use Resume Analyzer Routes
app.use('/api/resume', resumeRoutes);

// ✅ AI Chatbot via OpenRouter
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const aiResponse = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/mistral-small-3.2-24b-instruct:free',
        messages: [
          { role: 'system', content: 'You are a helpful resume assistant.' },
          { role: 'user', content: message },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`, // ✅ fixed
          'Content-Type': 'application/json',
        },
      }
    );

    const reply = aiResponse.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('❌ Chatbot error:', error.response?.data || error.message);
    res.status(500).json({ error: 'AI response failed' });
  }
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

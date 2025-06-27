import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Chatbot.css';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('chatSession');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('chatHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [showHistory, setShowHistory] = useState(false);

  // Save current session
  useEffect(() => {
    localStorage.setItem('chatSession', JSON.stringify(messages));
  }, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  const saveToHistory = (chat) => {
    const saved = localStorage.getItem('chatHistory');
    const parsed = saved ? JSON.parse(saved) : [];
    parsed.push({ id: Date.now(), timestamp: new Date().toLocaleString(), chat });
    localStorage.setItem('chatHistory', JSON.stringify(parsed));
    setHistory(parsed);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    try {
      const res = await axios.post('http://localhost:5000/api/chat', { message: input });
      const botReply = { sender: 'bot', text: res.data.reply };
      const updated = [...newMessages, botReply];
      setMessages(updated);
      saveToHistory(updated);
    } catch {
      const updated = [...newMessages, { sender: 'bot', text: '❌ Error connecting to AI.' }];
      setMessages(updated);
      saveToHistory(updated);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setInput('');
    localStorage.removeItem('chatSession');
  };

  return (
    <div className="chatbot-wrapper">
      <button className="chatbot-toggle" onClick={toggleChat}>📄</button>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            Resume ChatBot
            <div>
              <button className="clear-btn-top" onClick={clearChat}>🗑</button>
              <button className="clear-btn-top" onClick={() => setShowHistory(!showHistory)}>🕘</button>
            </div>
          </div>

          {showHistory && (
            <div className="chat-history">
              {history.length === 0 ? (
                <p style={{ padding: '10px' }}>No history yet.</p>
              ) : (
                history.map((session, index) => (
                  <div
                    key={session.id}
                    className="history-item"
                    onClick={() => {
                      setMessages(session.chat);
                      setShowHistory(false);
                    }}
                  >
                    💬 Chat {index + 1} - {session.timestamp}
                  </div>
                ))
              )}
            </div>
          )}

          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.sender}`}>{msg.text}</div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;

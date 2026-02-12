require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Enable CORS so your React app (running on your PC) can talk to this EC2 server
app.use(cors()); 
app.use(express.json());

// 1. Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// 2. Data Blueprint (Schema)
const messageSchema = new mongoose.Schema({
  text: String,
  user: { type: String, default: "Anonymous" },
  date: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', messageSchema);

// 3. API Routes
app.get('/messages', async (req, res) => {
  const allMessages = await Message.find(); 
  res.json(allMessages);
});

app.post('/messages', async (req, res) => {
  const newMessage = new Message({
    text: req.body.text,
    user: req.body.user
  });
  await newMessage.save(); 
  res.status(201).json(newMessage);
});

// IMPORTANT: Use 5001 and 0.0.0.0 for Docker/EC2 compatibility
const PORT = 5001; 
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});
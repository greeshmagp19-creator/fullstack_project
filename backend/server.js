require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
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
  const allMessages = await Message.find(); // Fetches from DB
  res.json(allMessages);
});

app.post('/messages', async (req, res) => {
  const newMessage = new Message({
    text: req.body.text,
    user: req.body.user
  });
  await newMessage.save(); // Saves to DB
  res.status(201).json(newMessage);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
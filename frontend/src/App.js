import React, { useState, useEffect } from 'react';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Change localhost to your EC2 Public IP
  const API_URL = "http://13.49.90.144:5001/messages";

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setMessages(data))
      .catch(err => console.error("Error fetching messages:", err));
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input) return;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input, user: "User" })
      });

      if (response.ok) {
        const newMessage = await response.json();
        setMessages([...messages, newMessage]); 
        setInput(""); 
      }
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', textAlign: 'center', padding: '20px' }}>
      <h2>Interactive Guestbook</h2>
      <form onSubmit={sendMessage}>
        <input 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Write a message..." 
        />
        <button type="submit">Send</button>
      </form>
      <hr />
      {messages.map(m => (
        <p key={m._id}><strong>{m.user}:</strong> {m.text}</p>
      ))}
    </div>
  );
}
export default App;
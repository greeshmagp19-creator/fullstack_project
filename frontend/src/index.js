import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// This finds the 'root' div in your HTML and renders the Guestbook App inside it
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
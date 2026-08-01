import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './App.css'; // 🔴 இந்த வரியை கண்டிப்பாக சேர்க்கவும்!
import { ThemeProvider } from './Context/ThemeContext';
import { CustomCursor } from './Components/CustomCursor'; // Custom Cursor Component ஐ Import செய்க

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <CustomCursor />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
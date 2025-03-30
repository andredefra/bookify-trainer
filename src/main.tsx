
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Create a container with proper viewport meta tag
document.documentElement.style.overflowX = 'hidden';
document.body.style.overflowX = 'hidden';

// Render the App with LanguageProvider
createRoot(document.getElementById("root")!).render(<App />);

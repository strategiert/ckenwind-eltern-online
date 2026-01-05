import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById("root")!;

// Prüfe ob die Seite pre-rendered wurde
const isPrerendered = rootElement.hasAttribute('data-prerendered');

if (isPrerendered) {
  // Hydrate: Übernehme bestehendes HTML und mache es interaktiv
  hydrateRoot(rootElement, <App />);
} else {
  // Normales Client-Side Rendering
  createRoot(rootElement).render(<App />);
}

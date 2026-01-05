import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById("root")!;

// Hinweis: Wir verwenden createRoot statt hydrateRoot, da die App
// dynamische Inhalte aus Supabase lädt. Das prerenderte HTML ist
// für SEO (Google sieht den fertigen Inhalt), aber der Client
// rendert neu um die interaktive App zu zeigen.
//
// Ein vollständiges SSR/SSG mit Hydration würde erfordern:
// 1. Daten beim Prerender in den HTML einzubetten
// 2. Diese Daten beim Client-Load zu extrahieren
// 3. Die Query-Cache mit diesen Daten zu initialisieren

createRoot(rootElement).render(<App />);

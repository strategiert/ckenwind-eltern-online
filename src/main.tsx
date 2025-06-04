
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import ResourcePreloader from './components/performance/ResourcePreloader.tsx'
import './index.css'

const root = createRoot(document.getElementById("root")!);

root.render(
  <>
    <ResourcePreloader />
    <App />
  </>
);

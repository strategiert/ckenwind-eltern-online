import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import vitePrerender from 'vite-plugin-prerender';

// Statische Seiten die pre-rendered werden sollen
const staticRoutes = [
  '/',
  '/ueber-mich',
  '/blog',
  '/glossar',
  '/gratis-buch',
  '/kontakt',
  '/impressum',
];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    mode === 'production' && vitePrerender({
      routes: staticRoutes,
      renderer: '@prerenderer/renderer-puppeteer',
      rendererOptions: {
        maxConcurrentRoutes: 2,
        renderAfterTime: 3000,
      },
      postProcess(renderedRoute) {
        // Inject prerendered hint for hydration
        renderedRoute.html = renderedRoute.html.replace(
          '</head>',
          '<meta name="prerendered" content="true"></head>'
        );
        return renderedRoute;
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

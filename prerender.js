/**
 * Prerender Script für Static Site Generation
 *
 * Dieses Script rendert React-Seiten zu statischem HTML für SEO.
 * Es startet einen lokalen Server, besucht jede Route mit Puppeteer,
 * und speichert das gerenderte HTML.
 */

import puppeteer from 'puppeteer';
import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';

// Lade Environment Variables
config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = join(__dirname, 'dist');
const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}`;

// Supabase Konfiguration
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

// ============================================================
// ROUTEN KONFIGURATION
// ============================================================

// Statische Routen (immer prerendern)
const STATIC_ROUTES = [
  '/',
  '/ueber-mich',
  '/blog',
  '/glossar',
  '/gratis-buch',
  '/kontakt',
  '/impressum',
];

/**
 * Lädt alle dynamischen Routen aus Supabase
 */
async function getDynamicRoutes() {
  const routes = [];

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn('⚠️  Supabase credentials not found. Skipping dynamic routes.');
    console.warn('   Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env');
    return routes;
  }

  try {
    // Glossar-Begriffe laden
    console.log('📚 Loading glossary terms from Supabase...');
    const glossaryResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/glossary_terms?select=slug&is_published=eq.true`,
      {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    );

    if (glossaryResponse.ok) {
      const glossaryTerms = await glossaryResponse.json();
      const glossaryRoutes = glossaryTerms.map(term => `/glossar/${term.slug}`);
      routes.push(...glossaryRoutes);
      console.log(`   ✅ Found ${glossaryRoutes.length} glossary terms`);
    } else {
      console.warn(`   ⚠️  Could not load glossary terms: ${glossaryResponse.status}`);
    }

    // Blog-Posts laden
    console.log('📝 Loading blog posts from Supabase...');
    const blogResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/blog_posts?select=slug&published=eq.true`,
      {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    );

    if (blogResponse.ok) {
      const blogPosts = await blogResponse.json();
      const blogRoutes = blogPosts.map(post => `/blog/${post.slug}`);
      routes.push(...blogRoutes);
      console.log(`   ✅ Found ${blogRoutes.length} blog posts`);
    } else {
      console.warn(`   ⚠️  Could not load blog posts: ${blogResponse.status}`);
    }

  } catch (error) {
    console.error('❌ Error loading dynamic routes:', error.message);
  }

  return routes;
}

// ============================================================
// SIMPLE STATIC SERVER
// ============================================================

function createStaticServer() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      let filePath = join(DIST_DIR, req.url === '/' ? 'index.html' : req.url);

      // SPA Fallback: Wenn Datei nicht existiert, serve index.html
      if (!existsSync(filePath)) {
        // Prüfe ob es ein Verzeichnis mit index.html ist
        const indexPath = join(filePath, 'index.html');
        if (existsSync(indexPath)) {
          filePath = indexPath;
        } else {
          filePath = join(DIST_DIR, 'index.html');
        }
      }

      // Verzeichnis -> index.html
      if (existsSync(filePath) && filePath.endsWith('/')) {
        filePath = join(filePath, 'index.html');
      }

      try {
        const content = readFileSync(filePath);
        const ext = filePath.split('.').pop();
        const contentTypes = {
          'html': 'text/html',
          'js': 'application/javascript',
          'css': 'text/css',
          'json': 'application/json',
          'png': 'image/png',
          'jpg': 'image/jpeg',
          'svg': 'image/svg+xml',
          'woff': 'font/woff',
          'woff2': 'font/woff2',
        };
        res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'text/plain' });
        res.end(content);
      } catch (err) {
        res.writeHead(404);
        res.end('Not Found');
      }
    });

    server.listen(PORT, () => {
      console.log(`📦 Static server running at ${BASE_URL}`);
      resolve(server);
    });
  });
}

// ============================================================
// PRERENDER LOGIC
// ============================================================

// Konfiguration
const CONCURRENCY = 5; // Anzahl paralleler Browser-Tabs
const RENDER_TIMEOUT = 30000;
const DATA_WAIT_TIME = 2000;

async function prerenderRoute(browser, route, stats) {
  const page = await browser.newPage();
  const url = `${BASE_URL}${route}`;
  const startTime = Date.now();

  try {
    // Navigiere zur Seite und warte bis Netzwerk idle ist
    await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: RENDER_TIMEOUT
    });

    // Warte zusätzlich auf React Hydration
    await page.waitForSelector('[data-reactroot], #root > *', { timeout: 10000 });

    // Warte kurz für async Daten (Supabase Queries)
    await new Promise(resolve => setTimeout(resolve, DATA_WAIT_TIME));

    // Hole das gerenderte HTML
    let html = await page.content();

    // Füge Prerender-Marker hinzu
    html = html.replace(
      '<div id="root">',
      '<div id="root" data-prerendered="true">'
    );

    // Bestimme den Ausgabepfad
    let outputPath;
    if (route === '/') {
      outputPath = join(DIST_DIR, 'index.html');
    } else {
      // Erstelle Verzeichnis und index.html darin
      const routeDir = join(DIST_DIR, route);
      mkdirSync(routeDir, { recursive: true });
      outputPath = join(routeDir, 'index.html');
    }

    // Speichere HTML
    writeFileSync(outputPath, html);

    const duration = Date.now() - startTime;
    stats.success++;
    console.log(`  ✅ ${route} (${duration}ms)`);

  } catch (error) {
    stats.failed++;
    stats.errors.push({ route, error: error.message });
    console.error(`  ❌ ${route}: ${error.message}`);
  } finally {
    await page.close();
  }
}

/**
 * Verarbeitet Routen in Batches für bessere Performance
 */
async function processBatch(browser, routes, stats) {
  const promises = routes.map(route => prerenderRoute(browser, route, stats));
  await Promise.all(promises);
}

async function main() {
  const totalStartTime = Date.now();

  console.log('\n🚀 Starting Prerender Process\n');
  console.log('='.repeat(50));

  // Prüfe ob dist existiert
  if (!existsSync(DIST_DIR)) {
    console.error('❌ dist/ folder not found. Run "npm run build:only" first.');
    process.exit(1);
  }

  // Starte Server
  const server = await createStaticServer();

  // Sammle alle Routen
  console.log('\n📡 Loading routes...');
  const dynamicRoutes = await getDynamicRoutes();
  const allRoutes = [...STATIC_ROUTES, ...dynamicRoutes];

  console.log(`\n📋 Total routes to prerender: ${allRoutes.length}`);
  console.log(`   - Static: ${STATIC_ROUTES.length}`);
  console.log(`   - Dynamic: ${dynamicRoutes.length}`);
  console.log(`   - Concurrency: ${CONCURRENCY} parallel tabs`);
  console.log('='.repeat(50));

  // Stats tracking
  const stats = {
    success: 0,
    failed: 0,
    errors: []
  };

  // Starte Puppeteer
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
    ],
  });

  // Verarbeite in Batches
  console.log('\n🔄 Rendering pages...\n');

  for (let i = 0; i < allRoutes.length; i += CONCURRENCY) {
    const batch = allRoutes.slice(i, i + CONCURRENCY);
    const batchNum = Math.floor(i / CONCURRENCY) + 1;
    const totalBatches = Math.ceil(allRoutes.length / CONCURRENCY);

    console.log(`\n📦 Batch ${batchNum}/${totalBatches}`);
    await processBatch(browser, batch, stats);
  }

  // Cleanup
  await browser.close();
  server.close();

  // Summary
  const totalDuration = ((Date.now() - totalStartTime) / 1000).toFixed(1);

  console.log('\n' + '='.repeat(50));
  console.log('📊 PRERENDER SUMMARY');
  console.log('='.repeat(50));
  console.log(`   ✅ Success: ${stats.success}`);
  console.log(`   ❌ Failed:  ${stats.failed}`);
  console.log(`   ⏱️  Duration: ${totalDuration}s`);
  console.log(`   📄 Pages/sec: ${(allRoutes.length / parseFloat(totalDuration)).toFixed(1)}`);

  if (stats.errors.length > 0) {
    console.log('\n⚠️  Failed routes:');
    stats.errors.forEach(({ route, error }) => {
      console.log(`   - ${route}: ${error}`);
    });
  }

  console.log('\n✨ Prerendering complete!');
  console.log('='.repeat(50) + '\n');

  // Exit mit Fehlercode wenn welche fehlgeschlagen sind
  if (stats.failed > 0) {
    process.exit(1);
  }
}

main().catch(err => {
  console.error('💥 Fatal error:', err);
  process.exit(1);
});

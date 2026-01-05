import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const SITE_URL = 'https://rueckenwind-eltern.de';

serve(async (req) => {
  const url = new URL(req.url);
  const format = url.searchParams.get('format') || 'xml';

  try {
    // Statische Seiten
    const staticPages = [
      { loc: '/', priority: '1.0', changefreq: 'weekly' },
      { loc: '/ueber-mich', priority: '0.8', changefreq: 'monthly' },
      { loc: '/blog', priority: '0.9', changefreq: 'daily' },
      { loc: '/glossar', priority: '0.9', changefreq: 'daily' },
      { loc: '/gratis-buch', priority: '0.7', changefreq: 'monthly' },
      { loc: '/kontakt', priority: '0.6', changefreq: 'monthly' },
      { loc: '/mental-health-chat', priority: '0.7', changefreq: 'monthly' },
      { loc: '/impressum', priority: '0.3', changefreq: 'yearly' },
    ];

    // Blog-Posts laden
    const { data: blogPosts } = await supabase
      .from('blog_posts')
      .select('slug, updated_at, published_at')
      .eq('published', true)
      .order('published_at', { ascending: false });

    // Glossar-Terme laden
    const { data: glossaryTerms } = await supabase
      .from('glossary_terms')
      .select('slug, updated_at, created_at')
      .eq('is_published', true)
      .order('term', { ascending: true });

    // Wiki-Kategorien laden
    const { data: categories } = await supabase
      .from('wiki_categories')
      .select('slug');

    // URLs zusammenstellen
    const urls: Array<{
      loc: string;
      lastmod?: string;
      priority: string;
      changefreq: string;
    }> = [];

    // Statische Seiten
    for (const page of staticPages) {
      urls.push({
        loc: `${SITE_URL}${page.loc}`,
        priority: page.priority,
        changefreq: page.changefreq,
      });
    }

    // Blog-Posts
    for (const post of blogPosts || []) {
      urls.push({
        loc: `${SITE_URL}/blog/${post.slug}`,
        lastmod: post.updated_at || post.published_at,
        priority: '0.8',
        changefreq: 'weekly',
      });
    }

    // Glossar-Terme (höchste Priorität für Wiki-Aufbau)
    for (const term of glossaryTerms || []) {
      urls.push({
        loc: `${SITE_URL}/glossar/${term.slug}`,
        lastmod: term.updated_at || term.created_at,
        priority: '0.9',
        changefreq: 'weekly',
      });
    }

    // Blog-Kategorien
    const blogCategories = ['burnout', 'adhs', 'essstoerungen', 'stress', 'achtsamkeit'];
    for (const cat of blogCategories) {
      urls.push({
        loc: `${SITE_URL}/blog/category/${cat}`,
        priority: '0.7',
        changefreq: 'weekly',
      });
    }

    if (format === 'json') {
      return new Response(JSON.stringify({
        urlset: urls,
        totalUrls: urls.length,
        generated: new Date().toISOString()
      }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // XML Sitemap generieren
    const xml = generateSitemapXML(urls);

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600', // 1 Stunde Cache
      },
    });

  } catch (error: any) {
    console.error('Sitemap generation error:', error);
    return new Response(`Error generating sitemap: ${error.message}`, {
      status: 500,
    });
  }
});

function generateSitemapXML(urls: Array<{
  loc: string;
  lastmod?: string;
  priority: string;
  changefreq: string;
}>): string {
  const urlEntries = urls.map(url => {
    let entry = `  <url>\n    <loc>${escapeXml(url.loc)}</loc>\n`;
    if (url.lastmod) {
      entry += `    <lastmod>${new Date(url.lastmod).toISOString().split('T')[0]}</lastmod>\n`;
    }
    entry += `    <changefreq>${url.changefreq}</changefreq>\n`;
    entry += `    <priority>${url.priority}</priority>\n`;
    entry += `  </url>`;
    return entry;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlEntries}
</urlset>`;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

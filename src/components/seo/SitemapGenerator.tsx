
import React, { useEffect } from 'react';
import { useBlogPosts } from '@/hooks/useBlogPosts';

interface SitemapUrl {
  url: string;
  changefreq: string;
  priority: string;
  lastmod?: string;
}

const SitemapGenerator: React.FC = () => {
  const { data: blogPosts } = useBlogPosts();

  useEffect(() => {
    if (blogPosts) {
      generateSitemap();
    }
  }, [blogPosts]);

  const generateSitemap = () => {
    const baseUrl = 'https://rueckenwind-eltern.de';
    const currentDate = new Date().toISOString();
    
    // Static pages
    const staticPages: SitemapUrl[] = [
      { url: '/', changefreq: 'weekly', priority: '1.0' },
      { url: '/blog', changefreq: 'daily', priority: '0.9' },
      { url: '/glossar', changefreq: 'weekly', priority: '0.8' },
      { url: '/ueber-mich', changefreq: 'monthly', priority: '0.7' },
      { url: '/kontakt', changefreq: 'monthly', priority: '0.6' },
      { url: '/gratis-buch', changefreq: 'monthly', priority: '0.8' },
    ];

    // Blog posts
    const blogPostUrls: SitemapUrl[] = blogPosts?.map(post => ({
      url: `/blog/${post.slug}`,
      changefreq: 'monthly',
      priority: '0.7',
      lastmod: post.updated_at || post.published_at || post.created_at
    })) || [];

    // Combine all URLs
    const allUrls: SitemapUrl[] = [...staticPages, ...blogPostUrls];

    // Generate XML sitemap
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod || currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    // Create and download sitemap file (for development)
    if (process.env.NODE_ENV === 'development') {
      console.log('Generated sitemap:', sitemapXml);
    }
  };

  return null; // This component doesn't render anything
};

export default SitemapGenerator;

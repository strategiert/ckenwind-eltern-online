
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
  canonical?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  image = "https://lovable.dev/opengraph-image-p98pqg.png",
  url = "https://rueckenwind-eltern.de",
  type = "website",
  author,
  publishedTime,
  modifiedTime,
  section,
  tags,
  noindex = false,
  canonical
}) => {
  const fullTitle = title.includes('Rückenwind Eltern') ? title : `${title} | Rückenwind Eltern`;
  const fullUrl = url.startsWith('http') ? url : `https://rueckenwind-eltern.de${url}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {author && <meta name="author" content={author} />}
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Rückenwind Eltern" />
      <meta property="og:locale" content="de_DE" />
      
      {/* Article specific */}
      {type === 'article' && author && <meta property="article:author" content={author} />}
      {type === 'article' && publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {type === 'article' && modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {type === 'article' && section && <meta property="article:section" content={section} />}
      {type === 'article' && tags && tags.map(tag => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@rueckenwind_eltern" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#8B5CF6" />
      
      {/* Language */}
      <meta httpEquiv="content-language" content="de" />
      <link rel="alternate" hrefLang="de" href={fullUrl} />
    </Helmet>
  );
};

export default SEOHead;

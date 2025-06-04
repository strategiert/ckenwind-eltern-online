
import React, { useEffect } from 'react';

const ResourcePreloader: React.FC = () => {
  useEffect(() => {
    // Preload critical fonts
    const fontLinks = [
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
    ];

    fontLinks.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      document.head.appendChild(link);
    });

    // Preload critical images
    const criticalImages = [
      '/lovable-uploads/f3fff60c-fae4-4bdd-ad95-3651cef45cb0.png',
      '/lovable-uploads/5a353323-d780-4159-976a-7e93624fb784.png',
    ];

    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    // Prefetch high-priority routes
    const highPriorityRoutes = [
      '/eltern-cloud',
      '/gratis-buch',
      '/ueber-mich',
    ];

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        highPriorityRoutes.forEach(route => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = route;
          document.head.appendChild(link);
        });
      });
    }
  }, []);

  return null;
};

export default ResourcePreloader;

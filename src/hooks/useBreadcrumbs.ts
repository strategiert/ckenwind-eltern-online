
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

interface BreadcrumbItem {
  name: string;
  url: string;
}

export const useBreadcrumbs = () => {
  const location = useLocation();
  
  const breadcrumbs = useMemo(() => {
    const pathnames = location.pathname.split('/').filter(x => x);
    const items: BreadcrumbItem[] = [
      { name: 'Startseite', url: 'https://rueckenwind-eltern.de/' }
    ];

    let currentPath = '';
    
    pathnames.forEach((pathname, index) => {
      currentPath += `/${pathname}`;
      
      // Map paths to readable names
      let name = '';
      switch (pathname) {
        case 'blog':
          name = 'Blog';
          break;
        case 'glossar':
          name = 'Glossar';
          break;
        case 'kontakt':
          name = 'Kontakt';
          break;
        case 'ueber-mich':
          name = 'Über mich';
          break;
        case 'gratis-buch':
          name = 'Gratis E-Book';
          break;
        case 'category':
          name = 'Kategorie';
          break;
        case 'admin':
          name = 'Administration';
          break;
        case 'auth':
          name = 'Anmeldung';
          break;
        default:
          // For blog posts and other dynamic content, capitalize first letter
          name = pathname.charAt(0).toUpperCase() + pathname.slice(1).replace(/-/g, ' ');
      }
      
      items.push({
        name,
        url: `https://rueckenwind-eltern.de${currentPath}`
      });
    });

    return items;
  }, [location.pathname]);

  return breadcrumbs;
};

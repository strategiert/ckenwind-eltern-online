
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SchemaMarkupProps {
  type: 'website' | 'article' | 'person' | 'organization' | 'breadcrumb';
  data: any;
}

const SchemaMarkup: React.FC<SchemaMarkupProps> = ({ type, data }) => {
  const generateSchema = () => {
    const baseSchema = {
      "@context": "https://schema.org",
    };

    switch (type) {
      case 'website':
        return {
          ...baseSchema,
          "@type": "Website",
          name: data.name,
          url: data.url,
          description: data.description,
          publisher: {
            "@type": "Organization",
            name: "Rückenwind Eltern",
            logo: {
              "@type": "ImageObject",
              url: `${data.url}/lovable-uploads/5a353323-d780-4159-976a-7e93624fb784.png`
            }
          },
          potentialAction: {
            "@type": "SearchAction",
            target: `${data.url}/blog?search={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        };

      case 'article':
        return {
          ...baseSchema,
          "@type": "Article",
          headline: data.title,
          description: data.description,
          image: data.image,
          author: {
            "@type": "Person",
            name: data.author || "Janike Arent",
            url: `${data.baseUrl}/ueber-mich`
          },
          publisher: {
            "@type": "Organization",
            name: "Rückenwind Eltern",
            logo: {
              "@type": "ImageObject",
              url: `${data.baseUrl}/lovable-uploads/5a353323-d780-4159-976a-7e93624fb784.png`
            }
          },
          datePublished: data.datePublished,
          dateModified: data.dateModified || data.datePublished,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": data.url
          }
        };

      case 'person':
        return {
          ...baseSchema,
          "@type": "Person",
          name: data.name,
          jobTitle: data.jobTitle,
          description: data.description,
          url: data.url,
          image: data.image,
          sameAs: data.sameAs || [],
          knowsAbout: data.expertise || [],
          alumniOf: data.education || [],
          worksFor: {
            "@type": "Organization",
            name: "Rückenwind Eltern"
          }
        };

      case 'organization':
        return {
          ...baseSchema,
          "@type": "Organization",
          name: data.name,
          description: data.description,
          url: data.url,
          logo: data.logo,
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer service",
            email: data.email,
            availableLanguage: "German"
          },
          founder: {
            "@type": "Person",
            name: "Janike Arent"
          },
          areaServed: "Germany",
          serviceType: ["Elternberatung", "Familientherapie", "ADHS-Beratung"]
        };

      case 'breadcrumb':
        return {
          ...baseSchema,
          "@type": "BreadcrumbList",
          itemListElement: data.items.map((item: any, index: number) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url
          }))
        };

      default:
        return baseSchema;
    }
  };

  const schema = generateSchema();

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default SchemaMarkup;

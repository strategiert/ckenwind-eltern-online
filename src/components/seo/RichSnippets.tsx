
import React from 'react';
import SchemaMarkup from './SchemaMarkup';

interface RichSnippetsProps {
  type: 'faq' | 'howto' | 'review' | 'product' | 'service';
  data: any;
}

const RichSnippets: React.FC<RichSnippetsProps> = ({ type, data }) => {
  const generateRichSnippet = () => {
    const baseSchema = {
      "@context": "https://schema.org",
    };

    switch (type) {
      case 'faq':
        return {
          ...baseSchema,
          "@type": "FAQPage",
          mainEntity: data.questions.map((item: any) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer
            }
          }))
        };

      case 'howto':
        return {
          ...baseSchema,
          "@type": "HowTo",
          name: data.name,
          description: data.description,
          image: data.image,
          totalTime: data.totalTime,
          estimatedCost: data.estimatedCost,
          supply: data.supplies?.map((supply: string) => ({
            "@type": "HowToSupply",
            name: supply
          })),
          tool: data.tools?.map((tool: string) => ({
            "@type": "HowToTool",
            name: tool
          })),
          step: data.steps.map((step: any, index: number) => ({
            "@type": "HowToStep",
            position: index + 1,
            name: step.name,
            text: step.text,
            image: step.image
          }))
        };

      case 'review':
        return {
          ...baseSchema,
          "@type": "Review",
          itemReviewed: {
            "@type": "Organization",
            name: "Rückenwind Eltern"
          },
          reviewRating: {
            "@type": "Rating",
            ratingValue: data.rating,
            bestRating: "5"
          },
          author: {
            "@type": "Person",
            name: data.author
          },
          reviewBody: data.reviewText
        };

      case 'service':
        return {
          ...baseSchema,
          "@type": "Service",
          name: data.name,
          description: data.description,
          provider: {
            "@type": "Organization",
            name: "Rückenwind Eltern"
          },
          areaServed: "Germany",
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Eltern-Unterstützung Services",
            itemListElement: data.services?.map((service: any) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: service.name,
                description: service.description
              }
            }))
          }
        };

      default:
        return baseSchema;
    }
  };

  return (
    <SchemaMarkup 
      type="website" 
      data={generateRichSnippet()} 
    />
  );
};

export default RichSnippets;

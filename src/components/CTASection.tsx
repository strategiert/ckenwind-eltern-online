
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageUrl?: string;
  bgColor?: string;
}

const CTASection: React.FC<CTASectionProps> = ({ 
  title, 
  description, 
  buttonText, 
  buttonLink, 
  imageUrl,
  bgColor = "bg-rueckenwind-light-purple" 
}) => {
  return (
    <section className={`${bgColor} py-16 md:py-20`}>
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {imageUrl && (
            <div className="hidden lg:block">
              <img 
                src={imageUrl} 
                alt={title} 
                className="rounded-lg shadow-md max-h-96 object-cover mx-auto"
              />
            </div>
          )}
          
          <div className={imageUrl ? "order-first lg:order-last" : "lg:col-span-2 max-w-2xl mx-auto text-center"}>
            <h2 className="text-2xl md:text-3xl font-display font-semibold mb-4">{title}</h2>
            <p className="text-gray-700 mb-6">{description}</p>
            <Button asChild className="bg-rueckenwind-purple hover:bg-rueckenwind-dark-purple">
              <Link to={buttonLink}>{buttonText}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

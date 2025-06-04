
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import LazyImage from '@/components/performance/LazyImage';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-rueckenwind-light-purple to-white py-16 md:py-24">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold mb-6 leading-tight">
              Erschöpft vom Familienalltag?<br />
              <span className="text-rueckenwind-purple">Wir geben Ihnen Rückenwind.</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-700 max-w-lg">
              Wissenschaftlich fundierte, empathische Unterstützung und praktische Werkzeuge für mehr Leichtigkeit im Familienalltag – insbesondere bei Eltern-Burnout, ADHS und Essstörungen bei Kindern.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button asChild className="bg-rueckenwind-purple hover:bg-rueckenwind-dark-purple text-white font-medium px-6 py-3 rounded-lg shadow-sm">
                <Link to="/gratis-buch">Gratis E-Book sichern</Link>
              </Button>
              <Button asChild variant="outline" className="border-rueckenwind-purple text-rueckenwind-purple hover:bg-rueckenwind-light-purple">
                <Link to="/ueber-mich">Mehr erfahren</Link>
              </Button>
            </div>
          </div>
          <div className="relative animate-fade-in">
            <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-rueckenwind-soft-blue opacity-60 z-0"></div>
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
              <LazyImage 
                src="/lovable-uploads/f3fff60c-fae4-4bdd-ad95-3651cef45cb0.png"
                alt="Janike Arent, Expertin für Eltern-Coaching"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-40 h-40 rounded-full bg-rueckenwind-light-purple opacity-60 z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

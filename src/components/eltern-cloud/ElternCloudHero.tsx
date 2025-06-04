
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ElternCloudHero = () => {
  return (
    <section className="bg-gradient-to-b from-rueckenwind-light-purple to-white py-16 md:py-24">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="mb-6">
              <span className="bg-rueckenwind-purple text-white px-4 py-2 rounded-full text-sm font-medium">
                ☁️ NEU: Therapie in der Cloud
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold mb-6 leading-tight">
              Deine Rückenwind <span className="text-rueckenwind-purple">Eltern-Cloud</span>
            </h1>
            
            <h2 className="text-2xl md:text-3xl text-gray-700 mb-6 font-medium">
              Professionelle Hilfe, wann du sie brauchst
            </h2>
            
            <p className="text-lg md:text-xl mb-8 text-gray-700 max-w-lg">
              Stell dir vor, du hättest einen Therapeuten, Coach und eine unterstützende Gemeinschaft 24/7 verfügbar - ohne Wartezeiten, ohne Anfahrtswege, ohne dass jemand auf deine Kinder aufpassen muss.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button asChild className="bg-rueckenwind-purple hover:bg-rueckenwind-dark-purple text-white font-medium px-8 py-4 text-lg rounded-lg shadow-sm">
                <Link to="#pricing">Jetzt 7 Tage kostenlos testen</Link>
              </Button>
              <Button asChild variant="outline" className="border-rueckenwind-purple text-rueckenwind-purple hover:bg-rueckenwind-light-purple px-8 py-4 text-lg">
                <Link to="#overview">Mehr erfahren</Link>
              </Button>
            </div>
            
            <div className="mt-8 flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                7 Tage kostenlos
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Jederzeit kündbar
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                DSGVO-konform
              </div>
            </div>
          </div>
          
          <div className="relative animate-fade-in">
            <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-rueckenwind-soft-blue opacity-60 z-0"></div>
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl bg-white p-8">
              <div className="text-center">
                <div className="text-6xl mb-4">☁️</div>
                <h3 className="text-xl font-semibold mb-4 text-rueckenwind-purple">Das ist Therapie in der Cloud:</h3>
                <ul className="text-left space-y-2 text-gray-700">
                  <li>✓ Hunderte professionelle Videos</li>
                  <li>✓ Strukturierte Kurse</li>
                  <li>✓ Echte Community</li>
                  <li>✓ Persönliche Begleitung</li>
                  <li>✓ Alles in einer Plattform</li>
                </ul>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-40 h-40 rounded-full bg-rueckenwind-light-purple opacity-60 z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ElternCloudHero;


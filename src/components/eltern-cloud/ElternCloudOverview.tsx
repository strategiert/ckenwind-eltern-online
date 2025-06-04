
import React from 'react';

const ElternCloudOverview = () => {
  return (
    <section id="overview" className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-8">
            Therapie in der Cloud
          </h2>
          
          <div className="bg-rueckenwind-soft-gray p-8 rounded-2xl mb-12">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              "Stell dir vor, du hättest einen Therapeuten, Coach und eine unterstützende Gemeinschaft 24/7 verfügbar - ohne Wartezeiten, ohne Anfahrtswege, ohne dass jemand auf deine Kinder aufpassen muss. Das ist Therapie in der Cloud: Hunderte professionelle Videos, strukturierte Kurse, echte Community und persönliche Begleitung - alles in einer Plattform."
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">⏰</div>
              <h3 className="text-xl font-semibold mb-2">24/7 Verfügbar</h3>
              <p className="text-gray-600">
                Hilfe genau dann, wenn du sie brauchst - ohne Wartezeiten oder Terminvereinbarung
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-5xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold mb-2">Von Zuhause</h3>
              <p className="text-gray-600">
                Keine Anfahrtswege, keine Kinderbetreuung nötig - alles bequem von deinem Sofa aus
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Professionell</h3>
              <p className="text-gray-600">
                Über 20 Jahre Erfahrung und fundiertes Fachwissen in einem digitalen Format
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ElternCloudOverview;


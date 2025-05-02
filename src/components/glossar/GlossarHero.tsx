
import React from 'react';
import { BookOpen } from 'lucide-react';

const GlossarHero = () => {
  return (
    <section className="bg-gradient-to-b from-rueckenwind-light-purple to-white py-16 md:py-20">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-full mb-6 shadow-sm">
            <BookOpen className="h-8 w-8 text-rueckenwind-purple" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-semibold mb-6">
            Glossar
          </h1>
          <p className="text-xl text-gray-700">
            Fachbegriffe aus den Bereichen Eltern-Burnout, ADHS bei Kindern und Essstörungen – 
            verständlich erklärt für Eltern und Betroffene
          </p>
          <div className="mt-8 text-gray-600">
            <p>Über 80+ Begriffe alphabetisch sortiert und thematisch gegliedert</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlossarHero;

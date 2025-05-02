
import React from 'react';
import { BookOpen } from 'lucide-react';
import { glossaryData } from '@/data/glossaryData';

const GlossarHero = () => {
  // Calculate the total number of terms
  const termCount = glossaryData.length;

  return (
    <section className="bg-gradient-to-b from-rueckenwind-light-purple to-white py-16 md:py-24">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-full mb-8 shadow-sm">
            <BookOpen className="h-8 w-8 text-rueckenwind-purple" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-semibold mb-6">
            Wiki-Glossar
          </h1>
          <p className="text-xl text-gray-700 mb-6 max-w-2xl mx-auto">
            Glossar: Eltern-Burnout, ADHS bei Kindern, Anorexie
          </p>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Dieses Glossar umfasst Begriffe aus den Bereichen Eltern-Burnout, ADHS bei Kindern und Essstörungen (insbesondere Anorexie), einschließlich offizieller Diagnosen (ICD-10/DSM-5), psychotherapeutischer Fachbegriffe und Alltagssprache von Eltern.
          </p>
          <div className="mt-6 text-gray-600">
            <p>Über {termCount}+ Begriffe alphabetisch sortiert, thematisch gegliedert und ausführlich erläutert</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlossarHero;

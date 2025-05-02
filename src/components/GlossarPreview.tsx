
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { glossaryData } from '@/data/glossaryData';
import { BookOpen } from 'lucide-react';

const GlossarPreview: React.FC = () => {
  // Wähle 3 zufällige Begriffe aus dem Glossar
  const randomTerms = [...glossaryData]
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-rueckenwind-soft-gray">
      <div className="container-custom">
        <h2 className="section-title">Glossar</h2>
        <p className="section-subtitle">Fachbegriffe aus Psychologie und Therapie verständlich erklärt</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {randomTerms.map((term, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-medium mb-2 text-rueckenwind-purple flex items-center">
                <BookOpen className="h-5 w-5 mr-2 inline-block" />
                {term.term}
                {term.alias && <span className="text-gray-500 font-normal ml-2">({term.alias})</span>}
              </h3>
              <p className="text-gray-700 mb-4 line-clamp-3">{term.definition}</p>
              <div className="flex flex-wrap gap-2 mt-2 mb-4">
                {term.tags.slice(0, 2).map((tag, tagIndex) => (
                  <span key={tagIndex} className="bg-rueckenwind-light-purple px-2 py-1 text-xs rounded text-rueckenwind-purple">
                    {tag}
                  </span>
                ))}
              </div>
              <Link to="/glossar" className="text-rueckenwind-purple hover:text-rueckenwind-dark-purple font-medium inline-flex items-center">
                Mehr im Glossar 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild variant="outline" className="border-rueckenwind-purple text-rueckenwind-purple hover:bg-rueckenwind-light-purple">
            <Link to="/glossar">Komplettes Glossar entdecken</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GlossarPreview;

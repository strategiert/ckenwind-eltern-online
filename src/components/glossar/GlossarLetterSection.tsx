
import React from 'react';
import GlossarTableView from './GlossarTableView';
import GlossarGridView from './GlossarGridView';

interface GlossarLetterSectionProps {
  letter: string;
  items: any[];
  onTermClick: (slug: string) => void;
  view: 'grid' | 'table';
}

const GlossarLetterSection: React.FC<GlossarLetterSectionProps> = ({ letter, items, onTermClick, view }) => {
  return (
    <div id={`letter-${letter}`} className="scroll-mt-24">
      <h2 className="text-4xl font-display font-semibold text-rueckenwind-purple mb-8 border-b border-gray-200 pb-2">
        {letter}
      </h2>

      {view === 'table' ? (
        <GlossarTableView items={items} onTermClick={onTermClick} />
      ) : (
        <GlossarGridView items={items} onTermClick={onTermClick} />
      )}
    </div>
  );
};

export default GlossarLetterSection;

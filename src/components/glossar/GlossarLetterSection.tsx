
import React from 'react';
import GlossarTableView from './GlossarTableView';
import GlossarGridView from './GlossarGridView';

interface GlossarLetterSectionProps {
  letter: string;
  items: any[];
  onTermClick: (slug: string) => void;
}

const GlossarLetterSection: React.FC<GlossarLetterSectionProps> = ({ letter, items, onTermClick }) => {
  return (
    <div id={`letter-${letter}`} className="scroll-mt-24">
      <h2 className="text-4xl font-display font-semibold text-rueckenwind-purple mb-8 border-b border-gray-200 pb-2">
        {letter}
      </h2>

      {letter === 'A' ? (
        // Detailed table view for letter 'A'
        <GlossarTableView items={items} onTermClick={onTermClick} />
      ) : (
        // Standard grid view for other letters
        <GlossarGridView items={items} onTermClick={onTermClick} />
      )}
    </div>
  );
};

export default GlossarLetterSection;

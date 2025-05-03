
import React from 'react';

interface GlossarAlphabetProps {
  groupedItems: Record<string, any[]>;
}

const GlossarAlphabet: React.FC<GlossarAlphabetProps> = ({ groupedItems }) => {
  // Define the full alphabet for the letter navigation
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="mb-16">
      <div className="flex flex-wrap justify-center gap-3 mb-4">
        {alphabet.map(letter => {
          const hasItems = !!groupedItems[letter];
          return (
            <a 
              key={letter}
              href={hasItems ? `#letter-${letter}` : undefined}
              className={`w-8 h-8 flex items-center justify-center rounded-full 
                ${hasItems 
                  ? 'bg-rueckenwind-light-purple text-rueckenwind-purple hover:bg-rueckenwind-purple hover:text-white transition-colors' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
            >
              {letter}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default GlossarAlphabet;

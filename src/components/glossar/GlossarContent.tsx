
import React from 'react';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { glossaryData } from '@/data/glossaryData';

interface GlossarContentProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const GlossarContent: React.FC<GlossarContentProps> = ({ 
  activeFilter, 
  setActiveFilter,
  searchTerm,
  setSearchTerm 
}) => {
  // Group glossary items by first letter
  const groupedItems = glossaryData
    .filter(item => {
      const matchesFilter = activeFilter === 'all' || 
        item.tags.some(tag => tag.toLowerCase().includes(activeFilter.toLowerCase()));
      
      const matchesSearch = !searchTerm || 
        item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.definition.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesFilter && matchesSearch;
    })
    .reduce((acc, item) => {
      const firstLetter = item.term.charAt(0).toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(item);
      return acc;
    }, {} as Record<string, typeof glossaryData>);

  // Get unique alphabet letters that have items
  const letters = Object.keys(groupedItems).sort();
  
  // Get all unique tag categories for filtering
  const allTags = Array.from(new Set(
    glossaryData.flatMap(item => item.tags)
      .map(tag => {
        // Extract main category from tag (e.g., "Diagnose-Burnout" -> "Diagnose")
        const parts = tag.split('-');
        return parts[0];
      })
  )).sort();

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <section className="py-16">
      <div className="container-custom">
        {/* Search and filter */}
        <div className="mb-12 space-y-6">
          <div className="max-w-md mx-auto">
            <Input
              type="search"
              placeholder="Suche nach Begriffen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-2">
            <Badge 
              variant={activeFilter === 'all' ? "default" : "outline"}
              className="cursor-pointer text-sm py-1.5 px-3"
              onClick={() => setActiveFilter('all')}
            >
              Alle Begriffe
            </Badge>
            {['Diagnose', 'Therapie', 'Symptom', 'Konzept', 'Alltag'].map(tag => (
              <Badge
                key={tag}
                variant={activeFilter === tag ? "default" : "outline"}
                className="cursor-pointer text-sm py-1.5 px-3"
                onClick={() => setActiveFilter(tag)}
              >
                {tag}
              </Badge>
            ))}
            {['Burnout', 'ADHS', 'Essstörung'].map(tag => (
              <Badge
                key={tag}
                variant={activeFilter === tag ? "default" : "outline"} 
                className="cursor-pointer text-sm py-1.5 px-3"
                onClick={() => setActiveFilter(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Alphabet navigation */}
        <div className="mb-10">
          <div className="flex flex-wrap justify-center gap-2 mb-4">
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

        {/* No results message */}
        {letters.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Keine Ergebnisse gefunden</h3>
            <p className="text-gray-600">
              Versuchen Sie andere Suchbegriffe oder Filter
            </p>
          </div>
        )}

        {/* Glossary content */}
        <div className="space-y-12">
          {letters.map(letter => (
            <div key={letter} id={`letter-${letter}`} className="scroll-mt-20">
              <h2 className="text-4xl font-display font-semibold text-rueckenwind-purple mb-6 border-b border-gray-200 pb-2">
                {letter}
              </h2>
              <div className="space-y-8">
                {groupedItems[letter].map((item, index) => (
                  <div key={index} className="group">
                    <h3 className="text-xl font-medium mb-2 group-hover:text-rueckenwind-purple transition-colors">
                      {item.term}
                      {item.alias && <span className="text-gray-500 font-normal"> ({item.alias})</span>}
                    </h3>
                    <p className="text-gray-700 mb-3">{item.definition}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="bg-gray-50">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlossarContent;

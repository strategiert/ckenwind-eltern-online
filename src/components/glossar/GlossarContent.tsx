
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { glossaryData } from '@/data/glossaryData';
import GlossarSearch from './GlossarSearch';
import GlossarAlphabet from './GlossarAlphabet';
import GlossarLetterSection from './GlossarLetterSection';

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
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Check if there's a tag parameter in the URL
  React.useEffect(() => {
    const tagParam = searchParams.get('tag');
    if (tagParam) {
      setActiveFilter(tagParam);
    }
  }, [searchParams, setActiveFilter]);

  // Filter glossary items based on active filter and search term
  const filteredItems = glossaryData.filter(item => {
    const matchesFilter = activeFilter === 'all' || 
      item.tags.some(tag => tag.toLowerCase().includes(activeFilter.toLowerCase()));
    
    const matchesSearch = !searchTerm || 
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.definition.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  // Group glossary items by first letter
  const groupedItems = filteredItems.reduce((acc, item) => {
    const firstLetter = item.term.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(item);
    return acc;
  }, {} as Record<string, typeof glossaryData>);

  // Get unique alphabet letters that have items
  const letters = Object.keys(groupedItems).sort();

  const handleTermClick = (slug: string) => {
    navigate(`/glossar/${slug}`);
  };

  return (
    <section className="py-16">
      <div className="container-custom">
        {/* Search and filter */}
        <GlossarSearch 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
        
        {/* Alphabet navigation */}
        <GlossarAlphabet groupedItems={groupedItems} />

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
        <div className="space-y-16">
          {letters.map(letter => (
            <GlossarLetterSection 
              key={letter} 
              letter={letter} 
              items={groupedItems[letter]} 
              onTermClick={handleTermClick} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlossarContent;


import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGlossaryTerms } from '@/hooks/useGlossary';
import GlossarSearch from './GlossarSearch';
import GlossarAlphabet from './GlossarAlphabet';
import GlossarLetterSection from './GlossarLetterSection';
import GlossarViewToggle from './GlossarViewToggle';

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
  const [view, setView] = useState<'grid' | 'table'>('grid');
  
  // Fetch glossary data from database
  const { data: glossaryData = [], isLoading, error } = useGlossaryTerms();
  
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

  if (error) {
    return (
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold text-red-600 mb-2">Fehler beim Laden</h3>
            <p className="text-gray-600">
              Das Glossar konnte nicht geladen werden. Bitte versuchen Sie es später erneut.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rueckenwind-purple mx-auto mb-4"></div>
            <p className="text-gray-600">Glossar wird geladen...</p>
          </div>
        </div>
      </section>
    );
  }

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
        
        {/* View toggle */}
        <GlossarViewToggle view={view} setView={setView} />
        
        {/* Alphabet navigation */}
        <GlossarAlphabet groupedItems={groupedItems} />

        {/* No results message */}
        {letters.length === 0 && !isLoading && (
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
              view={view}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlossarContent;

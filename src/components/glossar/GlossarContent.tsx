
import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGlossaryTerms, useGlossarySearch, useGlossaryTermsByTag } from '@/hooks/useGlossary';
import GlossarSearch from './GlossarSearch';
import GlossarAlphabet from './GlossarAlphabet';
import GlossarLetterSection from './GlossarLetterSection';
import GlossarViewToggle from './GlossarViewToggle';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

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
  
  // Check if there's a tag parameter in the URL
  React.useEffect(() => {
    const tagParam = searchParams.get('tag');
    if (tagParam) {
      setActiveFilter(tagParam);
    }
  }, [searchParams, setActiveFilter]);

  // Use appropriate hook based on current state
  const allTermsQuery = useGlossaryTerms();
  const searchQuery = useGlossarySearch(searchTerm);
  const tagQuery = useGlossaryTermsByTag(activeFilter);

  // Determine which data to use
  const { data: glossaryItems, isLoading, error } = useMemo(() => {
    if (searchTerm && searchTerm.length >= 2) {
      return searchQuery;
    } else if (activeFilter !== 'all' && !['Diagnose', 'Therapie', 'Symptom', 'Konzept', 'Alltag', 'Burnout', 'ADHS', 'Essstörung'].includes(activeFilter)) {
      return tagQuery;
    } else {
      return allTermsQuery;
    }
  }, [searchTerm, activeFilter, allTermsQuery, searchQuery, tagQuery]);

  // Filter items based on activeFilter for predefined categories
  const filteredItems = useMemo(() => {
    if (!glossaryItems) return [];
    
    if (activeFilter === 'all' || searchTerm) {
      return glossaryItems;
    }

    // Handle predefined filter categories
    return glossaryItems.filter(item => 
      item.tags.some(tag => tag.toLowerCase().includes(activeFilter.toLowerCase()))
    );
  }, [glossaryItems, activeFilter, searchTerm]);

  // Group glossary items by first letter
  const groupedItems = useMemo(() => {
    return filteredItems.reduce((acc, item) => {
      const firstLetter = item.term.charAt(0).toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(item);
      return acc;
    }, {} as Record<string, typeof filteredItems>);
  }, [filteredItems]);

  // Get unique alphabet letters that have items
  const letters = Object.keys(groupedItems).sort();

  const handleTermClick = (slug: string) => {
    navigate(`/glossar/${slug}`);
  };

  // Loading state
  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container-custom">
          <GlossarSearch 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
          
          <GlossarViewToggle view={view} setView={setView} />
          
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-8 w-16" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((j) => (
                    <Skeleton key={j} className="h-32" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-16">
        <div className="container-custom">
          <GlossarSearch 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
          
          <Alert className="mt-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Fehler beim Laden der Glossar-Einträge. Bitte versuchen Sie es später erneut.
            </AlertDescription>
          </Alert>
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

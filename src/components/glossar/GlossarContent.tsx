import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGlossaryTerms, useGlossarySearch, useGlossaryTermsByTag } from '@/hooks/useGlossary';
import { GlossaryTermBasic } from '@/services/glossaryService';
import GlossarSearch from './GlossarSearch';
import GlossarAlphabet from './GlossarAlphabet';
import GlossarLetterSection from './GlossarLetterSection';
import GlossarViewToggle from './GlossarViewToggle';
import { Loader2 } from 'lucide-react';

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

  // Fetch data from Supabase
  const { data: allTerms, isLoading: isLoadingAll } = useGlossaryTerms();
  const { data: searchResults, isLoading: isSearching } = useGlossarySearch(searchTerm);
  const { data: tagResults, isLoading: isLoadingTag } = useGlossaryTermsByTag(
    activeFilter !== 'all' ? activeFilter : ''
  );

  // Check if there's a tag parameter in the URL
  React.useEffect(() => {
    const tagParam = searchParams.get('tag');
    if (tagParam) {
      setActiveFilter(tagParam);
    }
  }, [searchParams, setActiveFilter]);

  // Determine which data to use based on active filters
  const filteredItems = useMemo(() => {
    let items: GlossaryTermBasic[] = [];

    // If searching, use search results
    if (searchTerm && searchTerm.length >= 2) {
      items = searchResults || [];
    }
    // If filtering by tag, use tag results
    else if (activeFilter !== 'all') {
      items = tagResults || [];
    }
    // Otherwise use all terms
    else {
      items = allTerms || [];
    }

    // Additional client-side filtering if both search and tag are active
    if (searchTerm && activeFilter !== 'all') {
      items = items.filter(item =>
        item.tags?.some(tag => tag.toLowerCase().includes(activeFilter.toLowerCase()))
      );
    }

    return items;
  }, [allTerms, searchResults, tagResults, searchTerm, activeFilter]);

  // Group glossary items by first letter
  const groupedItems = useMemo(() => {
    return filteredItems.reduce((acc, item) => {
      const firstLetter = item.term.charAt(0).toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(item);
      return acc;
    }, {} as Record<string, GlossaryTermBasic[]>);
  }, [filteredItems]);

  // Get unique alphabet letters that have items
  const letters = Object.keys(groupedItems).sort();

  const handleTermClick = (slug: string) => {
    navigate(`/glossar/${slug}`);
  };

  const isLoading = isLoadingAll || isSearching || isLoadingTag;

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

        {/* Loading state */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-rueckenwind-purple" />
            <span className="ml-3 text-gray-600">Glossar wird geladen...</span>
          </div>
        )}

        {/* No results message */}
        {!isLoading && letters.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Keine Ergebnisse gefunden</h3>
            <p className="text-gray-600">
              Versuchen Sie andere Suchbegriffe oder Filter
            </p>
          </div>
        )}

        {/* Glossary content */}
        {!isLoading && (
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
        )}
      </div>
    </section>
  );
};

export default GlossarContent;

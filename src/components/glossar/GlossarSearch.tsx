import React from 'react';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useGlossaryTags } from '@/hooks/useGlossary';

interface GlossarSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

// Default tags to show when no tags are loaded from DB yet
const defaultTags = ['Diagnose', 'Therapie', 'Symptom', 'Konzept', 'Alltag', 'Burnout', 'ADHS', 'Essstörung'];

const GlossarSearch: React.FC<GlossarSearchProps> = ({
  searchTerm,
  setSearchTerm,
  activeFilter,
  setActiveFilter
}) => {
  const { data: tags } = useGlossaryTags();

  // Use tags from DB if available, otherwise use defaults
  const displayTags = tags && tags.length > 0 ? tags : defaultTags;

  return (
    <div className="mb-16 space-y-8">
      <div className="max-w-md mx-auto">
        <Input
          type="search"
          placeholder="Suche nach Begriffen..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <Badge
          variant={activeFilter === 'all' ? "default" : "outline"}
          className="cursor-pointer text-sm py-1.5 px-3"
          onClick={() => setActiveFilter('all')}
        >
          Alle Begriffe
        </Badge>
        {displayTags.map(tag => (
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
  );
};

export default GlossarSearch;

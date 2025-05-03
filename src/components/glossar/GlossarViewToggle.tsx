
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Grid2X2, List } from 'lucide-react';

interface GlossarViewToggleProps {
  view: 'grid' | 'table';
  setView: (view: 'grid' | 'table') => void;
}

const GlossarViewToggle: React.FC<GlossarViewToggleProps> = ({ view, setView }) => {
  return (
    <div className="flex justify-center mb-6">
      <ToggleGroup type="single" value={view} onValueChange={(value) => value && setView(value as 'grid' | 'table')}>
        <ToggleGroupItem value="grid" aria-label="Grid view" className="px-4 py-2">
          <Grid2X2 className="h-4 w-4 mr-2" />
          <span>Kartenansicht</span>
        </ToggleGroupItem>
        <ToggleGroupItem value="table" aria-label="Table view" className="px-4 py-2">
          <List className="h-4 w-4 mr-2" />
          <span>Tabellenansicht</span>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default GlossarViewToggle;

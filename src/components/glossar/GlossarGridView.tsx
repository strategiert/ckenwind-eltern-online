import React from 'react';
import { Button } from "@/components/ui/button";
import { BookOpen } from 'lucide-react';
import { GlossaryTermBasic } from '@/services/glossaryService';

interface GlossarGridViewProps {
  items: GlossaryTermBasic[];
  onTermClick: (slug: string) => void;
}

const GlossarGridView: React.FC<GlossarGridViewProps> = ({ items, onTermClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, index) => (
        <Button
          key={index}
          variant="outline"
          className="bg-white text-left flex flex-col items-start p-5 h-auto shadow-sm hover:shadow-md border border-gray-200 hover:border-rueckenwind-light-purple transition-all"
          onClick={() => onTermClick(item.slug)}
        >
          <div className="flex gap-3 w-full overflow-hidden">
            <BookOpen className="h-5 w-5 text-rueckenwind-purple shrink-0 mt-1" />
            <div className="flex flex-col items-start overflow-hidden w-full">
              <h3 className="text-lg font-medium mb-1 text-rueckenwind-purple truncate w-full">
                {item.term}
              </h3>
              {item.alias && (
                <span className="text-gray-500 font-normal text-sm block mb-2 truncate w-full">
                  {item.alias}
                </span>
              )}
              <p className="text-gray-700 text-sm line-clamp-2 w-full break-words">
                {item.definition}
              </p>
            </div>
          </div>
        </Button>
      ))}
    </div>
  );
};

export default GlossarGridView;

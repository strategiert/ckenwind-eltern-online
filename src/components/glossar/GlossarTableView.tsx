
import React from 'react';
import { 
  Table,
  TableBody,
  TableCell,
  TableRow
} from "@/components/ui/table";
import { BookOpen } from 'lucide-react';

interface GlossarTableViewProps {
  items: any[];
  onTermClick: (slug: string) => void;
}

const GlossarTableView: React.FC<GlossarTableViewProps> = ({ items, onTermClick }) => {
  return (
    <Table>
      <TableBody>
        {items.map((item, index) => (
          <TableRow 
            key={index} 
            className="hover:bg-rueckenwind-light-purple cursor-pointer"
            onClick={() => onTermClick(item.slug)}
          >
            <TableCell className="font-medium w-1/4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-rueckenwind-purple shrink-0" />
                <div>
                  <span className="text-rueckenwind-purple font-medium">{item.term}</span>
                  {item.alias && <div className="text-gray-500 text-sm">({item.alias})</div>}
                </div>
              </div>
            </TableCell>
            <TableCell className="w-3/4">
              <div className="space-y-2">
                <p className="text-sm text-gray-700">{item.definition}</p>
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag: string, tagIdx: number) => (
                    <span 
                      key={tagIdx} 
                      className="bg-rueckenwind-light-purple text-xs px-2 py-0.5 rounded-full text-rueckenwind-purple"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default GlossarTableView;

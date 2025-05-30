
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface BlogTagFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
}

const BlogTagFilter: React.FC<BlogTagFilterProps> = ({ tags, selectedTags, onTagToggle }) => {
  if (tags.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-3">Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <Badge
            key={tag}
            variant={selectedTags.includes(tag) ? "default" : "outline"}
            className={`cursor-pointer transition-colors ${
              selectedTags.includes(tag) 
                ? 'bg-rueckenwind-purple hover:bg-rueckenwind-dark-purple' 
                : 'hover:bg-rueckenwind-light-purple'
            }`}
            onClick={() => onTagToggle(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default BlogTagFilter;

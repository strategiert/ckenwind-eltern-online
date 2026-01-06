import React from 'react';
import { Heart } from 'lucide-react';

export const JanikeTypingIndicator: React.FC = () => {
  return (
    <div className="flex gap-3">
      {/* Avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-rueckenwind-purple to-pink-500 flex items-center justify-center">
        <Heart className="h-4 w-4 text-white" />
      </div>

      {/* Typing Bubble */}
      <div className="bg-white shadow-sm border border-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
        <div className="flex items-center gap-1.5">
          <div className="flex gap-1">
            <span
              className="w-2 h-2 bg-rueckenwind-purple rounded-full animate-bounce"
              style={{ animationDelay: '0ms' }}
            />
            <span
              className="w-2 h-2 bg-rueckenwind-purple rounded-full animate-bounce"
              style={{ animationDelay: '150ms' }}
            />
            <span
              className="w-2 h-2 bg-rueckenwind-purple rounded-full animate-bounce"
              style={{ animationDelay: '300ms' }}
            />
          </div>
          <span className="text-xs text-gray-400 ml-2">Janike schreibt...</span>
        </div>
      </div>
    </div>
  );
};

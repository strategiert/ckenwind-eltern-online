import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

interface FloatingChatButtonProps {
  onClick: () => void;
}

const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-gradient-to-br from-rueckenwind-purple via-pink-500 to-rueckenwind-dark-purple hover:from-rueckenwind-dark-purple hover:via-pink-600 hover:to-rueckenwind-purple shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 z-50 border-2 border-white/30 group"
      size="icon"
    >
      <Heart className="h-7 w-7 text-white group-hover:scale-110 transition-transform" />
      <span className="sr-only">Mit Janike sprechen</span>

      {/* Pulse animation */}
      <span className="absolute -top-1 -right-1 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white"></span>
      </span>
    </Button>
  );
};

export default FloatingChatButton;

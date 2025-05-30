
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

interface FloatingChatButtonProps {
  onClick: () => void;
}

const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-6 right-6 h-16 w-16 rounded-xl bg-gradient-to-br from-rueckenwind-purple to-rueckenwind-dark-purple hover:from-rueckenwind-dark-purple hover:to-rueckenwind-purple shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 z-50 border-2 border-white/20"
      size="icon"
    >
      <MessageCircle className="h-7 w-7 text-white" />
      <span className="sr-only">Mental Health Support Chat öffnen</span>
    </Button>
  );
};

export default FloatingChatButton;

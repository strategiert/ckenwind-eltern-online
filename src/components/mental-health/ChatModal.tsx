import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { JanikeChat } from '@/components/janike-chat';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[85vh] flex flex-col p-0 rounded-2xl border-0 shadow-2xl overflow-hidden gap-0">
        {/* Custom Header with Close Button */}
        <div className="absolute top-2 right-2 z-10 flex gap-2">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <Link to="/janike">
              <ExternalLink className="h-4 w-4 mr-1" />
              Vollbild
            </Link>
          </Button>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Janike Chat - Full Height */}
        <JanikeChat className="h-full rounded-2xl" embedded />
      </DialogContent>
    </Dialog>
  );
};

export default ChatModal;
